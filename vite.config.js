import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from 'vite-tsconfig-paths';

const pwaConfig = {
	registerType: "prompt",
	includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
	manifest: {
		name: "Barcode & QR Code Generator",
		short_name: "TM - Barcode & QR",
		description: "Generate barcode and QR code online and offline",
		icons: [
			{
				src: "/pwa-64x64.png",
				sizes: "64x64",
				type: "image/png"
			},
			{
				src: "/pwa-192x192.png",
				sizes: "192x192",
				type: "image/png"
			},
			{
				src: "/pwa-512x512.png",
				sizes: "512x512",
				type: "image/png"
			},
			{
				src: '/pwa-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'any'
			},
			{
				src: "/apple-touch-icon-180x180.png",
				sizes: "180x180",
				type: "image/png",
				purpose: "apple touch icon"
			},
			{
				src: "/maskable-icon-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable"
			}
		],
		theme_color: "#fbbb2f",
		background_color: "#ffffff",
		display: "standalone",
		scope: "/",
		start_url: "/",
		orientation: "portrait"
	}
};

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), VitePWA(pwaConfig), tsconfigPaths()],
});
