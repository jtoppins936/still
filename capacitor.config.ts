
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.stillness.io',
  appName: 'Stillness.io',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    iosScheme: 'https'
  },
  ios: {
    path: 'ios',
    scheme: 'Stillness.io',
    backgroundColor: "#ffffff",
    contentInset: "always",
    preferredContentMode: "mobile",
    minVersion: "14.0", 
    limitsNavigationsToAppBoundDomains: true,
    build: {
      automaticProvisioning: true,
      developmentTeam: "YOUR_TEAM_ID" // Replace with your Apple Developer Team ID
    }
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#FFFFFF",
      showSpinner: false,
      spinnerColor: "#8C9F89",
      splashFullScreen: true,
      splashImmersive: true
    }
  },
  bundledWebRuntime: false, // Set to false for production
  loggingBehavior: 'production' // Change to 'production' for release
};

export default config;
