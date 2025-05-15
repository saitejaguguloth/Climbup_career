
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Home, BookOpen, Gamepad, Trophy, 
  Users, Calendar, MessageSquare, 
  Award, Search, FileEdit, Brain 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Main menu items with correct paths to the new pages
  const menuItems = [
    { title: "Home", icon: Home, url: "/" },
    { title: "Personalized Roadmaps", icon: BookOpen, url: "/roadmap" },
    { title: "Career Quiz", icon: Brain, url: "/quiz" },
    { title: "Learn by Playing", icon: Gamepad, url: "/games" },
    { title: "Skill Challenges", icon: Trophy, url: "/challenges" },
    { title: "Mentors", icon: Users, url: "/mentors" },
    { title: "My Planner", icon: Calendar, url: "/planner" },
    { title: "Community", icon: MessageSquare, url: "/community" },
    { title: "Messages", icon: MessageSquare, url: "/messaging" },
    { title: "Leaderboard", icon: Award, url: "/leaderboard" },
    { title: "Explore Careers", icon: Search, url: "/careers" },
    { title: "Resume & Portfolio", icon: FileEdit, url: "/portfolio" },
  ];

  return (
    <Sidebar variant="floating" collapsible="icon" className="border-r border-gray-200 w-64">
      <SidebarContent>
        <SidebarGroup>
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
    </Sidebar>
  );
}

export default AppSidebar;
