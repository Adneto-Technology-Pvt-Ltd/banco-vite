import { motion } from 'framer-motion';
import { Award, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AxisButton } from './AxisButton';

type RewardType = {
  title: string;
  description: string;
  image: string;
  color: string;
  value: string;
  brand?: string;
  brandLogo?: string;
};

type RewardResultProps = {
  reward: RewardType;
  onExplore: () => void;
};

export const RewardResult = ({ reward, onExplore }: RewardResultProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <div className="bg-gradient-to-r from-pink-50 to-[#EBF9F8] rounded-xl p-6 mb-6 shadow-inner">
        <div className="mb-4">
          <div className="inline-block bg-[#97144D]/10 rounded-full p-2 mb-2">
            <Award size={24} className="text-[#97144D]" />
          </div>
          <h3 className="text-xl font-bold text-[#97144D] mb-1">Congratulations!</h3>
        </div>
        
        <div className="flex items-center justify-center mb-4">
          {reward?.brandLogo && (
            <div className="relative h-10 w-24 mr-2 bg-white rounded p-1 shadow-sm">
              <ImageWithFallback
                src={reward.brandLogo}
                alt={reward.brand || ''}
                className="object-contain h-full w-full"
              />
            </div>
          )}
          <span className="text-2xl font-bold text-gray-800">{reward.value}</span>
        </div>
        
        <div className="relative w-full h-40 rounded-lg overflow-hidden my-4 shadow-md">
          <ImageWithFallback
            src={reward.image}
            alt={reward.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-3 left-3 text-white">
            <h4 className="font-bold text-lg text-left">{reward.title}</h4>
            <p className="text-sm text-left w-[90%] text-white/90">{reward.description}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between py-3 px-4 bg-white rounded-lg shadow-sm mb-3">
          <span className="text-sm font-medium text-gray-700">Benfit Status</span>
          <span className="text-sm font-medium text-[#12877F] flex items-center">
            <span className="h-2 w-2 rounded-full bg-[#12877F] mr-1"></span>
            Active
          </span>
        </div>
        
        <div className="text-sm text-gray-600 flex items-center justify-center">
          <Award size={14} className="mr-1 text-[#97144D]" />
          <span>Your Benefits has been added to your account</span>
        </div>
      </div>
      
      <AxisButton 
        variant="primary" 
        onClick={onExplore}
        className="w-full flex items-center justify-center group"
      >
        <span>Explore More Benefits</span>
        <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
      </AxisButton>
    </motion.div>
  );
};