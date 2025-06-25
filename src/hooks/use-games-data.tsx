
import { useState, useEffect } from "react";

export interface Game {
  id: string;
  title: string;
  description: string;
  type: "simulation" | "puzzle" | "strategy" | "educational";
  difficulty: "easy" | "medium" | "hard";
  category: string;
  skills: string[];
  timeRequired: string;
  xpReward: number;
  progress: number;
  completions: number;
  color: "yellow" | "teal" | "orange";
}

export const useGamesData = () => {
  const [games] = useState<Game[]>([
    // Engineering Games
    {
      id: "poly-bridge",
      title: "Poly Bridge Engineer",
      description: "Design and build bridges with realistic physics simulation. Learn engineering principles while solving structural challenges.",
      type: "simulation",
      difficulty: "medium",
      category: "engineering",
      skills: ["Problem Solving", "Physics", "Design", "Critical Thinking"],
      timeRequired: "30-45 min",
      xpReward: 250,
      progress: 78,
      completions: 15420,
      color: "yellow"
    },
    {
      id: "rocket-builder",
      title: "Rocket Builder Pro",
      description: "Build and launch rockets in this aerospace engineering simulator. Master orbital mechanics and rocket design.",
      type: "simulation",
      difficulty: "hard",
      category: "engineering",
      skills: ["Aerospace Engineering", "Physics", "Mathematics", "Problem Solving"],
      timeRequired: "60+ min",
      xpReward: 400,
      progress: 45,
      completions: 8950,
      color: "orange"
    },
    {
      id: "circuit-master",
      title: "Circuit Master",
      description: "Design electronic circuits and solve electrical engineering puzzles. Learn about components, current flow, and digital logic.",
      type: "puzzle",
      difficulty: "medium",
      category: "engineering",
      skills: ["Electronics", "Logic", "Circuit Design", "Problem Solving"],
      timeRequired: "20-30 min",
      xpReward: 200,
      progress: 62,
      completions: 12380,
      color: "teal"
    },

    // Medical Games
    {
      id: "hospital-manager",
      title: "Hospital Manager",
      description: "Manage a hospital, treat patients, and make critical medical decisions. Learn about healthcare systems and patient care.",
      type: "simulation",
      difficulty: "hard",
      category: "medical",
      skills: ["Healthcare Management", "Decision Making", "Patient Care", "Leadership"],
      timeRequired: "45-60 min",
      xpReward: 350,
      progress: 33,
      completions: 7240,
      color: "teal"
    },
    {
      id: "surgeon-sim",
      title: "Precision Surgeon",
      description: "Perform virtual surgeries with precision and care. Learn anatomy and surgical procedures in a safe environment.",
      type: "simulation",
      difficulty: "hard",
      category: "medical",
      skills: ["Anatomy", "Precision", "Medical Knowledge", "Concentration"],
      timeRequired: "40-50 min",
      xpReward: 300,
      progress: 28,
      completions: 5690,
      color: "orange"
    },
    {
      id: "bio-lab",
      title: "Bio Research Lab",
      description: "Conduct biological research experiments and discover new treatments. Explore cellular biology and disease mechanisms.",
      type: "educational",
      difficulty: "medium",
      category: "medical",
      skills: ["Biology", "Research", "Analysis", "Scientific Method"],
      timeRequired: "35-45 min",
      xpReward: 280,
      progress: 56,
      completions: 9840,
      color: "yellow"
    },

    // Programming/Tech Games
    {
      id: "code-debugger",
      title: "Code Debugger Challenge",
      description: "Debug complex code and solve programming puzzles. Practice logical thinking and problem-solving skills.",
      type: "puzzle",
      difficulty: "medium",
      category: "technology",
      skills: ["Programming", "Debugging", "Logic", "Problem Solving"],
      timeRequired: "25-35 min",
      xpReward: 220,
      progress: 71,
      completions: 18750,
      color: "teal"
    },
    {
      id: "algorithm-master",
      title: "Algorithm Master",
      description: "Implement efficient algorithms and data structures. Learn computational thinking and optimization techniques.",
      type: "educational",
      difficulty: "hard",
      category: "technology",
      skills: ["Algorithms", "Data Structures", "Optimization", "Computer Science"],
      timeRequired: "50-70 min",
      xpReward: 450,
      progress: 39,
      completions: 6120,
      color: "orange"
    },
    {
      id: "web-architect",
      title: "Web Architect",
      description: "Design and build modern web applications. Learn about frontend, backend, and database integration.",
      type: "simulation",
      difficulty: "medium",
      category: "technology",
      skills: ["Web Development", "UI/UX", "Database Design", "System Architecture"],
      timeRequired: "40-55 min",
      xpReward: 320,
      progress: 67,
      completions: 11230,
      color: "yellow"
    },

    // Business/Management Games
    {
      id: "startup-founder",
      title: "Startup Founder",
      description: "Build a tech startup from scratch. Make strategic decisions, manage resources, and grow your business.",
      type: "simulation",
      difficulty: "hard",
      category: "business",
      skills: ["Entrepreneurship", "Strategy", "Leadership", "Financial Planning"],
      timeRequired: "60+ min",
      xpReward: 400,
      progress: 42,
      completions: 8450,
      color: "orange"
    },
    {
      id: "marketing-campaign",
      title: "Marketing Campaign Manager",
      description: "Create and execute marketing campaigns. Learn about target audiences, messaging, and campaign optimization.",
      type: "strategy",
      difficulty: "medium",
      category: "business",
      skills: ["Marketing", "Analytics", "Creative Thinking", "Data Analysis"],
      timeRequired: "30-40 min",
      xpReward: 250,
      progress: 58,
      completions: 13570,
      color: "teal"
    },
    {
      id: "finance-advisor",
      title: "Financial Advisor Sim",
      description: "Help clients manage their finances and investments. Learn about financial planning and investment strategies.",
      type: "simulation",
      difficulty: "medium",
      category: "business",
      skills: ["Financial Planning", "Investment", "Risk Analysis", "Client Relations"],
      timeRequired: "35-45 min",
      xpReward: 270,
      progress: 64,
      completions: 10890,
      color: "yellow"
    },

    // Design/Creative Games
    {
      id: "ux-designer",
      title: "UX Designer Studio",
      description: "Design user-friendly interfaces and experiences. Learn about user research, wireframing, and usability testing.",
      type: "educational",
      difficulty: "medium",
      category: "design",
      skills: ["UX Design", "User Research", "Prototyping", "Usability Testing"],
      timeRequired: "40-50 min",
      xpReward: 300,
      progress: 73,
      completions: 14620,
      color: "teal"
    },
    {
      id: "architect-builder",
      title: "Architect Builder",
      description: "Design buildings and urban spaces. Learn about architectural principles, sustainability, and space planning.",
      type: "simulation",
      difficulty: "hard",
      category: "design",
      skills: ["Architecture", "Spatial Design", "Sustainability", "Creative Thinking"],
      timeRequired: "55-70 min",
      xpReward: 380,
      progress: 36,
      completions: 7890,
      color: "orange"
    },
    {
      id: "graphic-studio",
      title: "Graphic Design Studio",
      description: "Create visual designs for brands and products. Learn about typography, color theory, and visual communication.",
      type: "educational",
      difficulty: "easy",
      category: "design",
      skills: ["Graphic Design", "Typography", "Color Theory", "Visual Communication"],
      timeRequired: "25-35 min",
      xpReward: 200,
      progress: 85,
      completions: 19240,
      color: "yellow"
    },

    // Science/Research Games
    {
      id: "climate-researcher",
      title: "Climate Research Lab",
      description: "Study climate patterns and environmental changes. Conduct research and propose solutions for climate challenges.",
      type: "educational",
      difficulty: "medium",
      category: "science",
      skills: ["Environmental Science", "Data Analysis", "Research", "Critical Thinking"],
      timeRequired: "45-55 min",
      xpReward: 330,
      progress: 51,
      completions: 9650,
      color: "teal"
    },
    {
      id: "space-explorer",
      title: "Space Mission Control",
      description: "Plan and execute space missions. Learn about astrophysics, orbital mechanics, and space exploration.",
      type: "simulation",
      difficulty: "hard",
      category: "science",
      skills: ["Astrophysics", "Mission Planning", "Problem Solving", "Teamwork"],
      timeRequired: "60+ min",
      xpReward: 420,
      progress: 29,
      completions: 6780,
      color: "orange"
    },
    {
      id: "chemistry-lab",
      title: "Virtual Chemistry Lab",
      description: "Conduct chemical experiments and reactions safely. Learn about molecular structures and chemical processes.",
      type: "educational",
      difficulty: "medium",
      category: "science",
      skills: ["Chemistry", "Laboratory Skills", "Scientific Method", "Safety Protocols"],
      timeRequired: "30-40 min",
      xpReward: 260,
      progress: 69,
      completions: 12450,
      color: "yellow"
    },

    // Government/Civil Service Games
    {
      id: "policy-maker",
      title: "Policy Maker Simulator",
      description: "Create and implement government policies. Learn about governance, public administration, and policy impact.",
      type: "simulation",
      difficulty: "hard",
      category: "government",
      skills: ["Public Policy", "Governance", "Decision Making", "Ethics"],
      timeRequired: "50-65 min",
      xpReward: 360,
      progress: 44,
      completions: 7320,
      color: "teal"
    },
    {
      id: "city-planner",
      title: "Smart City Planner",
      description: "Design sustainable cities and urban infrastructure. Balance economic growth with environmental sustainability.",
      type: "simulation",
      difficulty: "medium",
      category: "government",
      skills: ["Urban Planning", "Sustainability", "Resource Management", "Strategic Thinking"],
      timeRequired: "45-60 min",
      xpReward: 340,
      progress: 56,
      completions: 10120,
      color: "orange"
    },
    {
      id: "diplomat",
      title: "International Diplomat",
      description: "Navigate international relations and diplomatic negotiations. Learn about global politics and conflict resolution.",
      type: "strategy",
      difficulty: "hard",
      category: "government",
      skills: ["Diplomacy", "Negotiation", "International Relations", "Communication"],
      timeRequired: "40-55 min",
      xpReward: 320,
      progress: 38,
      completions: 6890,
      color: "yellow"
    }
  ]);

  const [filteredGames, setFilteredGames] = useState<Game[]>(games);

  const filterGames = (filters: {
    search?: string;
    category?: string;
    difficulty?: string;
    type?: string;
  }) => {
    let filtered = games;

    if (filters.search) {
      filtered = filtered.filter(game => 
        game.title.toLowerCase().includes(filters.search!.toLowerCase()) ||
        game.description.toLowerCase().includes(filters.search!.toLowerCase()) ||
        game.skills.some(skill => skill.toLowerCase().includes(filters.search!.toLowerCase()))
      );
    }

    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter(game => game.category === filters.category);
    }

    if (filters.difficulty && filters.difficulty !== "all") {
      filtered = filtered.filter(game => game.difficulty === filters.difficulty);
    }

    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter(game => game.type === filters.type);
    }

    setFilteredGames(filtered);
  };

  const getGameById = (id: string) => {
    return games.find(game => game.id === id);
  };

  const getGamesByCategory = (category: string) => {
    return games.filter(game => game.category === category);
  };

  const getPopularGames = (limit: number = 6) => {
    return games
      .sort((a, b) => b.completions - a.completions)
      .slice(0, limit);
  };

  const getRecommendedGames = (limit: number = 6) => {
    return games
      .sort((a, b) => (b.xpReward * b.progress) - (a.xpReward * a.progress))
      .slice(0, limit);
  };

  return {
    games,
    filteredGames,
    filterGames,
    getGameById,
    getGamesByCategory,
    getPopularGames,
    getRecommendedGames
  };
};
