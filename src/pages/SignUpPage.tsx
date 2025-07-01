import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NeonCard, NeonButton, NeonTitle } from "@/components/ui/neon-elements";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { auth, googleProvider } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, fetchSignInMethodsForEmail } from "firebase/auth";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        setError("This email is already registered, please sign in instead.");
        setIsLoading(false);
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      toast({ title: "Account created!", description: "Your account has been created successfully", variant: "success" });
      setIsLoading(false);
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || "Sign up failed");
      toast({ title: "Sign up failed", description: err.message, variant: "destructive" });
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast({ title: "Welcome!", description: "Signed up with Google", variant: "success" });
      setIsLoading(false);
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || "Google sign up failed");
      toast({ title: "Google sign up failed", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/90">
      <NeonCard color="yellow" className="max-w-md w-full p-8 flex flex-col items-center">
        <NeonTitle size="xl" color="teal" className="mb-6 text-center">Sign Up for ClimbUp</NeonTitle>
        <form className="w-full space-y-5" onSubmit={handleSignUp}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-neon-teal">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-teal h-5 w-5" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10 bg-black/80 text-white border-neon-teal/30 focus-visible:ring-neon-teal"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-neon-teal">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-teal h-5 w-5" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="pl-10 bg-black/80 text-white border-neon-teal/30 focus-visible:ring-neon-teal"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neon-teal hover:text-white"
                onClick={() => setShowPassword(v => !v)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <NeonButton color="teal" variant="solid" className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Sign Up"}
          </NeonButton>
        </form>
        <div className="w-full flex items-center my-6">
          <div className="flex-1 h-px bg-neon-teal/30" />
          <span className="mx-4 text-neon-teal/70 text-xs">or</span>
          <div className="flex-1 h-px bg-neon-teal/30" />
        </div>
        <NeonButton color="yellow" variant="outline" className="w-full mb-2" onClick={handleGoogleSignIn}>
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1h-9.18v2.92h5.27c-.23 1.25-1.41 3.67-5.27 3.67-3.17 0-5.76-2.62-5.76-5.83s2.59-5.83 5.76-5.83c1.81 0 3.03.77 3.73 1.43l2.55-2.47C16.13 3.6 14.29 2.5 12 2.5 6.76 2.5 2.5 6.76 2.5 12s4.26 9.5 9.5 9.5c5.47 0 9.09-3.85 9.09-9.27 0-.62-.07-1.09-.16-1.63z"/></svg>
          Continue with Google
        </NeonButton>
        <p className="text-sm text-center text-neon-teal/70 mt-4">
          Already have an account? <a href="/signin" className="underline hover:text-neon-teal">Sign In</a>
        </p>
      </NeonCard>
    </div>
  );
};

export default SignUpPage; 