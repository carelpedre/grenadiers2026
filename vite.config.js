import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Deployed at https://grenadiers2026.com/
// Hosted on DreamHost Shared at /home/carelp/grenadiers2026.com/
export default defineConfig({
  plugins: [react()],
  base: "/",
});
