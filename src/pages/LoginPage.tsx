import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

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

// Mock database for authentication demo
const MOCK_USERS = [
  {
    email: "student@example.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
    userType: "student"
  },
  {
    email: "teacher@example.com",
    password: "teacher123",
    firstName: "Jane",
    lastName: "Smith",
    userType: "teacher"
  }
];

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("signup") === "true" ? "signup" : "login";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [userType, setUserType] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form state for login
  const [loginCredentials, setLoginCredentials] = useState<UserCredentials>({
    email: "",
    password: ""
  });

  // Form errors for login
  const [loginErrors, setLoginErrors] = useState({
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

  // Form errors for signup
  const [signupErrors, setSignupErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated on mount
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    // Update the userType in signup details when it changes
    setSignupDetails(prev => ({
      ...prev,
      userType
    }));
  }, [userType]);

  // Load registered users from localStorage
  const getRegisteredUsers = (): UserDetails[] => {
    const usersJson = localStorage.getItem("registeredUsers");
    return usersJson ? JSON.parse(usersJson) : [];
  };

  // Save registered users to localStorage
  const saveRegisteredUser = (user: UserDetails) => {
    const currentUsers = getRegisteredUsers();
    const updatedUsers = [...currentUsers, user];
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
  };

  // Validation functions
  const validateEmail = (email: string): string => {
    if (!email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password: string, isSignup: boolean = false): string => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters long";
    if (isSignup && !/(?=.*[a-z])(?=.*[A-Z])|(?=.*[0-9])/.test(password)) {
      return "Password should have a mix of letters and numbers";
    }
    return "";
  };

  const validateName = (name: string, field: string): string => {
    if (!name) return `${field} is required`;
    if (name.length < 2) return `${field} must be at least 2 characters long`;
    return "";
  };

  // Handle login form inputs
  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginCredentials(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors on input change
    if (name === "email") {
      setLoginErrors(prev => ({ ...prev, email: validateEmail(value) }));
    } else if (name === "password") {
      setLoginErrors(prev => ({ ...prev, password: validatePassword(value) }));
    }
  };

  // Handle signup form inputs
  const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSignupDetails(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors on input change
    switch (name) {
      case "firstName":
        setSignupErrors(prev => ({ ...prev, firstName: validateName(value, "First name") }));
        break;
      case "lastName":
        setSignupErrors(prev => ({ ...prev, lastName: validateName(value, "Last name") }));
        break;
      case "email":
        setSignupErrors(prev => ({ ...prev, email: validateEmail(value) }));
        break;
      case "password":
        setSignupErrors(prev => ({ ...prev, password: validatePassword(value, true) }));
        break;
      default:
        break;
    }
  };

  // Handle login submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form inputs
    const emailError = validateEmail(loginCredentials.email);
    const passwordError = validatePassword(loginCredentials.password);
    
    setLoginErrors({
      email: emailError,
      password: passwordError
    });
    
    if (emailError || passwordError) {
      return;
    }
    
    setIsLoading(true);
    
    // Check if email exists in registered users
    const registeredUsers = getRegisteredUsers();
    const user = registeredUsers.find(user => user.email === loginCredentials.email);
    
    setTimeout(() => {
      if (!user) {
        setLoginErrors(prev => ({ ...prev, email: "This email is not registered yet, please choose sign up option" }));
        setIsLoading(false);
        return;
      }
      
      if (user.password !== loginCredentials.password) {
        setLoginErrors(prev => ({ ...prev, password: "Incorrect password" }));
        setIsLoading(false);
        return;
      }
      
      // Successful login
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        education: user.education
      }));
      
      toast({
        title: "Welcome back!",
        description: `Successfully logged in as ${user.firstName}`,
        variant: "success"
      });
      
      setIsLoading(false);
      navigate("/", { replace: true });
    }, 1000);
  };

  // Handle sign up submission
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form inputs
    const firstNameError = validateName(signupDetails.firstName, "First name");
    const lastNameError = validateName(signupDetails.lastName, "Last name");
    const emailError = validateEmail(signupDetails.email);
    const passwordError = validatePassword(signupDetails.password, true);
    
    setSignupErrors({
      firstName: firstNameError,
      lastName: lastNameError,
      email: emailError,
      password: passwordError
    });
    
    if (firstNameError || lastNameError || emailError || passwordError) {
      return;
    }
    
    setIsLoading(true);
    
    // Check if email is already registered
    const registeredUsers = getRegisteredUsers();
    const existingUser = registeredUsers.find(user => user.email === signupDetails.email);
    
    setTimeout(() => {
      if (existingUser) {
        setSignupErrors(prev => ({ ...prev, email: "This email is already registered, please log in instead" }));
        setIsLoading(false);
        return;
      }
      
      // Store the new user in localStorage
      saveRegisteredUser(signupDetails);
      
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
        description: "Your account has been created successfully",
        variant: "success"
      });
      
      setIsLoading(false);
      navigate("/", { replace: true });
    }, 1000);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
      </div>
      
      <div className="max-w-md w-full px-8 py-10 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Welcome to Learn Smart
        </h1>
        
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`pb-4 px-6 font-medium text-lg flex-1 transition-colors ${
              activeTab === "login"
                ? "border-b-2 border-indigo-600 text-indigo-600 font-semibold"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`pb-4 px-6 font-medium text-lg flex-1 transition-colors ${
              activeTab === "signup"
                ? "border-b-2 border-indigo-600 text-indigo-600 font-semibold"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {activeTab === "login" ? (
          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="Enter your email" 
                  className={`pl-10 ${loginErrors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  value={loginCredentials.email}
                  onChange={handleLoginInputChange}
                />
              </div>
              {loginErrors.email && <p className="text-red-500 text-sm">{loginErrors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input 
                  id="password" 
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password" 
                  className={`pl-10 ${loginErrors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  value={loginCredentials.password}
                  onChange={handleLoginInputChange}
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {loginErrors.password && <p className="text-red-500 text-sm">{loginErrors.password}</p>}
            </div>
            
            <Button 
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="relative flex items-center justify-center mt-6 mb-4">
              <hr className="w-full border-gray-300" />
              <span className="absolute bg-white px-3 text-sm text-gray-500">or continue with</span>
            </div>

            <Button 
              variant="outline" 
              className="w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium"
              type="button"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              Continue with Google
            </Button>
          </form>
        ) : (
          <form className="space-y-5" onSubmit={handleSignup}>
            <div className="space-y-4">
              <Label className="text-gray-700">I am a</Label>
              <RadioGroup defaultValue="student" value={userType} onValueChange={setUserType} className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 bg-white/70 px-4 py-2 rounded-lg border border-gray-200">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="cursor-pointer">Student</Label>
                </div>
                <div className="flex items-center space-x-2 bg-white/70 px-4 py-2 rounded-lg border border-gray-200">
                  <RadioGroupItem value="parent" id="parent" />
                  <Label htmlFor="parent" className="cursor-pointer">Parent</Label>
                </div>
                <div className="flex items-center space-x-2 bg-white/70 px-4 py-2 rounded-lg border border-gray-200">
                  <RadioGroupItem value="teacher" id="teacher" />
                  <Label htmlFor="teacher" className="cursor-pointer">Teacher</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                <Input 
                  id="firstName" 
                  name="firstName"
                  placeholder="First Name" 
                  className={signupErrors.firstName ? 'border-red-500 focus-visible:ring-red-500' : ''}
                  value={signupDetails.firstName}
                  onChange={handleSignupInputChange}
                />
                {signupErrors.firstName && <p className="text-red-500 text-sm">{signupErrors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                <Input 
                  id="lastName" 
                  name="lastName"
                  placeholder="Last Name" 
                  className={signupErrors.lastName ? 'border-red-500 focus-visible:ring-red-500' : ''}
                  value={signupDetails.lastName}
                  onChange={handleSignupInputChange}
                />
                {signupErrors.lastName && <p className="text-red-500 text-sm">{signupErrors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email" className="text-gray-700">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input 
                  id="signup-email" 
                  name="email"
                  type="email" 
                  placeholder="Enter your email" 
                  className={`pl-10 ${signupErrors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  value={signupDetails.email}
                  onChange={handleSignupInputChange}
                />
              </div>
              {signupErrors.email && <p className="text-red-500 text-sm">{signupErrors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-password" className="text-gray-700">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input 
                  id="signup-password" 
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  placeholder="Create a password" 
                  className={`pl-10 ${signupErrors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  value={signupDetails.password}
                  onChange={handleSignupInputChange}
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {signupErrors.password && <p className="text-red-500 text-sm">{signupErrors.password}</p>}
              <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters with a mix of letters and numbers</p>
            </div>

            {userType === "student" && (
              <div className="space-y-2">
                <Label htmlFor="education" className="text-gray-700">Current Education Level</Label>
                <select 
                  id="education" 
                  name="education"
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>

            <div className="relative flex items-center justify-center mt-6 mb-4">
              <hr className="w-full border-gray-300" />
              <span className="absolute bg-white px-3 text-sm text-gray-500">or sign up with</span>
            </div>

            <Button 
              variant="outline" 
              className="w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium"
              type="button"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              Continue with Google
            </Button>

            <p className="text-xs text-center text-gray-500 mt-6">
              By signing up, you agree to our{" "}
              <a href="/terms" className="text-indigo-600 hover:text-indigo-800">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-indigo-600 hover:text-indigo-800">
                Privacy Policy
              </a>
            </p>
          </form>
        )}
      </div>
      
      <p className="mt-8 text-center text-gray-600">
        © {new Date().getFullYear()} Learn Smart. All rights reserved.
      </p>
    </div>
  );
};

export default LoginPage;
