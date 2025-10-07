import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Award, 
  Star, 
  Gift, 
  TrendingUp, 
  Shield, 
  CreditCard, 
  Sparkles, 
  ChevronRight,
  ArrowRight,
  Rocket,
  Clock
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AxisButton } from "./AxisButton";

type BurgundyActivationHeroProps = {
  userData: {
    name?: string;
    segment?: string;
    totalPoints: number;
    totalSavings: number;
    currentTier: string;
    nextTier: string;
    progressPercentage: number;
    pointsToNextTier: number;
    memberSince?: string;
    activatedRewards: number;
  };
  onActivateMore: () => void;
};

export const BurgundyActivationHero = ({
  userData,
  onActivateMore
}: BurgundyActivationHeroProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  // const [activeTab, setActiveTab] = useState<"progress" | "benefits" | "achievements">("progress");
  const [activeTab, setActiveTab] = useState< "benefits" | "achievements">("benefits");
  
  // Start animation when component mounts
  useEffect(() => {
    setIsAnimating(true);
    
    // Auto-rotate tabs every 8 seconds
    const tabInterval = setInterval(() => {
      setActiveTab(prev => {
        // if (prev === "progress") return "benefits";
        if (prev === "benefits") return "achievements";
        return "benefits";
      });
    }, 8000);
    
    return () => clearInterval(tabInterval);
  }, []);
  
  // Calculate dynamic values
  const progress = userData.progressPercentage;
  const formattedPoints = userData.totalPoints.toLocaleString();
  const formattedSavings = userData.totalSavings.toLocaleString();
  
  // Reward tiers data
  const tiers = [
    { name: "Bronze", icon: <Award className="h-6 w-6" />, pointsRequired: 0, exclusive: 2 },
    { name: "Silver", icon: <Star className="h-6 w-6" />, pointsRequired: 500, exclusive: 5 },
    { name: "Gold", icon: <Trophy className="h-6 w-6" />, pointsRequired: 2000, exclusive: 12 },
    { name: "Burgundy", icon: <Sparkles className="h-6 w-6" />, pointsRequired: 5000, exclusive: 25 }
  ];
  
  // Find current tier index
  const currentTierIndex = tiers.findIndex(tier => 
    tier.name.toLowerCase() === userData.currentTier.toLowerCase()
  );
  
  // Find next tier (if not at max tier)
  const nextTierIndex = currentTierIndex < tiers.length - 1 ? currentTierIndex + 1 : currentTierIndex;
  const nextTier = tiers[nextTierIndex];
  
  // Key benefit stats
  const benefitStats = [
    { 
      title: "Priority Banking",
      value: "24/7",
      icon: <Clock className="h-5 w-5" />,
      color: "#97144D"
    },
    { 
      title: "Lounge Access",
      value: "12/yr",
      icon: <CreditCard className="h-5 w-5" />,
      color: "#12877F"
    },
    { 
      title: "Bonus Points",
      value: "+20%",
      icon: <Gift className="h-5 w-5" />,
      color: "#594B7E"
    }
  ];
  
  // Recent achievements
  const achievements = [
    {
      title: "First Benefits Activated",
      description: "Unlocked Amazon Gift Card",
      date: "May 12, 2025",
      points: 100,
      completed: true
    },
    // {
    //   title: "Consecutive Transactions",
    //   description: "Used Axis card 5 days in a row",
    //   date: "May 25, 2025",
    //   points: 250,
    //   completed: true
    // },
    {
      title: "3 Premium Activations",
      description: "1 more activation needed",
      date: "In progress",
      points: 500,
      completed: false
    }
  ];
  
  return (
    <div className="bg-gradient-to-r from-[#97144D] to-[#b01d5c] overflow-hidden">
      <div className="relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Decorative circles */}
          <motion.div 
            className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-white opacity-5"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-[-150px] left-[-150px] w-[300px] h-[300px] rounded-full bg-[#12877F] opacity-10"
            animate={{ 
              scale: [1, 1.1, 1],
              x: [0, 20, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
        
        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-16 relative z-10">
          <div className="md:flex items-center gap-10">
            {/* Left column - text and progress */}
            <div className="md:w-1/2 text-white mb-8 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isAnimating ? 1 : 0, y: isAnimating ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-2">
                  <Sparkles className="h-5 w-5 mr-2" />
                  <span className="text-sm font-semibold tracking-wider">BURGUNDY ACTIVATION</span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                  Welcome to Your<br />
                  Benefits Activation
                </h1>
                
                <p className="opacity-90 mb-6 max-w-lg">
                  You're on your way to unlocking premium Burgundy benefits. Activate exclusive offers, 
                  earn points faster, and enjoy tailored benefits designed for your lifestyle.
                </p>
                
                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {/* <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                  >
                    <p className="text-sm opacity-80">Total Points</p>
                    <div className="text-2xl font-bold">{formattedPoints}</div>
                  </motion.div> */}
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                  >
                    <p className="text-sm opacity-80">Total Savings</p>
                    <div className="text-2xl font-bold">₹{formattedSavings}</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 col-span-2 md:col-span-1"
                  >
                    <p className="text-sm opacity-80">Activated Benefits</p>
                    <div className="text-2xl font-bold">{userData.activatedRewards}</div>
                  </motion.div>
                </div>
                
                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <AxisButton 
                    variant="secondary" 
                    onClick={onActivateMore}
                    className="flex items-center"
                  >
                    Activate More Benefits <Rocket className="ml-2 h-4 w-4" />
                  </AxisButton>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Right column - interactive card */}
            <div className="md:w-1/2">
              <motion.div 
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: isAnimating ? 1 : 0, x: isAnimating ? 0 : 50 }}
                transition={{ duration: 0.6 }}
              >
                {/* Tabs header */}
                <div className="flex border-b">
                  {/* <TabButton 
                    isActive={activeTab === "progress"} 
                    onClick={() => setActiveTab("progress")}
                  >
                    Your Progress
                  </TabButton> */}
                  <TabButton 
                    isActive={activeTab === "benefits"} 
                    onClick={() => setActiveTab("benefits")}
                  >
                    Burgundy Benefits
                  </TabButton>
                  <TabButton 
                    isActive={activeTab === "achievements"} 
                    onClick={() => setActiveTab("achievements")}
                  >
                    Achievements
                  </TabButton>
                </div>
                
                {/* Tab content */}
                <div className="p-5 h-[320px]">
                  <AnimatePresence mode="wait">
                    {/* {activeTab === "progress" && (
                      <motion.div 
                        key="progress"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                      >
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-[#97144D] font-bold">Tier Progress</h3>
                          <div className="text-sm text-gray-500">
                            Current: <span className="text-[#97144D] font-medium">{userData.currentTier}</span>
                          </div>
                        </div>
                        
                        <div className="relative pt-4 pb-8">
                          <div className="h-2 bg-gray-100 rounded-full w-full mb-8">
                            <motion.div 
                              className="h-2 bg-[#97144D] rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                          
                          <div className="flex justify-between relative">
                            {tiers.map((tier, index) => {
                              const isActive = index <= currentTierIndex;
                              const isCurrent = index === currentTierIndex;
                              const isNext = index === nextTierIndex && !isCurrent;
                              
                              return (
                                <div key={tier.name} className="flex flex-col items-center">
                                  <motion.div 
                                    className={`rounded-full p-2 ${
                                      isActive 
                                        ? "bg-[#97144D] text-white" 
                                        : isNext
                                          ? "bg-[#f9f3f6] text-[#97144D] border border-[#97144D]"
                                          : "bg-gray-100 text-gray-400"
                                    }`}
                                    initial={{ scale: 0.8, opacity: 0.5 }}
                                    animate={{ scale: isCurrent ? 1.2 : 1, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                                  >
                                    {tier.icon}
                                  </motion.div>
                                  <div className="mt-2 text-center">
                                    <p className={`text-sm font-medium ${isCurrent ? "text-[#97144D]" : "text-gray-700"}`}>
                                      {tier.name}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        <div className="bg-[#f9f3f6] p-4 rounded-lg flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Next Tier</p>
                            <p className="font-bold text-[#97144D]">{nextTier.name}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500 mb-1">Exclusive Benefits</p>
                            <p className="text-xl font-bold text-[#97144D]">{nextTier.exclusive}</p>
                          </div>
                        </div>
                      </motion.div>
                    )} */}
                    
                    {activeTab === "benefits" && (
                      <motion.div 
                        key="benefits"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                      >
                        <h3 className="text-[#97144D] font-bold mb-4">Burgundy Exclusive Benefits</h3>
                        
                        {/* Benefits stats */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          {benefitStats.map((stat, index) => (
                            <motion.div
                              key={stat.title}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1, duration: 0.3 }}
                              className="bg-gray-50 rounded-lg p-3 text-center"
                            >
                              <div 
                                className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2"
                                style={{ backgroundColor: `${stat.color}10`, color: stat.color }}
                              >
                                {stat.icon}
                              </div>
                              <p className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</p>
                              <p className="text-xs text-gray-600">{stat.title}</p>
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* Featured benefits */}
                        <div className="space-y-3 overflow-y-auto">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.3 }}
                            className="bg-[#f9f3f6] rounded-lg p-4 flex items-center"
                          >
                            <div className="rounded-full bg-[#97144D] p-2 text-white mr-3">
                              <TrendingUp className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Wealth Management</p>
                              <p className="text-sm text-gray-600">Dedicated relationship manager</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-400" />
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                            className="bg-[#EBF9F8] rounded-lg p-4 flex items-center"
                          >
                            <div className="rounded-full bg-[#12877F] p-2 text-white mr-3">
                              <Shield className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Premium Insurance</p>
                              <p className="text-sm text-gray-600">Enhanced coverage benefits</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-400" />
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                    
                    {activeTab === "achievements" && (
                      <motion.div 
                        key="achievements"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                      >
                        <h3 className="text-[#97144D] font-bold mb-4">Your Achievements</h3>
                        
                        <div className="space-y-4 overflow-y-auto">
                          {achievements.map((achievement, index) => (
                            <motion.div
                              key={achievement.title}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.15, duration: 0.4 }}
                              className={`rounded-lg p-4 border flex items-center ${
                                achievement.completed 
                                  ? "bg-[#f9f3f6]/50 border-[#97144D]/20" 
                                  : "bg-gray-50 border-gray-200"
                              }`}
                            >
                              <div className={`rounded-full p-2 mr-3 ${
                                achievement.completed 
                                  ? "bg-[#97144D] text-white" 
                                  : "bg-gray-200 text-gray-500"
                              }`}>
                                {achievement.completed 
                                  ? <Trophy className="h-5 w-5" /> 
                                  : <Clock className="h-5 w-5" />
                                }
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{achievement.title}</p>
                                <p className="text-sm text-gray-600">{achievement.description}</p>
                                <p className="text-xs text-gray-500">{achievement.date}</p>
                              </div>
                              {/* <div className={`text-sm font-medium ${
                                achievement.completed ? "text-[#97144D]" : "text-gray-500"
                              }`}>
                                {achievement.points} pts
                              </div> */}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tab button component
const TabButton = ({ 
  children, 
  isActive, 
  onClick 
}: { 
  children: React.ReactNode; 
  isActive: boolean; 
  onClick: () => void; 
}) => {
  return (
    <button
      className={`px-4 py-3 text-sm font-medium relative ${
        isActive ? "text-[#97144D]" : "text-gray-600 hover:text-gray-800"
      }`}
      onClick={onClick}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="activeTabActivation"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#97144D]"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  );
};