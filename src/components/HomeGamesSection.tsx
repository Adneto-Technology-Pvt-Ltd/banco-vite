import React, { useState } from "react";
import { motion } from "framer-motion";
import { AxisButton } from "./AxisButton";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type HomeGamesSectionProps = {
  userData?: {
    isLoggedIn: boolean;
    name?: string;
    segment?: string;
    persona?: string;
  };
  onPlayGame?: (gameId: string) => void;
  onViewGames?: () => void;
};

export const HomeGamesSection = ({ userData, onPlayGame, onViewGames }: HomeGamesSectionProps) => {
  const [activeGameSection, setActiveGameSection] = useState<string | null>(null);
  
  // Bonus games data with more reliable banking/finance related images
  const bonusGames = [
    {
      id: "wheel",
      title: "Spin the Wheel",
      description: "Spin to win additional benefits",
      image: "https://media.istockphoto.com/id/2177986993/photo/wheel-of-fortune.webp?a=1&b=1&s=612x612&w=0&k=20&c=wZMJ91xOKoZoSxWbjbBTVlAWha81jhT_s3MQjHfWBII=",
      maxReward: 500
    },
    {
      id: "quiz",
      title: "Financial Quiz",
      description: "Test your financial knowledge to earn benefits",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      maxReward: 300
    },
    {
      id: "match",
      title: "Match & Earn",
      description: "Match the pairs to unlock surprise benefits",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      maxReward: 400
    }
  ];

  const handlePlayGame = (gameId: string) => {
    setActiveGameSection(gameId);
    if (onPlayGame) {
      onPlayGame(gameId);
    }
  };

  return (
    <div className="bg-[#f9f3f6] py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#97144D] mb-4">
            Earn Benefits Through Fun Games
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-2">
            Play interactive games and challenges to earn extra benefits. Each game offers unique benefits
            and helps you learn more about financial wellness while having fun.
          </p>
          {/* <p className="text-sm font-medium text-[#12877F]">
            Earn up to 1,200 additional points monthly
          </p> */}
        </div>
        
        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {bonusGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="h-48 relative overflow-hidden">
                <ImageWithFallback 
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* <div className="absolute top-3 right-3 bg-[#97144D] text-white text-xs font-medium px-2 py-1 rounded-full">
                  Up to {game.maxReward} pts
                </div> */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 text-gray-800">{game.title}</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{game.description}</p>
                
                <AxisButton 
                  variant="outline"
                  onClick={() => handlePlayGame(game.id)}
                  fullWidth
                  className="hover:bg-[#97144D] hover:text-white transition-colors"
                >
                  {userData?.isLoggedIn ? "Play Now" : "Login to Play"}
                </AxisButton>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-[#97144D] mb-3">
              Ready for More Challenges?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Games and challenges refresh every month. Complete all three to receive a special achievement badge 
              and unlock bonus benefits. Track your progress and compete with other Axis Bank customers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {userData?.isLoggedIn ? (
                <>
                  <AxisButton 
                    variant="primary"
                    onClick={onViewGames}
                    className="min-w-[160px]"
                  >
                    View All Games
                  </AxisButton>
                  <AxisButton 
                    variant="outline" 
                    className="min-w-[160px]"
                  >
                    Game History
                  </AxisButton>
                </>
              ) : (
                <>
                  <AxisButton 
                    variant="primary"
                    onClick={onViewGames}
                    className="min-w-[160px]"
                  >
                    Explore Games
                  </AxisButton>
                  <p className="text-sm text-gray-500">
                    Login to track your progress and earn benefits
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Achievement Preview */}
        {userData?.isLoggedIn && (
          <div className="mt-8">
            <div className="bg-gradient-to-r from-[#97144D]/10 to-[#12877F]/10 rounded-xl p-6 border border-[#97144D]/20">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#97144D] mb-1">Monthly Challenge Progress</h4>
                  <p className="text-sm text-gray-600">Complete all games to unlock special benefits</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#12877F]">2/3</div>
                  <div className="text-xs text-gray-500">Games Completed</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-[#97144D] to-[#12877F] h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};