'use client';
import { useResumeStore } from '@/lib/store';
import TechProTemplate from '@/components/templates/TechPro/TechProTemplate';
import DevMinimalTemplate from '@/components/templates/DevMinimal/DevMinimalTemplate';
import DataSciTemplate from '@/components/templates/DataSci/DataSciTemplate';
import CorpLeadTemplate from '@/components/templates/CorpLead/CorpLeadTemplate';
import ExecSuiteTemplate from '@/components/templates/ExecSuite/ExecSuiteTemplate';
import StartupFounderTemplate from '@/components/templates/StartupFounder/StartupFounderTemplate';
import FreshStartTemplate from '@/components/templates/FreshStart/FreshStartTemplate';
import CampusReadyTemplate from '@/components/templates/CampusReady/CampusReadyTemplate';
import CreativeFlowTemplate from '@/components/templates/CreativeFlow/CreativeFlowTemplate';
import MarketProTemplate from '@/components/templates/MarketPro/MarketProTemplate';
import HealthCareTemplate from '@/components/templates/HealthCare/HealthCareTemplate';
import LegalEagleTemplate from '@/components/templates/LegalEagle/LegalEagleTemplate';

import { ResumeData } from '@/lib/store';

interface Props {
  templateId: string;
  dataOverride?: ResumeData;
}

export default function LivePreview({ templateId, dataOverride }: Props) {
  const { data: storeData } = useResumeStore();
  const data = dataOverride || storeData;

  const props = { data };

  switch (templateId) {
    case 'tech-pro': return <TechProTemplate {...props} />;
    case 'dev-minimal': return <DevMinimalTemplate {...props} />;
    case 'data-sci': return <DataSciTemplate {...props} />;
    case 'corp-lead': return <CorpLeadTemplate {...props} />;
    case 'exec-suite': return <ExecSuiteTemplate {...props} />;
    case 'startup-founder': return <StartupFounderTemplate {...props} />;
    case 'fresh-start': return <FreshStartTemplate {...props} />;
    case 'campus-ready': return <CampusReadyTemplate {...props} />;
    case 'creative-flow': return <CreativeFlowTemplate {...props} />;
    case 'market-pro': return <MarketProTemplate {...props} />;
    case 'health-care': return <HealthCareTemplate {...props} />;
    case 'legal-eagle': return <LegalEagleTemplate {...props} />;
    default: return <TechProTemplate {...props} />;
  }
}
