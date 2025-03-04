
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { usePaywall } from "@/components/PaywallProvider";
import { CenteringPrayerProgram } from "@/components/centering-prayer/CenteringPrayerProgram";

const CenteringPrayer = () => {
  const { session } = useAuth();
  const { isSubscribed } = usePaywall();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/auth');
    } else if (!isSubscribed) {
      // Redirect to home if not subscribed
      navigate('/');
    }
  }, [session, isSubscribed, navigate]);

  if (!session || !isSubscribed) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-rose-800 mb-6">Centering Prayer</h1>
      <p className="text-gray-600 mb-8">
        This 30-day program guides you through centering prayer practices, helping you cultivate 
        inner stillness and a deeper connection with the divine through contemplative prayer.
      </p>
      
      <CenteringPrayerProgram />
    </div>
  );
};

export default CenteringPrayer;
