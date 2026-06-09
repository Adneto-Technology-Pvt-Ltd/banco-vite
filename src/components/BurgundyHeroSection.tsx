import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  TrendingUp, 
  Shield, 
  Clock, 
  CreditCard, 
  Gift, 
  Coffee,
  Plane,
  ChevronRight, 
  Award
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AxisButton } from "./AxisButton";

type BurgundyHeroSectionProps = {
  userName?: string;
  onExploreRewards: () => void;
};

export const BurgundyHeroSection = ({ 
  userName = "Valued Member", 
  onExploreRewards 
}: BurgundyHeroSectionProps) => {
  const [activeTab, setActiveTab] = useState<"benefits" | "stats" | "exclusive">("benefits");
  const [animate, setAnimate] = useState(false);
  
  // Trigger animations when component mounts
  useEffect(() => {
    setAnimate(true);
    
    // Auto-rotate tabs every 8 seconds
    const tabInterval = setInterval(() => {
      setActiveTab(prev => {
        if (prev === "benefits") return "stats";
        if (prev === "stats") return "exclusive";
        return "benefits";
      });
    }, 8000);
    
    return () => clearInterval(tabInterval);
  }, []);

  // User portfolio data (dummy data)
  const portfolioData = {
    investmentGrowth: 18.7,
    pointsEarned: 12480,
    premiumOffers: 24,
    nextReward: "Airport Lounge Access",
    pointsToNextReward: 1520,
    memberSince: "August 2023",
    portfolioValue: "₹38,75,000",
    recentActivity: [
      { date: "May 30, 2025", action: "Redeemed Coffee Voucher", points: 500 },
      { date: "May 18, 2025", action: "Earned Welcome Bonus", points: 5000 },
      { date: "May 10, 2025", action: "Referred Priya Sharma", points: 2000 },
    ]
  };

  // Burgundy benefits
  const burgundyBenefits = [
    {
      id: "wealth",
      title: "Wealth Management",
      description: "Personalized portfolio management with dedicated relationship managers",
      icon: <TrendingUp className="w-5 h-5 text-[#97144D]" />
    },
    {
      id: "premium",
      title: "Premium Lifestyle",
      description: "Exclusive dining, shopping, and entertainment privileges",
      icon: <Award className="w-5 h-5 text-[#97144D]" />
    },
    {
      id: "priority",
      title: "Priority Banking",
      description: "Zero waiting time with priority service at branches",
      icon: <Clock className="w-5 h-5 text-[#97144D]" />
    },
    {
      id: "protection",
      title: "Enhanced Protection",
      description: "Advanced security features and comprehensive insurance",
      icon: <Shield className="w-5 h-5 text-[#97144D]" />
    }
  ];

  // Premium offers 
  const premiumOffers = [
    {
      title: "Airport Lounge Access",
      description: "Complimentary access to 1000+ airport lounges worldwide",
      icon: <Plane className="w-8 h-8 text-white" />,
      color: "#ED1164"
    },
    {
      title: "Fine Dining Experiences",
      description: "25% off at premium restaurants across India",
      icon: <Coffee className="w-8 h-8 text-white" />,
      color: "#97144D"
    },
    {
      title: "Concierge Services",
      description: "24/7 personal assistance for travel, dining & more",
      icon: <Gift className="w-8 h-8 text-white" />,
      color: "#594B7E"
    }
  ];

  return (
    <div className="bg-white overflow-hidden">
      <div className="relative">
        {/* Background gradient element */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#97144D] to-[#b01d5c] opacity-95"></div>
        
        {/* Business meeting image with overlay */}
        <div className="absolute top-0 left-0 w-full h-full">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
            alt="Business professionals"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-white opacity-5"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-[#ED1164] opacity-10"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        />
        
        {/* Content container */}
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 relative z-10 md:flex gap-10 items-center">
          {/* Left column - text content */}
          <div className="md:w-1/2 text-white mb-8 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: animate ? 1 : 0, y: animate ? 0 : 20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-2">
                <Sparkles className="h-5 w-5 mr-2" />
                <span className="text-sm font-semibold tracking-wider">AXIS BURGUNDY EXCLUSIVE</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Welcome to Your <br className="hidden md:block" />
                Burgundy Rewards
              </h1>
              
              <p className="opacity-90 mb-6 max-w-lg">
                Explore personalized wealth management services, premium lifestyle privileges, and exclusive 
                financial solutions tailored for our valued Burgundy members.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <AxisButton 
                  variant="outline" 
                  onClick={onExploreRewards}
                  className="border-white text-white hover:bg-white hover:text-[#97144D]"
                >
                  Explore Premium Rewards
                </AxisButton>
                
                <AxisButton 
                  variant="secondary"
                  onClick={() => {}}
                >
                  Financial Dashboard
                </AxisButton>
              </div>
            </motion.div>
            
            {/* Stats row */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: animate ? 1 : 0, y: animate ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <StatCounter label="Growth" value={`${portfolioData.investmentGrowth}%`} />
              <StatCounter label="Points" value={portfolioData.pointsEarned.toLocaleString()} />
              <StatCounter label="Premium Offers" value={portfolioData.premiumOffers.toString()} />
              <StatCounter label="Since" value="Aug 2023" />
            </motion.div>
          </div>
          
          {/* Right column - interactive card */}
          <div className="md:w-1/2">
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: animate ? 1 : 0, x: animate ? 0 : 50 }}
              transition={{ duration: 0.6 }}
            >
              {/* Tabs header */}
              <div className="flex border-b">
                <TabButton 
                  isActive={activeTab === "benefits"} 
                  onClick={() => setActiveTab("benefits")}
                >
                  Burgundy Benefits
                </TabButton>
                <TabButton 
                  isActive={activeTab === "stats"} 
                  onClick={() => setActiveTab("stats")}
                >
                  Your Portfolio
                </TabButton>
                <TabButton 
                  isActive={activeTab === "exclusive"} 
                  onClick={() => setActiveTab("exclusive")}
                >
                  Exclusive Offers
                </TabButton>
              </div>
              
              {/* Tab content */}
              <div className="p-5 h-[300px]">
                <AnimatePresence mode="wait">
                  {activeTab === "benefits" && (
                    <motion.div 
                      key="benefits"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <h3 className="text-[#97144D] font-bold mb-4">Exclusive Burgundy Benefits</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {burgundyBenefits.map(benefit => (
                          <motion.div 
                            key={benefit.id}
                            whileHover={{ y: -5 }}
                            className="p-3 border border-gray-100 rounded-lg flex gap-3 items-start hover:shadow-md transition-shadow"
                          >
                            <div className="bg-[#f9f3f6] rounded-full p-2 mt-1">
                              {benefit.icon}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{benefit.title}</h4>
                              <p className="text-sm text-gray-600">{benefit.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  {activeTab === "stats" && (
                    <motion.div 
                      key="stats"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-[#97144D] font-bold">Your Portfolio Summary</h3>
                        <span className="text-sm text-gray-500">Last updated: Today</span>
                      </div>
                      
                      <div className="flex mb-4">
                        <div className="w-1/2 p-3 bg-[#f9f3f6] rounded-lg mr-3">
                          <p className="text-sm text-gray-600">Portfolio Value</p>
                          <p className="text-xl font-bold text-[#97144D]">{portfolioData.portfolioValue}</p>
                        </div>
                        <div className="w-1/2 p-3 bg-[#FFF0F6] rounded-lg">
                          <p className="text-sm text-gray-600">Next Reward</p>
                          <p className="text-xl font-bold text-[#ED1164]">{portfolioData.nextReward}</p>
                          <p className="text-xs text-gray-500">{portfolioData.pointsToNextReward} points needed</p>
                        </div>
                      </div>
                      
                      <h4 className="font-medium text-gray-800 mb-2">Recent Activity</h4>
                      <div className="space-y-2">
                        {portfolioData.recentActivity.map((activity, index) => (
                          <div key={index} className="flex justify-between items-center p-2 border-b border-gray-100">
                            <div>
                              <p className="text-sm font-medium">{activity.action}</p>
                              <p className="text-xs text-gray-500">{activity.date}</p>
                            </div>
                            <div className="text-sm font-medium text-[#97144D]">
                              {activity.points > 0 ? '+' : ''}{activity.points} pts
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  {activeTab === "exclusive" && (
                    <motion.div 
                      key="exclusive"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <h3 className="text-[#97144D] font-bold mb-4">Premium Lifestyle Privileges</h3>
                      <div className="space-y-3">
                        {premiumOffers.map((offer, index) => (
                          <motion.div 
                            key={index}
                            whileHover={{ x: 5 }}
                            className="flex items-center p-3 rounded-lg cursor-pointer"
                          >
                            <div 
                              className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                              style={{ backgroundColor: offer.color }}
                            >
                              {offer.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{offer.title}</h4>
                              <p className="text-sm text-gray-600">{offer.description}</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          </motion.div>
                        ))}
                        
                        <button className="text-[#97144D] font-medium text-sm flex items-center mx-auto mt-4">
                          View All Premium Offers <ChevronRight className="h-4 w-4 ml-1" />
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
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#97144D]"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  );
};

// Animated stat counter
const StatCounter = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="text-center">
      <motion.p 
        className="text-2xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {value}
      </motion.p>
      <p className="text-xs opacity-80">{label}</p>
    </div>
  );
};