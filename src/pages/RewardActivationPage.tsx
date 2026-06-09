import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy, Gift, Rocket, Sparkles, ChevronRight, Check, Star, ShoppingBag, CreditCard, Utensils, Plane, Film, Search
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { AxisButton } from "../components/AxisButton";
import { BurgundyActivationHero } from "../components/BurgundyActivationHero";

type RewardActivationPageProps = {
  userData: {
    isLoggedIn: boolean;
    name?: string;
    segment?: string;
    persona?: string;
  };
  onExploreRewards?: () => void;
  onRewardSelect?: (rewardId: string) => void;
  searchResults?: any[];
  searchQuery?: string;
};

export const RewardActivationPage = ({
  userData, onExploreRewards, onRewardSelect, searchResults, searchQuery
}: RewardActivationPageProps) => {
  // State for which game section is active (if any)
  const [activeGameSection, setActiveGameSection] = useState<string | null>(null);
  // Dummy user data for the BurgundyActivationHero component
  const enhancedUserData = {
    name: userData.name || "Valued Customer",
    segment: userData.segment || "Burgundy",
    totalPoints: 350,
    totalSavings: 1250,
    currentTier: "Bronze",
    nextTier: "Silver",
    progressPercentage: 70,
    pointsToNextTier: 150,
    memberSince: "January 2025",
    activatedRewards: 3
  };

  // Update the activationOffers array to use IDs that match mockRewardData
  const activationOffers = [
    {
      id: "dining", // This now matches mockRewardData key
      title: "15% Offer applicable on total bill",
      description: "Enjoy 15% off your total bill at Vietnom, great serving authentic Vietnamese pho and traditional cuisine in a vibrant setting.",
      points: 250,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "Dining",
      icon: <Utensils className="h-5 w-5" />
    },
    {
      id: "lounge", // This now matches mockRewardData key
      title: "Save 20% on IHG Hotel Stays",
      description: "Enjoy 20% off on stays at IHG's global luxury and business hotels. Experience premium comfort and world-class hospitality worldwide.",
      points: 500,
      image: "https://www.businesstoday.com.my/wp-content/uploads/2022/06/IHG-Danang-Sun-Peninsula-Resort-1280x666.jpg",
      category: "Travel",
      icon: <Plane className="h-5 w-5" />
    },
    {
      id: "shopping", // This now matches mockRewardData key
      title: "Additional 20% off",
      description: "Get an additional 20% off at Marks & Spencer, the iconic British retailer for stylish clothing. Shop the latest trends and timeless classics.",
      points: 400,
      image: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "Shopping",
      icon: <ShoppingBag className="h-5 w-5" />
    },
    {
      id: "movie", // This now matches mockRewardData key
      title: "25% Off Sony LIV Premium Packs",
      description: "Enjoy 25% off on all Sony LIV Premium packs. Stream top shows, movies, and sports with unlimited entertainment online.",
      points: 300,
      image: "https://etimg.etb2bimg.com/photo/76029910.cms",
      category: "Entertainment",
      icon: <Film className="h-5 w-5" />
    },
    {
      id: "cashback", // This now matches mockRewardData key
      title: "Get 10% off on subscription",
      description: "Get 10% off on BUSY subscription accounting software designed for small businesses to manage finances, billing, and GST efficiently.",
      points: 350,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "Financial",
      icon: <CreditCard className="h-5 w-5" />
    },
    {
      id: "wellness", // This now matches mockRewardData key
      title: "Flat 10% Off on Prescribed Medicines",
      description: "Get flat 10% off on prescription medicines at Apollo Pharmacy, your trusted destination for genuine medicines and essential healthcare products.",
      points: 600,
      image: "https://media.istockphoto.com/id/156292188/photo/doctor-holding-out-several-packs-of-a-variety-of-pills.jpg?s=612x612&w=0&k=20&c=WEYtSbG6FM0WDbm7E_3QT8ZCqIEwQ9tDnGakyg5hhIw=",
      category: "Wellness",
      icon: <Star className="h-5 w-5" />
    }
  ];

  // Update recentlyActivated to use IDs that match mockRewardData
  const recentlyActivated = [
    {
      id: "activated-1", // This now matches mockRewardData key
      title: "Amazon Gift Card",
      date: "May 28, 2025",
      points: 100,
      image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: "activated-2", // This now matches mockRewardData key
      title: "Coffee Shop Voucher",
      date: "May 20, 2025",
      points: 50,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: "activated-3", // This now matches mockRewardData key
      title: "Movie Ticket Discount",
      date: "May 15, 2025",
      points: 200,
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

  // Bonus games data
  const bonusGames = [
    {
      id: "wheel",
      title: "Spin the Wheel",
      description: "Spin to win additional rewards and points",
      image: "https://media.istockphoto.com/id/2177986993/photo/wheel-of-fortune.webp?a=1&b=1&s=612x612&w=0&k=20&c=wZMJ91xOKoZoSxWbjbBTVlAWha81jhT_s3MQjHfWBII=",
      maxReward: 500
    },
    {
      id: "quiz",
      title: "Financial Quiz",
      description: "Test your financial knowledge to earn bonus points",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      maxReward: 300
    },
    {
      id: "match",
      title: "Match & Earn",
      description: "Match the pairs to unlock surprise rewards",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      maxReward: 400
    }
  ];

  // Use search results if available, otherwise show all offers
  const displayOffers = searchResults && searchResults.length > 0 ? searchResults : activationOffers;
  const showingSearchResults = searchQuery && searchResults && searchResults.length > 0;


  return (
    <div className="pt-[88px]">
      {/* Enhanced Burgundy Activation Hero */}
      {!showingSearchResults && (
        <>
          <BurgundyActivationHero
            userData={enhancedUserData}
            onActivateMore={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
          />

          {/* Featured Reward */}
          <div className="bg-white py-10 border-t">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col md:flex-row bg-gradient-to-r from-[#97144D]/10 to-[#ED1164]/5 rounded-xl overflow-hidden">
                <div className="md:w-1/2 p-8">
                  <div className="inline-block px-3 py-1 bg-[#97144D] text-white text-xs font-medium rounded-full mb-4">
                    FEATURED BURGUNDY BENEFITS
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-[#97144D]">
                    Flat 25% off on making charges on a minimum purchase of Rs.75,000 on Gold Jewellery.
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Get flat 25% off on making charges at Kalyan Jewellers with a minimum purchase of ₹75,000 on exquisite gold jewellery. Discover timeless designs and unmatched craftsmanship while availing this exclusive limited-time offer. Perfect for every special occasion.
                  </p>

                  {/* <div className="flex items-center mb-6">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-[#97144D] h-2.5 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                    <div className="ml-3 text-sm font-medium text-[#97144D]">17,500 / 25,000 pts</div>
                  </div> */}

                  <AxisButton variant="primary">
                    Learn More
                  </AxisButton>
                </div>
                <div className="md:w-1/2">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1652375152241-d3e62ab52b57?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGluZGlhbiUyMGpld2Vscnl8ZW58MHx8MHx8fDA%3D"
                    alt="Private Yacht Experience"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Activation Offers Section */}
      <div className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#97144D] mb-2">
                {showingSearchResults
                  ? `Search Results for "${searchQuery}"`
                  : "Benefits Ready for Activation"
                }
              </h2>
              <p className="text-gray-600 max-w-2xl">
                {showingSearchResults
                  ? `Found ${displayOffers.length} reward${displayOffers.length !== 1 ? 's' : ''} matching your search`
                  : "Activate these exclusive Burgundy benefits to enjoy premium experiences tailored for you."
                }
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <span className="text-sm font-medium text-gray-500 mr-2">Filter by:</span>
              <select className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm">
                <option value="all">All Categories</option>
                <option value="dining">Dining</option>
                <option value="travel">Travel</option>
                <option value="shopping">Shopping</option>
                <option value="entertainment">Entertainment</option>
                <option value="financial">Financial</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
            </div>
          </div>

          {/* Show search results or no results message */}
          {displayOffers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayOffers.map((offer, index) => (
                <ActivationCard
                  key={offer.id}
                  offer={offer}
                  index={index}
                  onSelect={onRewardSelect}
                />
              ))}
            </div>
          ) : showingSearchResults ? (
            <div className="text-center py-16">
              <Search className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any rewards matching "{searchQuery}". Try searching with different keywords.
              </p>
              <AxisButton
                variant="outline"
                onClick={() => window.location.reload()}
              >
                View All Rewards
              </AxisButton>
            </div>
          ) : null}

          {/* Browse More button - only show when not searching */}
          {!showingSearchResults && (
            <div className="flex justify-center mt-8" onClick={onExploreRewards}>
              <AxisButton variant="outline" className="px-8 py-2 text-base font-medium">
                Browse More Benefits
              </AxisButton>
            </div>
          )}
        </div>
      </div>

      {/* Recently Activated Section */}
      {!showingSearchResults && (<div className="bg-white py-10 border-t border-b">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#97144D] mb-6">Recently Activated Benefits</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentlyActivated.map((reward, index) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onRewardSelect?.(reward.id)}
              >
                <div className="h-40 relative">
                  <ImageWithFallback
                    src={reward.image}
                    alt={reward.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent py-2 px-3">
                    <p className="text-white font-medium">{reward.title}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">{reward.date}</span>
                    {/* <span className="text-sm font-medium text-[#97144D]">{reward.points} points</span> */}
                  </div>
                  <div className="flex items-center text-[#ED1164]">
                    <Check className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">Successfully Activated</span>
                  </div>
                  <button className="mt-3 text-[#97144D] text-sm font-medium flex items-center hover:text-[#b01d5c] transition-colors">
                    View Details <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>)}

      {/* Bonus Games Section */}
      {/* <div className="bg-[#f9f3f6] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#97144D]">Bonus Games & Challenges</h2>
            <p className="text-sm font-medium text-gray-600">Earn up to 1,200 additional points</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bonusGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 relative">
                  <ImageWithFallback
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-[#97144D] text-white text-xs font-medium px-2 py-1 rounded-full">
                    Up to {game.maxReward} pts
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{game.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{game.description}</p>

                  <AxisButton
                    variant="outline"
                    onClick={() => setActiveGameSection(game.id)}
                    fullWidth
                  >
                    Play Now
                  </AxisButton>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 max-w-2xl mx-auto mb-4">
              Games and challenges refresh every month. Complete all three to receive a special achievement badge
              and bonus reward.
            </p>
            <AxisButton variant="outline" className="mx-auto">
              View Game History
            </AxisButton>
          </div>
        </div>
      </div> */}
    </div>
  );
};

// Activation Card Component
const ActivationCard = ({ offer, index, onSelect }: { offer: any; index: number; onSelect?: (rewardId: string) => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect?.(offer.id)}
    >
      <div className="relative h-48">
        <ImageWithFallback
          src={offer.image}
          alt={offer.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`} />

        <div className="absolute top-3 left-3">
          <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
            <div className="text-[#97144D] mr-1.5">
              {offer.icon}
            </div>
            <span className="text-xs font-medium text-gray-800">{offer.category}</span>
          </div>
        </div>

        {/* <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-sm px-2 py-1 rounded-md">
          {offer.points} points
        </div> */}
      </div>

      <div className="p-4 relative">
        <h3 className="font-bold mb-1">{offer.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{offer.description}</p>

        <div className="flex justify-between items-center">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isHovered ? '100%' : 0 }}
            className="h-0.5 bg-[#97144D] absolute left-0 bottom-0"
            transition={{ duration: 0.3 }}
          />

          <button className="text-[#97144D] text-sm font-medium flex items-center hover:text-[#b01d5c] transition-colors">
            View Details <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        <AxisButton variant="primary" fullWidth className="mt-3">
          <div className="flex items-center justify-center">
            <Sparkles className="h-4 w-4 mr-2" />
            Activate Benefits
          </div>
        </AxisButton>
      </div>
    </motion.div>
  );
};
