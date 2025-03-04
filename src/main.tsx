import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { seedCenteringPrayer } from "./data/seed-centering-prayer";

createRoot(document.getElementById("root")!).render(<App />);

// Call seed function
seedCenteringPrayer().catch(console.error);
