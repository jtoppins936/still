
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const SacredRituals = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page since feature is removed
    navigate("/");
  }, [navigate]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-sage-800 mb-6">Sacred Rituals</h1>
      <p className="text-gray-600 mb-8">
        This feature has been temporarily removed.
      </p>
      <Button onClick={() => navigate("/")} className="bg-sage-600 hover:bg-sage-700">
        Return Home
      </Button>
    </div>
  );
};

export default SacredRituals;
