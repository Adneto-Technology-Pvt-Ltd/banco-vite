import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gift,
  Clock,
  ChevronRight,
  Ticket,
  Calendar,
  CreditCard,
  Star,
  TrendingUp,
  ArrowRight,
  ShoppingBag,
  Timer,
  Sparkles,
  Award
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AxisButton } from "./AxisButton";

type BurgundyRedemptionHeroProps = {
  userData: {
    name?: string;
    segment?: string;
    rewardsBalance: number;
    pendingRedemptions: number;
    pastRedemptions: number;
    favoriteCategory?: string;
    memberSince?: string;
    avgRedemptionValue?: number;
    lastRedemptionDate?: string;
    expiringPoints?: number;
    expiryDays?: number;
  };
  onRedeemNow: () => void;
  onViewHistory: () => void;
};

export const BurgundyRedemptionHero = ({
  userData,
  onRedeemNow,
  onViewHistory
}: BurgundyRedemptionHeroProps) => {
  const [activeTab, setActiveTab] = useState<"statistics" | "trending" | "expiring">("statistics");
  const [isAnimating, setIsAnimating] = useState(false);

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Start animation when component mounts
  useEffect(() => {
    setIsAnimating(true);
    
    // Auto-rotate tabs every 8 seconds
    const tabInterval = setInterval(() => {
      setActiveTab(prev => {
        if (prev === "statistics") return "trending";
        if (prev === "trending") return "expiring";
        return "statistics";
      });
    }, 8000);
    
    return () => clearInterval(tabInterval);
  }, []);

  // Sample trending rewards
  const trendingRewards = [
    {
      title: "Airport Lounge Access",
      category: "Travel",
      redemptions: 857,
      points: 5000,
      image: "https://images.unsplash.com/photo-1583418007992-a8e33a92e7ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Amazon Gift Card",
      category: "Shopping",
      redemptions: 1245,
      points: 2000,
      image: "https://images.unsplash.com/photo-1576742212038-baae8388120c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Premium Dining Voucher",
      category: "Dining",
      redemptions: 635,
      points: 3500,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

  // Sample expiring rewards
  const expiringRewards = [
    {
      title: "5% Cashback on Retail",
      expires: "3 days",
      points: 1000,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Movie Ticket Voucher",
      expires: "7 days",
      points: 800,
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

  // Recent redemption stats
  const redemptionStats = [
    { 
      label: "This Month", 
      value: 3, 
      icon: <Calendar className="h-4 w-4" />,
      color: "#97144D"
    },
    { 
      label: "Avg. Points Used", 
      value: formatNumber(userData.avgRedemptionValue || 2750), 
      icon: <TrendingUp className="h-4 w-4" />,
      color: "#12877F"
    },
    { 
      label: "Favorite Category", 
      value: userData.favoriteCategory || "Travel", 
      icon: <Star className="h-4 w-4" />,
      color: "#594B7E"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-[#97144D] to-[#b01d5c] overflow-hidden">
      <div className="relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Decorative elements */}
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
          
          {/* Gift icon patterns in background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-[10%] left-[10%]">
              <Gift className="h-16 w-16 text-white" />
            </div>
            <div className="absolute top-[30%] right-[15%]">
              <Ticket className="h-10 w-10 text-white" />
            </div>
            <div className="absolute bottom-[20%] left-[25%]">
              <ShoppingBag className="h-12 w-12 text-white" />
            </div>
          </div>
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
        
        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 relative z-10">
          <div className="md:flex items-center md:space-x-10">
            {/* Left column - text and stats */}
            <div className="md:w-1/2 text-white mb-8 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isAnimating ? 1 : 0, y: isAnimating ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-2">
                  <Award className="h-5 w-5 mr-2" />
                  <span className="text-sm font-semibold tracking-wider">BURGUNDY REDEMPTION</span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                  Redeem Your<br />
                  Exclusive Benefits
                </h1>
                
                <p className="opacity-90 mb-6 max-w-lg">
                  As a valued Burgundy member, you have access to premium redemption options and 
                  expedited fulfillment. Explore tailored benefits based on your preferences.
                </p>
                
                {/* Key stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {/* <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                  >
                    <p className="text-sm opacity-80">Available Points</p>
                    <div className="text-2xl font-bold">{formatNumber(userData.rewardsBalance)}</div>
                  </motion.div> */}
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                  >
                    <p className="text-sm opacity-80">Pending Redemptions</p>
                    <div className="text-2xl font-bold">{userData.pendingRedemptions}</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 col-span-2 md:col-span-1"
                  >
                    <p className="text-sm opacity-80">Past Redemptions</p>
                    <div className="text-2xl font-bold">{userData.pastRedemptions}</div>
                  </motion.div>
                </div>
                
                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <AxisButton 
                    variant="secondary" 
                    onClick={onRedeemNow}
                    className="flex items-center justify-center"
                  >
                    Redeem Now <Gift className="ml-2 h-4 w-4" />
                  </AxisButton>
                  
                  <AxisButton 
                    variant="outline" 
                    onClick={onViewHistory}
                    className="bg-transparent border-white text-white hover:bg-white/20 flex items-center justify-center"
                  >
                    View History <ChevronRight className="ml-2 h-4 w-4" />
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
                  <TabButton 
                    isActive={activeTab === "statistics"} 
                    onClick={() => setActiveTab("statistics")}
                  >
                    Redemption Stats
                  </TabButton>
                  <TabButton 
                    isActive={activeTab === "trending"} 
                    onClick={() => setActiveTab("trending")}
                  >
                    Trending Benefits
                  </TabButton>
                  <TabButton 
                    isActive={activeTab === "expiring"} 
                    onClick={() => setActiveTab("expiring")}
                  >
                    Expiring Points
                  </TabButton>
                </div>
                
                {/* Tab content */}
                <div className="p-5 h-[320px]">
                  <AnimatePresence mode="wait">
                    {activeTab === "statistics" && (
                      <motion.div 
                        key="statistics"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                      >
                        <h3 className="text-[#97144D] font-bold mb-5">Your Redemption Profile</h3>
                        
                        {/* Redemption stats */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          {redemptionStats.map((stat, index) => (
                            <motion.div
                              key={stat.label}
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
                              <p className="text-base font-bold" style={{ color: stat.color }}>{stat.value}</p>
                              <p className="text-xs text-gray-600">{stat.label}</p>
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* Last redemption info */}
                        <div className="bg-[#f9f3f6] rounded-lg p-4 mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">Last Redemption</h4>
                            <span className="text-xs text-gray-500">{userData.lastRedemptionDate || "May 26, 2025"}</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden mr-3 flex-shrink-0">
                              <ImageWithFallback
                                src="https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80"
                                alt="Airport Lounge"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Airport Lounge Access</p>
                              <p className="text-sm text-gray-600">3,500 points</p>
                            </div>
                            <div className="bg-[#97144D] text-white text-xs font-medium px-2 py-1 rounded-full">
                              Fulfilled
                            </div>
                          </div>
                        </div>
                        
                        {/* Member since */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Member since {userData.memberSince || "January 2025"}</span>
                          </div>
                          <div className="text-[#97144D] font-medium flex items-center cursor-pointer">
                            View detailed stats <ArrowRight className="h-4 w-4 ml-1" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    {activeTab === "trending" && (
                      <motion.div 
                        key="trending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                      >
                        <h3 className="text-[#97144D] font-bold mb-4">Popular Burgundy Redemptions</h3>
                        
                        <div className="space-y-4">
                          {trendingRewards.map((reward, index) => (
                            <motion.div
                              key={reward.title}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.15, duration: 0.4 }}
                              className="flex items-center bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                              <div className="w-20 h-20 flex-shrink-0">
                                <ImageWithFallback
                                  src={reward.image}
                                  alt={reward.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 p-3">
                                <div className="flex items-center">
                                  <h4 className="font-medium flex-1">{reward.title}</h4>
                                  <span className="text-sm font-medium text-[#97144D]">{reward.points} pts</span>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                  <span className="text-xs text-gray-600">{reward.category}</span>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    <span>{reward.redemptions} redemptions</span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        
                        <div className="mt-4 text-center">
                          <button className="text-sm text-[#97144D] font-medium flex items-center mx-auto">
                            Explore all trending benefits <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                    
                    {activeTab === "expiring" && (
                      <motion.div 
                        key="expiring"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-[#97144D] font-bold">Expiring Points Alert</h3>
                          <div className="flex items-center text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs font-medium">
                            <Timer className="h-3 w-3 mr-1" />
                            <span>Act soon!</span>
                          </div>
                        </div>
                        
                        <div className="bg-[#f9f3f6] rounded-lg p-4 mb-6">
                          <div className="flex items-center mb-1">
                            <Sparkles className="h-5 w-5 text-[#97144D] mr-2" />
                            <h4 className="font-medium">Points Expiring Soon</h4>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-3xl font-bold text-[#97144D]">{formatNumber(userData.expiringPoints || 1000)}</p>
                            <p className="text-sm text-gray-600">in {userData.expiryDays || 30} days</p>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">Recommended benefits you can redeem before your points expire:</p>

                        <div className="space-y-4">
                          {expiringRewards.map((reward, index) => (
                            <motion.div
                              key={reward.title}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
                              className="flex items-center bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow cursor-pointer"
                            >
                              <div className="w-16 h-16 flex-shrink-0">
                                <ImageWithFallback
                                  src={reward.image}
                                  alt={reward.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 p-3">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{reward.title}</h4>
                                  <span className="text-sm font-medium text-[#97144D]">{reward.points} pts</span>
                                </div>
                                <div className="flex items-center mt-1 text-xs text-amber-600">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>Expires in {reward.expires}</span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        
                        <div className="mt-4 text-center">
                          <button className="text-sm text-[#97144D] font-medium">
                            View all redemption options
                          </button>
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
          layoutId="activeTabRedemption"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#97144D]"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  );
};