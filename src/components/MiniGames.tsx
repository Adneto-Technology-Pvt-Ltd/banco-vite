import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Award, BrainCircuit, BookOpen, Trophy, Star, Sparkles, ChevronRight, Zap, Users, Info } from 'lucide-react';
import { FortuneWheel } from './games/FortuneWheel';
import { FinancialMatch } from './games/FinancialMatch';
import { BurgundyQuiz } from './games/BurgundyQuiz';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import confetti from 'canvas-confetti';

interface MiniGamesProps {
  userData: {
    isLoggedIn: boolean;
    customerId?: string;
    name?: string;
    segment?: string;
    persona?: string;
  };
  onClose?: () => void;
}

export const MiniGames: React.FC<MiniGamesProps> = ({ userData, onClose }) => {
  const [selectedGame, setSelectedGame] = useState<string>('wheel');
  const [showGameScreen, setShowGameScreen] = useState<boolean>(false);
  const [activeGameData, setActiveGameData] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [totalPoints, setTotalPoints] = useState<number>(userData.isLoggedIn ? 850 : 0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Mock user data for leaderboard
  useEffect(() => {
    const mockLeaderboard = [
      { id: 1, name: "Raj S.", points: 2450, badge: "Champion", game: "Fortune Wheel" },
      { id: 2, name: "Priya M.", points: 2180, badge: "Expert", game: "Burgundy Quiz" },
      { id: 3, name: "Vikram K.", points: 1950, badge: "Master", game: "Financial Match" },
      { id: 4, name: userData.isLoggedIn ? (userData.name || "You") : "Guest", points: totalPoints, badge: "Player", game: "Mixed" },
      { id: 5, name: "Neha G.", points: 1680, badge: "Rookie", game: "Fortune Wheel" },
      { id: 6, name: "Amit P.", points: 1520, badge: "Novice", game: "Burgundy Quiz" },
      { id: 7, name: "Sarika T.", points: 1350, badge: "Player", game: "Financial Match" },
    ];

    // Sort by points
    mockLeaderboard.sort((a, b) => b.points - a.points);
    
    // Update ranks
    const rankedLeaderboard = mockLeaderboard.map((player, index) => ({
      ...player,
      rank: index + 1
    }));
    
    setLeaderboard(rankedLeaderboard);
  }, [totalPoints, userData.isLoggedIn, userData.name]);

  // Game definitions
  const games = [
    {
      id: 'wheel',
      name: 'Fortune Wheel',
      description: 'Spin the wheel and win exciting rewards',
      icon: <Gift className="h-6 w-6" />,
      color: 'from-[#97144D] to-[#b01d5c]',
      component: FortuneWheel,
      cover: "https://media.istockphoto.com/id/2177986993/photo/wheel-of-fortune.webp?a=1&b=1&s=612x612&w=0&k=20&c=wZMJ91xOKoZoSxWbjbBTVlAWha81jhT_s3MQjHfWBII=",
      points: "Up to 500",
      rewards: ["Points", "Gift Cards", "Discounts"],
      playtime: "1 min",
      highlight: "Most Popular"
    },
    {
      id: 'match',
      name: 'Financial Match',
      description: 'Test your memory by matching financial cards',
      icon: <BrainCircuit className="h-6 w-6" />,
      color: 'from-[#12877F] to-[#16a096]',
      component: FinancialMatch,
      cover: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      points: "10-250",
      rewards: ["Points", "Knowledge Badges"],
      playtime: "2-5 mins",
      highlight: "Brain Booster"
    },
    {
      id: 'quiz',
      name: 'Burgundy Quiz',
      description: 'Test your financial knowledge and earn benefits',
      icon: <BookOpen className="h-6 w-6" />,
      color: 'from-[#404040] to-[#606060]',
      component: BurgundyQuiz,
      cover: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1080&auto=format&fit=crop",
      points: "Up to 300",
      rewards: ["Points", "Expert Badges"],
      playtime: "3-5 mins",
      highlight: "Learn & Earn"
    }
  ];

  const handleGameSelect = (gameId: string) => {
    setSelectedGame(gameId);
    const game = games.find(g => g.id === gameId);
    setActiveGameData(game);
  };

  const handleStartGame = () => {
    setShowGameScreen(true);
    
    // Trigger celebration effect
    setTimeout(() => {
      setShowConfetti(true);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.3 }
      });
      
      setTimeout(() => {
        setShowConfetti(false);
      }, 2500);
    }, 300);
  };

  const handleBackToMenu = () => {
    setShowGameScreen(false);
  };

  const handleGameComplete = (pointsEarned: number) => {
    // Update total points
    setTotalPoints(prev => prev + pointsEarned);
    
    // Show celebration
    if (pointsEarned > 0) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#97144D', '#12877F']
      });
    }
  };

  const SelectedGameComponent = games.find(g => g.id === selectedGame)?.component;

  // Calculate user rank
  const userRank = leaderboard.findIndex(player => 
    player.name === (userData.isLoggedIn ? (userData.name || "You") : "Guest")
  ) + 1;

  return (
    <div className="min-h-[calc(100vh-88px)] pt-[88px] pb-16 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="text-center"
              >
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    scale: [1, 1.2, 1] 
                  }}
                  transition={{ duration: 1.5, repeat: 1 }}
                  className="text-5xl font-bold text-[#97144D] drop-shadow-lg"
                >
                  Game On!
                </motion.div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="relative mb-12 rounded-2xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[#97144D]/90 to-[#12877F]/80 z-10"></div>
          <div className="absolute inset-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=2070&auto=format&fit=crop"
              alt="Mini-games background"
              className="w-full h-full object-cover"
              width={1920}
              height={600}
            />
          </div>
          <div className="relative z-20 py-16 px-6 md:px-12 text-white">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Axis Bank Benefits Games
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
                Play, learn, and earn exciting benefits. Boost your Axis Bank benefits with fun mini-games!
              </p>
              
              {userData.isLoggedIn ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                    <div className="flex items-center gap-3">
                      <Trophy className="h-8 w-8 text-yellow-300" />
                      <div>
                        <div className="text-sm opacity-80">Your Total</div>
                        <div className="text-2xl font-bold">{totalPoints} Points</div>
                      </div>
                    </div>
                  </div> */}
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                    <div className="flex items-center gap-3">
                      <Users className="h-8 w-8 text-teal-300" />
                      <div>
                        <div className="text-sm opacity-80">Leaderboard Rank</div>
                        <div className="text-2xl font-bold">#{userRank} Place</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  size="lg"
                  className="bg-white text-[#97144D] hover:bg-white/90"
                >
                  Sign In to Save Progress
                </Button>
              )}
            </motion.div>
          </div>
        </div>

        {!showGameScreen ? (
          <div>
            <Tabs defaultValue="games" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="games" className="text-base">Games Gallery</TabsTrigger>
                <TabsTrigger value="leaderboard" className="text-base">Leaderboard</TabsTrigger>
              </TabsList>
              
              <TabsContent value="games" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {games.map((game) => (
                    <motion.div
                      key={game.id}
                      whileHover={{ y: -5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                        selectedGame === game.id ? 'ring-4 ring-[#97144D]/30' : ''
                      }`}
                      onClick={() => handleGameSelect(game.id)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-80`}></div>
                        <ImageWithFallback
                          src={game.cover}
                          alt={game.name}
                          className="w-full h-full object-cover"
                          width={600}
                          height={300}
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-white/90 text-[#97144D] font-bold">
                            {game.highlight}
                          </Badge>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                            {React.cloneElement(game.icon as React.ReactElement, {
                              className: "h-10 w-10 text-white"
                            })}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold">{game.name}</h3>
                          <Badge variant="outline" className="bg-[#EBF9F8] text-[#12877F] border-none">
                            {game.playtime}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-4">
                          {game.description}
                        </p>
                        
                        <div className="flex items-center gap-2 mb-4">
                          {/* <Badge className="bg-[#97144D] text-white">
                            <Star className="h-3 w-3 mr-1" /> {game.points} pts
                          </Badge> */}
                          
                          <div className="text-xs text-gray-500">
                            {game.rewards.join(' • ')}
                          </div>
                        </div>
                        
                        <Button
                          className={`w-full bg-gradient-to-r ${game.color} text-white hover:opacity-90`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleGameSelect(game.id);
                            handleStartGame();
                          }}
                        >
                          Play Now <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="leaderboard" className="mt-0">
                <Card className="bg-white shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-[#97144D] to-[#b01d5c] text-white p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold flex items-center">
                        <Trophy className="h-5 w-5 mr-2" /> Top Players
                      </h3>
                      <Badge className="bg-white/20">Weekly Ranking</Badge>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-semibold text-gray-600">Rank</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-600">Player</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-600">Points</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-600">Badge</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-600">Favorite Game</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaderboard.map((player) => (
                            <motion.tr 
                              key={player.id}
                              className={`border-b hover:bg-gray-50 ${
                                player.name === (userData.isLoggedIn ? (userData.name || "You") : "Guest")
                                  ? "bg-[#EBF9F8]"
                                  : ""
                              }`}
                              whileHover={{ scale: 1.01 }}
                            >
                              <td className="py-3 px-4">
                                {player.rank <= 3 ? (
                                  <div className={`
                                    w-8 h-8 rounded-full flex items-center justify-center
                                    ${player.rank === 1 ? 'bg-yellow-100 text-yellow-600' : 
                                      player.rank === 2 ? 'bg-gray-100 text-gray-600' : 
                                      'bg-amber-100 text-amber-600'}
                                  `}>
                                    {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉'}
                                  </div>
                                ) : (
                                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                    {player.rank}
                                  </div>
                                )}
                              </td>
                              <td className="py-3 px-4 font-medium">
                                {player.name === (userData.isLoggedIn ? (userData.name || "You") : "Guest") ? (
                                  <span className="text-[#97144D] font-bold">{player.name}</span>
                                ) : (
                                  player.name
                                )}
                              </td>
                              <td className="py-3 px-4 font-bold">{player.points}</td>
                              <td className="py-3 px-4">
                                <Badge className={`
                                  ${player.badge === 'Champion' ? 'bg-yellow-500' :
                                    player.badge === 'Expert' ? 'bg-[#12877F]' :
                                    player.badge === 'Master' ? 'bg-[#97144D]' :
                                    'bg-gray-500'} text-white
                                `}>
                                  {player.badge}
                                </Badge>
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-600">{player.game}</td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-6 p-4 bg-[#EBF9F8] rounded-lg flex items-start gap-3">
                      <Info className="h-5 w-5 text-[#12877F] mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-[#12877F] mb-1">How to Climb the Leaderboard</h4>
                        <p className="text-sm text-gray-600">
                          Play games daily to accumulate points. Complete challenges to earn bonus points and special badges. The leaderboard resets every Monday at midnight.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedGame}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className={`p-5 bg-gradient-to-r ${activeGameData?.color} text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {activeGameData?.icon}
                      <h2 className="text-xl font-bold ml-2">{activeGameData?.name}</h2>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={handleBackToMenu}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
                    >
                      Game Menu
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  {SelectedGameComponent && (
                    <SelectedGameComponent 
                      userData={userData} 
                      onComplete={handleGameComplete}
                    />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};