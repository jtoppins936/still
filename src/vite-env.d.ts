
/// <reference types="vite/client" />

// Chrome extension API types
interface Window {
  chrome?: {
    runtime?: {
      sendMessage: (
        message: any,
        callback?: (response: any) => void
      ) => void;
    };
  };
}
