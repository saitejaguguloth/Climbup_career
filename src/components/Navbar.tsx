
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-800 hover:text-climbup-blue transition-colors font-medium">
            Home
          </Link>
          <Link to="/roadmap" className="text-gray-800 hover:text-climbup-blue transition-colors font-medium">
            Roadmaps
          </Link>
          <Link to="/quiz" className="text-gray-800 hover:text-climbup-blue transition-colors font-medium">
            Quiz
          </Link>
          <Link to="/mentors" className="text-gray-800 hover:text-climbup-blue transition-colors font-medium">
            Mentors
          </Link>
          <Link to="/community" className="text-gray-800 hover:text-climbup-blue transition-colors font-medium">
            Community
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button className="gradient-button" asChild>
            <Link to="/login?signup=true">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            <Link 
              to="/" 
              className="py-2 text-gray-800 hover:text-climbup-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/roadmap" 
              className="py-2 text-gray-800 hover:text-climbup-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Roadmaps
            </Link>
            <Link 
              to="/quiz" 
              className="py-2 text-gray-800 hover:text-climbup-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Quiz
            </Link>
            <Link 
              to="/mentors" 
              className="py-2 text-gray-800 hover:text-climbup-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Mentors
            </Link>
            <Link 
              to="/community" 
              className="py-2 text-gray-800 hover:text-climbup-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <div className="pt-2 flex flex-col space-y-2">
              <Button variant="outline" asChild>
                <Link 
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </Button>
              <Button className="gradient-button w-full" asChild>
                <Link 
                  to="/login?signup=true"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
