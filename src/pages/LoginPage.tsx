
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("signup") === "true" ? "signup" : "login";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [userType, setUserType] = useState("student");

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
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" className="bg-white border-gray-200" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot password?
                  </a>
                </div>
                <Input id="password" type="password" placeholder="Enter your password" className="bg-white border-gray-200" />
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white" type="submit">
                Login
              </Button>

              <div className="relative flex items-center justify-center">
                <hr className="w-full border-gray-200" />
                <span className="absolute bg-white px-2 text-sm text-gray-500">OR</span>
              </div>

              <Button variant="outline" className="w-full bg-white">
                Continue with Google
              </Button>
            </form>
          ) : (
            <form className="space-y-6">
              <div className="space-y-4">
                <Label>I am a</Label>
                <RadioGroup defaultValue="student" onValueChange={setUserType} className="flex space-x-4">
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
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="First Name" className="bg-white border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Last Name" className="bg-white border-gray-200" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="Enter your email" className="bg-white border-gray-200" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" placeholder="Create a password" className="bg-white border-gray-200" />
              </div>

              {userType === "student" && (
                <div className="space-y-2">
                  <Label htmlFor="education">Current Education Level</Label>
                  <select 
                    id="education" 
                    className="w-full h-10 px-3 rounded-md border border-gray-200 bg-white"
                  >
                    <option value="" disabled selected>Select your education level</option>
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

              <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white" type="submit">
                Sign Up
              </Button>

              <div className="relative flex items-center justify-center">
                <hr className="w-full border-gray-200" />
                <span className="absolute bg-white px-2 text-sm text-gray-500">OR</span>
              </div>

              <Button variant="outline" className="w-full">
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
