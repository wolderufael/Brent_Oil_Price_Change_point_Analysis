import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  //   root: "src",
  build: {
    rollupOptions: {
      input: "./index.html",
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"], // Explicitly include main dependencies
  },
  server: {
    hot: true, // Ensure HMR is enabled
  },
});