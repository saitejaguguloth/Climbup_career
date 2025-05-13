
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Facebook, Instagram, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Logo />
            <p className="mt-4 text-gray-600 text-sm">
              Helping students discover and follow their ideal career path with personalized roadmaps and expert guidance.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-500 hover:text-climbup-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-climbup-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-climbup-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-climbup-blue transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-climbup-blue transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-bold text-gray-900 mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-climbup-blue transition-colors">Home</Link></li>
              <li><Link to="/roadmap" className="text-gray-600 hover:text-climbup-blue transition-colors">Roadmaps</Link></li>
              <li><Link to="/quiz" className="text-gray-600 hover:text-climbup-blue transition-colors">Career Quiz</Link></li>
              <li><Link to="/mentors" className="text-gray-600 hover:text-climbup-blue transition-colors">Mentors</Link></li>
              <li><Link to="/community" className="text-gray-600 hover:text-climbup-blue transition-colors">Community</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-bold text-gray-900 mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/resources" className="text-gray-600 hover:text-climbup-blue transition-colors">Resources</Link></li>
              <li><Link to="/webinars" className="text-gray-600 hover:text-climbup-blue transition-colors">Webinars</Link></li>
              <li><Link to="/internships" className="text-gray-600 hover:text-climbup-blue transition-colors">Internships</Link></li>
              <li><Link to="/scholarships" className="text-gray-600 hover:text-climbup-blue transition-colors">Scholarships</Link></li>
              <li><Link to="/success-stories" className="text-gray-600 hover:text-climbup-blue transition-colors">Success Stories</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-bold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-climbup-blue transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-climbup-blue transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-climbup-blue transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-climbup-blue transition-colors">Terms of Service</Link></li>
              <li>
                <div className="flex items-center space-x-2 mt-4">
                  <span className="text-gray-600">Language:</span>
                  <select className="bg-white border border-gray-300 rounded-md text-sm py-1 px-2">
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Telugu</option>
                    <option>Tamil</option>
                  </select>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-6 text-center">
          <p className="text-gray-500 text-sm">© 2025 ClimbUp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
