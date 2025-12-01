import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";



export default defineConfig(({ mode }) => {
  const plugins: any[] = [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean);

  //  ADD prerender ONLY in build mode (SSR compatible)
  if (mode === "production") {
    const prerender = require("vite-plugin-prerender").default;

    plugins.push(
      prerender({
        staticDir: "dist",
        routes: [
          "/",
          "/AboutUs",
          "/AlHaseenResidences",
          "/Blog",
          "/BlogPost",
          "/OffPlan",
          "/PrivacyPolicy",
          "/PropertyDetails",
          "/Rental",
          "/Secondary",
          "/TermsConditions",
          "/Testimonials",
        ],
      })
    );
  }

  return {
    base: "/",
    server: {
      host: "::",
      port: 8080,
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
