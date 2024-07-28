import path from "path";
import react from "@vitejs/plugin-react";
import {ManifestOptions, VitePWA} from 'vite-plugin-pwa';
import {defineConfig} from "vite";

const manifest = {
    name: 'Todo PWA App',
    short_name: 'Todo PWA',
    description: 'A Todo PWA application with offline support',
    theme_color: '#ffffff',
    background_color: "#ffffff",
    start_url: "/",
    display: "standalone",
    orientation: "portrait-primary",
    icons: [
        {
            "src": "icons/android/android-launchericon-512-512.png",
            "sizes": "512x512"
        },
        {
            "src": "icons/android/android-launchericon-192-192.png",
            "sizes": "192x192"
        },
        {
            "src": "icons/android/android-launchericon-144-144.png",
            "sizes": "144x144"
        },
        {
            "src": "icons/android/android-launchericon-96-96.png",
            "sizes": "96x96"
        },
        {
            "src": "icons/android/android-launchericon-72-72.png",
            "sizes": "72x72"
        },
        {
            "src": "icons/android/android-launchericon-48-48.png",
            "sizes": "48x48"
        },
        {
            "src": "icons/ios/16.png",
            "sizes": "16x16"
        },
        {
            "src": "icons/ios/20.png",
            "sizes": "20x20"
        },
        {
            "src": "icons/ios/29.png",
            "sizes": "29x29"
        },
        {
            "src": "icons/ios/32.png",
            "sizes": "32x32"
        },
        {
            "src": "icons/ios/40.png",
            "sizes": "40x40"
        },
        {
            "src": "icons/ios/50.png",
            "sizes": "50x50"
        },
        {
            "src": "icons/ios/57.png",
            "sizes": "57x57"
        },
        {
            "src": "icons/ios/58.png",
            "sizes": "58x58"
        },
        {
            "src": "icons/ios/60.png",
            "sizes": "60x60"
        },
        {
            "src": "icons/ios/64.png",
            "sizes": "64x64"
        },
        {
            "src": "icons/ios/72.png",
            "sizes": "72x72"
        },
        {
            "src": "icons/ios/76.png",
            "sizes": "76x76"
        },
        {
            "src": "icons/ios/80.png",
            "sizes": "80x80"
        },
        {
            "src": "icons/ios/87.png",
            "sizes": "87x87"
        },
        {
            "src": "icons/ios/100.png",
            "sizes": "100x100"
        },
        {
            "src": "icons/ios/114.png",
            "sizes": "114x114"
        },
        {
            "src": "icons/ios/120.png",
            "sizes": "120x120"
        },
        {
            "src": "icons/ios/128.png",
            "sizes": "128x128"
        },
        {
            "src": "icons/ios/144.png",
            "sizes": "144x144"
        },
        {
            "src": "icons/ios/152.png",
            "sizes": "152x152"
        },
        {
            "src": "icons/ios/167.png",
            "sizes": "167x167"
        },
        {
            "src": "icons/ios/180.png",
            "sizes": "180x180"
        },
        {
            "src": "icons/ios/192.png",
            "sizes": "192x192"
        },
        {
            "src": "icons/ios/256.png",
            "sizes": "256x256"
        },
        {
            "src": "icons/ios/512.png",
            "sizes": "512x512"
        },
        {
            "src": "icons/ios/1024.png",
            "sizes": "1024x1024"
        }
    ],
    screenshots: [
        {
            src: "screenshots/Screenshot_wide.png",
            type: "image/jpg",
            sizes: "2968x1596",
            form_factor: "wide"
        },
        {
            src: "screenshots/Screenshot_narrow.png",
            type: "image/jpg",
            sizes: "876x1538",
            form_factor: "narrow"
        }
    ]
} as Partial<ManifestOptions>;

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            manifest,
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/firestore\.googleapis\.com\/.*/i,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'firebase-data',
                            expiration: {
                                maxEntries: 200,
                                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                            },
                            networkTimeoutSeconds: 10,
                        },
                    },
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                            },
                        },
                    },
                ],
            }
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
