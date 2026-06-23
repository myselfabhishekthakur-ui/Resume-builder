import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'ResumeForge — Build Your Dream Resume',
  description: 'Create stunning professional resumes in minutes with 12+ curated templates for IT, Management, Freshers, and more. Google Sign-In, instant PDF export.',
  keywords: 'resume builder, CV maker, professional resume, IT resume, management resume, fresher resume',
  openGraph: {
    title: 'ResumeForge — Build Your Dream Resume',
    description: 'Create stunning professional resumes in minutes',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
