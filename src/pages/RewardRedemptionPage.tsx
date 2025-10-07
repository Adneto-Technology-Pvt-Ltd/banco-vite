import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Gift, 
  Smartphone, 
  Coffee,
  ShoppingBag, 
  CreditCard, 
  Ticket, 
  Plane, 
  Home,
  ChevronRight,
  Clock
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { AxisButton } from "../components/AxisButton";
import { CategoryFilter } from "../components/CategoryFilter";
import { BurgundyRedemptionHero } from "../components/BurgundyRedemptionHero";

type RewardRedemptionPageProps = {
  userData: {
    isLoggedIn: boolean;
    name?: string;
    segment?: string;
    persona?: string;
  };
  onRewardSelect?: (rewardId: string) => void;
};

export const RewardRedemptionPage = ({ userData, onRewardSelect }: RewardRedemptionPageProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<"popular" | "points-asc" | "points-desc">("popular");
  
  // Define extended user data for the hero component
  const enhancedUserData = {
    name: userData.name || "Valued Customer",
    segment: userData.segment || "Burgundy",
    rewardsBalance: 12500,
    pendingRedemptions: 2,
    pastRedemptions: 14,
    favoriteCategory: "Travel",
    memberSince: "January 2025",
    avgRedemptionValue: 3250,
    lastRedemptionDate: "May 26, 2025",
    expiringPoints: 1000,
    expiryDays: 30
  };
  
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
      id: "dining",
      label: "Dining",
      icon: <Coffee className="h-[18px] w-[18px]" />
    },
    {
      id: "shopping",
      label: "Shopping",
      icon: <ShoppingBag className="h-[18px] w-[18px]" />
    },
    {
      id: "entertainment",
      label: "Entertainment",
      icon: <Ticket className="h-[18px] w-[18px]" />
    },
    {
      id: "financial",
      label: "Financial",
      icon: <CreditCard className="h-[18px] w-[18px]" />
    },
    {
      id: "lifestyle",
      label: "Lifestyle",
      icon: <Home className="h-[18px] w-[18px]" />
    }
  ];
  
  // Sample redemption rewards
  const redemptionRewards = [
    {
      id: "1",
      title: "Airport Lounge Access",
      description: "Global lounge access at 1,000+ airports worldwide",
      pointsRequired: 3500,
      category: "travel",
      popularity: 98,
      image: "https://images.unsplash.com/photo-1583418007992-a8e33a92e7ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isBurgundyExclusive: true,
      isFeatured: true,
      fulfillmentTime: "Instant"
    },
    {
      id: "2",
      title: "5-Star Hotel Voucher",
      description: "One night stay at select premium hotels across India",
      pointsRequired: 10000,
      category: "travel",
      popularity: 85,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isBurgundyExclusive: true,
      isFeatured: false,
      fulfillmentTime: "24 hours"
    },
    {
      id: "3",
      title: "Fine Dining Experience",
      description: "Gourmet dining for two at premium restaurants",
      pointsRequired: 5000,
      category: "dining",
      popularity: 92,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isBurgundyExclusive: true,
      isFeatured: false,
      fulfillmentTime: "24 hours"
    },
    {
      id: "4",
      title: "Amazon Gift Card",
      description: "₹1,000 Amazon shopping voucher",
      pointsRequired: 2000,
      category: "shopping",
      popularity: 96,
      image: "https://images.unsplash.com/photo-1576742212038-baae8388120c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isBurgundyExclusive: false,
      isFeatured: false,
      fulfillmentTime: "Instant"
    },
    {
      id: "5",
      title: "Movie Ticket Voucher",
      description: "Two premium movie tickets at INOX or PVR",
      pointsRequired: 1500,
      category: "entertainment",
      popularity: 89,
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isBurgundyExclusive: false,
      isFeatured: false,
      fulfillmentTime: "Instant"
    },
    {
      id: "6",
      title: "Annual Credit Card Fee Waiver",
      description: "Waive your annual fee on Axis Bank credit cards",
      pointsRequired: 7500,
      category: "financial",
      popularity: 78,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isBurgundyExclusive: false,
      isFeatured: false,
      fulfillmentTime: "3-5 business days"
    },
    {
      id: "7",
      title: "Premium Spa Voucher",
      description: "Full-day spa treatment at luxury wellness centers",
      pointsRequired: 6000,
      category: "lifestyle",
      popularity: 81,
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isBurgundyExclusive: true,
      isFeatured: false,
      fulfillmentTime: "24 hours"
    },
    {
      id: "8",
      title: "Cashback on Utility Bills",
      description: "10% cashback on electricity, water, and gas bills",
      pointsRequired: 1000,
      category: "financial",
      popularity: 94,
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isBurgundyExclusive: false,
      isFeatured: false,
      fulfillmentTime: "Next billing cycle"
    }
  ];
  
  // Filter rewards based on category and search
  const filteredRewards = redemptionRewards.filter(reward => {
    // Filter by category
    if (selectedCategory !== "all" && reward.category !== selectedCategory) {
      return false;
    }
    
    // Filter by search
    if (searchQuery && !reward.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !reward.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Sort rewards
  const sortedRewards = [...filteredRewards].sort((a, b) => {
    if (sortOrder === "popular") {
      return b.popularity - a.popularity;
    } else if (sortOrder === "points-asc") {
      return a.pointsRequired - b.pointsRequired;
    } else {
      return b.pointsRequired - a.pointsRequired;
    }
  });
  
  // Featured reward (first in the list or a specific featured one)
  const featuredReward = redemptionRewards.find(r => r.isFeatured) || redemptionRewards[0];
  
  return (
    <div className="pt-[88px]">
      {/* Enhanced Burgundy Redemption Hero */}
      <BurgundyRedemptionHero 
        userData={enhancedUserData}
        onRedeemNow={() => {
          // Scroll to rewards section
          document.getElementById('rewards-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onViewHistory={() => {
          // In a real app, this would navigate to history page
          console.log("View redemption history");
        }}
      />
      
      {/* Redemption Center */}
      <div id="rewards-section" className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#97144D] mb-2">Redemption Center</h2>
              <p className="text-gray-600 max-w-2xl">
                Browse and redeem your benefits with our easy redemption process. Burgundy members enjoy 
                exclusive benefits and expedited fulfillment.
              </p>
            </div>
            
            {/* Search bar */}
            <div className="mt-4 md:mt-0 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search benefits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#97144D]/20"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
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
          
          {/* Sort controls */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-sm text-gray-500">
                {filteredRewards.length} benefits available
              </span>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm mr-2 text-gray-600">Sort by:</span>
              <select 
                className="border border-gray-200 rounded-lg p-2 text-sm bg-white"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
              >
                <option value="popular">Most Popular</option>
                <option value="points-asc">Points: Low to High</option>
                <option value="points-desc">Points: High to Low</option>
              </select>
            </div>
          </div>
          
          {/* Featured Reward */}
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                 onClick={() => onRewardSelect?.(featuredReward.id)}>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 h-64 md:h-auto relative">
                  <ImageWithFallback 
                    src={featuredReward.image}
                    alt={featuredReward.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-[#97144D] text-white text-xs font-medium px-3 py-1 rounded-full">
                      Featured Benefit
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      {featuredReward.isBurgundyExclusive && (
                        <span className="bg-[#f9f3f6] text-[#97144D] text-xs font-medium px-2 py-1 rounded-full mr-2">
                          Burgundy Exclusive
                        </span>
                      )}
                      <span className="text-sm text-gray-500">
                        {featuredReward.category.charAt(0).toUpperCase() + featuredReward.category.slice(1)}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">{featuredReward.title}</h3>
                    <p className="text-gray-600 mb-4">{featuredReward.description}</p>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex items-center mr-4">
                        <Gift className="h-4 w-4 text-[#97144D] mr-1" />
                        {/* <span className="text-sm font-medium">{featuredReward.pointsRequired.toLocaleString()} points</span> */}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-[#12877F] mr-1" />
                        <span className="text-sm">{featuredReward.fulfillmentTime} fulfillment</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button className="text-[#97144D] text-sm font-medium flex items-center hover:text-[#b01d5c] transition-colors">
                      View Details <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                    <AxisButton variant="primary">
                      Redeem Now
                    </AxisButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Rewards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedRewards.map(reward => (
              <RewardCard key={reward.id} reward={reward} onSelect={onRewardSelect} />
            ))}
            
            {sortedRewards.length === 0 && (
              <div className="col-span-3 text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No <b>Benefits</b> found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  We couldn't find any benefits matching your search criteria. 
                  Try changing your category or search terms.
                </p>
              </div>
            )}
          </div>
          
          {/* See all rewards button (for pagination) */}
          {sortedRewards.length > 0 && (
            <div className="mt-8 text-center">
              <AxisButton variant="outline" className="mx-auto">
                Load More Benefits
              </AxisButton>
            </div>
          )}
        </div>
      </div>
      
      {/* Points Expiry Reminder */}
      <div className="bg-white py-8 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#f9f3f6] rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-3/5 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-xl font-bold text-[#97144D] mb-2">Don't Let Your Points Expire</h3>
                <p className="text-gray-600 mb-4">
                  As a Burgundy member, your points are valid for 24 months. You have 1,000 points expiring in 30 days.
                  Redeem them now to maximize your benefits.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <AxisButton variant="primary">
                    View Expiring Points
                  </AxisButton>
                  <AxisButton variant="outline">
                    Set Reminder
                  </AxisButton>
                </div>
              </div>
              <div className="md:w-2/5">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Points Summary</h4>
                    <span className="text-sm text-gray-500">June 4, 2025</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Available</span>
                      <span className="font-medium">12,500 points</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Expiring in 30 days</span>
                      <span className="font-medium text-amber-600">1,000 points</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Expiring in 90 days</span>
                      <span className="font-medium">2,500 points</span>
                    </div>
                    <div className="h-px bg-gray-200 my-2"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Safe Points</span>
                      <span className="font-medium text-[#12877F]">9,000 points</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Redemption Process */}
      <div className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#97144D] mb-8 text-center">
            The Burgundy Redemption Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ProcessCard 
              number={1}
              title="Select Your Benefit"
              description="Browse through our curated collection of premium benefits"
              icon={<Gift className="h-6 w-6" />}
            />
            <ProcessCard 
              number={2}
              title="Confirm Redemption"
              description="Verify details and confirm with your benefit points"
              icon={<CreditCard className="h-6 w-6" />}
            />
            <ProcessCard 
              number={3}
              title="Instant Fulfillment"
              description="Burgundy members enjoy expedited processing and delivery"
              icon={<Smartphone className="h-6 w-6" />}
            />
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Burgundy members receive priority redemption processing, with digital benefits fulfilled instantly 
              and physical benefits shipped within 24 hours. Track your redemptions in real-time.
            </p>
            <AxisButton variant="outline" className="mx-auto">
              View Redemption FAQ
            </AxisButton>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reward Card Component
const RewardCard = ({ reward, onSelect }: { reward: any; onSelect?: (rewardId: string) => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow transition-shadow h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect?.(reward.id)}
    >
      <div className="relative h-48">
        <ImageWithFallback 
          src={reward.image}
          alt={reward.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {reward.isBurgundyExclusive && (
          <div className="absolute top-3 left-3">
            <div className="bg-[#97144D] text-white text-xs font-medium px-2 py-1 rounded-full">
              Burgundy Exclusive
            </div>
          </div>
        )}
        
        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-sm px-2 py-1 rounded-md">
          {reward.pointsRequired.toLocaleString()} points
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <span className="capitalize">{reward.category}</span>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{reward.fulfillmentTime}</span>
          </div>
        </div>
        
        <h3 className="font-bold mb-1">{reward.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
        
        <div className="flex items-center justify-between">
          <button className="text-[#97144D] text-sm font-medium flex items-center hover:text-[#b01d5c] transition-colors">
            View Details <ChevronRight className="h-4 w-4 ml-1" />
          </button>
          <AxisButton variant="primary" size="sm">
            Redeem
          </AxisButton>
        </div>
      </div>
    </motion.div>
  );
};

// Process Card Component
const ProcessCard = ({ 
  number, 
  title, 
  description,
  icon
}: { 
  number: number; 
  title: string; 
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-[#97144D] text-white flex items-center justify-center font-bold mr-3">
          {number}
        </div>
        <div className="w-10 h-10 rounded-full bg-[#f9f3f6] text-[#97144D] flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};