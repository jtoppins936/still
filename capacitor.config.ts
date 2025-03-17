
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.stillapp.ios',
  appName: 'Stillness.io',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  ios: {
    path: 'ios',
    scheme: 'Stillness.io',
    backgroundColor: "#ffffff",
    contentInset: "always",
    preferredContentMode: "mobile",
    minVersion: "14.0", 
    limitsNavigationsToAppBoundDomains: true
  },
  // Make sure this is true to use the bundled web content
  bundledWebRuntime: true,
  // Add this to help with debugging
  loggingBehavior: 'debug'
};

export default config;
