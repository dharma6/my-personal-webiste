import { Outfit, Ovo } from 'next/font/google';
import GoogleAnalytics from './components/GoogleAnalytics';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-outfit',
});

const ovo = Ovo({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-ovo',
});

export const metadata = {
  metadataBase: new URL('https://dharmabandaru.com'),
  title: {
    default: 'Dharma Bandaru | Software Engineer | St. Louis, MO',
    template: '%s | Dharma Bandaru',
  },
  description:
    'Backend Engineer (Dharma Teja Bandaru) specializing in Gen-AI agents, RAG applications, and AWS services. Based in St. Louis, MO - the Arch City, with expertise in API development, cloud architecture, and security implementation.',
  keywords: [
    'Dharma Bandaru',
    'Dharma Teja Bandaru',
    'Backend Engineer',
    'AI Developer',
    'AWS Services',
    'Gen-AI',
    'RAG Applications',
    'API Development',
    'Cloud Architecture',
    'St. Louis Tech',
    'Software Engineer',
    'Full Stack Developer',
    'AWS Lambda',
    'DynamoDB',
    'API Gateway',
    'CI/CD',
    'Security Implementation',
  ],
  authors: [
    {
      name: 'Dharma Bandaru',
      url: 'https://dharmabandaru.com',
      alternateName: 'Dharma Teja Bandaru',
    },
  ],
  creator: 'Dharma Bandaru',
  publisher: 'Dharma Bandaru',
  alternates: {
    canonical: 'https://dharmabandaru.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dharmabandaru.com',
    title: 'Dharma Bandaru | Dharma Teja Bandaru | St. Louis, MO',
    description:
      'Backend Engineer specializing in Gen-AI agents, RAG applications, and AWS services. Expert in cloud architecture and security implementation.',
    siteName: 'Dharma Bandaru',
    images: [
      {
        url: 'https://dharmabandaru.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dharma Bandaru - Sr.Software Engineer - Gen AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dharma Bandaru',
    description:
      'Backend Engineer specializing in Gen-AI agents and AWS services. Based in St. Louis, MO - the Arch City.',
    images: ['https://dharmabandaru.com/og-image.jpg'],
    creator: '@yourtwitterhandle',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'technology',
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dharma Teja Bandaru',
    alternateName: 'Dharma Bandaru',
    url: 'https://dharmabandaru.com',
    jobTitle: 'Sr.Software Engineer - Gen AI',
    description:
      'Backend Engineer specializing in Gen-AI agents, RAG applications, and AWS services',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'St. Louis',
      addressRegion: 'MO',
      addressCountry: 'US',
    },
    knowsAbout: [
      'AWS Services',
      'Gen-AI',
      'Backend Development',
      'Cloud Architecture',
      'API Development',
      'RAG Applications',
      'Python',
      'TypeScript',
      'Next.js',
    ],
  };

  return (
    <html
      lang="en"
      className={`scroll-smooth ${outfit.variable} ${ovo.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden
          dark:bg-darkTheme dark:text-white min-h-screen`}
      >
        <GoogleAnalytics
          measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
        />
        {children}
      </body>
    </html>
  );
}
