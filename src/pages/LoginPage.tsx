
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
    <div className="min-h-screen bg-gradient-hero py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`pb-4 px-6 font-medium text-lg ${
                activeTab === "login"
                  ? "border-b-2 border-climbup-blue text-climbup-blue"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`pb-4 px-6 font-medium text-lg ${
                activeTab === "signup"
                  ? "border-b-2 border-climbup-blue text-climbup-blue"
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
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="/forgot-password" className="text-sm text-climbup-blue">
                    Forgot password?
                  </a>
                </div>
                <Input id="password" type="password" placeholder="Enter your password" />
              </div>
              <Button className="w-full gradient-button" type="submit">
                Login
              </Button>

              <div className="relative flex items-center justify-center">
                <hr className="w-full border-gray-200" />
                <span className="absolute bg-white px-2 text-sm text-gray-500">OR</span>
              </div>

              <Button variant="outline" className="w-full">
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
                  <Input id="first-name" placeholder="First Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Last Name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="Enter your email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" placeholder="Create a password" />
              </div>

              {userType === "student" && (
                <div className="space-y-2">
                  <Label htmlFor="education">Current Education Level</Label>
                  <select 
                    id="education" 
                    className="w-full h-10 px-3 rounded-md border border-input"
                  >
                    <option value="" disabled selected>Select your education level</option>
                    <option value="10th">10th Grade</option>
                    <option value="12th">12th Grade (Inter)</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="working">Working Professional</option>
                  </select>
                </div>
              )}

              <Button className="w-full gradient-button" type="submit">
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
                <a href="/terms" className="text-climbup-blue">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-climbup-blue">
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
