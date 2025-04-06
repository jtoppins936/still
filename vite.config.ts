
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Use base setting optimized for app vs web
  base: mode === 'production' && !process.env.CAPACITOR ? '/stillness.io/' : './',
  // Build optimizations for iOS
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: [
            'lucide-react', 
            '@radix-ui/react-dialog', 
            '@radix-ui/react-toast'
          ],
          capacitor: ['@capacitor/core', '@capacitor/splash-screen']
        }
      }
    },
    // iOS specific optimizations
    chunkSizeWarningLimit: 1000, // Increase warning limit for iOS bundles
    assetsInlineLimit: 10000, // Increase inline limit for better iOS performance
  },
  // Optimize for iOS WebView
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@capacitor/core'],
    esbuildOptions: {
      target: 'es2020', // Target modern iOS versions
    }
  }
}));
