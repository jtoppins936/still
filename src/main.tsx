
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { seedCenteringPrayer } from './data/seed-centering-prayer.ts';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';

console.log('Main.tsx loading - Application startup');
console.log('Current environment:', import.meta.env.MODE);
console.log('Base URL:', import.meta.env.BASE_URL);

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

// Helper function to show error message in case of mounting failures
const showErrorMessage = (message) => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `<div style="padding: 20px; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 5px; margin: 20px;">
      <h2>Application Error</h2>
      <p>${message}</p>
      <p>Please try refreshing the page. If the problem persists, contact support.</p>
    </div>`;
  }
};

// React root needs to be executed to trigger the app rendering
const rootElement = document.getElementById('root');
console.log('Root element found:', rootElement ? 'Yes' : 'No');

try {
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
    showErrorMessage('Failed to find root element for mounting the application.');
  }
} catch (error) {
  console.error('Critical error mounting app:', error);
  showErrorMessage(`Failed to initialize application: ${error.message}`);
}
