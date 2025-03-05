import React, { Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import Journaling from "@/pages/Journaling";
import Mindfulness from "@/pages/Mindfulness";
import NotFound from "@/pages/NotFound";
import CenteringPrayer from "@/pages/CenteringPrayer";
import ReadingReflection from "@/pages/ReadingReflection";
import GratitudePractice from "@/pages/GratitudePractice";
import { AuthProvider } from "@/components/AuthProvider";
import { PaywallProvider } from "@/components/PaywallProvider";
import { Toaster } from "@/components/ui/toaster";

const ErrorFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <h1 className="text-2xl font-bold text-rose-700 mb-4">Something went wrong</h1>
    <p className="text-gray-600 mb-4">We're experiencing technical difficulties. Please try again later.</p>
  </div>
);

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin"></div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/journal/:type",
    element: <Journaling />,
  },
  {
    path: "/mindfulness",
    element: <Mindfulness />,
  },
  {
    path: "/centering-prayer",
    element: <CenteringPrayer />,
  },
  {
    path: "/reading-reflection",
    element: <ReadingReflection />,
  },
  {
    path: "/gratitude-practice",
    element: <GratitudePractice />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error in app:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <AuthProvider>
            <PaywallProvider>
              <RouterProvider router={router} />
              <Toaster />
            </PaywallProvider>
          </AuthProvider>
        </Suspense>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default App;
