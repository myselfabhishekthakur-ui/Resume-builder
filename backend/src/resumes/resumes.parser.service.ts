import { Injectable, Logger } from '@nestjs/common';
import * as pdfParse from 'pdf-parse';
import * as mammoth from 'mammoth';

@Injectable()
export class ResumesParserService {
  private readonly logger = new Logger(ResumesParserService.name);

  async parseFile(file: Express.Multer.File): Promise<any> {
    try {
      let rawText = '';
      if (file.mimetype === 'application/pdf') {
        const data = await pdfParse(file.buffer);
        rawText = data.text;
      } else if (
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.mimetype === 'application/msword'
      ) {
        const result = await mammoth.extractRawText({ buffer: file.buffer });
        rawText = result.value;
      } else {
        throw new Error('Unsupported file type');
      }

      return this.extractData(rawText);
    } catch (error) {
      this.logger.error('Failed to parse file', error);
      throw new Error('Failed to parse resume file');
    }
  }

  private extractData(text: string): any {
    // Advanced Heuristic Parser
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const joinedText = lines.join('\n');

    // Extract Email
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const emailMatch = joinedText.match(emailRegex);
    
    // Extract Phone
    const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
    const phoneMatch = joinedText.match(phoneRegex);

    // Naive Full Name (Assuming first line is name)
    const fullName = lines.length > 0 ? lines[0] : '';

    // Chunk text into sections based on common headings
    const sections: Record<string, string[]> = {
      experience: [],
      education: [],
      skills: [],
      projects: [],
      summary: []
    };
    
    let currentSection = 'summary';

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const upperLine = line.toUpperCase();
      
      if (upperLine.includes('EXPERIENCE') || upperLine.includes('EMPLOYMENT') || upperLine.includes('WORK HISTORY')) {
        currentSection = 'experience';
        continue;
      } else if (upperLine.includes('EDUCATION') || upperLine.includes('ACADEMIC')) {
        currentSection = 'education';
        continue;
      } else if (upperLine.includes('SKILL') || upperLine.includes('TECHNOLOGIES')) {
        currentSection = 'skills';
        continue;
      } else if (upperLine.includes('PROJECT')) {
        currentSection = 'projects';
        continue;
      }

      sections[currentSection].push(line);
    }

    // Process Skills
    const rawSkills = sections.skills.join(',').split(/[,|•]/).map(s => s.trim()).filter(s => s.length > 0 && s.length < 40);
    const uniqueSkills = [...new Set(rawSkills)].slice(0, 15); // Max 15 skills
    const mappedSkills = uniqueSkills.map((s, idx) => ({ id: idx.toString(), name: s }));

    // Process Experience
    const expText = sections.experience.join('\n');
    const mappedExp = sections.experience.length > 0 ? [{
      id: Date.now().toString(),
      company: 'Extracted Company (Review Required)',
      position: 'Extracted Position',
      location: '',
      startDate: 'YYYY-MM',
      endDate: 'YYYY-MM',
      current: false,
      description: expText.substring(0, 1000), // Dump all exp text here for the user to review
    }] : [];

    // Process Education
    const eduText = sections.education.join('\n');
    const mappedEdu = sections.education.length > 0 ? [{
      id: Date.now().toString(),
      institution: 'Extracted Institution (Review Required)',
      degree: 'Extracted Degree',
      field: '',
      startDate: 'YYYY-MM',
      endDate: 'YYYY-MM',
      description: eduText.substring(0, 500),
    }] : [];

    return {
      personal: {
        fullName: fullName.substring(0, 50),
        title: 'Professional',
        email: emailMatch ? emailMatch[0] : '',
        phone: phoneMatch ? phoneMatch[0] : '',
        location: '',
        website: '',
        linkedin: '',
        github: '',
        summary: sections.summary.join(' ').substring(0, 400),
      },
      experience: mappedExp,
      education: mappedEdu,
      skills: mappedSkills,
      projects: [],
      certifications: [],
    };
  }
}
