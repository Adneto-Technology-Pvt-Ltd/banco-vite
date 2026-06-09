import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AxisButton } from "./AxisButton";

type RewardsShowcaseProps = {
  onPlayGames: () => void;
  onExploreRewards: () => void;
  onLogin: () => void;
  onRewardSelect?: (rewardId: string) => void;
  isLoggedIn?: boolean;
};

export const RewardsShowcase = ({ onPlayGames, onExploreRewards, onLogin, onRewardSelect ,isLoggedIn}: RewardsShowcaseProps) => {
  return (
    <section className="w-full overflow-hidden">
      <div className="relative w-full bg-gradient-to-r from-[#f9f9f9] to-[#FFF0F6]">
          {!isLoggedIn &&
           (
             <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/80">
                <div className="md:flex items-center">
                  <div className="md:w-1/2 p-8 md:p-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#97144D] mb-3">
                      Your Personalized Offers Await
                    </h2>
                    <p className="text-gray-700 mb-6 max-w-lg">
                      Login to explore curated offers and privileges tailored to your lifestyle. Enjoy premium savings, exclusive deals and experiences designed just for you.
                    </p>
                    <AxisButton
                      variant="primary"
                      onClick={onLogin}
                      className="w-full md:w-auto"
                    >
                      <span className="flex items-center justify-center">
                        Login to Explore Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </AxisButton>
                  </div>

                  <div className="md:w-1/2 h-48 md:h-auto relative">
                    <div className="absolute inset-0 md:relative h-full">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                        alt="Benefits experience"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent md:hidden"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </section>
  );
};
