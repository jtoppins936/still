
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { seedCenteringPrayer } from './data/seed-centering-prayer.ts';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';

console.log('Main.tsx loading - Application startup');

// Initialize Capacitor SplashScreen
if (Capacitor.isNativePlatform()) {
  SplashScreen.hide().catch(error => {
    console.error("Error hiding splash screen:", error);
  });
}

// Log detailed environment info
console.log('Environment info:', {
  isNative: Capacitor.isNativePlatform(),
  platform: Capacitor.getPlatform(),
  isPluginAvailable: Capacitor.isPluginAvailable('Device'),
  webDir: 'dist'
});

// Initialize seedCenteringPrayer, but don't let it break the app
try {
  seedCenteringPrayer().catch(error => {
    console.error("Error seeding centering prayer data in main:", error);
  });
} catch (error) {
  console.error("Error calling seedCenteringPrayer in main:", error);
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 1000,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// React root needs to be executed to trigger the app rendering
const rootElement = document.getElementById('root');
console.log('Root element found:', rootElement ? 'Yes' : 'No');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>,
  );
  console.log('React app mounted successfully');
} else {
  console.error('Root element not found - app cannot mount!');
}
