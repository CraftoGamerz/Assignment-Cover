import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jis-assignment-cover-studio.ashim077.chatgpt.site'),
  title: 'JIS Assignment Cover Studio',
  description: 'Create polished, print-ready assignment front pages for JIS College of Engineering.',
  icons: { icon: '/jis-college-logo.svg' },
  openGraph: {
    type: 'website',
    title: 'JIS Assignment Cover Studio',
    description: 'Create every assignment cover in one go.',
    images: [{ url: '/og.png', width: 1731, height: 909, alt: 'JIS Assignment Cover Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JIS Assignment Cover Studio',
    description: 'Create every assignment cover in one go.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
