// src/app/layout.js

// Corrected import paths if your CSS is directly in src/app/
import './css/satoshi.css';
import './css/style.css';

// Import Bootstrap CSS (requires `npm install bootstrap` or `yarn add bootstrap`)
import 'bootstrap/dist/css/bootstrap.min.css';

import Script from 'next/script'; // Import the Script component
import Head from 'next/head';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children} {/* This is where page.js content goes */}

        {/* Make sure the Bootstrap JS script is here */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive" // Ensure script loads and executes after user interaction might occur
          integrity="sha384-C6RzsynM9kWDrMNeT87bh5OGNyZPhcTNXj1NW7RuSyN/o0jlpcV8Qyq46cDfL"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}