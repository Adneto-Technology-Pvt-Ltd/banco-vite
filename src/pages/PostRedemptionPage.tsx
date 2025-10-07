import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Gift, 
  Check, 
  Star, 
  Calendar, 
  ChevronDown, 
  ChevronRight, 
  Clock,
  Award,
  BarChart2,
  MessageSquare,
  ThumbsUp,
  Smartphone,
  ArrowRight,
  Trophy,
  Sparkles,
  Crown,
  Zap,
  TrendingUp
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { AxisButton } from "../components/AxisButton";

type PostRedemptionPageProps = {
  userData: {
    isLoggedIn: boolean;
    name?: string;
    segment?: string;
    persona?: string;
  };
};

export const PostRedemptionPage = ({ userData }: PostRedemptionPageProps) => {
  const [activeTab, setActiveTab] = useState<"history" | "feedback" | "upcoming">("history");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  
  useEffect(() => {
    setIsAnimating(true);
    // Start celebration animation after component loads
    const timer = setTimeout(() => setShowCelebration(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced user data
  const enhancedUserData = {
    name: userData.name || "Valued Customer",
    segment: userData.segment || "Burgundy",
    availablePoints: 5240,
    rewardsRedeemed: 12,
    memberSince: "Mar 2023",
    lastRedemption: {
      title: "Airport Lounge Access",
      date: "May 28, 2025",
      points: 3500,
      image: "https://images.unsplash.com/photo-1627750673161-02af15c7c722?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycG9ydCUyMGxvdW5nZXxlbnwwfHwwfHx8MA%3D%3D"
    }
  };

  // Upcoming rewards
  const upcomingRewards = [
    {
      title: "Birthday Surprise Gift",
      daysUntil: 14,
      description: "Special reward unlocked on your birthday",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Anniversary Bonus Points",
      daysUntil: 45,
      description: "2x points on all transactions on your account anniversary",
      image: "https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Burgundy Quarterly Reward",
      daysUntil: 30,
      description: "Exclusive quarterly reward for Burgundy members",
      image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

  // Recent redemptions history
  const redemptionHistory = [
    {
      title: "Airport Lounge Access",
      date: "May 28, 2025",
      points: 3500,
      status: "Redeemed",
      image: "https://images.unsplash.com/photo-1627750673161-02af15c7c722?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycG9ydCUyMGxvdW5nZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      title: "Premium Dining Voucher",
      date: "May 15, 2025",
      points: 2500,
      status: "Redeemed",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      title: "Luxury Spa Experience",
      date: "April 28, 2025",
      points: 4000,
      status: "Redeemed",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    }
  ];

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="pt-[88px]">
      {/* Celebration Hero Section */}
      <div className="bg-gradient-to-r from-[#97144D] to-[#b01d5c] overflow-hidden relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-white opacity-5"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          
          {/* Celebration particles */}
          {showCelebration && (
            <>
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white"
                  initial={{ 
                    width: Math.random() * 8 + 4, 
                    height: Math.random() * 8 + 4,
                    opacity: 1,
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                    y: typeof window !== 'undefined' ? window.innerHeight : 800
                  }}
                  animate={{ 
                    y: -100,
                    opacity: 0
                  }}
                  transition={{ 
                    duration: Math.random() * 2 + 1,
                    delay: Math.random() * 3,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 2 + 1
                  }}
                />
              ))}
            </>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 relative z-10">
          <div className="md:flex items-center md:space-x-10">
            {/* Left column - celebration message */}
            <div className="md:w-1/2 text-white mb-8 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isAnimating ? 1 : 0, y: isAnimating ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-2">
                  <Trophy className="h-5 w-5 mr-2" />
                  <span className="text-sm font-semibold tracking-wider">BURGUNDY POST-REDEMPTION</span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                  🎉 Congratulations!<br />
                  Redemption Successful
                </h1>
                
                <p className="opacity-90 mb-6 max-w-lg">
                  Welcome back, {enhancedUserData.name}! Your Burgundy benefits has been successfully redeemed. 
                  Discover more exclusive experiences and continue your premium journey.
                </p>
                
                {/* Success celebration badge */}
                {showCelebration && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6 border border-white/20"
                  >
                    <div className="flex items-center">
                      <div className="mr-4">
                        <Sparkles className="h-6 w-6 text-yellow-300" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">
                          🏆 Redemption Complete!
                        </p>
                        <p className="text-white/80 text-sm">
                          {enhancedUserData.lastRedemption.title}
                           {/* • {enhancedUserData.lastRedemption.points.toLocaleString()} points */}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Stats grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {/* <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                  >
                    <div className="flex items-start">
                      <div className="rounded-full bg-white/20 p-2 mr-3">
                        <Gift className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm opacity-80">Available Points</p>
                        <div className="text-2xl font-bold">{formatNumber(enhancedUserData.availablePoints)}</div>
                      </div>
                    </div>
                  </motion.div> */}
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                  >
                    <div className="flex items-start">
                      <div className="rounded-full bg-white/20 p-2 mr-3">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm opacity-80">Benefits Redeemed</p>
                        <div className="text-2xl font-bold">{enhancedUserData.rewardsRedeemed}</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                  >
                    <div className="flex items-start">
                      <div className="rounded-full bg-white/20 p-2 mr-3">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm opacity-80">Member Since</p>
                        <div className="text-2xl font-bold">{enhancedUserData.memberSince}</div>
                      </div>
                    </div>
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
                    onClick={() => {/* Navigate to discovery */}}
                    className="flex items-center justify-center"
                  >
                    Explore More Benefits <ArrowRight className="ml-2 h-4 w-4" />
                  </AxisButton>
                  
                  <AxisButton 
                    variant="outline" 
                    onClick={() => setActiveTab("history")}
                    className="bg-transparent border-white text-white hover:bg-white/20 flex items-center justify-center"
                  >
                    View History <ChevronRight className="ml-2 h-4 w-4" />
                  </AxisButton>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Right column - recent redemption showcase */}
            <div className="md:w-1/2">
              <motion.div 
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: isAnimating ? 1 : 0, x: isAnimating ? 0 : 50 }}
                transition={{ duration: 0.6 }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Award className="h-5 w-5 text-[#97144D] mr-2" />
                    <h3 className="text-[#97144D] font-bold">Recent Redemption</h3>
                  </div>
                  
                  <div className="bg-[#f9f3f6] rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                        <ImageWithFallback 
                          src={enhancedUserData.lastRedemption.image}
                          alt={enhancedUserData.lastRedemption.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1">{enhancedUserData.lastRedemption.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{enhancedUserData.lastRedemption.date}</p>
                        <div className="flex items-center justify-between">
                          {/* <span className="text-[#97144D] font-medium">
                            {enhancedUserData.lastRedemption.points.toLocaleString()} points
                          </span> */}
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            ✓ Redeemed
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center text-sm text-gray-600">
                    Thank you for choosing Burgundy Benefits! 
                    Your experience matters to us.
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      <div className="bg-[#EBF9F8] border-y border-[#12877F]/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-[#12877F] rounded-full p-3 text-white mr-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Share Your Experience</h3>
                <p className="text-gray-600 max-w-md">
                  Tell us about your redemption experience.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <AxisButton variant="secondary">
                Give Feedback
              </AxisButton>
              <AxisButton variant="outline">
                Rate Experience
              </AxisButton>
            </div>
          </div>
        </div>
      </div>

      {/* Main content with tabs */}
      <div className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab("history")}
              className={`px-6 py-3 font-medium flex items-center border-b-2 transition-colors ${
                activeTab === "history"
                  ? "border-[#97144D] text-[#97144D]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Clock className="h-4 w-4 mr-2" />
              Redemption History
            </button>
            <button
              onClick={() => setActiveTab("feedback")}
              className={`px-6 py-3 font-medium flex items-center border-b-2 transition-colors ${
                activeTab === "feedback"
                  ? "border-[#97144D] text-[#97144D]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              Feedback & Reviews
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-3 font-medium flex items-center border-b-2 transition-colors ${
                activeTab === "upcoming"
                  ? "border-[#97144D] text-[#97144D]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Upcoming Benefits
            </button>
          </div>
          
          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "history" && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-bold mb-6 text-[#97144D]">Your Redemption History</h3>
                  
                  <div className="space-y-4">
                    {redemptionHistory.map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="flex items-center p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                          <ImageWithFallback 
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-lg mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{item.date}</p>
                          <div className="flex items-center justify-between">
                            {/* <span className="text-[#97144D] font-medium">
                              {item.points.toLocaleString()} points
                            </span> */}
                            <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                              {item.status}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <AxisButton variant="outline">
                      View Complete History
                    </AxisButton>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "feedback" && (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-bold mb-6 text-[#97144D]">Share Your Feedback</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-6">
                        <label className="block mb-2 font-medium">How was your redemption experience?</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button 
                              key={rating}
                              className={`w-12 h-12 rounded-full flex items-center justify-center border ${
                                rating === 5 
                                  ? "bg-[#97144D] text-white border-[#97144D]" 
                                  : "bg-white text-gray-400 border-gray-200 hover:border-[#97144D] hover:text-[#97144D]"
                              }`}
                            >
                              <Star className="h-6 w-6" />
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block mb-2 font-medium">Comments (Optional)</label>
                        <textarea 
                          rows={4}
                          className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#97144D]/20"
                          placeholder="Tell us about your experience..."
                          defaultValue="The airport lounge access was fantastic! Easy redemption process and great amenities."
                        ></textarea>
                      </div>
                      
                      <AxisButton variant="primary" fullWidth>
                        Submit Feedback (+5 benefit added)
                      </AxisButton>
                    </div>
                    
                    <div className="bg-[#f9f3f6] rounded-lg p-6">
                      <h4 className="font-bold mb-4 text-[#97144D]">Feedback Statistics</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600">Overall Satisfaction</span>
                            <span className="text-sm font-medium">95%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-[#97144D] rounded-full" style={{ width: '95%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600">Redemption Process</span>
                            <span className="text-sm font-medium">92%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-[#97144D] rounded-full" style={{ width: '92%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600">Value for Points</span>
                            <span className="text-sm font-medium">89%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-[#97144D] rounded-full" style={{ width: '89%' }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-4">
                        Based on 1,240 Burgundy member reviews
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "upcoming" && (
              <motion.div
                key="upcoming"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-bold mb-6 text-[#97144D]">Upcoming Burgundy Benefits</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {upcomingRewards.map((reward, index) => (
                      <motion.div 
                        key={reward.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="h-48 relative">
                          <ImageWithFallback 
                            src={reward.image}
                            alt={reward.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3 bg-[#97144D] text-white text-xs font-medium px-2 py-1 rounded-full">
                            In {reward.daysUntil} days
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold mb-2">{reward.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                          <button className="text-[#97144D] text-sm font-medium flex items-center">
                            Set Reminder <ChevronRight className="h-4 w-4 ml-1" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};