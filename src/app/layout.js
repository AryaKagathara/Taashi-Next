// src/app/layout.js

// CSS imports remain the same
import './css/satoshi.css';
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Script from 'next/script';

// --- METADATA OBJECT ---
// This is the new, recommended way to add metadata in the App Router.
export const metadata = {
  title: 'Taashi Industries LLP - Industrial Starch & Adhesives',
  description: 'Manufacturer of modified starches and industrial-grade adhesives for packaging, paper, gypsum, and other industries in Morbi, Gujarat.',
  keywords: ['modified starch', 'industrial adhesives', 'pasting gum', 'corrugation gum', 'Taashi Industries', 'Morbi', 'Gujarat'],
  openGraph: {
    title: 'Taashi Industries LLP - Industrial Starch & Adhesives',
    description: 'Specializing in performance-driven and sustainable starch solutions.',
    url: 'https://taashi.biz', // Replace with your actual domain
    siteName: 'Taashi Industries LLP',
    images: [
      {
        url: 'https://taashi.biz/images/Thumbnail.webp', // Replace with the full URL to your hero image
        width: 800,
        height: 600,
        alt: 'Taashi Industries Manufacturing Facility',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taashi Industries LLP - Industrial Starch & Adhesives',
    description: 'Leading manufacturer of modified starch solutions.',
    images: ['https://taashi.biz/images/Thumbnail.webp'], // Replace with the full URL to your hero image
  },
  // Next.js will automatically handle the favicon from your /app directory
  // and the viewport meta tag.
};


export default function RootLayout({ children }) {
  // The <Head> component from `next/head` is removed from here.
  // Next.js now uses the metadata object above to build the <head> tag.
  return (
    <html lang="en">
      <body>
        {children}

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
          integrity="sha384-C6RzsynM9kWDrMNeT87bh5OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}