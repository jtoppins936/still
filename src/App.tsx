
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Mindfulness from "./pages/Mindfulness";
import Journaling from "./pages/Journaling";

import { AuthProvider } from "./components/AuthProvider";
import { PaywallProvider } from "./components/PaywallProvider";
import { Toaster } from "./components/ui/toaster";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PaywallProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/mindfulness" element={<Mindfulness />} />
              <Route path="/journaling" element={<Journaling />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </PaywallProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
