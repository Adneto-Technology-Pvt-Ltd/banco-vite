import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "./ui/utils";
import { 
  Gift, 
  ShoppingBag, 
  Plane, 
  Utensils, 
  Film, 
  Music, 
  Coffee, 
  CreditCard,
  ChevronLeft,
  ChevronRight,
  HeartPulse
} from "lucide-react";

export type CategoryItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

// Default categories for convenience
export const defaultCategories: CategoryItem[] = [
  {
    id: "all",
    label: "All Benefits",
    icon: <Gift className="h-[18px] w-[18px]" />
  },
  {
    id: "entertainment",
    label: "Entertainment",
    icon: <Film className="h-[18px] w-[18px]" />
  },
  {
    id: "travel",
    label: "Travel",
    icon: <Plane className="h-[18px] w-[18px]" />
  },
  {
    id: "dining",
    label: "Dining",
    icon: <Utensils className="h-[18px] w-[18px]" />
  },
  {
    id: "shopping",
    label: "Shopping",
    icon: <ShoppingBag className="h-[18px] w-[18px]" />
  },
  {
    id: "wellness",
    label: "Wellness",
    icon: <HeartPulse className="h-[18px] w-[18px]" />
  },
  {
    id: "cafe",
    label: "Cafés",
    icon: <Coffee className="h-[18px] w-[18px]" />
  },
  {
    id: "finance",
    label: "Financial",
    icon: <CreditCard className="h-[18px] w-[18px]" />
  }
];

type CategoryFilterProps = {
  categories?: CategoryItem[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
  variant?: "default" | "pills" | "minimal" | "cards";
  showScroll?: boolean;
  compact?: boolean;
};

export const CategoryFilter = ({
  categories = defaultCategories,
  selectedCategory,
  onCategoryChange,
  className,
  variant = "default",
  showScroll = true,
  compact = false
}: CategoryFilterProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  // Check if scroll buttons should be visible
  useEffect(() => {
    const checkScroll = () => {
      if (!scrollRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    };

    // Initial check
    checkScroll();

    // Add event listener
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }

    // Clean up
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      }
    };
  }, [categories]);

  // Scroll functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Variant styles
  const getContainerStyles = () => {
    switch (variant) {
      case "pills":
        return "bg-gray-100 p-1.5 rounded-full";
      case "cards":
        return "bg-white shadow-md rounded-xl p-3 border border-gray-100";
      case "minimal":
        return "border-b border-gray-200";
      default:
        return "bg-white shadow-sm rounded-xl p-2 border border-gray-100";
    }
  };

  const getItemStyles = (isSelected: boolean) => {
    const baseStyles = compact 
      ? "text-sm py-1.5 px-2.5"
      : "text-sm py-2 px-3";
    
    switch (variant) {
      case "pills":
        return cn(
          baseStyles,
          "rounded-full transition-all duration-300",
          isSelected 
            ? "bg-[#97144D] text-white font-medium" 
            : "hover:bg-gray-200/80 text-gray-700"
        );
      case "cards":
        return cn(
          baseStyles,
          "rounded-lg transition-all duration-300",
          isSelected 
            ? "bg-[#97144D]/10 text-[#97144D] font-medium border-b-2 border-[#97144D]" 
            : "hover:bg-gray-100 text-gray-700 border-b-2 border-transparent"
        );
      case "minimal":
        return cn(
          baseStyles,
          "border-b-2 transition-all duration-200",
          isSelected 
            ? "text-[#97144D] border-[#97144D] font-medium" 
            : "border-transparent hover:text-gray-800 text-gray-600 hover:border-gray-300"
        );
      default:
        return cn(
          baseStyles,
          "rounded-lg transition-all duration-300",
          isSelected 
            ? "bg-[#97144D] text-white font-medium" 
            : "hover:bg-gray-100 text-gray-700"
        );
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div className={cn("relative overflow-hidden", getContainerStyles())}>
        {/* Left scroll button */}
        {showScroll && showLeftScroll && (
          <button
            onClick={scrollLeft}
            className="absolute left-1 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-md border border-gray-100 text-gray-700 hover:text-[#97144D] transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        {/* Categories */}
        <div 
          ref={scrollRef}
          className="flex items-center space-x-1 overflow-x-auto hide-scrollbar scroll-smooth relative"
        >
          {categories.map((category) => {
            const isSelected = category.id === selectedCategory;
            const isHovered = category.id === hoveredItemId;
            
            return (
              <motion.button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                onMouseEnter={() => setHoveredItemId(category.id)}
                onMouseLeave={() => setHoveredItemId(null)}
                className={cn(
                  "flex items-center whitespace-nowrap transition-all",
                  getItemStyles(isSelected)
                )}
                whileTap={{ scale: 0.97 }}
                aria-selected={isSelected}
              >
                <motion.span 
                  className={cn(
                    "flex items-center justify-center mr-1.5",
                    isSelected ? "text-inherit" : "text-gray-500"
                  )}
                  animate={{ 
                    scale: isHovered && !isSelected ? 1.1 : 1,
                    rotate: isHovered && !isSelected ? [0, -10, 10, -5, 0] : 0
                  }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  {category.icon}
                </motion.span>
                <span>{category.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Right scroll button */}
        {showScroll && showRightScroll && (
          <button
            onClick={scrollRight}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-md border border-gray-100 text-gray-700 hover:text-[#97144D] transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Decorative elements for the default variant */}
      {variant === "default" && (
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#97144D]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#12877F]/5 rounded-full blur-3xl"></div>
        </div>
      )}
    </div>
  );
};