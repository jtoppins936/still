
import React from 'react';
import { Button } from '@/components/ui/button';

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ 
  error, 
  resetErrorBoundary 
}) => {
  return (
    <div className="p-6 bg-rose-50 border border-rose-100 rounded-lg text-center">
      <h2 className="text-xl font-semibold text-rose-700 mb-3">
        Something went wrong
      </h2>
      <p className="text-gray-600 mb-4">
        We're having trouble loading your centering prayer content.
      </p>
      {error && (
        <p className="text-sm text-gray-500 mb-4">
          Error: {error.message}
        </p>
      )}
      {resetErrorBoundary && (
        <Button 
          onClick={resetErrorBoundary}
          className="bg-rose-600 hover:bg-rose-700"
        >
          Try again
        </Button>
      )}
    </div>
  );
};
