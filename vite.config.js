import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

const aliases = {
  "@src": "/src",
  "@components": "/src/components",
  "@hooks": "/src/hooks",
  "@contexts": "/src/contexts",
  "@constants": "/src/constants",
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: aliases
  },
  test: {
    environment: "jsdom",
  },
})
