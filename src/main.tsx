
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { seedCenteringPrayer } from './data/seed-centering-prayer.ts';

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
