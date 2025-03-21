
interface CapacitorInterface {
  isNativePlatform(): boolean;
  getPlatform(): string;
}

interface SplashScreenInterface {
  hide(): Promise<void>;
  show(): Promise<void>;
}

interface Window {
  Capacitor?: {
    isNativePlatform: () => boolean;
    getPlatform: () => string;
    isPluginAvailable: (name: string) => boolean;
  };
}

declare module '@capacitor/splash-screen' {
  export const SplashScreen: SplashScreenInterface;
}
