import type { NextConfig } from 'next';

const isGithubPages = process.env.GITHUB_PAGES === 'true';
const githubBasePath = '/Assignment-Cover';

const nextConfig: NextConfig = {
  output: isGithubPages ? 'export' : undefined,
  basePath: isGithubPages ? githubBasePath : '',
  assetPrefix: isGithubPages ? `${githubBasePath}/` : '',
  trailingSlash: isGithubPages,
  images: { unoptimized: true },
  ...(isGithubPages
    ? {}
    : {
        async headers() {
          return [
            {
              source: '/',
              headers: [
                {
                  key: 'Cache-Control',
                  value: 'no-store, no-cache, must-revalidate, max-age=0',
                },
                { key: 'Pragma', value: 'no-cache' },
                { key: 'Expires', value: '0' },
              ],
            },
          ];
        },
      }),
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? githubBasePath : '',
    GITHUB_PAGES: process.env.GITHUB_PAGES || 'false',
  },
};

export default nextConfig;
