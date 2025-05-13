
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Home, BookOpen, Brain, Gamepad, 
  Trophy, UserPlus, Calendar, MessageCircle, 
  Award, Search, FileEdit 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Logo from "./Logo";

export function AppSidebar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Main menu items
  const menuItems = [
    { title: "Home", icon: Home, url: "/" },
    { title: "Personalized Roadmaps", icon: BookOpen, url: "/roadmap" },
    { title: "Career Quiz", icon: Brain, url: "/quiz" },
    { title: "Learn by Playing", icon: Gamepad, url: "/games" },
    { title: "Skill Challenges", icon: Trophy, url: "/challenges" },
    { title: "Mentors", icon: UserPlus, url: "/mentors" },
    { title: "My Planner", icon: Calendar, url: "/planner" },
    { title: "Community", icon: MessageCircle, url: "/community" },
    { title: "Leaderboard", icon: Award, url: "/leaderboard" },
    { title: "Explore Careers", icon: Search, url: "/careers" },
    { title: "Resume & Portfolio", icon: FileEdit, url: "/portfolio" },
  ];

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="flex items-center p-4">
        <Logo />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="text-xs text-gray-500">
          © 2025 ClimbUp
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
