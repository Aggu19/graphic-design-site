// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// set this to your current ngrok host (no protocol, no trailing slash/space)
const NGROK_HOST = "3496c0827c41.ngrok-free.app";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    // IMPORTANT: no trailing spaces; hostname only
    allowedHosts: [NGROK_HOST],
    // Make HMR work through ngrok’s HTTPS endpoint
    hmr: {
      host: NGROK_HOST,
      protocol: "wss",
      clientPort: 443,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
}));
