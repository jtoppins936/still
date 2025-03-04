import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import Journaling from "@/pages/Journaling";
import Mindfulness from "@/pages/Mindfulness";
import SacredRituals from "@/pages/SacredRituals";
import NotFound from "@/pages/NotFound";
import CenteringPrayer from "@/pages/CenteringPrayer";

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
    path: "/sacred-rituals",
    element: <SacredRituals />,
  },
  {
    path: "/centering-prayer",
    element: <CenteringPrayer />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
