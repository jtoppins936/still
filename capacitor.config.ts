
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.stillapp.ios',
  appName: 'Stillness.io',
  webDir: 'dist',
  server: {
    // Remove the specific URL for production builds
    // url: "https://a4d670b8-7a97-470a-9626-1512f766646f.lovableproject.com?forceHideBadge=true",
    // cleartext: true
    androidScheme: 'https'
  },
  ios: {
    path: 'ios',
    scheme: 'Stillness.io',
    // Add the following to improve App Store submissions
    backgroundColor: "#ffffff",
    contentInset: "always",
    preferredContentMode: "mobile",
    minVersion: "14.0", // Minimum iOS version supported
    limitsNavigationsToAppBoundDomains: true // For App Store privacy requirements
  },
  // This ensures the app loads bundled web content instead of trying to fetch from a URL
  bundledWebRuntime: true
};

export default config;
