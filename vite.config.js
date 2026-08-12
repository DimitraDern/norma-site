import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ΣΗΜΑΝΤΙΚΟ: πρέπει να ταιριάζει ΑΚΡΙΒΩΣ με το όνομα του GitHub repository σου.
  // Αν το repo σου δεν λέγεται "norma-site", άλλαξέ το εδώ ανάλογα.
  base: "/norma-site/",
});