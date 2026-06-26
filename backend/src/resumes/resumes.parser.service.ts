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
    // Basic Heuristic/Regex Parser
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
        summary: joinedText.substring(0, 300) + '...',
      },
      experience: [
        {
          id: Date.now().toString(),
          company: 'Extracted Company',
          position: 'Extracted Position',
          location: '',
          startDate: '2020-01',
          endDate: '2023-01',
          current: false,
          description: 'Please review your extracted experience here.',
        }
      ],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
    };
  }
}
