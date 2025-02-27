
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const AuthButtons = ({ onProfileClick }: { onProfileClick: () => void }) => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Goodbye",
        description: "You have been signed out.",
      });
      navigate("/auth");
    }
  };

  return (
    <div className="absolute top-4 right-4 z-10 flex items-center space-x-4">
      {session ? (
        <>
          <Button
            onClick={onProfileClick}
            variant="outline"
            className="bg-white"
          >
            Profile
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </>
      ) : (
        <Button
          onClick={() => navigate("/auth")}
          variant="outline"
          className="bg-white"
        >
          Sign In
        </Button>
      )}
    </div>
  );
};
