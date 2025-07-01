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
    },

    // Entrepreneur Games
    {
      id: "startup-strategist",
      title: "Startup Strategist",
      description: "Design and launch a virtual startup. Make critical decisions on funding, marketing, product development, and team building to achieve profitability and growth.",
      type: "simulation",
      difficulty: "medium",
      category: "entrepreneur",
      skills: ["Business Acumen", "Marketing", "Financial Planning", "Leadership", "Problem Solving"],
      timeRequired: "45-60 min",
      xpReward: 300,
      progress: 65,
      completions: 12345,
      color: "yellow"
    },
    {
      id: "marketplace-magnate",
      title: "Marketplace Magnate",
      description: "Simulate managing a complex e-commerce platform. Optimize supply chains, customer service, and pricing strategies to dominate the market.",
      type: "simulation",
      difficulty: "hard",
      category: "entrepreneur",
      skills: ["E-commerce", "Logistics", "Customer Relations", "Data Analysis", "Negotiation"],
      timeRequired: "60+ min",
      xpReward: 450,
      progress: 40,
      completions: 8765,
      color: "orange"
    },

    // Doctor/Healthcare Games
    {
      id: "medical-diagnostician",
      title: "Medical Diagnostician",
      description: "Analyze patient symptoms, medical history, and lab results to accurately diagnose diseases and recommend treatment plans.",
      type: "simulation",
      difficulty: "medium",
      category: "doctor",
      skills: ["Critical Thinking", "Anatomy", "Physiology", "Problem Solving", "Data Interpretation"],
      timeRequired: "30-45 min",
      xpReward: 280,
      progress: 70,
      completions: 15123,
      color: "teal"
    },
    {
      id: "epidemic-tracker",
      title: "Epidemic Tracker",
      description: "Take on the role of a public health professional. Track the spread of infectious diseases, implement containment measures, and develop vaccination strategies to protect the population.",
      type: "simulation",
      difficulty: "hard",
      category: "doctor",
      skills: ["Epidemiology", "Statistics", "Public Health", "Decision Making", "Resource Management"],
      timeRequired: "50-70 min",
      xpReward: 420,
      progress: 35,
      completions: 6789,
      color: "orange"
    },

    // Software Developer Games
    {
      id: "bug-bounty-hunter",
      title: "Bug Bounty Hunter",
      description: "Examine lines of code to identify and fix logical errors, security vulnerabilities, and performance bottlenecks in various programming languages.",
      type: "simulation",
      difficulty: "medium",
      category: "developer",
      skills: ["Debugging", "Coding", "Logic", "Problem Solving", "Attention to Detail"],
      timeRequired: "25-40 min",
      xpReward: 270,
      progress: 75,
      completions: 20456,
      color: "teal"
    },
    {
      id: "algorithm-architect",
      title: "Algorithm Architect",
      description: "Design and optimize algorithms for complex computational problems, focusing on efficiency, scalability, and correctness.",
      type: "simulation",
      difficulty: "hard",
      category: "developer",
      skills: ["Algorithms", "Data Structures", "Problem Solving", "Programming", "Optimization"],
      timeRequired: "45-60 min",
      xpReward: 400,
      progress: 55,
      completions: 10987,
      color: "orange"
    },

    // IAS Officer/Public Service Games
    {
      id: "policy-maker-sim",
      title: "Policy Maker Simulator",
      description: "Draft and implement public policies addressing societal issues. Balance stakeholder interests, resource allocation, and ethical considerations to achieve positive outcomes.",
      type: "simulation",
      difficulty: "medium",
      category: "ias",
      skills: ["Public Administration", "Governance", "Ethics", "Decision Making", "Stakeholder Management"],
      timeRequired: "40-55 min",
      xpReward: 320,
      progress: 60,
      completions: 9876,
      color: "yellow"
    },
    {
      id: "crisis-management-dispatch",
      title: "Crisis Management Dispatch",
      description: "Respond to simulated public crises (e.g., natural disasters, civil unrest). Coordinate emergency services, manage public communication, and ensure citizen safety.",
      type: "simulation",
      difficulty: "hard",
      category: "ias",
      skills: ["Crisis Management", "Leadership", "Resource Allocation", "Communication", "Stress Management"],
      timeRequired: "60+ min",
      xpReward: 480,
      progress: 30,
      completions: 5432,
      color: "orange"
    },

    // Designer Games
    {
      id: "user-experience-challenge",
      title: "User Experience Challenge",
      description: "Redesign existing interfaces or create new ones based on user feedback and best practices, focusing on usability, accessibility, and aesthetics.",
      type: "simulation",
      difficulty: "medium",
      category: "designer",
      skills: ["UI/UX Design", "User Research", "Wireframing", "Prototyping", "Empathy"],
      timeRequired: "30-45 min",
      xpReward: 260,
      progress: 72,
      completions: 18765,
      color: "teal"
    },
    {
      id: "brand-identity-creator",
      title: "Brand Identity Creator",
      description: "Develop a complete brand identity, including logo, color palette, typography, and visual guidelines, for a fictional company or product.",
      type: "simulation",
      difficulty: "hard",
      category: "designer",
      skills: ["Graphic Design", "Branding", "Creativity", "Visual Communication", "Marketing Principles"],
      timeRequired: "45-60 min",
      xpReward: 390,
      progress: 48,
      completions: 7654,
      color: "orange"
    },

    // Scientist Games
    {
      id: "lab-experiment-simulator",
      title: "Lab Experiment Simulator",
      description: "Conduct virtual experiments, formulate hypotheses, analyze data, and draw scientific conclusions in a simulated laboratory environment.",
      type: "simulation",
      difficulty: "medium",
      category: "scientist",
      skills: ["Scientific Method", "Data Analysis", "Hypothesis Testing", "Critical Thinking", "Observation"],
      timeRequired: "35-50 min",
      xpReward: 290,
      progress: 68,
      completions: 14567,
      color: "yellow"
    },
    {
      id: "research-grant-quest",
      title: "Research Grant Quest",
      description: "Write a compelling research proposal, justify experimental design, and secure virtual funding for a cutting-edge scientific project.",
      type: "simulation",
      difficulty: "hard",
      category: "scientist",
      skills: ["Scientific Writing", "Research Design", "Grant Writing", "Persuasion", "Budgeting"],
      timeRequired: "50-70 min",
      xpReward: 430,
      progress: 32,
      completions: 5987,
      color: "teal"
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
