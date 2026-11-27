import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const base = process.env.VITE_BASE || '/';

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'brand/of-logo.png', 'brand/brand-board.png'],
      manifest: {
        name: 'Organic Finishes — Growth Studio',
        short_name: 'OF Growth',
        description:
          'Standalone IG Posts, IG Reels, IG Stories & Strict-SEO Blog Agent for Organic Finishes LLC.',
        theme_color: '#1a2332',
        background_color: '#1a2332',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: base,
        scope: base,
        icons: [
          {
            src: `${base}icon.svg`,
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});
