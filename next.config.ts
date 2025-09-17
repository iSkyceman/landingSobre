import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    };
    return config;
  },
  turbopack: {
    resolveAlias: {
      '@components': 'src/components',
      '@utils': 'src/utils',
      '@hooks': 'src/hooks',
      '@styles': 'src/styles',
    },
  },
};

export default nextConfig;
