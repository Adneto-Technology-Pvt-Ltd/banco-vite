import { AxisHeaderBanner } from "../assets";
import { useState } from "react";

import { ImageWithFallback } from "./figma/ImageWithFallback";

import { LoginInfoModal } from "./LoginInfoModal";

import { Gift } from "lucide-react";

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
  onExploreRewards
}: HomeBannerProps) => {
  const [showLoginInfo, setShowLoginInfo] = useState(false);

  const handleExploreRewards = () => {
    setShowLoginInfo(true);
  };

  return (
    <div className="pt-[88px]">
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        {/* Background Image - Updated with more reliable banking image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={AxisHeaderBanner}
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
                  : "Unlock Exclusive Offers & Privileges"
                }
              </h1>

              {/* Subheading */}
              <p className="text-white/95 text-lg md:text-xl mb-8 md:mb-10 max-w-2xl leading-relaxed">
                {isLoggedIn
                  ? "Discover personalized benefits and premium benefits designed just for you. Explore new offers and maximize your savings."
                  : "Discover curated lifestyle, travel, dining, shopping offers and much more designed for Axis Bank customers."
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
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
                    font-['Lato'] font-style-normal
                  "
                  aria-label="Explore Your Benefits"
                >
                  <Gift className="h-5 w-5 flex-shrink-0" />
                  <span>Explore Offers</span>
                </button>
              </div>

              {/* Additional info for non-logged-in users */}
              {!isLoggedIn && (
                <div className="mt-8 md:mt-10">
                  <div className="flex flex-wrap gap-6 text-white/95">
                    <div className="flex items-center gap-3">
                      ✔ Curated Premium Brands
                    </div>
                    <div className="flex items-center gap-3">
                      ✔ Exclusive Savings & Experiences
                    </div>
                    <div className="flex items-center gap-3">
                      ✔ Seamless Redemption
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
      </div>
      <LoginInfoModal isOpen={showLoginInfo} onClose={() => setShowLoginInfo(false)} />
    </div>
  );
};
