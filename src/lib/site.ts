// Shared site config — single source of truth for URL, brand name, etc.
// Override SITE_URL at build/deploy time via NEXT_PUBLIC_SITE_URL.

export const siteConfig = {
  name: 'EmergencyFundGuides',
  shortName: 'EmergencyFundGuides',
  description:
    'Free tool for Americans facing a financial emergency. Answer 8 questions in 90 seconds and see every option available — assistance programs, loans, advances, negotiation tactics — ranked for your specific situation.',
  shortDescription:
    'Free analysis for Americans facing a financial emergency. 8 questions, 90 seconds, your real options ranked.',
  url:
    (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')) ||
    'https://emergencyfundguides.com',
  twitter: '@emergencyfundguides',
  publisher: 'EmergencyFundGuides',
};

export const absoluteUrl = (path = '/') => {
  if (!path.startsWith('/')) path = '/' + path;
  return siteConfig.url + path;
};
