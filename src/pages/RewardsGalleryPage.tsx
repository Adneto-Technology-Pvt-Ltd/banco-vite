import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Gift, CreditCard, ShoppingBag, Plane, Utensils, Film, Coffee, Search, CheckCircle, Star } from "lucide-react";
import { CategoryFilter, defaultCategories } from "../components/CategoryFilter";

type RewardsGalleryPageProps = {
  userData: {
    isLoggedIn: boolean;
    name?: string;
  };
  onRewardSelect?: (rewardId: string) => void;
};

export const RewardsGalleryPage = ({ userData, onRewardSelect }: RewardsGalleryPageProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, []);
  
  // All rewards data
  // const allRewards = [
  //   {
  //     id: "1",
  //     title: "Amazon Gift Voucher",
  //     description: "₹500 shopping voucher redeemable on Amazon.in",
  //     pointsRequired: 2500,
  //     imageSrc: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  //     category: "shopping"
  //   },
  //   {
  //     id: "2",
  //     title: "Airport Lounge Access",
  //     description: "Complimentary access to premium airport lounges",
  //     pointsRequired: 5000,
  //     imageSrc: "https://images.unsplash.com/photo-1627750673161-02af15c7c722?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycG9ydCUyMGxvdW5nZXxlbnwwfHwwfHx8MA%3D%3D",
  //     category: "travel"
  //   },
  //   {
  //     id: "3",
  //     title: "Movie Tickets",
  //     description: "Buy 1 Get 1 Free on movie tickets at select theaters",
  //     pointsRequired: 1500,
  //     imageSrc: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  //     category: "entertainment"
  //   },
  //   {
  //     id: "4",
  //     title: "Dining Discount",
  //     description: "20% off at premium restaurants across India",
  //     pointsRequired: 3000,
  //     imageSrc: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  //     category: "dining"
  //   },
  //   {
  //     id: "5",
  //     title: "Coffee Shop Voucher",
  //     description: "Free coffee at premium coffee chains",
  //     pointsRequired: 1000,
  //     imageSrc: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  //     category: "dining"
  //   },
  //   {
  //     id: "6",
  //     title: "Flipkart Voucher",
  //     description: "₹1000 shopping voucher for Flipkart",
  //     pointsRequired: 4000,
  //     imageSrc: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  //     category: "shopping"
  //   },
  //   {
  //     id: "7",
  //     title: "Hotel Discount",
  //     description: "30% off on premium hotel bookings",
  //     pointsRequired: 6000,
  //     imageSrc: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  //     category: "travel"
  //   },
  //   {
  //     id: "8",
  //     title: "Music Streaming",
  //     description: "3 months free premium music streaming",
  //     pointsRequired: 2000,
  //     imageSrc: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  //     category: "entertainment"
  //   }
  // ];

  // Sample activation offers
  const allRewards = [
    {
      id: "1",
      title: "15% Offer applicable on total bill",
      description: "Enjoy 15% off your total bill at Vietnom, great serving authentic Vietnamese pho and traditional cuisine in a vibrant setting.",
      pointsRequired: 250,
      imageSrc: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "dining",
      icon: <Utensils className="h-5 w-5" />
    },
    {
      id: "2",
      title: "Save 20% on IHG Hotel Stays",
      description: "Enjoy 20% off on stays at IHG’s global luxury and business hotels. Experience premium comfort and world-class hospitality worldwide.",
      pointsRequired: 500,
      // imageSrc: "https://images.unsplash.com/photo-1627750673161-02af15c7c722?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycG9ydCUyMGxvdW5nZXxlbnwwfHwwfHx8MA%3D%3D",
      imageSrc: "https://www.businesstoday.com.my/wp-content/uploads/2022/06/IHG-Danang-Sun-Peninsula-Resort-1280x666.jpg",
      category: "travel",
      icon: <Plane className="h-5 w-5" />
    },
    {
      id: "3",
      title: "Additional 20% off on Marks & Spencer",
      description: "Get an additional 20% off at Marks & Spencer, the iconic British retailer for stylish clothing. Shop the latest trends and timeless classics.",
      pointsRequired: 400,
      imageSrc: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      // imageSrc: "https://media.licdn.com/dms/image/v2/C5112AQEajNTUscBwuQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1558104728646?e=2147483647&v=beta&t=BnPypkzNsyRXmFspQczXAt1x1Ch2NgIVrK40mC5heJ8",
      category: "shopping",
      icon: <ShoppingBag className="h-5 w-5" />
    },
    {
      id: "8",
      title: "Flat 20% off on JustWatches",
      description: "Get flat 20% off on all brands at Just Watches—your go-to retailer for premium and luxury timepieces.",
      pointsRequired: 400,
      imageSrc: "https://www.kibardindesign.com/img/system/img.ashx?picid=8a329d27-ac01-4846-a617-ca43b580c044&imgdetid=_972",
      // imageSrc: "https://media.licdn.com/dms/image/v2/C5112AQEajNTUscBwuQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1558104728646?e=2147483647&v=beta&t=BnPypkzNsyRXmFspQczXAt1x1Ch2NgIVrK40mC5heJ8",
      category: "shopping",
      icon: <ShoppingBag className="h-5 w-5" />
    },
    {
      id: "4",
      title: "25% Off Sony LIV Premium Packs",
      description: "Enjoy 25% off on all Sony LIV Premium packs. Stream top shows, movies, and sports with unlimited entertainment online.",
      pointsRequired: 300,
      imageSrc: "https://etimg.etb2bimg.com/photo/76029910.cms",
      // imageSrc: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "entertainment",
      icon: <Film className="h-5 w-5" />
    },
    {
      id: "5",
      title: "Get 10% off on subscription",
      description: "Get 10% off on BUSY subscription accounting software designed for small businesses to manage finances, billing, and GST efficiently.",
      pointsRequired: 350,
      imageSrc: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "finance",
      icon: <CreditCard className="h-5 w-5" />
    },
    {
      id: "6",
      title: "Flat 10% Off on Prescribed Medicines",
      description: "Get flat 10% off on prescription medicines at Apollo Pharmacy, your trusted destination for genuine medicines and essential healthcare products.",
      pointsRequired: 600,
      // image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      imageSrc: "https://media.istockphoto.com/id/156292188/photo/doctor-holding-out-several-packs-of-a-variety-of-pills.jpg?s=612x612&w=0&k=20&c=WEYtSbG6FM0WDbm7E_3QT8ZCqIEwQ9tDnGakyg5hhIw=",
      category: "wellness",
      icon: <Star className="h-5 w-5" />
    },
    {
      id: "7",
      title: "Get 15% off on Beverages",
      description: "Enjoy 15% off on beverages at Barista, the coffee shop chain known for its premium brews and cozy café experience.",
      pointsRequired: 600,
      // image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      imageSrc: "https://images.stockcake.com/public/2/f/1/2f15fe6d-471b-4164-b6db-ef76f0536840_large/barista-making-coffee-stockcake.jpg",
      category: "cafe",
      icon: <Star className="h-5 w-5" />
    }
  ];
  
  // Filter rewards based on category and search query
  const filteredRewards = allRewards
    .filter(reward => {
      // Filter by category
      if (selectedCategory !== "all" && reward.category !== selectedCategory) {
        return false;
      }
      
      // Filter by search query if present
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        return (
          reward.title.toLowerCase().includes(query) ||
          reward.description.toLowerCase().includes(query)
        );
      }
      
      return true;
    });

  return (
    <div className="pt-[88px]">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#97144D] to-[#b01d5c] py-12 px-4">
        <div className="max-w-5xl mx-auto text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Axis Bank Benefits Gallery</h1>
          <p className="text-white/90 max-w-2xl mb-8">
            Discover a world of exclusive benefits designed for Axis Bank customers. Browse through our collection of vouchers, deals, and premium experiences.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="Search benefits..."
              className="w-full py-3 bg-white px-5 pr-12 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto py-6 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              icon={<Gift className="h-6 w-6 text-[#97144D]" />}
              value="250+"
              label="Available Benefits"
            />
            <StatCard
              icon={<CreditCard className="h-6 w-6 text-[#97144D]" />}
              value="20K+"
              label="Happy Customers"
            />
            <StatCard
              icon={<CheckCircle className="h-6 w-6 text-[#97144D]" />}
              value="50K+"
              label="Benefits Redeemed"
            />
          </div>
        </div>
      </div>
      
      {/* Category Filter and Reward Grid */}
      <div className="bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Category Filter */}
          <div className="mb-8">
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              variant="default"
            />
          </div>
          
          {/* Rewards Grid */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredRewards.map((reward) => (
                <RewardCard key={reward.id} reward={reward} onSelect={onRewardSelect} />
              ))}
            </div>
            
            {filteredRewards.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Coffee className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Benefits found</h3>
                <p className="text-gray-500">
                  We couldn't find any benefits matching your criteria. Please try a different category or search term.
                </p>
              </div>
            )}
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-shadow group">
        <div className="relative h-40">
          <ImageWithFallback 
            src={reward.imageSrc}
            alt={reward.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* <div className="absolute top-0 right-0 bg-[#97144D] text-white text-xs font-medium px-2 py-1 m-2 rounded">
            {reward.pointsRequired.toLocaleString()} pts
          </div> */}
        </div>
        
        <div className="p-4">
          <h3 className="font-bold mb-1">{reward.title}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-10">{reward.description}</p>
          
          <button 
            onClick={() => onSelect?.(reward.id)}
            className="w-full bg-white border border-[#97144D] text-[#97144D] rounded py-1.5 text-sm font-medium hover:bg-[#97144D] hover:text-white transition-colors"
          >
            View Details
          </button>
        </div>
      </Card>
    </motion.div>
  );
};

// Stat Card Component
const StatCard = ({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg border border-gray-100">
      <div className="flex-shrink-0 mr-4 bg-[#f9f3f6] p-3 rounded-full">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </div>
  );
};