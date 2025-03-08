
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.stillapp.ios',
  appName: 'Still',
  webDir: 'dist',
  server: {
    url: "https://a4d670b8-7a97-470a-9626-1512f766646f.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  ios: {
    path: 'ios',
    scheme: 'Still'
  }
};

export default config;
