
interface CapacitorInterface {
  isNativePlatform(): boolean;
  getPlatform(): string;
}

interface Window {
  Capacitor?: {
    isNativePlatform: () => boolean;
    getPlatform: () => string;
  };
}
