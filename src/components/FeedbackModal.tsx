import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, CheckCircle, Send, MessageSquare } from "lucide-react";
import { AxisButton } from "./AxisButton";

type FeedbackQuestion = {
  id: string;
  question: string;
  description?: string;
};

type FeedbackModalProps = {
  isOpen: boolean;
  onClose: () => void;
  redemptionData: {
    id: string;
    title: string;
    brand: string;
    date: string;
    image?: string;
  };
  onSubmitFeedback: (feedback: any) => void;
};

export const FeedbackModal = ({
  isOpen,
  onClose,
  redemptionData,
  onSubmitFeedback,
}: FeedbackModalProps) => {
  // Define feedback questions
  const questions: FeedbackQuestion[] = [
    {
      id: "ease",
      question: "How easy was the redemption process?",
      description: "Rate your experience with the redemption flow",
    },
    {
      id: "satisfaction",
      question: "How satisfied are you with this reward?",
      description: "Rate your overall satisfaction with this offer",
    },
    {
      id: "relevance",
      question: "How relevant was this reward for you?",
      description: "Rate how well this reward matched your preferences",
    },
  ];

  // State for ratings and comment
  const [ratings, setRatings] = useState<Record<string, number>>({
    ease: 0,
    satisfaction: 0,
    relevance: 0,
  });
  const [comment, setComment] = useState("");
  const [step, setStep] = useState<"questions" | "comment" | "success">("questions");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle rating change
  const handleRatingChange = (questionId: string, rating: number) => {
    setRatings((prev) => ({
      ...prev,
      [questionId]: rating,
    }));
  };

  // Handle next step
  const handleNextStep = () => {
    if (step === "questions") {
      setStep("comment");
    } else if (step === "comment") {
      handleSubmit();
    }
  };

  // Check if can proceed to next step
  const canProceed = () => {
    if (step === "questions") {
      return Object.values(ratings).every((rating) => rating > 0);
    }
    return true;
  };

  // Handle submit
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const feedbackData = {
        redemptionId: redemptionData.id,
        ratings,
        comment,
        submittedAt: new Date().toISOString(),
      };
      
      onSubmitFeedback(feedbackData);
      setIsSubmitting(false);
      setStep("success");
      
      // Reset state after 5 seconds
      setTimeout(() => {
        setRatings({ ease: 0, satisfaction: 0, relevance: 0 });
        setComment("");
        setStep("questions");
        onClose();
      }, 5000);
    }, 1000);
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 20, stiffness: 300 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={overlayVariants}
      >
        <motion.div
          className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-auto"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header */}
          <div className="relative border-b p-4">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-bold text-[#97144D]">
              {step === "success" ? "Thank You!" : "Share Your Feedback"}
            </h3>
            <p className="text-sm text-gray-600">
              {step === "success"
                ? "Your feedback helps us improve our rewards"
                : `About your ${redemptionData.title} reward`}
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            {step === "questions" && (
              <div className="space-y-8">
                {/* Redemption summary */}
                <div className="flex items-center p-3 bg-[#f9f3f6] rounded-lg">
                  {redemptionData.image && (
                    <div className="w-12 h-12 rounded-md overflow-hidden mr-3 bg-white">
                      <img
                        src={redemptionData.image}
                        alt={redemptionData.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium">{redemptionData.title}</h4>
                    <p className="text-sm text-gray-600">
                      Redeemed on {redemptionData.date}
                    </p>
                  </div>
                </div>

                {/* Rating questions */}
                <div className="space-y-6">
                  {questions.map((q) => (
                    <div key={q.id} className="space-y-2">
                      <p className="font-medium">{q.question}</p>
                      {q.description && (
                        <p className="text-sm text-gray-500">{q.description}</p>
                      )}
                      <div className="flex items-center justify-center py-2">
                        <StarRating
                          rating={ratings[q.id]}
                          onChange={(rating) => handleRatingChange(q.id, rating)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === "comment" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MessageSquare size={18} className="text-[#97144D] mr-2" />
                    <p className="font-medium">Additional Comments (Optional)</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    Share any additional thoughts or suggestions about your experience
                  </p>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#97144D]/20 resize-none"
                    placeholder="We'd love to hear more about your experience..."
                  />
                </div>

                <div className="bg-[#EBF9F8] p-3 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-[#12877F] rounded-full p-1 text-white mr-2 mt-0.5">
                      <CheckCircle size={16} />
                    </div>
                    <div>
                      {/* <p className="text-sm font-medium text-[#12877F]">
                        Earn 5 bonus points!
                      </p> */}
                      <p className="text-xs text-gray-600">
                        You'll receive bonus points for sharing your feedback
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="py-8 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-[#EBF9F8] rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-[#12877F]" />
                </div>
                <h4 className="font-bold">Feedback Submitted!</h4>
                <p className="text-gray-600 text-sm">
                  Thank you for sharing your thoughts. We've added 5 bonus points to your account.
                </p>
                <div className="bg-[#f9f3f6] rounded-lg p-4 inline-block">
                  <p className="text-sm font-medium text-[#97144D]">+5 Points Added</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {step !== "success" && (
            <div className="border-t p-4 flex justify-end">
              <AxisButton
                variant={canProceed() ? "primary" : "outline"}
                onClick={handleNextStep}
                disabled={!canProceed() || isSubmitting}
                className="flex items-center"
              >
                {isSubmitting ? (
                  "Processing..."
                ) : step === "questions" ? (
                  <>Next</>
                ) : (
                  <>
                    Submit Feedback
                    <Send size={16} className="ml-2" />
                  </>
                )}
              </AxisButton>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Star Rating Component
const StarRating = ({
  rating,
  onChange,
  count = 5,
}: {
  rating: number;
  onChange: (rating: number) => void;
  count?: number;
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex space-x-1">
      {Array.from({ length: count }).map((_, i) => {
        const starValue = i + 1;
        const isFilled = (hoverRating || rating) >= starValue;

        return (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="focus:outline-none"
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <Star
              size={28}
              className={`${
                isFilled
                  ? "text-[#97144D] fill-[#97144D]"
                  : "text-gray-300"
              } transition-colors`}
            />
          </motion.button>
        );
      })}
    </div>
  );
};