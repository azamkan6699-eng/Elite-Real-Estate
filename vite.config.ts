import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const plugins: any[] = [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean);

  return {
    base: "/",
    server: {
      host: "::",
      port: 8080,
      open: true, // browser auto open
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // src folder alias
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
      chunkSizeWarningLimit: 1500,
    },
    esbuild: {
      // optional: to handle JSX properly
      jsxInject: `import React from 'react'`,
    },
  };
});
