import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CreditCard, Landmark, Coins, PiggyBank, Banknote, Wallet, Receipt, Clock, Plus, Minus, RotateCw, Award, Trophy, Medal, Zap, AlertCircle, CheckCircle, XCircle, ArrowRight, BrainCircuit } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Card, CardContent } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface FinancialMatchProps {
  userData: {
    isLoggedIn: boolean;
    customerId?: string;
    name?: string;
    segment?: string;
    persona?: string;
  };
  onComplete?: (points: number) => void;
}

interface MatchCard {
  id: number;
  icon: React.ReactNode;
  label: string;
  matchId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

// Difficulty levels
type Difficulty = 'easy' | 'medium' | 'hard';

export const FinancialMatch: React.FC<FinancialMatchProps> = ({ userData, onComplete }) => {
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [initialTimer, setInitialTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [showHint, setShowHint] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [animateSuccess, setAnimateSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const confettiRef = useRef<HTMLDivElement>(null);
  
  // Icons for cards
  const cardIcons = [
    { icon: <CreditCard className="h-8 w-8" />, label: 'Credit Card' },
    { icon: <Landmark className="h-8 w-8" />, label: 'Bank' },
    { icon: <Coins className="h-8 w-8" />, label: 'Coins' },
    { icon: <PiggyBank className="h-8 w-8" />, label: 'Savings' },
    { icon: <Banknote className="h-8 w-8" />, label: 'Cash' },
    // { icon: <ChartBar className="h-8 w-8" />, label: 'Investment' },
    { icon: <Wallet className="h-8 w-8" />, label: 'Wallet' },
    { icon: <Receipt className="h-8 w-8" />, label: 'Receipt' },
  ];
  
  // Number of pairs for each difficulty
  const difficultyPairs = {
    easy: 6,
    medium: 8,
    hard: 12
  };
  
  // Time limits for each difficulty
  const difficultyTimes = {
    easy: 60,
    medium: 90,
    hard: 120
  };

  // Difficulty descriptions
  const difficultyDescriptions = {
    easy: "6 pairs to match with 60 seconds",
    medium: "8 pairs to match with 90 seconds",
    hard: "12 pairs to match with 120 seconds"
  };
  
  // Start countdown before game
  const startCountdown = () => {
    setIsCountingDown(true);
    setCountdown(3);
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setIsCountingDown(false);
          startGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  // Initialize game
  const initializeGame = (selectedDifficulty: Difficulty = difficulty) => {
    setDifficulty(selectedDifficulty);
    setGameStarted(true);
    setInitialTimer(difficultyTimes[selectedDifficulty]);
    
    // Start countdown before the actual game
    startCountdown();
  };
  
  // Start the actual game after countdown
  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setMoves(0);
    setScore(0);
    setTimer(difficultyTimes[difficulty]);
    setFlippedCount(0);
    setFlippedIndexes([]);
    setShowHint(false);
    
    const numPairs = difficultyPairs[difficulty];
    const shuffledIcons = [...cardIcons].sort(() => Math.random() - 0.5).slice(0, numPairs);
    
    // Create pairs
    let cardPairs: MatchCard[] = [];
    shuffledIcons.forEach((item, index) => {
      const matchId = index + 1;
      // Create two cards with the same matchId
      cardPairs.push({
        id: matchId * 2 - 1,
        icon: item.icon,
        label: item.label,
        matchId,
        isFlipped: false,
        isMatched: false
      });
      cardPairs.push({
        id: matchId * 2,
        icon: item.icon,
        label: item.label,
        matchId,
        isFlipped: false,
        isMatched: false
      });
    });
    
    // Shuffle the cards
    cardPairs = cardPairs.sort(() => Math.random() - 0.5);
    setCards(cardPairs);
  };
  
  // Start timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timer > 0 && !gameOver) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0 && isPlaying) {
      setGameOver(true);
      setIsPlaying(false);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, timer, gameOver]);
  
  // Check if game is complete
  useEffect(() => {
    if (cards.length > 0 && !cards.some(card => !card.isMatched) && isPlaying) {
      setGameOver(true);
      setIsPlaying(false);
      
      // Calculate score based on difficulty, remaining time, and moves
      const timeBonus = timer * 2;
      const difficultyMultiplier = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 1.5 : 2;
      const movesPenalty = Math.max(0, 100 - moves * 2);
      const calculatedScore = Math.floor((timeBonus + movesPenalty) * difficultyMultiplier);
      setScore(calculatedScore);
      
      // Show celebration
      setShowCelebration(true);
      
      // Call onComplete callback
      if (onComplete) {
        onComplete(calculatedScore);
      }
      
      // Trigger confetti for winning
      setTimeout(() => {
        if (confettiRef.current) {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#97144D', '#ED1164', '#ed1164', '#7d1041']
          });
        }
      }, 500);
    }
  }, [cards, isPlaying, difficulty, timer, moves, onComplete]);
  
  // Handle card flip
  const flipCard = (index: number) => {
    if (!isPlaying || gameOver) return;
    
    // Prevent flipping already matched or flipped cards
    if (cards[index].isMatched || cards[index].isFlipped) return;
    
    // Prevent flipping more than 2 cards at once
    if (flippedCount === 2) return;
    
    // Flip the card
    let newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    
    // Add to flipped cards
    const newFlippedIndexes = [...flippedIndexes, index];
    setFlippedIndexes(newFlippedIndexes);
    setFlippedCount(newFlippedIndexes.length);
    
    // Check for match if 2 cards are flipped
    if (newFlippedIndexes.length === 2) {
      setMoves(moves + 1);
      
      const firstIndex = newFlippedIndexes[0];
      const secondIndex = newFlippedIndexes[1];
      
      if (newCards[firstIndex].matchId === newCards[secondIndex].matchId) {
        // It's a match
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setCards(newCards);
        
        // Animate success
        setAnimateSuccess(true);
        setTimeout(() => setAnimateSuccess(false), 800);
        
        // Reset flipped count and indexes
        setFlippedCount(0);
        setFlippedIndexes([]);
      } else {
        // Not a match, flip back after delay
        setTimeout(() => {
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
          setCards(newCards);
          
          // Reset flipped count and indexes
          setFlippedCount(0);
          setFlippedIndexes([]);
        }, 1000);
      }
    }
  };
  
  // Show hint (brief flash of all cards)
  const handleShowHint = () => {
    if (!isPlaying || gameOver) return;
    
    setShowHint(true);
    
    // Flash all cards
    let newCards = cards.map(card => ({
      ...card,
      isFlipped: true
    }));
    setCards(newCards);
    
    // Reset after 1 second
    setTimeout(() => {
      newCards = newCards.map(card => ({
        ...card,
        isFlipped: card.isMatched
      }));
      setCards(newCards);
      setShowHint(false);
    }, 1000);
    
    // Penalty for using hint
    setTimer(prev => Math.max(0, prev - 10));
  };
  
  // Calculate grid layout based on difficulty
  const getGridLayout = () => {
    switch (difficulty) {
      case 'easy':
        return 'grid-cols-3 md:grid-cols-4';
      case 'medium':
        return 'grid-cols-4 md:grid-cols-4';
      case 'hard':
        return 'grid-cols-4 md:grid-cols-6';
      default:
        return 'grid-cols-3 md:grid-cols-4';
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto" ref={confettiRef}>
      {/* Game header with timer, moves, etc. */}
      {isPlaying && !gameOver && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-md mb-6 overflow-hidden">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 p-3">
            <div className="flex items-center gap-2 bg-[#FFF0F6] rounded-lg p-2 justify-center">
              <Clock className="h-4 w-4 text-[#ED1164]" />
              <span className={`font-bold ${timer <= 10 ? 'text-red-500 animate-pulse' : 'text-[#ED1164]'}`}>
                {timer}s
              </span>
            </div>
            
            <div className="flex items-center gap-2 bg-[#97144D]/10 rounded-lg p-2 justify-center">
              <RotateCw className="h-4 w-4 text-[#97144D]" />
              <span className="font-bold text-[#97144D]">{moves} Moves</span>
            </div>
            
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2 justify-center">
              <Badge className="bg-white text-gray-700 border-none">
                {difficulty.toUpperCase()}
              </Badge>
            </div>
            
            <div className="flex items-center justify-center col-span-2 md:col-span-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShowHint}
                disabled={showHint}
                className="h-9 px-3 text-xs gap-1"
              >
                <Minus className="h-3 w-3" /> Hint (-10s)
              </Button>
            </div>
            
            <div className="flex items-center justify-center md:col-span-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => initializeGame()}
                className="h-9 px-3 text-xs gap-1"
              >
                <RotateCw className="h-3 w-3" /> Restart
              </Button>
            </div>
          </div>
          
          <div className="w-full bg-gray-100 h-2">
            <div 
              className="h-full bg-gradient-to-r from-[#97144D] to-[#ED1164]"
              style={{ width: `${(timer / initialTimer) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Game Board */}
      <div className="relative">
        {!gameStarted ? (
          <Card className="bg-white border-0 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#ED1164] to-[#F04A86] text-white p-6">
              <h3 className="text-2xl font-bold flex items-center mb-2">
                <BrainCircuit className="h-6 w-6 mr-2" /> 
                Financial Match Challenge
              </h3>
              <p className="opacity-90">
                Test your memory by matching financial cards while learning about banking concepts
              </p>
            </div>
            
            <CardContent className="p-6">
              <div className="mb-8">
                <h4 className="font-bold text-lg mb-4">Select Difficulty</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(['easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
                    <motion.div
                      key={level}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        difficulty === level 
                          ? 'border-[#ED1164] shadow-md shadow-[#ED1164]/20'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setDifficulty(level)}
                    >
                      <div className={`p-4 text-center ${
                        difficulty === level ? 'bg-[#FFF0F6]' : 'bg-white'
                      }`}>
                        <div className="font-bold mb-1 capitalize">
                          {level}
                        </div>
                        <div className="text-xs text-gray-500">
                          {difficultyDescriptions[level]}
                        </div>
                      </div>
                      
                      {difficulty === level && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className="h-5 w-5 text-[#ED1164]" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-1 bg-[#FFF0F6] rounded-lg p-4">
                  <h4 className="font-bold text-[#ED1164] mb-2 flex items-center">
                    <Zap className="h-4 w-4 mr-2" /> How to Play
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-[#ED1164] mt-0.5 flex-shrink-0" />
                      <span>Flip cards to find matching pairs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-[#ED1164] mt-0.5 flex-shrink-0" />
                      <span>Match all pairs before time runs out</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-[#ED1164] mt-0.5 flex-shrink-0" />
                      <span>Fewer moves earn you more points</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex-1 bg-[#97144D]/10 rounded-lg p-4">
                  <h4 className="font-bold text-[#97144D] mb-2 flex items-center">
                    <Trophy className="h-4 w-4 mr-2" /> Rewards
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <Medal className="h-4 w-4 text-[#97144D] mt-0.5 flex-shrink-0" />
                      <span>Time bonus: 2 points per second left</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Medal className="h-4 w-4 text-[#97144D] mt-0.5 flex-shrink-0" />
                      <span>Difficulty bonus: up to 2x multiplier</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Medal className="h-4 w-4 text-[#97144D] mt-0.5 flex-shrink-0" />
                      <span>Efficiency bonus: fewer moves = more points</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  className="bg-gradient-to-r from-[#ED1164] to-[#F04A86] hover:opacity-90 text-white px-6 py-6 text-lg"
                  onClick={() => initializeGame(difficulty)}
                >
                  Start Game
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div>
            {/* Countdown overlay */}
            <AnimatePresence>
              {isCountingDown && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center rounded-xl"
                >
                  <motion.div
                    key={countdown}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-white text-7xl font-bold"
                  >
                    {countdown}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Game success animation */}
            <AnimatePresence>
              {animateSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#ED1164]/20 backdrop-blur-[2px] z-40 flex items-center justify-center rounded-xl"
                >
                  <motion.div
                    initial={{ scale: 0.5, rotate: -10 }}
                    animate={{ scale: 1.2, rotate: 0 }}
                    exit={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.4, type: 'spring' }}
                  >
                    <CheckCircle className="h-20 w-20 text-[#ED1164]" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Game celebration overlay */}
            <AnimatePresence>
              {showCelebration && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-b from-[#ED1164]/90 to-[#ED1164]/70 backdrop-blur-sm z-30 flex items-center justify-center rounded-xl"
                >
                  <motion.div
                    initial={{ scale: 0.8, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center text-white p-6 max-w-md"
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        scale: [1, 1.1, 1] 
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: 'reverse'
                      }}
                    >
                      <Trophy className="h-16 w-16 text-yellow-300 mx-auto mb-4" />
                    </motion.div>
                    
                    <h2 className="text-3xl font-bold mb-2">Awesome Job!</h2>
                    <p className="mb-4 opacity-90">
                      You've matched all the cards in {moves} moves with {timer} seconds left!
                    </p>
                    
                    <div className="text-5xl font-bold mb-6">
                      {score} Points
                    </div>
                    
                    <Button
                      onClick={() => {
                        setShowCelebration(false);
                        setGameStarted(false);
                      }}
                      className="bg-white text-[#ED1164] hover:bg-white/90"
                    >
                      Continue
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {gameOver && !showCelebration ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="overflow-hidden border-0 shadow-xl">
                  <div className={`p-6 text-white ${
                    cards.every(card => card.isMatched)
                      ? 'bg-gradient-to-r from-[#ED1164] to-[#F04A86]'
                      : 'bg-gradient-to-r from-[#97144D] to-[#b01d5c]'
                  }`}>
                    <h3 className="text-xl font-bold mb-2 flex items-center">
                      {cards.every(card => card.isMatched) ? (
                        <>
                          <Trophy className="h-5 w-5 mr-2" /> 
                          Congratulations!
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-5 w-5 mr-2" /> 
                          Time's Up!
                        </>
                      )}
                    </h3>
                    <p className="opacity-90">
                      {cards.every(card => card.isMatched)
                        ? `You matched all cards in ${moves} moves with ${timer} seconds remaining!`
                        : 'You ran out of time. Try again to match all the cards.'}
                    </p>
                  </div>
                  
                  <CardContent className="p-6">
                    {cards.every(card => card.isMatched) && (
                      <div className="mb-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-[#ED1164] mb-4">
                            {score} Points
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-6">
                            <div className="bg-gray-50 p-3 rounded-lg text-center">
                              <div className="text-xs text-gray-500">Moves</div>
                              <div className="font-bold">{moves}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg text-center">
                              <div className="text-xs text-gray-500">Time Left</div>
                              <div className="font-bold">{timer}s</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg text-center">
                              <div className="text-xs text-gray-500">Difficulty</div>
                              <div className="font-bold capitalize">{difficulty}</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 justify-center mb-4">
                            {score >= 200 && (
                              <Badge className="bg-yellow-500 text-white">
                                Memory Master
                              </Badge>
                            )}
                            {moves <= difficultyPairs[difficulty] * 2 && (
                              <Badge className="bg-[#ED1164] text-white">
                                Efficiency Expert
                              </Badge>
                            )}
                            {difficulty === 'hard' && cards.every(card => card.isMatched) && (
                              <Badge className="bg-[#97144D] text-white">
                                Challenge Champion
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        onClick={() => initializeGame(difficulty)}
                        className="bg-[#ED1164] hover:bg-[#C70D53] text-white"
                      >
                        Play Again
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => {
                          setGameStarted(false);
                          setGameOver(false);
                        }}
                      >
                        Change Difficulty
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                {/* Cards */}
                <div className={`grid ${getGridLayout()} gap-3`}>
                  {cards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.03 }}
                      className="aspect-square"
                    >
                      <motion.div
                        className={`w-full h-full cursor-pointer rounded-lg transition-all duration-300 transform perspective-[1000px] ${ 
                          card.isMatched ? 'opacity-80' : '' 
                        }`}
                        style={{ transformStyle: 'preserve-3d' }}
                        onClick={() => flipCard(index)}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          rotateY: card.isFlipped ? 180 : 0,
                          boxShadow: card.isMatched 
                            ? '0 0 0 2px rgba(18, 135, 127, 0.5)' 
                            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }}
                      >
                        {/* Card Back */}
                        <div
                          className="absolute inset-0 w-full h-full flex items-center justify-center rounded-lg backface-hidden bg-gradient-to-br from-[#ED1164] to-[#F04A86]"
                          style={{ backfaceVisibility: 'hidden' }}
                        >
                          <div className="relative w-12 h-12">
                            <div className="absolute inset-0 bg-white/10 rounded-full animate-ping"></div>
                            <div className="relative bg-white/20 rounded-full p-2">
                              <img
                                src="https://www.axisbank.com/assets/images/logo-icon-white.svg"
                                alt="Axis Bank"
                                className="w-8 h-8"
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Card Front */}
                        <div
                          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-white border-2 rounded-lg backface-hidden"
                          style={{ 
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                            borderColor: card.isMatched ? '#ED1164' : '#e5e7eb',
                            background: card.isMatched ? 'linear-gradient(to bottom, white, #FFF0F6)' : 'white'
                          }}
                        >
                          <div className={`p-3 rounded-full mb-2 ${
                            card.isMatched 
                              ? 'bg-[#ED1164] text-white'
                              : 'bg-[#FFF0F6] text-[#ED1164]'
                          }`}>
                            {card.icon}
                          </div>
                          <div className="text-center px-2">
                            <div className="font-medium text-gray-800">
                              {card.label}
                            </div>
                            {card.isMatched && (
                              <div className="text-xs text-[#ED1164] mt-1">
                                Matched!
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
