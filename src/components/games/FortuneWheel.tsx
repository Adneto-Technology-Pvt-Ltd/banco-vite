import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Gift, Star, Zap, Trophy, ShoppingBag, Tag, CreditCard, Coins, Sparkles, History, Info, Clock, RotateCw } from 'lucide-react';
import { Progress } from '../ui/progress';

interface FortuneWheelProps {
  userData: {
    isLoggedIn: boolean;
    customerId?: string;
    name?: string;
    segment?: string;
    persona?: string;
  };
  onComplete?: (points: number) => void;
}

interface WheelSegment {
  id: number;
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  probability: number;
  points: number;
}

export const FortuneWheel: React.FC<FortuneWheelProps> = ({ userData, onComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<WheelSegment | null>(null);
  const [canSpin, setCanSpin] = useState(true);
  const [spinsRemaining, setSpinsRemaining] = useState(userData.isLoggedIn ? 3 : 1);
  const [history, setHistory] = useState<WheelSegment[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isFirstSpin, setIsFirstSpin] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);
  const [spinProgress, setSpinProgress] = useState(0);
  const confettiRef = useRef<HTMLDivElement>(null);
  
  // Define wheel segments
  const segments: WheelSegment[] = [
    { 
      id: 1, 
      label: '500 Points', 
      value: '500 pts', 
      icon: <Trophy />, 
      color: '#97144D', 
      probability: 0.05,
      points: 500 
    },
    { 
      id: 2, 
      label: '50 Points', 
      value: '50 pts', 
      icon: <Star />, 
      color: '#12877F', 
      probability: 0.15,
      points: 50 
    },
    { 
      id: 3, 
      label: '10% Off', 
      value: '10% Discount', 
      icon: <Tag />, 
      color: '#ed1164', 
      probability: 0.1,
      points: 100 
    },
    { 
      id: 4, 
      label: '100 Points', 
      value: '100 pts', 
      icon: <Zap />, 
      color: '#404040', 
      probability: 0.1,
      points: 100 
    },
    { 
      id: 5, 
      label: 'Try Again', 
      value: 'No Reward', 
      icon: <CreditCard />, 
      color: '#6e6e6e', 
      probability: 0.2,
      points: 0 
    },
    { 
      id: 6, 
      label: '20 Points', 
      value: '20 pts', 
      icon: <Star />, 
      color: '#16a096', 
      probability: 0.2,
      points: 20 
    },
    { 
      id: 7, 
      label: 'Gift Card', 
      value: '₹100 Gift Card', 
      icon: <Gift />, 
      color: '#7d1041', 
      probability: 0.1,
      points: 200 
    },
    { 
      id: 8, 
      label: '5% Off', 
      value: '5% Discount', 
      icon: <ShoppingBag />, 
      color: '#0e6e67', 
      probability: 0.1,
      points: 50 
    }
  ];
  
  const segmentAngle = 360 / segments.length;
  
  // Function to determine where the wheel lands based on probabilities
  const getRandomSegment = () => {
    const random = Math.random();
    let cumulativeProbability = 0;
    
    for (const segment of segments) {
      cumulativeProbability += segment.probability;
      if (random <= cumulativeProbability) {
        return segment;
      }
    }
    
    return segments[0]; // fallback
  };
  
  // Function to calculate the rotation needed to land on a specific segment
  const calculateTargetRotation = (segment: WheelSegment) => {
    const segmentIndex = segments.findIndex(s => s.id === segment.id);
    const segmentMiddleAngle = segmentIndex * segmentAngle + segmentAngle / 2;
    
    // The needle is at the top (0 degrees), so we need to rotate to the opposite side
    const baseRotation = 360 - segmentMiddleAngle;
    
    // Add extra rotations for effect (between 3 and 5 full rotations)
    const extraRotations = 1080 + Math.floor(Math.random() * 720);
    
    return baseRotation + extraRotations;
  };
  
  const triggerConfetti = (segment: WheelSegment) => {
    if (confettiRef.current && segment.value !== 'No Reward') {
      const rect = confettiRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { 
          x: x / window.innerWidth, 
          y: y / window.innerHeight 
        },
        colors: [segment.color, '#97144D', '#12877F', '#ed1164'],
        zIndex: 1000,
        shapes: ['circle', 'square']
      });
    }
  };
  
  // Spin progress animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSpinning) {
      interval = setInterval(() => {
        setSpinProgress((prev) => {
          const newProgress = prev + 1;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 50);
    } else {
      setSpinProgress(0);
    }
    
    return () => clearInterval(interval);
  }, [isSpinning]);
  
  const handleSpin = () => {
    if (!canSpin || isSpinning) return;
    
    setIsSpinning(true);
    setCanSpin(false);
    setResult(null);
    setIsFirstSpin(false);
    
    // Determine the winning segment based on probabilities
    const winningSegment = getRandomSegment();
    const targetRotation = calculateTargetRotation(winningSegment);
    
    // Set the final rotation (adding to current rotation for continuous spinning)
    setRotation(rotation + targetRotation);
    
    // After the animation completes
    setTimeout(() => {
      setIsSpinning(false);
      setResult(winningSegment);
      setHistory([winningSegment, ...history]);
      setSpinsRemaining(prev => prev - 1);
      setTotalPoints(prev => prev + winningSegment.points);
      
      // Allow another spin if spins remaining
      if (spinsRemaining > 1) {
        setCanSpin(true);
      }
      
      // Trigger confetti for wins
      if (winningSegment.value !== 'No Reward') {
        setTimeout(() => triggerConfetti(winningSegment), 300);
        
        // Call onComplete callback
        if (onComplete) {
          onComplete(winningSegment.points);
        }
      }
    }, 5000); // Duration of spin animation
  };
  
  const resetWheel = () => {
    if (!isSpinning) {
      setCanSpin(true);
      setSpinsRemaining(userData.isLoggedIn ? 3 : 1);
      setResult(null);
      // Keep history for user reference
    }
  };
  
  return (
    <div className="flex flex-col items-center" ref={confettiRef}>
      <div className="w-full max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-8 p-4">
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          {/* Game Stats */}
          <div className="w-full bg-gray-50 rounded-xl p-4 mb-6 flex flex-wrap justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="bg-[#EBF9F8] rounded-full p-2">
                <Clock className="h-5 w-5 text-[#12877F]" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Spins Left</div>
                <div className="font-bold text-lg">{spinsRemaining}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-[#97144D]/10 rounded-full p-2">
                <Coins className="h-5 w-5 text-[#97144D]" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Total Points</div>
                <div className="font-bold text-lg">{totalPoints}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-9 gap-1 text-xs"
                onClick={() => setShowHistory(!showHistory)}
              >
                <History className="h-4 w-4" />
                {showHistory ? 'Hide History' : 'History'}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="h-9 gap-1 text-xs"
                onClick={() => setShowInstructions(!showInstructions)}
              >
                <Info className="h-4 w-4" />
                {showInstructions ? 'Hide Rules' : 'Rules'}
              </Button>
            </div>
          </div>
          
          {/* Wheel Container */}
          <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px]">
            {/* Wheel Shadow */}
            <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.2)] blur-md"></div>
            
            {/* The Wheel */}
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden border-8 border-[#97144D] shadow-lg z-10"
              animate={{ 
                rotate: rotation,
                boxShadow: isSpinning 
                  ? ['0 0 10px rgba(151, 20, 77, 0.5)', '0 0 20px rgba(151, 20, 77, 0.7)', '0 0 10px rgba(151, 20, 77, 0.5)']
                  : '0 0 10px rgba(151, 20, 77, 0.5)'
              }}
              transition={{ 
                rotate: { duration: 5, ease: [0.2, 0.8, 0.2, 1] },
                boxShadow: { duration: 1, repeat: isSpinning ? Infinity : 0, repeatType: 'reverse' }
              }}
            >
              {segments.map((segment, index) => {
                const startAngle = index * segmentAngle;
                return (
                  <div
                    key={segment.id}
                    className="absolute top-0 left-0 w-full h-full text-white flex items-start justify-center overflow-hidden"
                    style={{
                      transform: `rotate(${startAngle}deg)`,
                      transformOrigin: '50% 50%',
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 w-full h-full"
                      style={{
                        clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((segmentAngle * Math.PI) / 180)}% ${50 - 50 * Math.sin((segmentAngle * Math.PI) / 180)}%)`,
                        backgroundColor: segment.color,
                        backgroundImage: `radial-gradient(circle at 50% 50%, ${segment.color} 0%, ${segment.color}cc 100%)`,
                      }}
                    />
                    <div className="absolute top-[15%] left-0 right-0 text-center transform -rotate-90 flex flex-col items-center">
                      <div className="bg-white/20 p-1.5 rounded-full">
                        {React.cloneElement(segment.icon as React.ReactElement, { className: 'h-5 w-5' })}
                      </div>
                      <div className="mt-1 text-sm font-bold whitespace-nowrap px-1 py-0.5 rounded bg-black/10 backdrop-blur-sm">
                        {segment.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
            
            {/* Center of wheel */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white border-4 border-[#97144D] z-20 flex items-center justify-center"
              animate={{ 
                scale: isSpinning ? [1, 1.05, 1] : 1,
                rotate: isSpinning ? 360 : 0
              }}
              transition={{ 
                scale: { duration: 0.5, repeat: isSpinning ? Infinity : 0 },
                rotate: { duration: 2, repeat: isSpinning ? Infinity : 0, ease: "linear" }
              }}
            >
              <img 
                src={"/../../../../public/axis_bank.svg"} 
                alt="Axis" 
                className="w-8 h-8"
              />
            </motion.div>
            
            {/* Wheel pointer/needle */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
              <motion.div
                className="w-12 h-12 flex items-center justify-center"
                animate={{ 
                  y: isSpinning ? [0, -5, 0] : 0
                }}
                transition={{ 
                  y: { duration: 0.3, repeat: isSpinning ? Infinity : 0 }
                }}
              >
                <div className="w-8 h-8 bg-gradient-to-b from-[#97144D] to-[#ed1164] rotate-45 transform origin-center shadow-lg"></div>
              </motion.div>
              <div className="w-2 h-6 bg-[#97144D] -mt-1"></div>
            </div>
            
            {/* Spin Progress */}
            {isSpinning && (
              <div className="absolute -bottom-12 left-0 right-0 flex items-center justify-center">
                <div className="w-full max-w-[240px]">
                  <Progress value={spinProgress} className="h-2" />
                </div>
              </div>
            )}
          </div>
          
          {/* Spin button and remaining spins */}
          <div className="mt-16 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`spin-button-${canSpin}-${isSpinning}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {canSpin && !isSpinning ? (
                  <Button
                    onClick={handleSpin}
                    className="bg-gradient-to-r from-[#97144D] to-[#b01d5c] hover:opacity-90 text-white px-10 py-6 text-lg rounded-full shadow-lg transition-all"
                  >
                    {isFirstSpin ? (
                      <span className="flex items-center gap-2">
                        SPIN <Sparkles className="h-5 w-5" />
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        SPIN AGAIN <RotateCw className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                ) : isSpinning ? (
                  <div className="text-lg font-bold text-[#97144D] animate-pulse flex items-center gap-2">
                    <span className="relative flex h-5 w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#97144D] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-[#97144D]"></span>
                    </span>
                    Spinning...
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-gray-600">No more spins left!</p>
                    <Button
                      variant="outline"
                      onClick={resetWheel}
                      className="border-[#97144D] text-[#97144D] hover:bg-[#97144D] hover:text-white"
                    >
                      Reset Demo <RotateCw className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2">
          <AnimatePresence mode="wait">
            {showInstructions ? (
              <motion.div
                key="instructions"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl border-2 border-[#EBF9F8] p-6 overflow-hidden"
              >
                <h3 className="text-xl font-bold mb-4 text-[#12877F] flex items-center">
                  <Info className="h-5 w-5 mr-2" /> How to Play
                </h3>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-[#EBF9F8] rounded-full p-1.5 mt-0.5">
                      <span className="text-[#12877F] font-bold text-sm">1</span>
                    </div>
                    <span className="text-gray-700">Click the "SPIN" button to rotate the wheel</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-[#EBF9F8] rounded-full p-1.5 mt-0.5">
                      <span className="text-[#12877F] font-bold text-sm">2</span>
                    </div>
                    <span className="text-gray-700">Wait for the wheel to stop spinning to see your reward</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-[#EBF9F8] rounded-full p-1.5 mt-0.5">
                      <span className="text-[#12877F] font-bold text-sm">3</span>
                    </div>
                    <span className="text-gray-700">Each day you get up to three free spins</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-[#EBF9F8] rounded-full p-1.5 mt-0.5">
                      <span className="text-[#12877F] font-bold text-sm">4</span>
                    </div>
                    <span className="text-gray-700">Points are automatically added to your account balance</span>
                  </li>
                </ul>
                
                <div className="bg-[#97144D]/10 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-[#97144D] flex items-center">
                    <Gift className="h-4 w-4 mr-1" /> Rewards
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Win up to 500 reward points, discount coupons, or exclusive offers. Points can be redeemed for gift cards, special experiences, or account benefits.
                  </p>
                </div>
                
                <Button 
                  className="mt-4 w-full"
                  variant="outline"
                  onClick={() => setShowInstructions(false)}
                >
                  Got it!
                </Button>
              </motion.div>
            ) : showHistory ? (
              <motion.div
                key="history"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl border-2 border-[#97144D]/20 p-6 overflow-hidden"
              >
                <h3 className="text-xl font-bold mb-4 text-[#97144D] flex items-center">
                  <History className="h-5 w-5 mr-2" /> Spin History
                </h3>
                
                {history.length > 0 ? (
                  <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2">
                    {history.map((item, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-center p-3 rounded-lg border hover:shadow-sm transition-shadow"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                          style={{ backgroundColor: item.color }}
                        >
                          {React.cloneElement(item.icon as React.ReactElement, { 
                            className: 'h-5 w-5 text-white'
                          })}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-gray-500">
                            {i === 0 ? 'Just now' : i === 1 ? '1 spin ago' : `${i} spins ago`}
                          </div>
                        </div>
                        <Badge 
                          className="text-white"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.value}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    <div className="mb-3">
                      <RotateCw className="h-12 w-12 mx-auto opacity-20" />
                    </div>
                    <p>Spin the wheel to see your history</p>
                  </div>
                )}
                
                <Button 
                  className="mt-4 w-full"
                  variant="outline"
                  onClick={() => setShowHistory(false)}
                >
                  Close History
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl border-2 p-6 text-center h-full flex flex-col justify-center"
                style={{ 
                  borderColor: result ? result.color : 'rgba(0,0,0,0.1)',
                  background: result 
                    ? `linear-gradient(to bottom, white, white, ${result.color}10)` 
                    : 'white'
                }}
              >
                <h3 className="text-xl font-bold mb-4">Your Spin Result</h3>
                
                {result ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="flex flex-col items-center"
                  >
                    <motion.div 
                      className="w-28 h-28 rounded-full flex items-center justify-center mb-6 shadow-lg"
                      style={{ backgroundColor: result.color }}
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, 0, -5, 0]
                      }}
                      transition={{ 
                        duration: 1,
                        repeat: 1,
                        repeatType: 'reverse'
                      }}
                    >
                      {React.cloneElement(result.icon as React.ReactElement, { 
                        className: 'h-14 w-14 text-white'
                      })}
                    </motion.div>
                    
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h4 className="text-3xl font-bold mb-3">{result.value}</h4>
                      
                      <p className="text-gray-600 mb-4">
                        {result.value === 'No Reward' 
                          ? 'Better luck next time!' 
                          : 'Congratulations! You won:'}
                      </p>
                      
                      {result.value !== 'No Reward' && (
                        <div className="flex flex-col items-center gap-3">
                          <Badge 
                            className="px-4 py-1.5 text-white text-lg"
                            style={{ backgroundColor: result.color }}
                          >
                            {result.label}
                          </Badge>
                          
                          {userData.isLoggedIn ? (
                            <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                              Added to your account
                            </div>
                          ) : (
                            <div className="mt-4 p-3 bg-[#97144D]/5 rounded-lg">
                              <p className="text-sm text-[#97144D]">
                                <span className="font-bold">Sign in</span> to save your rewards!
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                ) : (
                  <div className="py-10 flex flex-col items-center justify-center">
                    {isSpinning ? (
                      <div className="flex flex-col items-center">
                        <motion.div
                          animate={{ 
                            rotate: 360,
                            scale: [1, 1.2, 1] 
                          }}
                          transition={{ 
                            rotate: { repeat: Infinity, duration: 1, ease: "linear" },
                            scale: { repeat: Infinity, duration: 1.5, repeatType: "reverse" }
                          }}
                          className="relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#97144D] to-[#12877F] rounded-full opacity-20 blur-md"></div>
                          <div className="relative w-20 h-20 border-4 border-t-[#97144D] border-r-[#12877F] border-b-[#97144D] border-l-[#12877F] rounded-full"></div>
                        </motion.div>
                        <p className="mt-4 text-lg font-medium text-gray-600">Good luck!</p>
                        <p className="text-sm text-gray-500">The wheel is spinning...</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="mb-4">
                          <Gift className="h-16 w-16 mx-auto text-gray-300" />
                        </div>
                        <p className="text-gray-500 mb-4">Spin the wheel to discover your reward</p>
                        <div className="flex justify-center">
                          <Badge className="bg-[#EBF9F8] text-[#12877F] px-3 py-1">
                            Prizes include points, discounts & more
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};