import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, BookOpen, Gamepad, Trophy, Users, Calendar, MessageSquare, Award, Search, FileEdit, Brain, LogIn, UserPlus, LogOut, User } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { toast } from "@/hooks/use-toast";
export function AppSidebar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }

    // Handle window resize for mobile detection
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
    navigate("/login", {
      replace: true
    });
  };

  // Main menu items with correct paths
  const menuItems = [{
    title: "Home",
    icon: Home,
    url: "/"
  }, {
    title: "Personalized Roadmaps",
    icon: BookOpen,
    url: "/roadmap"
  }, {
    title: "Career Quiz",
    icon: Brain,
    url: "/quiz"
  }, {
    title: "Learn by Playing",
    icon: Gamepad,
    url: "/games"
  }, {
    title: "Skill Challenges",
    icon: Trophy,
    url: "/challenges"
  }, {
    title: "Mentors",
    icon: Users,
    url: "/mentors"
  }, {
    title: "My Planner",
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
    title: "Explore Careers",
    icon: Search,
    url: "/careers"
  }, {
    title: "Resume & Portfolio",
    icon: FileEdit,
    url: "/portfolio"
  }];
  return <Sidebar variant="floating" collapsible="icon" className="border-r border-gray-200 w-72">
      <div className="p-4 flex justify-center">
        <Logo />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="mt-auto p-4">
        {isAuthenticated ? <div className="space-y-2">
            <div className="flex items-center space-x-2 p-2 bg-zinc-950 mx-[7px] py-px rounded-full px-[20px] my-[11px]">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="font-medium text-blue-700">
                  {user?.firstName?.[0] || user?.email?.[0] || "U"}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.email}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full flex items-center justify-center" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div> : <div className="space-y-2">
            <Button variant="outline" className="w-full flex items-center justify-center" asChild>
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" /> Sign In
              </Link>
            </Button>
            <Button className="w-full flex items-center justify-center" asChild>
              <Link to="/login?signup=true">
                <UserPlus className="mr-2 h-4 w-4" /> Sign Up
              </Link>
            </Button>
          </div>}
      </SidebarFooter>
    </Sidebar>;
}
export default AppSidebar;