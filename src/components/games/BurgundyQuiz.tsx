import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { BookOpen, Clock, Award, CheckCircle, XCircle, AlertCircle, BarChart, ChevronRight, ThumbsUp, Star, Trophy, Sparkles, Lightbulb, Zap, ArrowRight, BarChart2, BrainCircuit, Eye, CreditCard, Landmark, PiggyBank, Smartphone } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface BurgundyQuizProps {
  userData: {
    isLoggedIn: boolean;
    customerId?: string;
    name?: string;
    segment?: string;
    persona?: string;
  };
  onComplete?: (points: number) => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'savings' | 'investment' | 'loans' | 'cards' | 'digital' | 'general';
  image?: string;
}

interface QuizResult {
  questionsAttempted: number;
  correctAnswers: number;
  score: number;
  timeTaken: number;
  badges: string[];
}

export const BurgundyQuiz: React.FC<BurgundyQuizProps> = ({ userData, onComplete }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [timer, setTimer] = useState(30);
  const [timerWidth, setTimerWidth] = useState(100);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [category, setCategory] = useState<string>('all');
  const [difficulty, setDifficulty] = useState<string>('all');
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [showStreak, setShowStreak] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const confettiRef = useRef<HTMLDivElement>(null);
  
  // Colors for categories
  const categoryColors: Record<string, string> = {
    savings: '#ED1164',
    investment: '#97144D',
    loans: '#7d1041',
    cards: '#ed1164',
    digital: '#F04A86',
    general: '#606060'
  };
  
  // Category icons
  const categoryIcons: Record<string, React.ReactNode> = {
    savings: <PiggyBank className="h-5 w-5" />,
    investment: <BarChart2 className="h-5 w-5" />,
    loans: <Landmark className="h-5 w-5" />,
    cards: <CreditCard className="h-5 w-5" />,
    digital: <Smartphone className="h-5 w-5" />,
    general: <BrainCircuit className="h-5 w-5" />
  };
  
  // Sample quiz questions
  const allQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the primary benefit of a Fixed Deposit account?",
      options: [
        "Higher liquidity than a savings account",
        "Fixed interest rate for the deposit term",
        "No minimum balance requirement",
        "Unlimited withdrawals"
      ],
      correctAnswer: 1,
      explanation: "Fixed Deposits offer a guaranteed fixed interest rate for the entire term of the deposit, providing stable returns regardless of market fluctuations.",
      difficulty: "easy",
      category: "savings"
    },
    {
      id: 2,
      question: "What is the main purpose of a Systematic Investment Plan (SIP)?",
      options: [
        "To invest a lump sum amount once a year",
        "To invest regularly in small amounts",
        "To provide emergency funds",
        "To reduce tax liability"
      ],
      correctAnswer: 1,
      explanation: "A SIP allows investors to invest small amounts regularly (typically monthly) in mutual funds, helping build wealth through disciplined investing and rupee cost averaging.",
      difficulty: "medium",
      category: "investment",
      image: "https://images.unsplash.com/photo-1565514020179-026b92b2ed33?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      question: "Which of the following credit card practices can help improve your credit score?",
      options: [
        "Using your entire credit limit regularly",
        "Paying only the minimum amount due",
        "Paying the full balance before the due date",
        "Having multiple credit cards with balances"
      ],
      correctAnswer: 2,
      explanation: "Paying your credit card balance in full before the due date demonstrates responsible credit management and helps improve your credit score over time.",
      difficulty: "easy",
      category: "cards"
    },
    {
      id: 4,
      question: "What is the main difference between a credit card and a debit card?",
      options: [
        "Credit cards can only be used online",
        "Debit cards have higher transaction limits",
        "Credit cards use borrowed money while debit cards use your own funds",
        "Debit cards offer more rewards points"
      ],
      correctAnswer: 2,
      explanation: "When you use a credit card, you're borrowing money from the card issuer with an obligation to repay, while a debit card directly withdraws money from your bank account.",
      difficulty: "easy",
      category: "cards"
    },
    {
      id: 5,
      question: "Which of these is NOT typically considered a liquid asset?",
      options: [
        "Cash in your wallet",
        "Money in your savings account",
        "Real estate property",
        "Money market funds"
      ],
      correctAnswer: 2,
      explanation: "Real estate is not considered a liquid asset because it typically takes time to sell and convert to cash, unlike the other options which can be quickly accessed or converted.",
      difficulty: "medium",
      category: "investment"
    },
    {
      id: 6,
      question: "What is the purpose of a UPI (Unified Payments Interface)?",
      options: [
        "To secure loan applications",
        "To facilitate instant fund transfers between bank accounts",
        "To provide credit scores",
        "To generate investment reports"
      ],
      correctAnswer: 1,
      explanation: "UPI is a payment system that allows users to link multiple bank accounts in a single mobile application and make instant fund transfers between bank accounts 24/7.",
      difficulty: "easy",
      category: "digital",
      image: "https://images.unsplash.com/photo-1621768216848-c922d527d59c?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 7,
      question: "What is typically the highest risk investment option among these?",
      options: [
        "Government bonds",
        "Fixed deposits",
        "Equity mutual funds",
        "Savings account"
      ],
      correctAnswer: 2,
      explanation: "Equity mutual funds invest primarily in stocks, which generally carry higher risk than the other options listed, but also offer potential for higher returns over the long term.",
      difficulty: "medium",
      category: "investment"
    },
    {
      id: 8,
      question: "What does EMI stand for in the context of loans?",
      options: [
        "Extra Money Interest",
        "Equated Monthly Installment",
        "Extended Monetary Investment",
        "Early Maturity Incentive"
      ],
      correctAnswer: 1,
      explanation: "EMI stands for Equated Monthly Installment, which is a fixed payment amount made by a borrower to a lender on a specified date each month until the loan is fully repaid.",
      difficulty: "easy",
      category: "loans"
    },
    {
      id: 9,
      question: "Which of these factors does NOT directly affect your credit score?",
      options: [
        "Payment history",
        "Your salary amount",
        "Length of credit history",
        "Credit utilization ratio"
      ],
      correctAnswer: 1,
      explanation: "While your income may affect your ability to get credit, your salary amount itself is not a direct factor in calculating your credit score. Credit scores focus on how you manage debt, not how much you earn.",
      difficulty: "hard",
      category: "general"
    },
    {
      id: 10,
      question: "What is the primary advantage of enabling two-factor authentication for banking apps?",
      options: [
        "Faster login process",
        "Reduced data usage",
        "Enhanced security for transactions",
        "Higher transaction limits"
      ],
      correctAnswer: 2,
      explanation: "Two-factor authentication adds an extra layer of security by requiring something you know (password) and something you have (like a phone for OTP), making unauthorized access much more difficult.",
      difficulty: "medium",
      category: "digital"
    }
  ];
  
  // Filter and prepare questions
  const prepareQuestions = () => {
    setLoadingQuestions(true);
    
    // Filter questions based on selected category and difficulty
    let filteredQuestions = [...allQuestions];
    
    if (category !== 'all') {
      filteredQuestions = filteredQuestions.filter(q => q.category === category);
    }
    
    if (difficulty !== 'all') {
      filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty);
    }
    
    // Shuffle and take 5 questions
    const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    
    setQuestions(selected);
    setUserAnswers(new Array(selected.length).fill(null));
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswerSubmitted(false);
    setTimer(30);
    setTimerWidth(100);
    setStreakCount(0);
    setShowStreak(false);
    
    setTimeout(() => {
      setLoadingQuestions(false);
    }, 800);
  };
  
  // Start the quiz
  const startQuiz = () => {
    prepareQuestions();
    setQuizStarted(true);
    setQuizCompleted(false);
    setQuizResult(null);
  };
  
  // Handle timer
  useEffect(() => {
    if (quizStarted && !quizCompleted && !answerSubmitted && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
        setTimerWidth(prevWidth => (prevWidth - (100 / 30)));
      }, 1000);
    } else if (timer === 0 && !answerSubmitted && quizStarted) {
      handleAnswerSubmit();
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [quizStarted, quizCompleted, answerSubmitted, timer]);
  
  // Handle answer selection
  const handleAnswerSelect = (index: number) => {
    if (!answerSubmitted) {
      setSelectedAnswer(index);
    }
  };
  
  // Submit answer
  const handleAnswerSubmit = () => {
    if (answerSubmitted) return;
    
    setAnswerSubmitted(true);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Record the answer
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = selectedAnswer;
    setUserAnswers(newUserAnswers);
    
    // Check if answer is correct and update streak
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      const newStreakCount = streakCount + 1;
      setStreakCount(newStreakCount);
      
      // Show streak animation for streaks of 2 or more
      if (newStreakCount >= 2) {
        setShowStreak(true);
        setTimeout(() => setShowStreak(false), 1500);
      }
      
      // Award extra points for streaks
      const streakPoints = newStreakCount >= 3 ? 30 : newStreakCount === 2 ? 10 : 0;
      setTotalPoints(prev => prev + 50 + streakPoints);
      
      // Trigger mini confetti for correct answer
      if (confettiRef.current) {
        confetti({
          particleCount: 30,
          spread: 40,
          origin: { y: 0.5, x: 0.5 },
          colors: ['#97144D', '#ED1164'],
          disableForReducedMotion: true
        });
      }
    } else {
      // Reset streak on wrong answer
      setStreakCount(0);
    }
  };
  
  // Move to next question
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswerSubmitted(false);
      setTimer(30);
      setTimerWidth(100);
      setShowExplanation(false);
    } else {
      // Quiz completed
      completeQuiz();
    }
  };
  
  // Complete the quiz and calculate results
  const completeQuiz = () => {
    setQuizCompleted(true);
    
    // Calculate results
    const questionsAttempted = userAnswers.filter(answer => answer !== null).length;
    const correctAnswers = userAnswers.reduce<number>((total, answer, index) => {
      return answer === questions[index].correctAnswer ? total + 1 : total;
    }, 0);
    
    // Calculate score (base: 50 points per correct answer)
    const baseScore = correctAnswers * 50;
    // Bonus for difficulty
    const difficultyBonus = difficulty === 'easy' ? 0 : difficulty === 'medium' ? 50 : 100;
    // Time bonus (if completed)
    const timeBonus = questionsAttempted === questions.length ? 25 : 0;
    
    const totalScore = baseScore + difficultyBonus + timeBonus;
    
    // Award badges
    const badges = [];
    if (correctAnswers === questions.length) badges.push('Perfect Score');
    if (correctAnswers >= Math.floor(questions.length * 0.7)) badges.push('Financial Wizard');
    if (difficulty === 'hard') badges.push('Challenge Accepted');
    if (category !== 'all') badges.push(`${category.charAt(0).toUpperCase() + category.slice(1)} Expert`);
    
    const result: QuizResult = {
      questionsAttempted,
      correctAnswers,
      score: totalScore,
      timeTaken: 30 * questions.length - timer,
      badges
    };
    
    setQuizResult(result);
    
    // Call onComplete callback
    if (onComplete) {
      onComplete(totalScore);
    }
    
    // Trigger confetti for good results
    if (correctAnswers >= Math.floor(questions.length * 0.6)) {
      setShowConfetti(true);
      setTimeout(() => {
        if (confettiRef.current) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#97144D', '#ED1164', '#ed1164', '#7d1041']
          });
        }
      }, 500);
      
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
  };
  
  // Get difficulty badge color
  const getDifficultyColor = (diffLevel: string) => {
    switch (diffLevel) {
      case 'easy':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'hard':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto" ref={confettiRef}>
      {/* Streak animation */}
      <AnimatePresence>
        {showStreak && (
          <motion.div
            initial={{ scale: 0.5, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          >
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold text-[#97144D] drop-shadow-lg flex items-center">
                <Zap className="h-10 w-10 text-yellow-400 mr-2" />
                {streakCount}x Streak!
              </div>
              <div className="text-white bg-[#97144D] px-3 py-1 rounded-full mt-2 text-sm font-bold">
                +{streakCount >= 3 ? '30' : '10'} bonus points
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti celebration */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-40 flex items-center justify-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0] 
              }}
              transition={{ duration: 1, repeat: 2 }}
              className="bg-gradient-to-r from-[#97144D] to-[#ED1164] text-white p-6 rounded-xl shadow-xl"
            >
              <Trophy className="h-16 w-16 text-yellow-300 mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-center">Great Job!</h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!quizStarted ? (
        <Card className="shadow-xl border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-[#97144D] to-[#b01d5c] text-white p-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
              <BookOpen className="h-6 w-6" /> Burgundy Financial Quiz
            </h2>
            <p className="opacity-90">
              Test your financial knowledge, learn new concepts, and earn rewards
            </p>
          </div>
          
          <CardContent className="p-6">
            <Tabs defaultValue="categories" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="difficulty">Difficulty</TabsTrigger>
              </TabsList>
              
              <TabsContent value="categories" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative cursor-pointer rounded-lg overflow-hidden ${
                      category === 'all' ? 'ring-2 ring-[#97144D]' : ''
                    }`}
                    onClick={() => setCategory('all')}
                  >
                    <div className="bg-gradient-to-r from-[#97144D] to-[#ED1164] p-4 text-white text-center">
                      <BrainCircuit className="h-10 w-10 mx-auto mb-2" />
                      <div className="font-bold">All Topics</div>
                      <div className="text-xs opacity-80">Mixed questions</div>
                    </div>
                    
                    {category === 'all' && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </motion.div>
                  
                  {Object.keys(categoryColors).map((cat) => (
                    <motion.div
                      key={cat}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative cursor-pointer rounded-lg overflow-hidden ${
                        category === cat ? `ring-2 ring-[${categoryColors[cat]}]` : ''
                      }`}
                      onClick={() => setCategory(cat)}
                    >
                      <div className="p-4 text-center" style={{ backgroundColor: categoryColors[cat], color: 'white' }}>
                        {categoryIcons[cat] && React.cloneElement(categoryIcons[cat] as React.ReactElement, {
                          className: "h-10 w-10 mx-auto mb-2"
                        })}
                        <div className="font-bold capitalize">{cat}</div>
                        <div className="text-xs opacity-80">Specialized</div>
                      </div>
                      
                      {category === cat && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="difficulty" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['all', 'easy', 'medium', 'hard'].map((level) => (
                    <motion.div
                      key={level}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border ${
                        difficulty === level 
                          ? 'border-[#97144D] shadow-lg' 
                          : 'border-gray-200'
                      }`}
                      onClick={() => setDifficulty(level)}
                    >
                      <div className={`p-4 text-center ${
                        level === 'all' 
                          ? 'bg-gradient-to-r from-[#97144D]/10 to-[#ED1164]/10'
                          : level === 'easy'
                          ? 'bg-green-50'
                          : level === 'medium'
                          ? 'bg-yellow-50'
                          : 'bg-red-50'
                      }`}>
                        <div className="font-bold mb-1 capitalize">
                          {level === 'all' ? 'Mixed' : level}
                        </div>
                        
                        <div className="flex justify-center gap-1 mb-2">
                          {[...Array(level === 'easy' ? 1 : level === 'medium' ? 2 : level === 'hard' ? 3 : 2)].map((_, i) => (
                            <Zap 
                              key={i} 
                              className={`h-4 w-4 ${
                                level === 'easy' 
                                  ? 'text-green-500' 
                                  : level === 'medium'
                                  ? 'text-yellow-500'
                                  : level === 'hard'
                                  ? 'text-red-500'
                                  : 'text-[#97144D]'
                              }`} 
                            />
                          ))}
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          {level === 'all' 
                            ? 'Varied difficulty levels' 
                            : level === 'easy'
                            ? 'Basic financial concepts'
                            : level === 'medium'
                            ? 'Intermediate knowledge'
                            : 'Advanced financial topics'}
                        </div>
                      </div>
                      
                      {difficulty === level && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className="h-5 w-5 text-[#97144D]" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex flex-col md:flex-row gap-6 my-6">
              <div className="flex-1 bg-[#FFF0F6] rounded-lg p-4">
                <h4 className="font-bold text-[#ED1164] mb-2 flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" /> Learn While Playing
                </h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-[#ED1164] mt-0.5 flex-shrink-0" />
                    <span>Test your financial knowledge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-[#ED1164] mt-0.5 flex-shrink-0" />
                    <span>Discover new banking concepts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-[#ED1164] mt-0.5 flex-shrink-0" />
                    <span>Read detailed explanations</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex-1 bg-[#97144D]/10 rounded-lg p-4">
                <h4 className="font-bold text-[#97144D] mb-2 flex items-center">
                  <Trophy className="h-4 w-4 mr-2" /> Rewards & Achievements
                </h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-[#97144D] mt-0.5 flex-shrink-0" />
                    <span>50 points per correct answer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-[#97144D] mt-0.5 flex-shrink-0" />
                    <span>Streak bonuses for consecutive correct answers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="h-4 w-4 text-[#97144D] mt-0.5 flex-shrink-0" />
                    <span>Earn special knowledge badges</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={startQuiz}
                disabled={loadingQuestions}
                className="bg-gradient-to-r from-[#97144D] to-[#b01d5c] hover:opacity-90 text-white px-6 py-6 text-lg"
              >
                {loadingQuestions ? (
                  <span className="flex items-center gap-2">
                    <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    Loading Quiz...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Start Quiz <Sparkles className="h-5 w-5" />
                  </span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : quizCompleted ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden shadow-xl border-0">
              <div className="bg-gradient-to-r from-[#97144D] to-[#b01d5c] text-white p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Award className="h-5 w-5" /> Quiz Results
                  </h2>
                  <Badge className="bg-white/20">Challenge Complete</Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                {quizResult && (
                  <>
                    <div className="text-center mb-8">
                      <div className="text-4xl font-bold text-[#97144D] mb-4">
                        {quizResult.score} Points
                      </div>
                      
                      <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {quizResult.badges.map((badge, index) => (
                          <Badge 
                            key={index}
                            className="bg-[#ED1164] text-white px-3 py-1.5"
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <div className="text-xs text-gray-500">Correct</div>
                          <div className="font-bold text-lg">{quizResult.correctAnswers}/{questions.length}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <div className="text-xs text-gray-500">Accuracy</div>
                          <div className="font-bold text-lg">
                            {Math.round((quizResult.correctAnswers / questions.length) * 100)}%
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <div className="text-xs text-gray-500">Time</div>
                          <div className="font-bold text-lg">{quizResult.timeTaken}s</div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#97144D] to-[#ED1164]"
                            style={{ 
                              width: `${(quizResult.correctAnswers / questions.length) * 100}%`,
                              transition: 'width 1s ease-in-out'
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <Tabs defaultValue="review" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="review">Question Review</TabsTrigger>
                        <TabsTrigger value="insights">Key Insights</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="review" className="space-y-4">
                        {questions.map((question, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 rounded-lg border ${
                              userAnswers[index] === question.correctAnswer
                                ? 'border-green-200 bg-green-50'
                                : 'border-red-200 bg-red-50'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {userAnswers[index] === question.correctAnswer ? (
                                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                              )}
                              
                              <div className="flex-1">
                                <div className="font-medium mb-2">
                                  {question.question}
                                </div>
                                
                                <div className="mb-3">
                                  <div className="flex items-center gap-1 text-sm">
                                    <span className="text-gray-600">Your answer: </span>
                                    <span className={userAnswers[index] === question.correctAnswer ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                      {userAnswers[index] !== null 
                                        ? question.options[userAnswers[index]] 
                                        : 'No answer'}
                                    </span>
                                  </div>
                                  
                                  {userAnswers[index] !== question.correctAnswer && (
                                    <div className="flex items-center gap-1 text-sm mt-1">
                                      <span className="text-gray-600">Correct answer: </span>
                                      <span className="text-green-600 font-medium">
                                        {question.options[question.correctAnswer]}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="text-xs bg-white p-2 rounded border border-gray-100">
                                  <div className="font-medium text-[#ED1164] mb-1">Explanation:</div>
                                  <p className="text-gray-700">{question.explanation}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </TabsContent>
                      
                      <TabsContent value="insights">
                        <div className="bg-[#FFF0F6] p-4 rounded-lg mb-4">
                          <h3 className="font-bold text-[#ED1164] mb-2">What You've Learned</h3>
                          <p className="text-sm text-gray-700 mb-3">
                            This quiz covered key concepts in financial literacy, including:
                          </p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {questions.map((q, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <Lightbulb className="h-4 w-4 text-[#ED1164] mt-0.5 flex-shrink-0" />
                                <span>{q.question.split('?')[0]}?</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-[#97144D]/10 p-4 rounded-lg">
                          <h3 className="font-bold text-[#97144D] mb-2">Suggestions for Improvement</h3>
                          {quizResult.correctAnswers === questions.length ? (
                            <p className="text-sm text-gray-700">
                              Perfect score! Try taking a quiz with higher difficulty level to challenge yourself further.
                            </p>
                          ) : (
                            <>
                              <p className="text-sm text-gray-700 mb-3">
                                To improve your financial knowledge, consider:
                              </p>
                              <ul className="text-sm text-gray-700 space-y-1">
                                <li className="flex items-start gap-2">
                                  <ArrowRight className="h-4 w-4 text-[#97144D] mt-0.5 flex-shrink-0" />
                                  <span>Reviewing the explanations for questions you missed</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <ArrowRight className="h-4 w-4 text-[#97144D] mt-0.5 flex-shrink-0" />
                                  <span>Exploring the Axis Bank Knowledge Center for related topics</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <ArrowRight className="h-4 w-4 text-[#97144D] mt-0.5 flex-shrink-0" />
                                  <span>Taking quizzes in categories where you need more practice</span>
                                </li>
                              </ul>
                            </>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </>
                )}
              </CardContent>
              
              <CardFooter className="p-6 pt-2 flex flex-col sm:flex-row justify-center gap-3">
                <Button 
                  onClick={startQuiz}
                  className="bg-[#ED1164] hover:bg-[#C70D53] text-white"
                >
                  Take Another Quiz
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => {
                    setQuizStarted(false);
                    setQuizCompleted(false);
                  }}
                >
                  Change Settings
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      ) : (
        <div>
          {/* Quiz Progress */}
          <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
            <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-4">
                <div className="bg-[#FFF0F6] rounded-full h-10 w-10 flex items-center justify-center">
                  <div className="font-bold text-[#ED1164]">{currentQuestion + 1}/{questions.length}</div>
                </div>
                
                <div>
                  <Badge className={getDifficultyColor(questions[currentQuestion]?.difficulty)}>
                    {questions[currentQuestion]?.difficulty.charAt(0).toUpperCase() + questions[currentQuestion]?.difficulty.slice(1)}
                  </Badge>
                  
                  <Badge variant="outline" className="ml-2 bg-white capitalize">
                    {questions[currentQuestion]?.category}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className={`font-bold ${timer <= 5 ? 'text-red-500 animate-pulse' : 'text-gray-700'}`}>
                    {timer}s
                  </span>
                </div>
                
                {streakCount > 0 && (
                  <div className="flex items-center gap-1 bg-[#97144D]/10 text-[#97144D] px-2 py-0.5 rounded-full text-xs font-bold">
                    <Zap className="h-3 w-3" />
                    {streakCount}x
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full bg-gray-100 h-2">
              <div 
                className="h-full bg-gradient-to-r from-[#97144D] to-[#ED1164]"
                style={{ width: `${timerWidth}%` }}
              ></div>
            </div>
          </div>
          
          {/* Question card */}
          <Card className="overflow-hidden shadow-lg mb-6">
            <CardHeader className={`${
              questions[currentQuestion]?.difficulty === 'easy' ? 'bg-green-50 border-b border-green-100' : 
              questions[currentQuestion]?.difficulty === 'medium' ? 'bg-yellow-50 border-b border-yellow-100' : 
              'bg-red-50 border-b border-red-100'
            }`}>
              <div className="flex justify-between items-center mb-2">
                <Badge 
                  className={`${
                    questions[currentQuestion]?.difficulty === 'easy' ? 'bg-green-500' : 
                    questions[currentQuestion]?.difficulty === 'medium' ? 'bg-yellow-500' : 
                    'bg-red-500'
                  } text-white`}
                >
                  {questions[currentQuestion]?.difficulty.charAt(0).toUpperCase() + questions[currentQuestion]?.difficulty.slice(1)}
                </Badge>
                <Badge variant="outline" className="bg-white/80">
                  {questions[currentQuestion]?.category.charAt(0).toUpperCase() + questions[currentQuestion]?.category.slice(1)}
                </Badge>
              </div>
              <CardTitle className="text-lg sm:text-xl">
                {questions[currentQuestion]?.question}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-4">
              {questions[currentQuestion]?.image && (
                <div className="mb-4 rounded-md overflow-hidden">
                  <ImageWithFallback
                    src={questions[currentQuestion]?.image}
                    alt="Question illustration"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              
              <div className="space-y-3 mt-4">
                {questions[currentQuestion]?.options.map((option, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: answerSubmitted ? 1 : 1.01 }}
                    whileTap={{ scale: answerSubmitted ? 1 : 0.99 }}
                  >
                    <button
                      className={`w-full text-left p-3 rounded-md border transition-all ${
                        answerSubmitted && index === questions[currentQuestion]?.correctAnswer
                          ? 'bg-green-50 border-green-300 text-green-700'
                          : answerSubmitted && selectedAnswer === index && index !== questions[currentQuestion]?.correctAnswer
                          ? 'bg-red-50 border-red-300 text-red-700'
                          : selectedAnswer === index
                          ? 'bg-[#FFF0F6] border-[#ED1164] text-[#ED1164]'
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={answerSubmitted}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                          answerSubmitted && index === questions[currentQuestion]?.correctAnswer
                            ? 'bg-green-100 text-green-700'
                            : answerSubmitted && selectedAnswer === index && index !== questions[currentQuestion]?.correctAnswer
                            ? 'bg-red-100 text-red-700'
                            : selectedAnswer === index
                            ? 'bg-[#ED1164] text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        {option}
                        
                        {answerSubmitted && index === questions[currentQuestion]?.correctAnswer && (
                          <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                        )}
                        
                        {answerSubmitted && selectedAnswer === index && index !== questions[currentQuestion]?.correctAnswer && (
                          <XCircle className="h-5 w-5 text-red-500 ml-auto" />
                        )}
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
              
              {answerSubmitted && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    <div className={`p-4 rounded-lg border ${
                      selectedAnswer === questions[currentQuestion]?.correctAnswer 
                        ? 'bg-green-50 border-green-100' 
                        : 'bg-red-50 border-red-100'
                    }`}>
                      <div className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1">
                          {selectedAnswer === questions[currentQuestion]?.correctAnswer ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-1">
                            {selectedAnswer === questions[currentQuestion]?.correctAnswer 
                              ? 'Correct!' 
                              : 'Incorrect'}
                          </h4>
                          <p className="text-sm text-gray-700">
                            {questions[currentQuestion]?.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </CardContent>
            
            <CardFooter className="p-4 flex justify-between items-center border-t">
              {!answerSubmitted ? (
                <Button
                  onClick={handleAnswerSubmit}
                  disabled={selectedAnswer === null}
                  className="ml-auto bg-[#97144D] hover:bg-[#7d1041] text-white"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  onClick={handleNextQuestion}
                  className="ml-auto bg-[#ED1164] hover:bg-[#C70D53] text-white"
                >
                  {currentQuestion < questions.length - 1 ? (
                    <span className="flex items-center gap-2">
                      Next Question <ChevronRight className="h-4 w-4" />
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Finish Quiz <CheckCircle className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};
