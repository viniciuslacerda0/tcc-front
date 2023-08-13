import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true, // Source map generation must be turned on
  },
  plugins: [react({
    include: '**/*.{jsx,tsx}',
    babel: {
      presets: ['@babel/preset-typescript'],
    },
  }), eslintPlugin(), tsconfigPaths(), eslint(), sentryVitePlugin({
    org: "personal-nsv",
    project: "tcc-front",
    authToken: process.env.SENTRY_AUTH_TOKEN,
  })],
});
