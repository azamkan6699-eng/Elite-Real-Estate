// ssg.ts
import { ViteSSG } from "vite-ssg";
import App from "./src/App";
import { HelmetProvider } from "react-helmet-async";

export const createApp = ViteSSG(
    App,
    {
        // Yahan apne routes define karein (static & dynamic)
        routes: [
            "/",
            "/about",
            "/al-haseen-residences",
            "/blog",
            "/off-plan",
            "/rental",
            "/secondary",
            "/Testimonials"
        ],
    },
    ({ app }) => {
        // HelmetProvider add karna zaruri hai SEO/meta tags ke liye
        app.use(HelmetProvider);
    }
);
