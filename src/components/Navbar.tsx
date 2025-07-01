import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Menu, X, User, LogOut, 
  Home, BookOpen, Gamepad, Trophy, Users, 
  Calendar, MessageSquare, Award, Search, FileEdit, Brain 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  userType: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
    navigate("/signin", { replace: true });
  };

  // Get initials for avatar
  const getUserInitials = () => {
    if (user?.displayName) {
      return user.displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase();
    } else if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  // Main menu items with correct paths
  const menuItems = [
    { title: "Home", icon: Home, url: "/" },
    { title: "Roadmaps", icon: BookOpen, url: "/roadmap" },
    { title: "Career Quiz", icon: Brain, url: "/quiz" },
    { title: "Games", icon: Gamepad, url: "/games" },
    { title: "Challenges", icon: Trophy, url: "/challenges" },
    { title: "Mentors", icon: Users, url: "/mentors" },
    { title: "Planner", icon: Calendar, url: "/planner" },
    { title: "Community", icon: MessageSquare, url: "/community" },
    { title: "Messages", icon: MessageSquare, url: "/messaging" },
    { title: "Leaderboard", icon: Award, url: "/leaderboard" },
    { title: "Careers", icon: Search, url: "/careers" },
    { title: "Portfolio", icon: FileEdit, url: "/portfolio" },
  ];

  return (
    <nav className="w-full bg-black/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="font-display text-2xl font-bold tracking-wider text-neon-yellow neon-shadow-yellow uppercase">
            ClimbUp
          </span>
        </Link>

        {/* Desktop Navigation Menu */}
        <div className="hidden md:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-black/30 text-white hover:bg-white/10 border border-white/10">Key Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px] grid-cols-2 bg-black/90 backdrop-blur-md border border-white/10">
                    {menuItems.slice(0, 6).map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.url}
                            className={cn(
                              "flex items-center space-x-2 rounded-md px-3 py-2 hover:bg-white/10 transition-colors",
                              location.pathname === item.url ? "bg-white/10 text-neon-yellow" : "text-white"
                            )}
                          >
                            <item.icon className="h-4 w-4 text-neon-yellow" />
                            <span>{item.title}</span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-black/30 text-white hover:bg-white/10 border border-white/10">Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px] grid-cols-2 bg-black/90 backdrop-blur-md border border-white/10">
                    {menuItems.slice(6, 12).map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.url}
                            className={cn(
                              "flex items-center space-x-2 rounded-md px-3 py-2 hover:bg-white/10 transition-colors",
                              location.pathname === item.url ? "bg-white/10 text-neon-yellow" : "text-white"
                            )}
                          >
                            <item.icon className="h-4 w-4 text-neon-yellow" />
                            <span>{item.title}</span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full h-10 w-10 p-0 border-2 border-neon-yellow/50 bg-black/50 hover:bg-white/10">
                  <span className="font-medium text-neon-yellow">{getUserInitials()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-black/90 backdrop-blur-md border border-white/10">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-white">{user?.displayName || user?.email}</span>
                    <span className="text-xs text-white/60 font-normal">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer text-white hover:bg-white/10">
                    <User className="mr-2 h-4 w-4 text-neon-yellow" />
                    <span>Edit Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer text-white hover:bg-white/10">
                    <span className="mr-2">⚙️</span>
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-white hover:bg-white/10">
                  <LogOut className="mr-2 h-4 w-4 text-neon-yellow" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" className="text-white hover:bg-white/10 border border-white/20" asChild>
                <Link to="/signin">Login</Link>
              </Button>
              <Button className="bg-neon-yellow/20 text-neon-yellow border border-neon-yellow hover:bg-neon-yellow/30 transition-all duration-300" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 animate-fade-in">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            {menuItems.map((item) => (
              <Link 
                key={item.title}
                to={item.url} 
                className="py-2 flex items-center space-x-2 text-white hover:text-neon-yellow transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-4 w-4 text-neon-yellow" />
                <span>{item.title}</span>
              </Link>
            ))}
            <div className="pt-2 flex flex-col space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 py-2">
                    <div className="h-8 w-8 rounded-full bg-black/50 border border-neon-yellow/30 flex items-center justify-center">
                      <span className="font-medium text-neon-yellow">{getUserInitials()}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-white">{user?.displayName || user?.email}</span>
                      <span className="text-xs text-white/60">{user?.email}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline"
                    className="border-white/10 bg-black/30 text-white hover:bg-white/10"
                    asChild 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/profile">My Profile</Link>
                  </Button>
                  <Button 
                    className="w-full bg-black/30 border border-white/10 text-white hover:bg-white/20" 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4 text-neon-yellow" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="border-white/10 bg-black/30 text-white hover:bg-white/10" asChild>
                    <Link 
                      to="/signin"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </Button>
                  <Button className="bg-neon-yellow/20 text-neon-yellow border border-neon-yellow hover:bg-neon-yellow/30 w-full" asChild>
                    <Link 
                      to="/signup"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
