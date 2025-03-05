
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Leaf } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/AuthProvider";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (session) {
      console.log("User already authenticated, redirecting to home");
      navigate("/");
    }
  }, [session, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign up
        console.log("Attempting to sign up with:", email);
        const { data, error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              // Add any custom user metadata here if needed
            }
          }
        });

        if (error) throw error;

        if (data?.user) {
          console.log("Sign up successful:", data.user.id);
          toast({
            title: "Welcome to Still!",
            description: "Your account has been created successfully.",
          });
          // Navigate to home page after sign up
          navigate("/");
        }
      } else {
        // Sign in
        console.log("Attempting to sign in with:", email);
        const { data, error } = await supabase.auth.signInWithPassword({ 
          email, 
          password 
        });

        if (error) throw error;

        console.log("Sign in successful:", data?.user?.id);
        toast({
          title: "Welcome back!",
          description: "Successfully signed in.",
        });
        navigate("/");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast({
        title: "Error",
        description: error.message || "Authentication failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 bg-white shadow-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-sage-50 rounded-full">
              <Leaf className="w-8 h-8 text-sage-600" />
            </div>
          </div>
          <h1 className="text-2xl font-light text-gray-900 mb-2">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-gray-600">
            {isSignUp
              ? "Begin your journey to mindful living"
              : "Continue your mindful journey"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
              minLength={6}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-sage-600 hover:bg-sage-700 text-white"
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : isSignUp
              ? "Create Account"
              : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sage-600 hover:text-sage-700 text-sm"
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
