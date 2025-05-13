
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";

interface UserCredentials {
  email: string;
  password: string;
}

interface UserDetails extends UserCredentials {
  firstName: string;
  lastName: string;
  userType: string;
  education?: string;
}

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("signup") === "true" ? "signup" : "login";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [userType, setUserType] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state for login
  const [loginCredentials, setLoginCredentials] = useState<UserCredentials>({
    email: "",
    password: ""
  });

  // Form state for signup
  const [signupDetails, setSignupDetails] = useState<UserDetails>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "student",
    education: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Update the userType in signup details when it changes
    setSignupDetails(prev => ({
      ...prev,
      userType
    }));
  }, [userType]);

  // Handle login form inputs
  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle signup form inputs
  const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSignupDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle login submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process with a timeout
    setTimeout(() => {
      // Simple validation
      if (!loginCredentials.email || !loginCredentials.password) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      // In a real app, you would make an API request to authenticate
      // For demo purposes, we'll just simulate a successful login
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify({
        email: loginCredentials.email,
        userType: "student" // Default for demo
      }));
      
      toast({
        title: "Success!",
        description: "You have successfully logged in"
      });
      
      setIsLoading(false);
      navigate("/", { replace: true });
    }, 1500);
  };

  // Handle sign up submission
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup process with a timeout
    setTimeout(() => {
      // Simple validation
      if (!signupDetails.firstName || !signupDetails.lastName || !signupDetails.email || !signupDetails.password) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      // In a real app, you would make an API request to create the account
      // For demo purposes, we'll just simulate a successful signup
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify({
        firstName: signupDetails.firstName,
        lastName: signupDetails.lastName,
        email: signupDetails.email,
        userType: signupDetails.userType,
        education: signupDetails.education
      }));
      
      toast({
        title: "Account created!",
        description: "Your account has been created successfully"
      });
      
      setIsLoading(false);
      navigate("/", { replace: true });
    }, 1500);
  };

  // Handle Google sign-in
  const handleGoogleSignIn = () => {
    // In a real app, this would trigger Google OAuth flow
    toast({
      description: "Google sign-in would be triggered here (demo)"
    });
  };

  return (
    <div className="min-h-screen py-16 relative">
      {/* Blurry background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/50 animate-fade-in">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`pb-4 px-6 font-medium text-lg ${
                activeTab === "login"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`pb-4 px-6 font-medium text-lg ${
                activeTab === "signup"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </button>
          </div>

          {activeTab === "login" ? (
            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white border-gray-200"
                  value={loginCredentials.email}
                  onChange={handleLoginInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  name="password"
                  type="password" 
                  placeholder="Enter your password" 
                  className="bg-white border-gray-200"
                  value={loginCredentials.password}
                  onChange={handleLoginInputChange}
                  required
                />
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <div className="relative flex items-center justify-center">
                <hr className="w-full border-gray-200" />
                <span className="absolute bg-white px-2 text-sm text-gray-500">OR</span>
              </div>

              <Button 
                variant="outline" 
                className="w-full bg-white"
                type="button"
                onClick={handleGoogleSignIn}
              >
                Continue with Google
              </Button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleSignup}>
              <div className="space-y-4">
                <Label>I am a</Label>
                <RadioGroup defaultValue="student" value={userType} onValueChange={setUserType} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student" className="cursor-pointer">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="parent" id="parent" />
                    <Label htmlFor="parent" className="cursor-pointer">Parent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="teacher" id="teacher" />
                    <Label htmlFor="teacher" className="cursor-pointer">Teacher</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    name="firstName"
                    placeholder="First Name" 
                    className="bg-white border-gray-200"
                    value={signupDetails.firstName}
                    onChange={handleSignupInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    name="lastName"
                    placeholder="Last Name" 
                    className="bg-white border-gray-200"
                    value={signupDetails.lastName}
                    onChange={handleSignupInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input 
                  id="signup-email" 
                  name="email"
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white border-gray-200"
                  value={signupDetails.email}
                  onChange={handleSignupInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input 
                  id="signup-password" 
                  name="password"
                  type="password" 
                  placeholder="Create a password" 
                  className="bg-white border-gray-200"
                  value={signupDetails.password}
                  onChange={handleSignupInputChange}
                  required
                />
              </div>

              {userType === "student" && (
                <div className="space-y-2">
                  <Label htmlFor="education">Current Education Level</Label>
                  <select 
                    id="education" 
                    name="education"
                    className="w-full h-10 px-3 rounded-md border border-gray-200 bg-white"
                    value={signupDetails.education}
                    onChange={handleSignupInputChange}
                    required={userType === "student"}
                  >
                    <option value="" disabled>Select your education level</option>
                    <option value="10th">10th Grade</option>
                    <option value="12th_science">12th Grade (Science)</option>
                    <option value="12th_commerce">12th Grade (Commerce)</option>
                    <option value="12th_arts">12th Grade (Arts)</option>
                    <option value="btech">BTech/BE</option>
                    <option value="bsc">BSc</option>
                    <option value="bcom">BCom</option>
                    <option value="ba">BA</option>
                    <option value="bpharm">Pharmacy (BPharm)</option>
                    <option value="diploma">Diploma</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              )}

              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Creating your account..." : "Sign Up"}
              </Button>

              <div className="relative flex items-center justify-center">
                <hr className="w-full border-gray-200" />
                <span className="absolute bg-white px-2 text-sm text-gray-500">OR</span>
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                type="button" 
                onClick={handleGoogleSignIn}
              >
                Sign Up with Google
              </Button>

              <p className="text-sm text-center text-gray-500">
                By signing up, you agree to our{" "}
                <a href="/terms" className="text-blue-600 hover:text-blue-800">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
