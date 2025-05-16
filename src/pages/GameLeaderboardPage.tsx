
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Medal, Trophy, ArrowUp, ArrowDown, Minus, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const GameLeaderboardPage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all-time");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [leaderboardData, setLeaderboardData] = useState<any>(null);

  // Sample leaderboard data
  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      const data = {
        title: gameId ? `${gameId} Leaderboard` : "Game Leaderboard",
        tabs: {
          "all-time": [
            { rank: 1, name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop", score: 9850, change: "up", level: 24, achievements: 18 },
            { rank: 2, name: "Sarah Miller", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop", score: 8720, change: "up", level: 21, achievements: 16 },
            { rank: 3, name: "David Chen", avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1374&auto=format&fit=crop", score: 8350, change: "down", level: 20, achievements: 15 },
            { rank: 4, name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop", score: 7990, change: "same", level: 19, achievements: 13 },
            { rank: 5, name: "James Smith", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop", score: 7845, change: "up", level: 18, achievements: 14 },
            { rank: 6, name: "Olivia Brown", avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=1374&auto=format&fit=crop", score: 7700, change: "down", level: 17, achievements: 12 },
            { rank: 7, name: "Michael Davis", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop", score: 7350, change: "up", level: 16, achievements: 11 },
            { rank: 8, name: "Sophia Lee", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1374&auto=format&fit=crop", score: 7100, change: "same", level: 16, achievements: 10 },
            { rank: 9, name: "Robert Taylor", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1374&auto=format&fit=crop", score: 6925, change: "down", level: 15, achievements: 9 },
            { rank: 10, name: "You", avatar: "", score: 5480, change: "up", level: 12, achievements: 7, isCurrentUser: true },
          ],
          "weekly": [
            { rank: 1, name: "Sarah Miller", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop", score: 2750, change: "up", level: 21, achievements: 16 },
            { rank: 2, name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop", score: 2340, change: "down", level: 24, achievements: 18 },
            { rank: 3, name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop", score: 1990, change: "up", level: 19, achievements: 13 },
            { rank: 4, name: "David Chen", avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1374&auto=format&fit=crop", score: 1845, change: "down", level: 20, achievements: 15 },
            { rank: 5, name: "Michael Davis", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop", score: 1720, change: "up", level: 16, achievements: 11 },
            { rank: 6, name: "You", avatar: "", score: 1650, change: "up", level: 12, achievements: 7, isCurrentUser: true },
            { rank: 7, name: "James Smith", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop", score: 1540, change: "down", level: 18, achievements: 14 },
            { rank: 8, name: "Olivia Brown", avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=1374&auto=format&fit=crop", score: 1325, change: "same", level: 17, achievements: 12 },
            { rank: 9, name: "Sophia Lee", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1374&auto=format&fit=crop", score: 1150, change: "down", level: 16, achievements: 10 },
            { rank: 10, name: "Robert Taylor", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1374&auto=format&fit=crop", score: 980, change: "down", level: 15, achievements: 9 },
          ],
          "daily": [
            { rank: 1, name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop", score: 650, change: "up", level: 19, achievements: 13 },
            { rank: 2, name: "Michael Davis", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop", score: 580, change: "up", level: 16, achievements: 11 },
            { rank: 3, name: "Sarah Miller", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop", score: 540, change: "same", level: 21, achievements: 16 },
            { rank: 4, name: "You", avatar: "", score: 470, change: "up", level: 12, achievements: 7, isCurrentUser: true },
            { rank: 5, name: "David Chen", avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1374&auto=format&fit=crop", score: 420, change: "down", level: 20, achievements: 15 },
            { rank: 6, name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop", score: 380, change: "down", level: 24, achievements: 18 },
            { rank: 7, name: "Sophia Lee", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1374&auto=format&fit=crop", score: 340, change: "up", level: 16, achievements: 10 },
            { rank: 8, name: "Robert Taylor", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1374&auto=format&fit=crop", score: 290, change: "same", level: 15, achievements: 9 },
            { rank: 9, name: "Olivia Brown", avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=1374&auto=format&fit=crop", score: 260, change: "down", level: 17, achievements: 12 },
            { rank: 10, name: "James Smith", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop", score: 240, change: "down", level: 18, achievements: 14 },
          ]
        }
      };
      
      setLeaderboardData(data);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [gameId]);

  const getChangeIcon = (change) => {
    switch(change) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getFilteredLeaderboard = () => {
    if (!leaderboardData) return [];
    
    const currentLeaderboard = leaderboardData.tabs[activeTab];
    
    if (!searchQuery) return currentLeaderboard;
    
    return currentLeaderboard.filter(player => 
      player.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Back button */}
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2" 
        onClick={() => navigate("/games")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Games
      </Button>
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Trophy className="h-8 w-8 text-yellow-500" />
            {leaderboardData.title}
          </h1>
          <p className="text-gray-600 mt-1">See how you rank against other players</p>
        </div>
        
        <div className="w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search players..."
              className="pl-9 w-full md:w-60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all-time">All Time</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="daily">Today</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Rank</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Player</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Level</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Achievements</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Score</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {getFilteredLeaderboard().map((player) => (
                  <tr 
                    key={player.rank} 
                    className={`${player.isCurrentUser ? 'bg-blue-50' : ''} hover:bg-gray-50 transition-colors`}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      {player.rank <= 3 ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full">
                          <Medal className={`h-6 w-6 ${
                            player.rank === 1 ? 'text-yellow-500' : 
                            player.rank === 2 ? 'text-gray-400' : 'text-amber-600'
                          }`} />
                        </div>
                      ) : (
                        <span className="text-gray-600 font-medium">{player.rank}</span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={player.avatar} />
                          <AvatarFallback>
                            {player.isCurrentUser ? "You" : player.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {player.name}
                            {player.isCurrentUser && 
                              <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                You
                              </span>
                            }
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                        Level {player.level}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                      {player.achievements}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {player.score.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      {getChangeIcon(player.change)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Game Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Top Players
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">10,500+</p>
            <p className="text-sm text-gray-600">Active learners this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {getFilteredLeaderboard().find(p => p.isCurrentUser)?.rank || "-"}
            </p>
            <p className="text-sm text-gray-600">
              {activeTab === 'all-time' ? 'All time ranking' : 
              activeTab === 'weekly' ? 'This week' : 'Today'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">35%</p>
            <p className="text-sm text-gray-600">Towards next level</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GameLeaderboardPage;
