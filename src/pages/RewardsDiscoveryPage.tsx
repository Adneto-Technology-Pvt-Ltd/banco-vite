import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Gift, 
  CreditCard, 
  Clock, 
  ChevronRight, 
  Plane, 
  Film, 
  ShoppingBag, 
  Coffee,
  Filter,
  DollarSign
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { CategoryFilter } from "../components/CategoryFilter";
import { AxisButton } from "../components/AxisButton";
import { BurgundyHeroSection } from "../components/BurgundyHeroSection";

type RewardsDiscoveryPageProps = {
  userData: {
    isLoggedIn: boolean;
    name?: string;
    segment?: string;
  };
  onRewardSelect?: (rewardId: string) => void;
};

export const RewardsDiscoveryPage = ({ userData, onRewardSelect }: RewardsDiscoveryPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "trending" | "new" | "recommended">("all");
  
  // Define reward categories
  const rewardCategories = [
    {
      id: "all",
      label: "All Benefits",
      icon: <Gift className="h-[18px] w-[18px]" />
    },
    {
      id: "travel",
      label: "Travel",
      icon: <Plane className="h-[18px] w-[18px]" />
    },
    {
      id: "entertainment",
      label: "Entertainment",
      icon: <Film className="h-[18px] w-[18px]" />
    },
    {
      id: "shopping",
      label: "Shopping",
      icon: <ShoppingBag className="h-[18px] w-[18px]" />
    },
    {
      id: "dining",
      label: "Dining",
      icon: <Coffee className="h-[18px] w-[18px]" />
    },
    {
      id: "financial",
      label: "Financial",
      icon: <DollarSign className="h-[18px] w-[18px]" />
    }
  ];
  
  // Rewards data
  const rewards = [
    {
      id: "1",
      title: "5-Star Airport Lounge Access",
      description: "Complimentary access at 100+ airports worldwide",
      category: "travel",
      pointsRequired: 8000,
      image: "https://images.unsplash.com/photo-1583418007992-a8e33a92e7ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      tags: ["trending", "premium"],
      expiresIn: "30 days"
    },
    {
      id: "2",
      title: "Luxury Hotel Stay",
      description: "One night stay at premium 5-star hotels",
      category: "travel",
      pointsRequired: 15000,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      tags: ["premium", "recommended"],
      expiresIn: "60 days"
    },
    {
      id: "3",
      title: "Fine Dining Experience",
      description: "25% off at luxury restaurants across India",
      category: "dining",
      pointsRequired: 5000,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      tags: ["trending", "new"],
      expiresIn: "45 days"
    },
    {
      id: "4",
      title: "Premium Movie Tickets",
      description: "Buy 1 Get 1 free on premium movie experiences",
      category: "entertainment",
      pointsRequired: 3000,
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      tags: ["new", "recommended"],
      expiresIn: "15 days"
    },
    {
      id: "5",
      title: "Luxury Shopping Voucher",
      description: "₹2000 voucher for premium brands",
      category: "shopping",
      pointsRequired: 7500,
      image: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      tags: ["premium"],
      expiresIn: "30 days"
    },
    {
      id: "6",
      title: "Wealth Management Consultation",
      description: "One-on-one session with financial advisor",
      category: "financial",
      pointsRequired: 10000,
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      tags: ["new", "premium"],
      expiresIn: "60 days"
    }
  ];
  
  // Filter rewards based on category and filter
  const filteredRewards = rewards.filter(reward => {
    // Filter by category
    if (selectedCategory !== "all" && reward.category !== selectedCategory) {
      return false;
    }
    
    // Filter by selected filter
    if (selectedFilter === "trending" && !reward.tags.includes("trending")) {
      return false;
    }
    if (selectedFilter === "new" && !reward.tags.includes("new")) {
      return false;
    }
    if (selectedFilter === "recommended" && !reward.tags.includes("recommended")) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="pt-[88px]">
      {/* Enhanced Burgundy Hero Section */}
      <BurgundyHeroSection 
        userName={userData.name}
        onExploreRewards={() => {}}
      />
      
      {/* Points Status */}
      <div className="bg-white py-6 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f9f3f6] rounded-lg p-4 flex items-center">
              <div className="rounded-full bg-[#97144D] p-3 mr-4">
                <Gift className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Available Points</div>
                <div className="text-2xl font-bold text-[#97144D]">12,480</div>
              </div>
            </div>
            
            <div className="bg-[#EBF9F8] rounded-lg p-4 flex items-center">
              <div className="rounded-full bg-[#12877F] p-3 mr-4">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Points Earned This Month</div>
                <div className="text-2xl font-bold text-[#12877F]">1,850</div>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-4 flex items-center">
              <div className="rounded-full bg-gray-700 p-3 mr-4">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Points Expiring Soon</div>
                <div className="text-2xl font-bold text-gray-700">1,000</div>
                <div className="text-xs text-gray-500">Expires in 30 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Rewards Discovery */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#97144D] mb-4 md:mb-0">
              Discover Premium Burgundy Rewards
            </h2>
            
            <div className="flex space-x-2">
              <FilterButton 
                isActive={selectedFilter === "all"} 
                onClick={() => setSelectedFilter("all")}
              >
                All
              </FilterButton>
              <FilterButton 
                isActive={selectedFilter === "trending"} 
                onClick={() => setSelectedFilter("trending")}
              >
                Trending
              </FilterButton>
              <FilterButton 
                isActive={selectedFilter === "new"} 
                onClick={() => setSelectedFilter("new")}
              >
                New
              </FilterButton>
              <FilterButton 
                isActive={selectedFilter === "recommended"} 
                onClick={() => setSelectedFilter("recommended")}
              >
                Recommended
              </FilterButton>
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="mb-6">
            <CategoryFilter 
              categories={rewardCategories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              variant="default"
            />
          </div>
          
          {/* Rewards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRewards.map(reward => (
              <RewardCard key={reward.id} reward={reward} onSelect={onRewardSelect} />
            ))}
            
            {filteredRewards.length === 0 && (
              <div className="col-span-3 text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No rewards found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  We couldn't find any rewards matching your selected filters. 
                  Try changing your category or filter selection.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Featured Reward */}
      <div className="bg-white py-10 border-t border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row bg-gradient-to-r from-[#97144D]/10 to-[#12877F]/5 rounded-xl overflow-hidden">
            <div className="md:w-1/2 p-8">
              <div className="inline-block px-3 py-1 bg-[#97144D] text-white text-xs font-medium rounded-full mb-4">
                FEATURED BURGUNDY REWARD
              </div>
              <h2 className="text-2xl font-bold mb-3 text-[#97144D]">
                Private Yacht Experience
              </h2>
              <p className="text-gray-600 mb-6">
                Enjoy an exclusive private yacht experience for you and your family at select coastal destinations. 
                This premium reward includes gourmet catering and a dedicated crew for a memorable day at sea.
              </p>
              
              <div className="flex items-center mb-6">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-[#97144D] h-2.5 rounded-full" style={{ width: "70%" }}></div>
                </div>
                <div className="ml-3 text-sm font-medium text-[#97144D]">17,500 / 25,000 pts</div>
              </div>
              
              <AxisButton variant="primary">
                Learn More
              </AxisButton>
            </div>
            <div className="md:w-1/2">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Private Yacht Experience"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Next Steps */}
      <div className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center text-[#97144D]">
            How to Make the Most of Your Burgundy Membership
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard 
              number={1}
              title="Explore Premium Rewards"
              description="Browse through exclusive rewards available only to Burgundy members"
            />
            <StepCard 
              number={2}
              title="Maximize Your Points"
              description="Use your Burgundy credit card for accelerated points earning"
            />
            <StepCard 
              number={3}
              title="Redeem & Enjoy"
              description="Select rewards that match your lifestyle and preferences"
            />
          </div>
          
          <div className="text-center mt-8">
            <AxisButton variant="outline" className="mx-auto">
              View Burgundy Member Guide
            </AxisButton>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reward Card Component
const RewardCard = ({ reward, onSelect }: { reward: any; onSelect?: (rewardId: string) => void }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all h-full"
    >
      <div className="relative h-48">
        <ImageWithFallback 
          src={reward.image}
          alt={reward.title}
          className="w-full h-full object-cover"
        />
        
        {/* Tags */}
        <div className="absolute top-3 left-3 flex space-x-2">
          {reward.tags.includes("trending") && (
            <span className="bg-[#97144D] text-white text-xs font-medium px-2 py-1 rounded-full">
              Trending
            </span>
          )}
          {reward.tags.includes("new") && (
            <span className="bg-[#12877F] text-white text-xs font-medium px-2 py-1 rounded-full">
              New
            </span>
          )}
        </div>
        
        {/* Points */}
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-sm font-medium px-2 py-1 rounded-md backdrop-blur-sm">
          {reward.pointsRequired.toLocaleString()} points
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold mb-1">{reward.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Expires in {reward.expiresIn}</span>
          
          <button 
            onClick={() => onSelect?.(reward.id)}
            className="text-[#97144D] text-sm font-medium flex items-center hover:text-[#b01d5c] transition-colors"
          >
            View Details <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Filter Button Component
const FilterButton = ({ 
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
      className={`px-3 py-1 rounded-full text-sm ${
        isActive 
          ? "bg-[#97144D] text-white" 
          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Step Card Component
const StepCard = ({ 
  number, 
  title, 
  description 
}: { 
  number: number; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="w-10 h-10 rounded-full bg-[#97144D] text-white flex items-center justify-center font-bold mb-4">
        {number}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};