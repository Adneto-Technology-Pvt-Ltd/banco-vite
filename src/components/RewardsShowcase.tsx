import { motion } from "framer-motion";
import { Gift, Sparkles, Zap, Trophy, ArrowRight, CreditCard, Plane, Target } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AxisButton } from "./AxisButton";

type RewardsShowcaseProps = {
  onPlayGames: () => void;
  onExploreRewards: () => void;
  onLogin: () => void;
  onRewardSelect?: (rewardId: string) => void;
};

export const RewardsShowcase = ({ onPlayGames, onExploreRewards, onLogin, onRewardSelect ,isLoggedIn}: RewardsShowcaseProps) => {
  return (
    <section className="w-full overflow-hidden">
      {/* Top banners with stacked effect */}
      {/* <div className="relative px-4 md:px-8 py-16 bg-gradient-to-b from-white to-[#f9f9f9]">
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-[#97144D]/5 blur-xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[#12877F]/5 blur-xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#97144D]">Experience Our Benefits Universe</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Unlock exclusive benefits, and enjoy premium perks designed for your lifestyle.
            </p>
          </div>
          
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            
            <div className="relative z-10 group">
              <div className="absolute inset-0 bg-[#b01d5c] rounded-2xl transform -rotate-1 translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#97144D] to-[#b01d5c] shadow-lg h-full">
                <div className="absolute top-0 right-0 w-48 h-48 -mt-16 -mr-16 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 -mb-10 -ml-10 bg-white/10 rounded-full"></div>
                
                <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
                  
                  <div className="flex items-center mb-4">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl inline-flex shadow-lg mr-3">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Play & Win</h3>
                  </div>
                  
                  <p className="text-white/90 mb-6">
                    Engage with interactive mini-games and turn playtime into exclusive benefits.
                  </p>
                  
                  
                  <div className="flex gap-3 mb-6 overflow-x-auto hide-scrollbar pb-2">
                    <div className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 w-36">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-[#b01d5c] flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-white text-sm font-medium">Fortune Wheel</span>
                      </div>
                      <div className="text-white/70 text-xs">Win Benefits</div>
                    </div>
                    
                    <div className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 w-36">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-[#b01d5c] flex items-center justify-center">
                          <Zap className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-white text-sm font-medium">Burgundy Quiz</span>
                      </div>
                      <div className="text-white/70 text-xs">Test your knowledge</div>
                    </div>
                    
                    <div className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 w-36">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-[#b01d5c] flex items-center justify-center">
                          <Target className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-white text-sm font-medium">Financial Match</span>
                      </div>
                      <div className="text-white/70 text-xs">Train your memory</div>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <button 
                      onClick={onPlayGames}
                      className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-white px-6 py-2.5 font-bold text-[#97144D] transition duration-300 ease-out hover:bg-opacity-90"
                    >
                      <span className="relative flex items-center gap-1.5">
                        Play Now
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            
            <div className="relative z-10 group">
              <div className="absolute inset-0 bg-[#16a096] rounded-2xl transform rotate-1 translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#12877F] to-[#16a096] shadow-lg h-full">
                <div className="absolute top-0 right-0 w-48 h-48 -mt-16 -mr-16 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 -mb-10 -ml-10 bg-white/10 rounded-full"></div>
                
                <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
                  
                  <div className="flex items-center mb-4">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl inline-flex shadow-lg mr-3">
                      <Gift className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Explore Benefits</h3>
                  </div>
                  
                  <p className="text-white/90 mb-6">
                    Discover premium benefits from travel perks to shopping vouchers, tailored to your lifestyle.
                  </p>
                  
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button 
                      onClick={() => onRewardSelect?.("luxury-watch")}
                      className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-md border border-white/20 hover:bg-white/20 transition-colors group w-full"
                    >
                      <div className="h-24 relative">
                        <ImageWithFallback 
                          src="https://images.unsplash.com/photo-1627750673161-02af15c7c722?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycG9ydCUyMGxvdW5nZXxlbnwwfHwwfHx8MA%3D%3D"
                          alt="Airport lounge access"
                          className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all"
                        />
                        <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/70 to-transparent">
                          <div className="flex items-center">
                            <Plane className="w-4 h-4 text-white mr-1.5" />
                            <div className="text-white text-xs font-medium">Airport Lounges</div>
                          </div>
                        </div>
                      </div>
                    </button>
                    
                    <button 
                      onClick={() => onRewardSelect?.("premium-jewelry")}
                      className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-md border border-white/20 hover:bg-white/20 transition-colors group w-full"
                    >
                      <div className="h-24 relative">
                        <ImageWithFallback 
                          src="https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                          alt="Shopping vouchers"
                          className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all"
                        />
                        <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/70 to-transparent">
                          <div className="flex items-center">
                            <CreditCard className="w-4 h-4 text-white mr-1.5" />
                            <div className="text-white text-xs font-medium">Shopping Vouchers</div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                  
                  <div className="mt-auto">
                    <button 
                      onClick={onExploreRewards}
                      className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-white px-6 py-2.5 font-bold text-[#12877F] transition duration-300 ease-out hover:bg-opacity-90"
                    >
                      <span className="relative flex items-center gap-1.5">
                        View Catalog
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      
      {/* Bottom banner for login CTA */}
      <div className="relative w-full bg-gradient-to-r from-[#f9f9f9] to-[#EBF9F8]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#97144D]/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#12877F]/30 rounded-full blur-3xl"></div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10">
          {!isLoggedIn && (<div className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/80">
            <div className="md:flex items-center">
              <div className="md:w-1/2 p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-[#97144D] mb-3">
                  Ready to access your personalized benefits?
                </h2>
                <p className="text-gray-700 mb-6 max-w-lg">
                  Login to unlock your exclusive Axis Bank benefits tailored to your profile and banking habits. Enjoy special offers and premium benefits waiting just for you.
                </p>
                <AxisButton 
                  variant="primary"
                  onClick={onLogin}
                  className="w-full md:w-auto"
                >
                  <span className="flex items-center justify-center">
                    Login to Benefit Portal
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
          </div>)}
          
          {/* Floating trust indicators */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/80 flex items-center">
              <div className="w-4 h-4 rounded-full bg-[#97144D] mr-2"></div>
              <span className="text-sm font-medium text-gray-800">Secure & Encrypted</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/80 flex items-center">
              <div className="w-4 h-4 rounded-full bg-[#12877F] mr-2"></div>
              <span className="text-sm font-medium text-gray-800">Personalized Benefits</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/80 flex items-center">
              <div className="w-4 h-4 rounded-full bg-[#97144D] mr-2"></div>
              <span className="text-sm font-medium text-gray-800">Exclusive Benefits</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};