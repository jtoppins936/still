
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { CenteringPrayerProgram } from "@/components/centering-prayer/CenteringPrayerProgram";
import { Button } from "@/components/ui/button";

const CenteringPrayer = () => {
  const { session } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-rose-800 mb-6">Centering Prayer</h1>
      <p className="text-gray-600 mb-2">
        This 30-day program guides you through centering prayer practices, helping you cultivate 
        inner stillness and a deeper connection with the divine through contemplative prayer.
      </p>
      <div className="mb-8">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-rose-100 text-rose-700 rounded-full">
          Testing Mode - Premium Feature Available
        </span>
      </div>
      
      {!session ? (
        <div className="text-center py-12 bg-rose-50 rounded-lg">
          <h2 className="text-xl font-medium mb-4">Sign in to begin your centering prayer practice</h2>
          <Button onClick={() => navigate("/auth")} className="bg-rose-600 hover:bg-rose-700">
            Sign In
          </Button>
        </div>
      ) : (
        <CenteringPrayerProgram />
      )}
    </div>
  );
};

export default CenteringPrayer;
