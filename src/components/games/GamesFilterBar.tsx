
import React from "react";
import { Filter, Gamepad2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NeonTitle, NeonButton } from "@/components/ui/neon-elements";
import { GameCategory } from "@/hooks/use-games-data";
import { useNavigate } from "react-router-dom";

interface GamesFilterBarProps {
  currentCategory: GameCategory;
  setCategory: (category: GameCategory) => void;
  filterBy: string;
  setFilterBy: (filter: string) => void;
  totalGames: number;
}

const GamesFilterBar = ({
  currentCategory,
  setCategory,
  filterBy,
  setFilterBy,
  totalGames
}: GamesFilterBarProps) => {
  const navigate = useNavigate();

  const categories = [
    { id: 'all', label: 'All Careers' },
    { id: 'doctor', label: 'Doctor' },
    { id: 'developer', label: 'Software Developer' },
    { id: 'ias', label: 'IAS Officer' },
    { id: 'engineer', label: 'Engineer' },
    { id: 'designer', label: 'Designer' },
    { id: 'scientist', label: 'Scientist' },
    { id: 'entrepreneur', label: 'Entrepreneur' }
  ];
  
  return (
    <div className="mb-8">
      {/* Filter Buttons & Sorting */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={currentCategory === cat.id ? "default" : "outline"}
              onClick={() => setCategory(cat.id as GameCategory)}
              className={`border border-transparent 
                ${currentCategory === cat.id 
                  ? "bg-white/10 text-white border-white/20" 
                  : "bg-black/20 hover:border-white/10 hover:bg-black/30 text-white"}`}
              size="sm"
            >
              {cat.id === 'all' && <Gamepad2 className="h-4 w-4 mr-1" />}
              {cat.label}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <span className="hidden md:inline text-sm text-muted-foreground">Sort by:</span>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-[180px] bg-black/30 border border-white/20 text-white">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-1 text-muted-foreground" />
                <SelectValue placeholder="Sort by" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-black/80 backdrop-blur-md border border-white/20">
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="mostPlayed">Most Played</SelectItem>
              <SelectItem value="difficulty">By Difficulty</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Results count */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {totalGames} skill-building games 
          {currentCategory !== 'all' && ` for ${categories.find(c => c.id === currentCategory)?.label}`}
        </p>
        
        <NeonButton 
          color="teal" 
          size="sm"
          onClick={() => navigate('/daily-challenges')}
        >
          <Zap className="h-4 w-4 mr-1" />
          Daily Challenge
        </NeonButton>
      </div>
    </div>
  );
};

export default GamesFilterBar;
