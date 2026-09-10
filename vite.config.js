import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Το site εξυπηρετείται πλέον από το www.normasa.gr (custom domain), οπότε
  // τρέχει στη ρίζα του domain και όχι σε subpath — base πρέπει να είναι "/".
  base: "/",
});