
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
    minVersion: "16.0", // Updated to iOS 16
    limitsNavigationsToAppBoundDomains: true,
    build: {
      automaticProvisioning: true,
      developmentTeam: "YOUR_TEAM_ID", // You'll need to replace with your actual Apple Developer Team ID
      backgroundColor: "#ffffff"
    },
    capacitorPreferences: {
      allowBackups: true,
      appUsesLocation: false,
      appUsesLocationAlways: false,
      appUsesLocationWhenInUse: false,
      appUsesNonExemptEncryption: false,
      contentInsetAdjustmentBehavior: "automatic",
      launch: {
        cameraUsageDescription: "This app does not use the camera",
        locationAlwaysAndWhenInUseUsageDescription: "This app does not use location services",
        locationAlwaysUsageDescription: "This app does not use location services",
        locationWhenInUseUsageDescription: "This app does not use location services",
        microphoneUsageDescription: "This app does not use the microphone"
      }
    },
    bitcode: false, // Apple no longer requires bitcode
    entitlements: {
      "com.apple.developer.associated-domains": ["applinks:stillness.io"],
      "com.apple.developer.web-browser-app": true
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
    },
    CapacitorHttp: {
      enabled: true
    },
    CapacitorCookies: {
      enabled: true
    }
  },
  cordova: {},
  bundledWebRuntime: false, // Set to false for production
  loggingBehavior: 'production' // Change to 'production' for release
};

export default config;
