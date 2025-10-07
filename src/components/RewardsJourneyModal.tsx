import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import confetti from 'canvas-confetti';

import { RewardWheel } from './RewardWheel';
import { RewardResult } from './RewardResult';

import '../styles/rewards-animations.css';

// Define reward types
export type RewardType = {
  title: string;
  description: string;
  image: string;
  color: string;
  value: string;
  brand?: string;
  brandLogo?: string;
};

type RewardsJourneyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onExplore: () => void;
  userName?: string;
};

// Sample reward data
const rewards: RewardType[] = [
  {
    title: "Swiggy Instamart Discount",
    value: "Discount on your favorite meals",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    color: "#FF5A5F",
    description: "Get Rs.100 off on a minimum order value of Rs.399",
    brand: "Swiggy",
    brandLogo: "https://static.businessworld.in/Swiggy%20Instamart%20Orange-20%20(1)_20240913021826_original_image_44.webp"
  },
  {
    title: "Subscription Offer",
    value: "3 months of Jio Saavan Pro FREE",
    image: "https://www.myhoardings.com/blog/wp-content/uploads/2021/12/JioSavnn-Ads.png",
    color: "#F9A825",
    description: "Get 3 months of Pro benefits worth Rs 299 for FREE!",
    brand: "Jio Saavan",
    brandLogo: "https://storage.googleapis.com/shy-pub/345733/1704713503478_1702290820624SKU00970.jpeg"
  },
  {
    title: "Travel Discount",
    description: "15% off on your next trip",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    color: "#4CAF50",
    value: "15% off on EaseMyTrip",
    brand: "EaseMyTrip",
    brandLogo: "https://images.emtcontent.com/brandlogo/emtlogo_new8.svg"
  },
  {
    title: "Entertainment Pass",
    value: "15% OFF on ZEE5 Premium Annual Pack",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    color: "#8E24AA",
    description: "FLAT 15% OFF on ZEE5 Premium HD and Zee5 Premium 4K Annual Pack",
    brand: "ZEE5",
    brandLogo: "https://logos-world.net/wp-content/uploads/2021/11/ZEE5-Logo.png"
  },
  {
    title: "Lenskart Gold Membership",
    description: "Free Lenskart Gold Max 1 year membership worth Rs 800/-",
    image: "https://images.unsplash.com/photo-1608539733292-190446b22b83?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D",
    color: "#1E88E5",
    value: "Rs 800/- Lenskart Gold Max 1 year membership",
    brand: "Lenskart",
    brandLogo: "https://1000logos.net/wp-content/uploads/2022/10/Lenskart-Logo-2013.png"
  },
  {
    title: "LinekedIn Premium Offer",
    description: "LinekedIn Premium Professional networking and career platform. Get 1 month free trial.",
    image: "https://www.shutterstock.com/image-illustration/marketing-background-image-illustration-linkedin-260nw-2539004113.jpg",
    color: "#D32F2F",
    value: "Get 1 Month Free",
    brand: "LinkedIn",
    brandLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1024px-LinkedIn_icon.svg.png"
  },
];

// Simplified wheel segments data
const wheelSegments = rewards.map(reward => ({
  title: reward.title,
  color: reward.color,
  value: reward.value
}));

export const RewardsJourneyModal = ({ 
  isOpen, 
  onClose, 
  onExplore, 
  userName = 'Valued Customer' 
}: RewardsJourneyModalProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedReward, setSelectedReward] = useState<RewardType | null>(null);
  const [showReward, setShowReward] = useState(false);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleSpinComplete = (segment: { title: string, color: string, value: string }) => {
    // Find the full reward data that matches the segment
    const matchedReward = rewards.find(r => r.value === segment.value);
    
    if (matchedReward) {
      setSelectedReward(matchedReward);
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
    }
  };

  // Reset the modal state when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSelectedReward(null);
        setShowReward(false);
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
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
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-r from-[#97144D] to-[#b01d5c] px-6 py-4 text-white">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
          <h2 className="text-xl font-bold">Welcome to Your Benefits Platform!</h2>
          <p className="opacity-90 text-sm mt-1">
            {showReward 
              ? 'Congratulations on your exclusive benefit!' 
              : 'Spin the wheel to win an exclusive benefit to start your experience.'}
          </p>
        </div>
        
        {/* Modal Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {!showReward ? (
              <motion.div
                key="wheel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <RewardWheel 
                  segments={wheelSegments}
                  onSpinComplete={handleSpinComplete}
                  isSpinning={isSpinning}
                  setIsSpinning={setIsSpinning}
                />
              </motion.div>
            ) : (
              <motion.div
                key="reward"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {selectedReward && (
                  <RewardResult 
                    reward={selectedReward} 
                    onExplore={onExplore}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};