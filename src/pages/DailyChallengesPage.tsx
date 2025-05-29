
import React, { useState } from "react";
import { Zap, Calendar, Trophy, Star, Award, Clock, Users, Play, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { NeonTitle, NeonButton, NeonCard, NeonDivider, NeonIcon } from "@/components/ui/neon-elements";

const DailyChallengesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const dailyChallenges = [
    {
      id: 'dc1',
      title: 'Morning Diagnosis Sprint',
      category: 'Doctor',
      difficulty: 'Medium',
      color: 'teal' as const,
      description: 'Complete 5 quick medical diagnoses in under 3 minutes',
      timeLimit: '3 min',
      xpReward: 150,
      participants: 847,
      progress: 0,
      status: 'available',
      completedToday: 234,
      icon: '🩺'
    },
    {
      id: 'dc2',
      title: 'Code Debugging Marathon',
      category: 'Developer',
      difficulty: 'Hard',
      color: 'orange' as const,
      description: 'Find and fix 10 bugs in different programming languages',
      timeLimit: '15 min',
      xpReward: 200,
      participants: 1205,
      progress: 0,
      status: 'available',
      completedToday: 156,
      icon: '🐛'
    },
    {
      id: 'dc3',
      title: 'Physics Formula Flash',
      category: 'Engineer',
      difficulty: 'Easy',
      color: 'yellow' as const,
      description: 'Solve 20 quick physics problems using key formulas',
      timeLimit: '10 min',
      xpReward: 120,
      participants: 632,
      progress: 0,
      status: 'available',
      completedToday: 298,
      icon: '⚡'
    },
    {
      id: 'dc4',
      title: 'Design Color Theory Quiz',
      category: 'Designer',
      difficulty: 'Medium',
      color: 'teal' as const,
      description: 'Match colors and identify design principles in 5 minutes',
      timeLimit: '5 min',
      xpReward: 130,
      participants: 445,
      progress: 0,
      status: 'available',
      completedToday: 187,
      icon: '🎨'
    },
    {
      id: 'dc5',
      title: 'Business Strategy Blitz',
      category: 'Business',
      difficulty: 'Hard',
      color: 'orange' as const,
      description: 'Analyze market scenarios and make strategic decisions',
      timeLimit: '12 min',
      xpReward: 180,
      participants: 523,
      progress: 0,
      status: 'available',
      completedToday: 142,
      icon: '📊'
    },
    {
      id: 'dc6',
      title: 'Morning Memory Palace',
      category: 'General',
      difficulty: 'Easy',
      color: 'yellow' as const,
      description: 'Memorize and recall 15 items using memory techniques',
      timeLimit: '8 min',
      xpReward: 100,
      participants: 892,
      progress: 0,
      status: 'available',
      completedToday: 367,
      icon: '🧠'
    }
  ];

  const categories = ['all', 'Doctor', 'Developer', 'Engineer', 'Designer', 'Business', 'General'];

  const filteredChallenges = selectedCategory === 'all' 
    ? dailyChallenges 
    : dailyChallenges.filter(challenge => challenge.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-amber-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-muted-foreground';
    }
  };

  const handleStartChallenge = (challengeId: string) => {
    // Open challenge in new tab
    window.open(`/daily-challenge/${challengeId}`, '_blank');
  };

  return (
    <div className="min-h-screen pb-10">
      {/* Hero Section */}
      <div className="relative mb-12 py-12 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-neon-yellow/5 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-neon-teal/5 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-neon-orange/5 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>

        <div className="container mx-auto text-center px-4 relative">
          <div className="flex justify-center mb-6">
            <NeonIcon color="yellow" size="lg">
              <Zap className="h-10 w-10" />
            </NeonIcon>
          </div>
          
          <NeonTitle color="yellow" size="xl" className="mb-4 uppercase tracking-wider">
            Daily Challenges
          </NeonTitle>
          
          <p className="text-white/70 max-w-2xl mx-auto mb-8 text-lg">
            Complete daily challenges to earn extra XP, improve your skills, and compete with others.
            New challenges refresh every 24 hours!
          </p>
          
          <NeonDivider color="yellow" width="1/2" className="mb-8" />
          
          <div className="flex flex-wrap justify-center gap-8 mt-6">
            <div className="flex items-center">
              <div className="bg-white/5 p-2 rounded-full border border-neon-yellow/30">
                <Calendar className="h-5 w-5 text-neon-yellow" />
              </div>
              <span className="ml-2 text-white/80">Daily Refresh</span>
            </div>
            
            <div className="flex items-center">
              <div className="bg-white/5 p-2 rounded-full border border-neon-teal/30">
                <Trophy className="h-5 w-5 text-neon-teal" />
              </div>
              <span className="ml-2 text-white/80">Bonus XP</span>
            </div>
            
            <div className="flex items-center">
              <div className="bg-white/5 p-2 rounded-full border border-neon-orange/30">
                <Star className="h-5 w-5 text-neon-orange" />
              </div>
              <span className="ml-2 text-white/80">Leaderboards</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Filter bar */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`border border-transparent 
                  ${selectedCategory === category 
                    ? "bg-white/10 text-white border-white/20" 
                    : "bg-black/20 hover:border-white/10 hover:bg-black/30 text-white"}`}
                size="sm"
              >
                {category === 'all' && <Zap className="h-4 w-4 mr-1" />}
                {category === 'all' ? 'All Challenges' : category}
              </Button>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredChallenges.length} daily challenges
              {selectedCategory !== 'all' && ` for ${selectedCategory}`}
            </p>
            
            <div className="flex items-center text-sm text-white/70">
              <Clock className="h-4 w-4 mr-1 text-neon-yellow" />
              Resets in 14h 32m
            </div>
          </div>
        </div>

        {/* Challenges grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <NeonCard key={challenge.id} color={challenge.color} className="relative">
              <div className="absolute top-3 left-3">
                <span className={`font-display uppercase text-xs px-2 py-1 rounded bg-black/50 border 
                  border-${challenge.color === 'yellow' ? 'yellow' : challenge.color === 'teal' ? 'teal' : 'orange'}-500/50
                  ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
              </div>
              
              <div className="absolute top-3 right-3 flex items-center space-x-1 px-2 py-1 rounded bg-black/50 border border-white/10">
                <Award className="h-3 w-3 text-amber-400" />
                <span className="text-xs font-medium text-amber-400">+{challenge.xpReward} XP</span>
              </div>

              <div className="pt-8 pb-4">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{challenge.icon}</div>
                  <h3 className={`text-neon-${challenge.color} font-display text-lg font-bold mb-1 tracking-wider`}>
                    {challenge.title}
                  </h3>
                  <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">
                    {challenge.category}
                  </span>
                </div>

                <p className="text-sm text-white/80 mb-4 text-center px-2">
                  {challenge.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <Clock className={`h-4 w-4 mr-1 text-neon-${challenge.color}`} />
                      <span className="text-white/80">Time Limit</span>
                    </div>
                    <span className="text-white">{challenge.timeLimit}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <Users className={`h-4 w-4 mr-1 text-neon-${challenge.color}`} />
                      <span className="text-white/80">Participants</span>
                    </div>
                    <span className="text-white">{challenge.participants.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <Star className={`h-4 w-4 mr-1 text-neon-${challenge.color}`} />
                      <span className="text-white/80">Completed Today</span>
                    </div>
                    <span className="text-white">{challenge.completedToday}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/60">Your Progress</span>
                    <span className="text-white/60">{challenge.progress}%</span>
                  </div>
                  <Progress 
                    value={challenge.progress} 
                    className="h-1 bg-white/10"
                  />
                </div>

                <NeonButton
                  color={challenge.color}
                  className="w-full"
                  onClick={() => handleStartChallenge(challenge.id)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Challenge
                </NeonButton>
              </div>
            </NeonCard>
          ))}
        </div>

        {/* Today's leaderboard section */}
        <NeonCard color="teal" className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Trophy className="h-6 w-6 mr-3 text-neon-teal" />
              <NeonTitle color="teal" size="lg">Today's Challenge Leaders</NeonTitle>
            </div>
            <Button
              variant="outline"
              className="bg-transparent border-white/20 text-white hover:bg-white/5"
            >
              View Full Leaderboard
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { rank: 1, name: "Alex Chen", points: 1250, challenges: 6, color: 'yellow' },
              { rank: 2, name: "Sarah Kim", points: 1180, challenges: 5, color: 'teal' },
              { rank: 3, name: "Mike Johnson", points: 1095, challenges: 5, color: 'orange' }
            ].map((leader) => (
              <div key={leader.rank} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className={`h-8 w-8 rounded-full bg-${leader.color === 'yellow' ? 'yellow' : leader.color === 'teal' ? 'teal' : 'orange'}-500/20 border border-${leader.color === 'yellow' ? 'yellow' : leader.color === 'teal' ? 'teal' : 'orange'}-500/50 flex items-center justify-center mr-3`}>
                    <span className={`font-bold text-neon-${leader.color}`}>#{leader.rank}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{leader.name}</h4>
                    <p className="text-xs text-white/60">{leader.challenges} challenges completed</p>
                  </div>
                </div>
                <div className={`text-2xl font-display text-neon-${leader.color}`}>
                  {leader.points} XP
                </div>
              </div>
            ))}
          </div>
        </NeonCard>
      </div>
    </div>
  );
};

export default DailyChallengesPage;
