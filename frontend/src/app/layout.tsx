import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DataForge',
  description: 'Data as a Storytelling',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
