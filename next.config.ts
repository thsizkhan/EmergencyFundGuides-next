import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Trailing slash off — keeps canonical URLs clean and matches sitemap entries.
  trailingSlash: false,
  // Compress is on by default; left here as a reminder for ops.
  compress: true,
};

export default config;
