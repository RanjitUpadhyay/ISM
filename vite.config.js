import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";//  later I wrote Added to enable React support
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/css/app.css",  // earler here written:input: ['resources/css/app.css', 'resources/js/app.js'],
                "resources/js/app.jsx",   //but instead of 'resources/js/app.js' we have resources/js/app.jsx-> so replace
            ],                           // it with->['resources/css/app.css', 'resources/js/app.jsx']
            refresh: true,
        }),
        react(),    //Enables React Fast Refresh and JSX support
        tailwindcss(),
    ],
});
