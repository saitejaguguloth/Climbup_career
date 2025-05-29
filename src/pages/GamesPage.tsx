
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gamepad2, LightbulbIcon } from "lucide-react";
import { useGamesData, GameCategory } from "@/hooks/use-games-data";
import GamesHero from "@/components/games/GamesHero";
import GamesFilterBar from "@/components/games/GamesFilterBar";
import GamesList from "@/components/games/GamesList";
import GamesSidebar from "@/components/games/GamesSidebar";

const GamesPage = () => {
  const [viewMode, setViewMode] = useState<'game' | 'skill'>('game');
  const {
    games,
    setCategory,
    category,
    setFilterBy,
    filterBy,
    totalGames
  } = useGamesData();
  
  return (
    <div className="min-h-screen pb-10">
      {/* Hero Section */}
      <GamesHero />
      
      {/* Toggle between Game View and Skill View */}
      <div className="container mx-auto px-4">
        <Tabs defaultValue={viewMode} onValueChange={(value) => setViewMode(value as 'game' | 'skill')} className="mb-8">
          <div className="flex justify-center">
            <TabsList className="bg-black/30 border border-white/10 backdrop-blur-md">
              <TabsTrigger value="game" className="data-[state=active]:bg-white/10">
                <Gamepad2 className="mr-2 h-4 w-4" />
                Game View
              </TabsTrigger>
              <TabsTrigger value="skill" className="data-[state=active]:bg-white/10">
                <LightbulbIcon className="mr-2 h-4 w-4" />
                Skill View
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content: Game cards */}
          <div className="lg:col-span-3">
            {/* Filter and sort bar */}
            <GamesFilterBar 
              currentCategory={category} 
              setCategory={setCategory}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              totalGames={totalGames}
            />
            
            {/* Games grid */}
            <GamesList games={games} />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <GamesSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
