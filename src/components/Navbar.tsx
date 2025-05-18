import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, Home, BookOpen, Gamepad, Trophy, Users, Calendar, MessageSquare, Award, Search, FileEdit, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  userType: string;
}
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // Check if user is authenticated on component mount
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
    navigate("/", {
      replace: true
    });
  };

  // Get initials for avatar
  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    } else if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  // Main menu items with correct paths
  const menuItems = [{
    title: "Home",
    icon: Home,
    url: "/"
  }, {
    title: "Roadmaps",
    icon: BookOpen,
    url: "/roadmap"
  }, {
    title: "Career Quiz",
    icon: Brain,
    url: "/quiz"
  }, {
    title: "Games",
    icon: Gamepad,
    url: "/games"
  }, {
    title: "Challenges",
    icon: Trophy,
    url: "/challenges"
  }, {
    title: "Mentors",
    icon: Users,
    url: "/mentors"
  }, {
    title: "Planner",
    icon: Calendar,
    url: "/planner"
  }, {
    title: "Community",
    icon: MessageSquare,
    url: "/community"
  }, {
    title: "Messages",
    icon: MessageSquare,
    url: "/messaging"
  }, {
    title: "Leaderboard",
    icon: Award,
    url: "/leaderboard"
  }, {
    title: "Careers",
    icon: Search,
    url: "/careers"
  }, {
    title: "Portfolio",
    icon: FileEdit,
    url: "/portfolio"
  }];
  return <nav className="navbar">
      <div className="container flex items-center justify-between px-[34px] py-[15px] my-0 mx-0 rounded-2xl">
        <Link to="/" className="flex items-center">
          <h1 className="font-display text-2xl font-bold tracking-wider text-climbup-heading">
        </h1>
        </Link>

        {/* Desktop Navigation Menu */}
        <div className="hidden md:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-climbup-text hover:text-climbup-heading text-sm font-semibold mx-[10px] my-0 rounded-full">Key Features</NavigationMenuTrigger>
                <NavigationMenuContent className="rounded-md">
                  <ul className="grid gap-3 p-4 w-[400px] grid-cols-2 glass-card rounded-full">
                    {menuItems.slice(0, 6).map(item => <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link to={item.url} className={cn("flex items-center space-x-2 rounded-md px-3 py-2 hover:bg-climbup-heading/20", location.pathname === item.url ? "bg-climbup-heading/20 text-climbup-text" : "text-climbup-text")}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </NavigationMenuLink>
                      </li>)}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-climbup-text hover:text-climbup-heading text-sm font-semibold rounded-full px-[37px]">Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px] grid-cols-2 glass-card">
                    {menuItems.slice(6, 12).map(item => <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link to={item.url} className={cn("flex items-center space-x-2 rounded-md px-3 py-2 hover:bg-climbup-heading/20", location.pathname === item.url ? "bg-climbup-heading/20 text-climbup-text" : "text-climbup-text")}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </NavigationMenuLink>
                      </li>)}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full h-10 w-10 p-0 border-2 border-climbup-heading">
                  <span className="font-medium text-climbup-heading">{getUserInitials()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass-card">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-climbup-heading">{user?.firstName} {user?.lastName}</span>
                    <span className="text-xs text-climbup-text/70 font-normal">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer text-climbup-text hover:text-climbup-heading">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-climbup-text hover:text-climbup-heading">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> : <>
              <Button variant="ghost" asChild className="text-climbup-text hover:text-climbup-heading hover:bg-climbup-component/80">
                <Link to="/login">Login</Link>
              </Button>
              <Button className="bg-gradient-to-r from-climbup-heading to-climbup-text text-climbup-background" asChild>
                <Link to="/login?signup=true">Sign Up</Link>
              </Button>
            </>}
        </div>

        {/* Mobile Navigation Toggle */}
        <button className="md:hidden text-climbup-heading" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && <div className="md:hidden glass-card animate-fade-in">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            {menuItems.map(item => <Link key={item.title} to={item.url} className="py-2 flex items-center space-x-2 text-climbup-text hover:text-climbup-heading transition-colors" onClick={() => setIsMenuOpen(false)}>
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>)}
            <div className="pt-2 flex flex-col space-y-2">
              {isAuthenticated ? <>
                  <div className="flex items-center space-x-2 py-2">
                    <div className="h-8 w-8 rounded-full bg-climbup-heading/20 flex items-center justify-center">
                      <span className="font-medium text-climbup-heading">{getUserInitials()}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-climbup-heading">{user?.firstName} {user?.lastName}</span>
                      <span className="text-xs text-climbup-text/70">{user?.email}</span>
                    </div>
                  </div>
                  <Button variant="outline" asChild className="text-climbup-text border-climbup-text hover:bg-climbup-text/20" onClick={() => setIsMenuOpen(false)}>
                    <Link to="/profile">My Profile</Link>
                  </Button>
                  <Button className="w-full border border-climbup-heading text-climbup-heading hover:bg-climbup-heading/20" variant="outline" onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </> : <>
                  <Button variant="outline" asChild className="text-climbup-heading border-climbup-heading hover:bg-climbup-heading/20">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button className="bg-gradient-to-r from-climbup-heading to-climbup-text text-climbup-background w-full" asChild>
                    <Link to="/login?signup=true" onClick={() => setIsMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </>}
            </div>
          </div>
        </div>}
    </nav>;
};
export default Navbar;