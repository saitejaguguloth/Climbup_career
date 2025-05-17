
import { useState, useEffect } from 'react';

export type GameCategory = 'all' | 'doctor' | 'developer' | 'ias' | 'engineer' | 'designer' | 'scientist' | 'entrepreneur';

export type GameDifficulty = 'easy' | 'medium' | 'hard';

export interface Game {
  id: string;
  title: string;
  description: string;
  category: GameCategory;
  difficulty: GameDifficulty;
  xpReward: number;
  progress: number;
  completions: number;
  imageUrl: string;
  color: 'yellow' | 'teal' | 'orange';
  skills: string[];
  type: 'quiz' | 'puzzle' | 'simulation' | 'arcade';
  timeRequired: string;
}

// Define the games data
const gamesData: Game[] = [
  // Doctor Games
  {
    id: '1',
    title: 'Diagnose & Decide',
    description: 'Test your diagnostic skills with complex patient cases and make critical decisions under time pressure.',
    category: 'doctor',
    difficulty: 'medium',
    xpReward: 120,
    progress: 60,
    completions: 845,
    imageUrl: '/placeholder.svg',
    color: 'teal',
    skills: ['Diagnosis', 'Decision Making', 'Medical Knowledge'],
    type: 'simulation',
    timeRequired: '15 min'
  },
  {
    id: '2',
    title: 'Anatomy Explorer',
    description: 'Navigate through 3D human anatomy and identify structures correctly to advance.',
    category: 'doctor',
    difficulty: 'hard',
    xpReward: 150,
    progress: 30,
    completions: 412,
    imageUrl: '/placeholder.svg',
    color: 'yellow',
    skills: ['Anatomy', 'Visual Recognition', 'Medical Terminology'],
    type: 'puzzle',
    timeRequired: '12 min'
  },
  
  // Software Developer Games
  {
    id: '3',
    title: 'Code Combat',
    description: 'Solve coding challenges and battle other developers in real-time competitions.',
    category: 'developer',
    difficulty: 'medium',
    xpReward: 130,
    progress: 75,
    completions: 1240,
    imageUrl: '/placeholder.svg',
    color: 'orange',
    skills: ['Problem Solving', 'Algorithms', 'Data Structures'],
    type: 'puzzle',
    timeRequired: '20 min'
  },
  {
    id: '4',
    title: 'Bug Hunter',
    description: 'Find and fix bugs in increasingly complex codebases against the clock.',
    category: 'developer',
    difficulty: 'hard',
    xpReward: 140,
    progress: 45,
    completions: 685,
    imageUrl: '/placeholder.svg',
    color: 'teal',
    skills: ['Debugging', 'Code Reading', 'Attention to Detail'],
    type: 'arcade',
    timeRequired: '15 min'
  },
  {
    id: '5',
    title: 'Architecture Architect',
    description: 'Design system architectures that balance performance, scalability, and maintainability.',
    category: 'developer',
    difficulty: 'hard',
    xpReward: 160,
    progress: 20,
    completions: 325,
    imageUrl: '/placeholder.svg',
    color: 'yellow',
    skills: ['System Design', 'Architecture Planning', 'Technical Analysis'],
    type: 'simulation',
    timeRequired: '25 min'
  },
  
  // IAS Officer Games
  {
    id: '6',
    title: 'Policy Maker',
    description: 'Create and implement policies while balancing stakeholder interests and resource constraints.',
    category: 'ias',
    difficulty: 'medium',
    xpReward: 130,
    progress: 55,
    completions: 490,
    imageUrl: '/placeholder.svg',
    color: 'orange',
    skills: ['Policy Formation', 'Resource Management', 'Stakeholder Analysis'],
    type: 'simulation',
    timeRequired: '20 min'
  },
  {
    id: '7',
    title: 'Crisis Commander',
    description: 'Respond to emergency situations and coordinate resources effectively under pressure.',
    category: 'ias',
    difficulty: 'hard',
    xpReward: 150,
    progress: 40,
    completions: 380,
    imageUrl: '/placeholder.svg',
    color: 'teal',
    skills: ['Crisis Management', 'Decision Making', 'Leadership'],
    type: 'simulation',
    timeRequired: '18 min'
  },
  
  // Engineer Games
  {
    id: '8',
    title: 'Bridge Builder',
    description: 'Design and test bridges under various stress conditions and environmental factors.',
    category: 'engineer',
    difficulty: 'medium',
    xpReward: 120,
    progress: 70,
    completions: 765,
    imageUrl: '/placeholder.svg',
    color: 'yellow',
    skills: ['Structural Analysis', 'Material Science', 'Physics Application'],
    type: 'simulation',
    timeRequired: '15 min'
  },
  {
    id: '9',
    title: 'JEE Speed Quiz',
    description: 'Test your knowledge of engineering concepts with rapid-fire questions in JEE format.',
    category: 'engineer',
    difficulty: 'hard',
    xpReward: 140,
    progress: 50,
    completions: 920,
    imageUrl: '/placeholder.svg',
    color: 'orange',
    skills: ['Engineering Fundamentals', 'Quick Calculations', 'Time Management'],
    type: 'quiz',
    timeRequired: '10 min'
  },
  
  // Designer Games
  {
    id: '10',
    title: 'Color Theory Challenge',
    description: 'Match and create harmonious color schemes for different design briefs and contexts.',
    category: 'designer',
    difficulty: 'easy',
    xpReward: 100,
    progress: 85,
    completions: 830,
    imageUrl: '/placeholder.svg',
    color: 'teal',
    skills: ['Color Theory', 'Visual Design', 'Aesthetic Judgment'],
    type: 'puzzle',
    timeRequired: '8 min'
  },
  {
    id: '11',
    title: 'UI Speed Design',
    description: 'Design user interfaces against the clock while maintaining usability standards.',
    category: 'designer',
    difficulty: 'medium',
    xpReward: 120,
    progress: 60,
    completions: 510,
    imageUrl: '/placeholder.svg',
    color: 'yellow',
    skills: ['UI Design', 'Layout Composition', 'Visual Hierarchy'],
    type: 'arcade',
    timeRequired: '15 min'
  },
  
  // Scientist Games
  {
    id: '12',
    title: 'Lab Master',
    description: 'Conduct virtual experiments and analyze results to reach scientific conclusions.',
    category: 'scientist',
    difficulty: 'medium',
    xpReward: 130,
    progress: 45,
    completions: 370,
    imageUrl: '/placeholder.svg',
    color: 'orange',
    skills: ['Experimental Design', 'Data Analysis', 'Scientific Method'],
    type: 'simulation',
    timeRequired: '22 min'
  },
  {
    id: '13',
    title: 'Theory Crafter',
    description: 'Develop scientific theories based on evidence and defend them against peer review.',
    category: 'scientist',
    difficulty: 'hard',
    xpReward: 150,
    progress: 30,
    completions: 240,
    imageUrl: '/placeholder.svg',
    color: 'teal',
    skills: ['Theory Development', 'Critical Thinking', 'Scientific Writing'],
    type: 'simulation',
    timeRequired: '25 min'
  },
  
  // Entrepreneur Games
  {
    id: '14',
    title: 'Startup Simulator',
    description: 'Launch and grow a virtual startup while making key business decisions.',
    category: 'entrepreneur',
    difficulty: 'medium',
    xpReward: 130,
    progress: 65,
    completions: 650,
    imageUrl: '/placeholder.svg',
    color: 'yellow',
    skills: ['Business Strategy', 'Resource Allocation', 'Market Analysis'],
    type: 'simulation',
    timeRequired: '20 min'
  },
  {
    id: '15',
    title: 'Pitch Perfect',
    description: 'Create and deliver compelling business pitches to virtual investors.',
    category: 'entrepreneur',
    difficulty: 'medium',
    xpReward: 120,
    progress: 50,
    completions: 430,
    imageUrl: '/placeholder.svg',
    color: 'orange',
    skills: ['Presentation', 'Business Communication', 'Persuasion'],
    type: 'simulation',
    timeRequired: '15 min'
  }
];

export const useGamesData = (initialCategory: GameCategory = 'all', initialFilter: string = 'newest') => {
  const [category, setCategory] = useState<GameCategory>(initialCategory);
  const [filterBy, setFilterBy] = useState<string>(initialFilter);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  
  useEffect(() => {
    let result = [...gamesData];
    
    // Filter by category
    if (category !== 'all') {
      result = result.filter(game => game.category === category);
    }
    
    // Apply sorting
    switch (filterBy) {
      case 'newest':
        // For demo purposes, we'll just reverse the array to simulate "newest"
        result = [...result].reverse();
        break;
      case 'mostPlayed':
        result = [...result].sort((a, b) => b.completions - a.completions);
        break;
      case 'difficulty':
        result = [...result].sort((a, b) => {
          const difficultyOrder: Record<GameDifficulty, number> = {
            easy: 1,
            medium: 2,
            hard: 3
          };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        });
        break;
      default:
        break;
    }
    
    setFilteredGames(result);
  }, [category, filterBy]);
  
  return {
    games: filteredGames,
    totalGames: gamesData.length,
    setCategory,
    category,
    setFilterBy,
    filterBy
  };
};
