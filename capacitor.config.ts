
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.stillapp.ios',
  appName: 'Stillness.io',
  webDir: 'dist',
  server: {
    url: "https://a4d670b8-7a97-470a-9626-1512f766646f.lovableproject.com?forceHideBadge=true",
    cleartext: true
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
  }
};

export default config;
