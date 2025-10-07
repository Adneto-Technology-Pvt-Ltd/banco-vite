import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AxisButton } from "./AxisButton";
import { Gift, CreditCard } from "lucide-react";

type HomeBannerProps = {
  isLoggedIn?: boolean;
  userData?: {
    name?: string;
    segment?: string;
    persona?: string;
  };
  onExploreRewards?: () => void;
  onOpenAccount?: () => void;
};

export const HomeBanner = ({ 
  isLoggedIn, 
  userData, 
  onExploreRewards, 
  onOpenAccount 
}: HomeBannerProps) => {
  
  const handleExploreRewards = () => {
    if (onExploreRewards) {
      onExploreRewards();
    }
  };

  const handleOpenAccount = () => {
    if (onOpenAccount) {
      onOpenAccount();
    }
  };

  return (
    <div className="pt-[88px]">
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        {/* Background Image - Updated with more reliable banking image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Axis Bank Rewards and Banking Services"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Enhanced Gradient Overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#97144D]/90 via-[#97144D]/85 to-[#97144D]/75"></div>

        {/* Content Container */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="max-w-4xl">
              {/* Dynamic greeting for logged-in users */}
              {isLoggedIn && userData?.name && (
                <div className="mb-4">
                  <p className="text-white/95 text-lg font-medium">
                    Welcome back, {userData.name}
                  </p>
                </div>
              )}

              {/* Main Heading */}
              <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                {isLoggedIn 
                  ? "Your Benefits Journey Continues"
                  : "Unlock Exclusive Banking Benefits"
                }
              </h1>

              {/* Subheading */}
              <p className="text-white/95 text-lg md:text-xl mb-8 md:mb-10 max-w-2xl leading-relaxed">
                {isLoggedIn
                  ? "Discover personalized benefits and premium benefits designed just for you. Explore new offers and maximize your savings."
                  : "Experience premium banking with Axis Bank. Earn benefits on every transaction, enjoy exclusive benefits, and build your financial future."
                }
              </p>

              {/* Action Buttons - Enhanced for maximum readability */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                {/* Primary Action Button - White background for maximum contrast */}
                <button
                  onClick={handleExploreRewards}
                  className="
                    bg-white text-[#97144D] 
                    hover:bg-gray-100 hover:text-[#7d1041] 
                    active:bg-gray-200 active:text-[#661234]
                    border-3 border-white hover:border-gray-100
                    px-8 py-4 rounded-lg
                    text-lg font-bold
                    flex items-center justify-center gap-3 
                    min-w-[220px] min-h-[56px]
                    shadow-xl hover:shadow-2xl
                    transition-all duration-200 ease-in-out
                    focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#97144D]
                    font-['Arial'] font-style-normal
                  "
                  aria-label="Explore Your Benefits"
                >
                  <Gift className="h-5 w-5 flex-shrink-0" />
                  <span>Explore Your Benefits</span>
                </button>
                
                {/* Secondary Action Button - Enhanced outline with better contrast */}
                {/* {!isLoggedIn && (
                  <button
                    onClick={handleOpenAccount}
                    className="
                      bg-transparent 
                      border-3 border-white text-white
                      hover:bg-white hover:text-[#97144D] hover:border-white
                      active:bg-gray-100 active:text-[#7d1041]
                      px-8 py-4 rounded-lg
                      text-lg font-bold
                      flex items-center justify-center gap-3 
                      min-w-[220px] min-h-[56px]
                      shadow-xl hover:shadow-2xl
                      transition-all duration-200 ease-in-out
                      focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#97144D]
                      font-['Arial'] font-style-normal
                      backdrop-blur-sm
                    "
                    aria-label="Open Savings Account"
                  >
                    <CreditCard className="h-5 w-5 flex-shrink-0" />
                    <span>Open Savings Account</span>
                  </button>
                )} */}
              </div>

              {/* Additional info for non-logged-in users */}
              {!isLoggedIn && (
                <div className="mt-8 md:mt-10">
                  <div className="flex flex-wrap gap-6 text-white/95">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-white rounded-full flex-shrink-0"></div>
                      <span className="text-sm md:text-base font-medium">Exclusive benefits</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-white rounded-full flex-shrink-0"></div>
                      <span className="text-sm md:text-base font-medium">Instant digital banking</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-white rounded-full flex-shrink-0"></div>
                      <span className="text-sm md:text-base font-medium">Benefits on every transaction</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Segment-specific message for logged-in users */}
              {isLoggedIn && userData?.segment === "Burgundy" && (
                <div className="mt-8 md:mt-10">
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 md:p-6 border-2 border-white/30">
                    <p className="text-white font-bold text-lg mb-2">
                      🏆 Burgundy Exclusive Benefits
                    </p>
                    <p className="text-white/95 font-medium">
                      Enjoy priority services, premium rewards, and exclusive lifestyle benefits designed for our valued Burgundy customers.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#12877F]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-20 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};