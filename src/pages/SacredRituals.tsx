
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SacredRitualsProgram } from "@/components/sacred-rituals/SacredRitualsProgram";
import { useAuth } from "@/components/AuthProvider";

const SacredRituals = () => {
  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/auth');
    }
  }, [session, navigate]);

  if (!session) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-sage-800 mb-6">Sacred Rituals</h1>
      <p className="text-gray-600 mb-8">
        This 30-day program guides you through sacred rituals that combine art, music, and tea ceremonies
        to create moments of profound connection and spiritual renewal.
      </p>
      
      <SacredRitualsProgram />
    </div>
  );
};

export default SacredRituals;
