import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, CreditCard, Gift } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SubzeroButton } from "./SubzeroButton";

type BannerItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  align: "left" | "right" | "center";
  bgColor: string;
};

type BannerCarouselProps = {
  isLoggedIn?: boolean;
  userData?: {
    name?: string;
    segment?: string;
    persona?: string;
  };
  onExploreRewards?: () => void;
  onOpenAccount?: () => void;
};

export const BannerCarousel = ({ 
  isLoggedIn, 
  userData, 
  onExploreRewards, 
  onOpenAccount 
}: BannerCarouselProps) => {
  // Banner data with dynamic content
  const bannerData: BannerItem[] = [
    {
      id: 1,
      title: "Unlock Exclusive Rewards with Axis Bank Savings Account",
      description: "Enjoy special benefits, cashback offers, and personalized rewards based on your banking relationship.",
      image: "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?q=80&w=2069&auto=format&fit=crop",
      align: "left",
      bgColor: "bg-[#97144D]"
    },
    {
      id: 2,
      title: "Banking Rewards Tailored to Your Lifestyle",
      description: "From travel benefits to shopping discounts, discover rewards that match your preferences.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
      align: "right",
      bgColor: "bg-[#12877F]"
    },
    {
      id: 3,
      title: userData?.segment === "Burgundy" 
        ? "Exclusive Burgundy Privileges Await You" 
        : "Upgrade to Burgundy for Premium Benefits",
      description: userData?.segment === "Burgundy"
        ? "Enjoy exclusive premium offers designed for Burgundy members."
        : "Experience a world of premium banking with Axis Bank Burgundy and unlock exclusive lifestyle benefits.",
      image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2070&auto=format&fit=crop",
      align: "left",
      bgColor: "bg-[#97144D]"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Function to move to the next slide
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? bannerData.length - 1 : prevIndex - 1));
  };

  // Function to go to a specific slide
  const goToSlide = (index: number) => {
    setActiveIndex(index);
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
      if (isAutoPlaying) {
        autoPlayRef.current = setTimeout(nextSlide, 5000);
      }
    }
  };

  // Set up autoplay
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setTimeout(nextSlide, 5000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [activeIndex, isAutoPlaying]);

  // Pause autoplay on user interaction
  const handleInteraction = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
  };

  // Resume autoplay after inactivity
  useEffect(() => {
    const resumeAutoplay = () => {
      setIsAutoPlaying(true);
    };
    const timeout = setTimeout(resumeAutoplay, 10000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isAutoPlaying]);

  const handleExploreRewards = () => {
    if (onExploreRewards) {
      onExploreRewards();
    }
  };

  const handleOpenAccount = () => {
    if (onOpenAccount) {
      onOpenAccount();
    }
  };

  return (
    <>
    <div className="pt-[88px]">
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Axis Bank Rewards and Banking Services"
            className="w-full h-full object-cover"
            fallbackSrc="/banner-placeholder.jpg"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#97144D]/90 via-[#97144D]/85 to-[#97144D]/75"></div>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="max-w-4xl">
              <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                Unlock Exclusive Banking Rewards
              </h1>
              <p className="text-white/95 text-lg md:text-xl mb-8 md:mb-10 max-w-2xl leading-relaxed">
                Experience premium banking with Axis Bank. Earn rewards on every transaction, enjoy exclusive benefits, and build your financial future.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <button
                  variant="primary"
                  onClick={onExploreRewards}
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
                    font-['Arial'] font-style-normal
                  "
                  aria-label="Explore Your Rewards"
                >
                  <Gift className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  <span>Explore Your Rewards</span>
                </button>
                <button
                  variant="outline"
                  onClick={onOpenAccount}
                  className="
                    bg-transparent 
                    border-3 border-white text-white
                    hover:bg-white hover:text-[#97144D] hover:border-white
                    active:bg-gray-100 active:text-[#7d1041]
                    px-8 py-4 rounded-lg
                    text-lg font-bold
                    flex items-center justify-center gap-3 
                    min-w-[220px] min-h-[56px]
                    shadow-xl hover:shadow-2xl
                    transition-all duration-200 ease-in-out
                    focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#97144D]
                    font-['Arial'] font-style-normal
                    backdrop-blur-sm
                  "
                  aria-label="Open Savings Account"
                >
                  <CreditCard className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  <span>Open Savings Account</span>
                </button>
              </div>

              {/* Features List */}
              <div className="mt-8 md:mt-10">
                <div className="flex flex-wrap gap-6 text-white/95">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-white rounded-full flex-shrink-0"></div>
                    <span className="text-sm md:text-base font-medium">Zero balance account</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-white rounded-full flex-shrink-0"></div>
                    <span className="text-sm md:text-base font-medium">Instant digital banking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-white rounded-full flex-shrink-0"></div>
                    <span className="text-sm md:text-base font-medium">Rewards on every transaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#12877F]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-20 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
      </div>
    </div>
    </>
  );
};