import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Award, Gift, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AxisButton } from './AxisButton';
import confetti from 'canvas-confetti';

type RewardType = {
  title: string;
  description: string;
  image: string;
  color: string;
  value: string;
  brand?: string;
  brandLogo?: string;
};

type RewardsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onExplore: () => void;
  userName?: string;
};

const rewards: RewardType[] = [
  {
    title: "Dining Voucher",
    description: "Enjoy a discount on your favorite meals",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    color: "#FF5A5F",
    value: "10% off on Zomato",
    brand: "Zomato",
    brandLogo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png"
  },
  {
    title: "Shopping Voucher",
    description: "Save on your next purchase",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    color: "#F9A825",
    value: "₹500 off on Amazon",
    brand: "Amazon",
    brandLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
  },
  {
    title: "Travel Discount",
    description: "Get away for less",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    color: "#4CAF50",
    value: "15% off on MakeMyTrip",
    brand: "MakeMyTrip",
    brandLogo: "https://static.businessworld.in/article/article_extra_large_image/1609147522_O4YGnA_Logo_3x.png"
  },
  {
    title: "Entertainment Pass",
    description: "Enjoy movies and shows",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    color: "#8E24AA",
    value: "1 month free on Hotstar",
    brand: "Hotstar",
    brandLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Disney%2B_Hotstar_logo.svg/1200px-Disney%2B_Hotstar_logo.svg.png"
  },
  {
    title: "Lounge Access",
    description: "Relax before your flight",
    image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    color: "#1E88E5",
    value: "Complimentary airport lounge access",
    brand: "Axis Bank Burgundy",
    brandLogo: "https://www.axisbank.com/assets/images/logo.png"
  },
  {
    title: "Bonus Points",
    description: "Extra rewards points for you",
    image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    color: "#D32F2F",
    value: "500 bonus reward points",
    brand: "Axis Bank",
    brandLogo: "https://www.axisbank.com/assets/images/logo.png"
  },
];

export const RewardsModal = ({ isOpen, onClose, onExplore, userName = 'Valued Customer' }: RewardsModalProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [reward, setReward] = useState<RewardType | null>(null);
  const [rotation, setRotation] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    // Random rotation between 720 and 1440 degrees (2-4 full spins)
    const spinDegrees = 720 + Math.floor(Math.random() * 720);
    
    // Determine which reward will be selected
    const selectedRewardIndex = Math.floor(Math.random() * rewards.length);
    const selectedReward = rewards[selectedRewardIndex];
    
    // Calculate final rotation to land on the selected reward
    const segmentSize = 360 / rewards.length;
    const segmentOffset = segmentSize * selectedRewardIndex;
    const finalRotation = spinDegrees + segmentOffset;
    
    setRotation(finalRotation);
    
    // Set the reward after spinning animation is complete
    setTimeout(() => {
      setReward(selectedReward);
      setIsSpinning(false);
      setShowReward(true);
      
      // Trigger confetti
      if (confettiCanvasRef.current) {
        const canvas = confettiCanvasRef.current;
        const myConfetti = confetti.create(canvas, {
          resize: true,
          useWorker: true
        });
        
        myConfetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 4000); // Match this with the CSS animation duration
  };

  // Reset the modal state when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setRotation(0);
        setReward(null);
        setShowReward(false);
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <canvas
          ref={confettiCanvasRef}
          className="fixed inset-0 pointer-events-none z-50"
          style={{ width: '100%', height: '100%' }}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-md relative"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-[#97144D] to-[#b01d5c] px-6 py-4 text-white">
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold">Welcome to Your Rewards Journey!</h2>
            <p className="opacity-90 text-sm">
              {showReward 
                ? 'Congratulations on your exclusive reward!' 
                : 'Spin the wheel to win an exclusive reward to start your experience.'}
            </p>
          </div>
          
          {/* Content */}
          <div className="p-6 overflow-hidden">
            {!showReward ? (
              <div className="flex flex-col items-center">
                {/* Wheel Container */}
                <div className="relative w-64 h-64 mb-6">
                  {/* Wheel Segments */}
                  <div
                    className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#97144D] transition-transform duration-4000 ease-out"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    {rewards.map((rewardItem, index) => {
                      const segmentSize = 360 / rewards.length;
                      const rotation = index * segmentSize;
                      
                      return (
                        <div
                          key={index}
                          className="absolute inset-0 origin-center"
                          style={{ 
                            transform: `rotate(${rotation}deg)`,
                            clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((segmentSize * Math.PI) / 180)}% ${50 + 50 * Math.sin((segmentSize * Math.PI) / 180)}%)`,
                            backgroundColor: rewardItem.color
                          }}
                        >
                          <div 
                            className="absolute text-white font-bold text-xs left-1/2 top-1/4 transform -translate-x-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap"
                            style={{ transform: `rotate(${90 + segmentSize/2}deg) translateY(-70px)` }}
                          >
                            {rewardItem.title}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Center Pointer */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                      <div className="bg-[#97144D] rounded-full w-10 h-10 flex items-center justify-center">
                        <Sparkles className="text-white h-6 w-6" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Pointer */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-l-transparent border-r-transparent border-b-[#97144D]" />
                  </div>
                </div>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={spinWheel}
                  disabled={isSpinning}
                  className={`bg-[#97144D] text-white font-bold py-3 px-8 rounded-full shadow-lg ${isSpinning ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#7d1041]'} transition-all`}
                >
                  {isSpinning ? 'Spinning...' : 'Spin The Wheel'}
                </motion.button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="bg-pink-50 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-[#97144D] mb-1">Congratulations!</h3>
                  
                  <div className="flex items-center justify-center my-4">
                    {reward?.brandLogo && (
                      <div className="relative h-10 w-20 mr-2">
                        <ImageWithFallback
                          src={reward.brandLogo}
                          alt={reward.brand || ''}
                          className="object-contain h-full w-full"
                        />
                      </div>
                    )}
                    <span className="text-2xl font-bold text-gray-800">{reward?.value}</span>
                  </div>
                  
                  <div className="relative w-full h-32 rounded-lg overflow-hidden my-4">
                    <ImageWithFallback
                      src={reward?.image || ''}
                      alt={reward?.title || ''}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-2 left-3 text-white font-bold">
                      {reward?.title}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-2">
                    Your reward has been added to your account.
                  </p>
                  
                  <div className="text-sm text-gray-500 flex items-center justify-center">
                    <Award size={14} className="mr-1" />
                    <span>Valid until June 30, 2025</span>
                  </div>
                </div>
                
                <AxisButton 
                  variant="primary" 
                  onClick={onExplore}
                  className="w-full flex items-center justify-center"
                >
                  <span>Explore More Rewards</span>
                  <ChevronRight size={16} className="ml-1" />
                </AxisButton>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};