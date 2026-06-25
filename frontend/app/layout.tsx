import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Resume Builder — Build Your Dream Resume',
  description: 'Create a professional, stunning resume in minutes with live preview and PDF export.',
  keywords: 'resume builder, CV maker, professional resume, IT resume, management resume, fresher resume',
  openGraph: {
    title: 'Resume Builder — Build Your Dream Resume',
    description: 'Create a professional, stunning resume in minutes with live preview and PDF export.',
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
