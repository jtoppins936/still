
import { useNavigate } from "react-router-dom";
import { SacredRitualsProgram } from "@/components/sacred-rituals/SacredRitualsProgram";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { seedSacredRituals } from "@/data/seed-sacred-rituals";

const SacredRituals = () => {
  const { session } = useAuth();
  const navigate = useNavigate();

  // Seed data on component mount
  useEffect(() => {
    seedSacredRituals();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-sage-800 mb-6">Sacred Rituals</h1>
      <p className="text-gray-600 mb-2">
        This 30-day program guides you through sacred rituals that combine art & expression, 
        music, and tea ceremonies to create moments of profound connection and spiritual renewal.
      </p>
      <div className="mb-8">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-sage-100 text-sage-700 rounded-full">
          Testing Mode - Premium Feature Available
        </span>
      </div>
      
      {!session ? (
        <div className="text-center py-12 bg-sage-50 rounded-lg">
          <h2 className="text-xl font-medium mb-4">Sign in to begin your sacred rituals journey</h2>
          <Button onClick={() => navigate("/auth")} className="bg-sage-600 hover:bg-sage-700">
            Sign In
          </Button>
        </div>
      ) : (
        <SacredRitualsProgram />
      )}
    </div>
  );
};

export default SacredRituals;
