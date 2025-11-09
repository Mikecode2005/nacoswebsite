import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // THESE 4 LINES FIX 404s ON VERCEL FOREVER
  base: "/",                    // Critical: tells Vite root is "/"
  build: {
    outDir: "dist",             // Vercel looks here
    emptyOutDir: true,
  },
}));