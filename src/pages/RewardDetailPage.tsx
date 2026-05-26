import { useState, useEffect } from "react";
import { ArrowLeft, Star, Clock, Gift, Users, Shield, Share2, Heart, ExternalLink, CheckCircle, AlertCircle, Info, HelpCircle, ChevronUp, ChevronDown } from "lucide-react";
import { AxisButton } from "../components/AxisButton";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { motion } from "framer-motion";

type UserData = {
  isLoggedIn: boolean;
  customerId?: string;
  name?: string;
  segment?: string;
  persona?: string;
};

type RewardDetailPageProps = {
  userData: UserData;
  rewardId: string;
  onBack: () => void;
  onRedeem: (rewardId: string) => void;
  onRewardSelect?: (rewardId: string) => void;
};

// Mock reward data - in a real app, this would come from an API
const mockRewardData = {
  "luxury-watch": {
    id: "luxury-watch",
    title: "Get Flat 25% Off",
    subtitle: "Get Flat 25% Off on all Sony LIV Premium packs",
    description: "Explore Sonyliv discounts on Axis Benefits! Save on premium entertainment subscriptions for unlimited streaming of shows and movies. Subscribe now and enjoy your favorites!",
    longDescription: "Sonyliv offers a premium streaming service with a vast library of shows, movies, and sports. Enjoy high-quality entertainment on demand, anytime, anywhere.",
    thingsToNote: [
      "Please use the coupon code at the time of checkout to avail discount",
      "The coupon comes with a validity date and will not apply post expiry",
      "The discount might be applicable only on selected products or for a minimum purchase value",
      "Payment should be made by Bank's card with which you have logged in",
      "There can be a limit on the coupon code usage for each customer. Kindly read the Terms & Conditions to know more"
    ],
    pointsCost: 75000,
    originalValue: 125000,
    pointHeader: "25% off on Sony LIV Premium",
    savings: 50000,
    category: "Entertainment",
    couponCode: "ADNSONY25",
    brand: "Sony LIV",
    availability: "Limited Stock",
    rating: 4.8,
    reviewCount: 156,
    redemptionCount: 423,
    redemptionSteps: [
      "Click on https://www.sonyliv.com/subscription",
      "Choose from SonyLiv Premium Monthly, Six-Monthly or Annual Pack",
      "Apply Coupon Code at the time of checkout",
    ],
    validUntil: "2025-12-31",
    image: "https://etimg.etb2bimg.com/photo/76029910.cms",
    termsAndConditions: [
      "Offer is applicable on 1 month, 6 month and 12 months packs",
      "Offer valid for Burgundy customers only",
      "Offer valid till 31st December 2025",
      "Offer cannot be clubbed with any other offer",
      "Offer can only be availed through the link shared"
    ],
    eligibility: {
      segment: "Cannot be used multiple times",
      redemptionMode: "Can use online",
      clubbable: "Cannot be used with Brand offers"
    },
    tags: ["Premium", "Sony Liv", "Exclusive"],
    relatedRewards: ["premium-jewelry", "dining", "lounge"],
    faq: [
      {
        "question": "What is the best deal I can get using SonyLIV coupon codes?",
        "answer": "Using SonyLIV promo codes, users can save flat 25% on any of the subscription plans."
      },
      {
        "question": "How can I get a promo code for SonyLiv?",
        "answer": "Get SonyLiv promo codes and deals from Bancko, the one-stop savings destination for everything online."
      },
      {
        "question": "How to use SonyLiv coupons?",
        "answer": "Apply the coupon while purchasing a SonyLiv subscription. On the checkout page, find a box where you can enter a coupon code and hit Apply."
      },
      {
        "question": "How to activate promo code on SonyLIV subscription?",
        "answer": "To activate the promo code, you need to login to Sonyliv. On the payment page, choose Gift card/Coupon code, enter the promo code, and then click Redeem."
      },
      {
        "question": "Can a SonyLIV subscription be shared?",
        "answer": "Only the Liv Premium annual and semi-annual plan users can share two screens at the same time."
      }
    ]
  },
  "premium-jewelry": {
    id: "premium-jewelry",
    title: "Flat 25% off on making charges",
    subtitle: "Flat 25% off on making charges Collection on Kalyan Jewellers.",
    description: "Stunning diamond jewelry pieces crafted by master artisans from Kalyan Jewellers.",
    longDescription: "Our premium diamond jewelry collection features exceptional pieces crafted by renowned jewelers, each piece certified and guaranteed for authenticity.",
    pointsCost: 85000,
    originalValue: 150000,
    pointHeader: "25% off on making charges",
    savings: 65000,
    category: "Jewelry",
    couponCode: "KALYAN25",
    brand: "Kalyan Jewellers",
    availability: "In Stock",
    rating: 4.9,
    reviewCount: 89,
    redemptionCount: 234,
    validUntil: "2024-12-31",
    image: "https://images.unsplash.com/photo-1652375152241-d3e62ab52b57?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGluZGlhbiUyMGpld2Vscnl8ZW58MHx8MHx8fDA%3D",
    gallery: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Certified Diamonds",
      "18K Gold Setting",
      "Professional Appraisal Included",
      "Lifetime Warranty",
      "Custom Sizing Available",
      "Gift Box Included"
    ],
    redemptionSteps: [
      "Visit any Kalyan Jewellers store",
      "Show your coupon code to the sales representative",
      "Apply the discount on making charges for purchases above ₹75,000",
    ],
    termsAndConditions: [
      "Valid for Burgundy segment customers only",
      "Minimum purchase of ₹75,000 required",
      "Offer valid till 31st December 2024",
      "Cannot be clubbed with other offers",
      "Valid at all Kalyan Jewellers stores"
    ],
    eligibility: {
      segment: "Burgundy customers only",
      redemptionMode: "In-store redemption",
      clubbable: "Cannot be used with other offers"
    },
    tags: ["Certified", "18K Gold", "Premium", "Lifetime Warranty"],
    relatedRewards: ["luxury-watch", "dining", "lounge"],
    faq: [
      {
        "question": "What is the minimum purchase amount for this offer?",
        "answer": "The minimum purchase amount is ₹75,000 on gold jewellery to avail the 25% discount on making charges."
      },
      {
        "question": "Can I use this offer online?",
        "answer": "This offer is valid only at Kalyan Jewellers physical stores and cannot be used for online purchases."
      },
      {
        "question": "Is there any validity period for this offer?",
        "answer": "Yes, this offer is valid until 31st December 2024."
      }
    ]
  },
  // New entries from activation offers
  "dining": {
    id: "dining",
    title: "15% Offer applicable on total bill",
    subtitle: "Enjoy 15% off your total bill at Vietnom Restaurant",
    description: "Enjoy 15% off your total bill at Vietnom, great serving authentic Vietnamese pho and traditional cuisine in a vibrant setting.",
    longDescription: "Vietnom Restaurant brings you authentic Vietnamese flavors with traditional pho, fresh spring rolls, and aromatic herbs. Experience the rich culinary heritage of Vietnam in a modern, vibrant setting.",
    pointsCost: 25000,
    originalValue: 50000,
    pointHeader: "15% off on total bill",
    savings: 7500,
    category: "Dining",
    couponCode: "VIETNOM15",
    brand: "Vietnom Restaurant",
    availability: "Available",
    rating: 4.6,
    reviewCount: 234,
    redemptionCount: 156,
    validUntil: "2025-06-30",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    redemptionSteps: [
      "Visit Vietnom Restaurant",
      "Show your coupon code to the server",
      "Enjoy 15% discount on your total bill",
    ],
    termsAndConditions: [
      "Valid only at Vietnom Restaurant locations",
      "Cannot be combined with other offers",
      "Valid for dine-in only",
      "Advance reservation recommended",
      "Valid till 30th June 2025"
    ],
    eligibility: {
      segment: "All Burgundy customers",
      redemptionMode: "Dine-in only",
      clubbable: "Cannot be combined with other offers"
    },
    tags: ["Vietnamese Cuisine", "Authentic", "Dine-in"],
    relatedRewards: ["lounge", "shopping", "movie"],
    faq: [
      {
        "question": "Is this offer valid for takeaway?",
        "answer": "No, this offer is valid only for dine-in at Vietnom Restaurant."
      },
      {
        "question": "Do I need to make a reservation?",
        "answer": "While not mandatory, advance reservation is recommended to ensure table availability."
      }
    ]
  },
  "lounge": {
    id: "lounge",
    title: "Save 20% on IHG Hotel Stays",
    subtitle: "Enjoy 20% off on stays at IHG's global luxury hotels",
    description: "Enjoy 20% off on stays at IHG's global luxury and business hotels. Experience premium comfort and world-class hospitality worldwide.",
    longDescription: "InterContinental Hotels Group (IHG) offers world-class hospitality across luxury and business hotels globally. From InterContinental to Holiday Inn, experience premium amenities, exceptional service, and comfort wherever you travel.",
    pointsCost: 100000,
    originalValue: 200000,
    pointHeader: "20% off on hotel stays",
    savings: 40000,
    category: "Travel",
    couponCode: "IHG20OFF",
    brand: "IHG Hotels",
    availability: "Available",
    rating: 4.7,
    reviewCount: 189,
    redemptionCount: 89,
    validUntil: "2025-12-31",
    image: "https://www.businesstoday.com.my/wp-content/uploads/2022/06/IHG-Danang-Sun-Peninsula-Resort-1280x666.jpg",
    redemptionSteps: [
      "Visit IHG website or app",
      "Search for available hotels and dates",
      "Apply coupon code IHG20OFF at checkout",
      "Complete your booking with 20% discount"
    ],
    termsAndConditions: [
      "Valid at participating IHG hotels worldwide",
      "Subject to availability",
      "Blackout dates may apply",
      "Cannot be combined with other promotions",
      "Valid till 31st December 2025"
    ],
    eligibility: {
      segment: "Burgundy customers only",
      redemptionMode: "Online booking",
      clubbable: "Cannot be combined with other offers"
    },
    tags: ["Luxury Hotels", "Global", "Premium Travel"],
    relatedRewards: ["dining", "shopping", "movie"],
    faq: [
      {
        "question": "Which IHG hotels are included?",
        "answer": "This offer is valid at participating IHG hotels worldwide including InterContinental, Holiday Inn, and other IHG brands."
      },
      {
        "question": "Are there any blackout dates?",
        "answer": "Yes, blackout dates may apply during peak seasons and holidays. Please check at the time of booking."
      }
    ]
  },
  "shopping": {
    id: "shopping",
    title: "Additional 20% off",
    subtitle: "Get additional 20% off at Marks & Spencer",
    description: "Get an additional 20% off at Marks & Spencer, the iconic British retailer for stylish clothing. Shop the latest trends and timeless classics.",
    longDescription: "Marks & Spencer is a British multinational retailer known for quality clothing, home products, and food. Discover fashion-forward styles and timeless pieces that combine quality craftsmanship with contemporary design.",
    pointsCost: 40000,
    originalValue: 80000,
    pointHeader: "Additional 20% off",
    savings: 16000,
    category: "Shopping",
    couponCode: "MNS20EXTRA",
    brand: "Marks & Spencer",
    availability: "Available",
    rating: 4.5,
    reviewCount: 167,
    redemptionCount: 234,
    validUntil: "2025-09-30",
    image: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    redemptionSteps: [
      "Visit Marks & Spencer store or website",
      "Shop for your favorite items",
      "Apply coupon code MNS20EXTRA at checkout",
      "Enjoy additional 20% discount"
    ],
    termsAndConditions: [
      "Valid on regular priced items only",
      "Cannot be combined with other offers",
      "Valid at all Marks & Spencer stores and online",
      "Excludes sale items",
      "Valid till 30th September 2025"
    ],
    eligibility: {
      segment: "All Burgundy customers",
      redemptionMode: "In-store and online",
      clubbable: "Cannot be combined with other offers"
    },
    tags: ["Fashion", "British Brand", "Quality Clothing"],
    relatedRewards: ["dining", "lounge", "movie"],
    faq: [
      {
        "question": "Can I use this discount on sale items?",
        "answer": "No, this additional 20% discount is valid only on regular priced items and excludes sale items."
      },
      {
        "question": "Is this valid for online shopping?",
        "answer": "Yes, this offer is valid both in-store and online at marksandspencer.com"
      }
    ]
  },
  "movie": {
    id: "movie",
    title: "25% Off Sony LIV Premium Packs",
    subtitle: "Enjoy 25% off on all Sony LIV Premium packs",
    description: "Enjoy 25% off on all Sony LIV Premium packs. Stream top shows, movies, and sports with unlimited entertainment online.",
    longDescription: "Sony LIV is India's premium streaming service offering a vast library of movies, TV shows, live sports, and original content. Enjoy unlimited entertainment with high-quality streaming across all devices.",
    pointsCost: 30000,
    originalValue: 60000,
    pointHeader: "25% off on Premium packs",
    savings: 15000,
    category: "Entertainment",
    couponCode: "SONYLIV25",
    brand: "Sony LIV",
    availability: "Available",
    rating: 4.4,
    reviewCount: 312,
    redemptionCount: 445,
    validUntil: "2025-08-31",
    image: "https://etimg.etb2bimg.com/photo/76029910.cms",
    redemptionSteps: [
      "Visit Sony LIV website or app",
      "Choose Premium Monthly, Six-Monthly or Annual Pack",
      "Apply coupon code SONYLIV25 at checkout",
      "Complete payment with 25% discount"
    ],
    termsAndConditions: [
      "Valid on all Sony LIV Premium subscription plans",
      "New and existing subscribers eligible",
      "Cannot be combined with other offers",
      "Auto-renewal at regular price",
      "Valid till 31st August 2025"
    ],
    eligibility: {
      segment: "All customers",
      redemptionMode: "Online only",
      clubbable: "Cannot be combined with other offers"
    },
    tags: ["Streaming", "Premium Entertainment", "Sports"],
    relatedRewards: ["dining", "lounge", "shopping"],
    faq: [
      {
        "question": "Which subscription plans are included?",
        "answer": "This discount is applicable on Monthly, Six-Monthly, and Annual Premium subscription plans."
      },
      {
        "question": "Will the discount apply to renewal?",
        "answer": "No, the discount is only for the first subscription period. Renewal will be at regular price."
      }
    ]
  },
  "cashback": {
    id: "cashback",
    title: "Get 10% off on subscription",
    subtitle: "Get 10% off on BUSY accounting software subscription",
    description: "Get 10% off on BUSY subscription accounting software designed for small businesses to manage finances, billing, and GST efficiently.",
    longDescription: "BUSY is India's leading accounting software that helps small and medium businesses manage their finances, inventory, billing, and GST compliance efficiently. Streamline your business operations with powerful features and user-friendly interface.",
    pointsCost: 35000,
    originalValue: 70000,
    pointHeader: "10% off on subscription",
    savings: 7000,
    category: "Financial",
    couponCode: "BUSY10OFF",
    brand: "BUSY Software",
    availability: "Available",
    rating: 4.3,
    reviewCount: 98,
    redemptionCount: 67,
    validUntil: "2025-07-31",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    redemptionSteps: [
      "Visit BUSY Software website",
      "Choose your subscription plan",
      "Apply coupon code BUSY10OFF at checkout",
      "Complete purchase with 10% discount"
    ],
    termsAndConditions: [
      "Valid on annual subscription plans only",
      "For new subscribers only",
      "Cannot be combined with other offers",
      "Software license as per BUSY terms",
      "Valid till 31st July 2025"
    ],
    eligibility: {
      segment: "Business customers",
      redemptionMode: "Online only",
      clubbable: "Cannot be combined with other offers"
    },
    tags: ["Accounting Software", "Business", "GST Compliance"],
    relatedRewards: ["shopping", "dining", "movie"],
    faq: [
      {
        "question": "Is this valid for existing BUSY users?",
        "answer": "No, this discount is only available for new subscribers to BUSY software."
      },
      {
        "question": "Which subscription plans are included?",
        "answer": "This discount is applicable only on annual subscription plans."
      }
    ]
  },
  "wellness": {
    id: "wellness",
    title: "Flat 10% Off on Medicines",
    subtitle: "Get flat 10% off on prescription medicines at Apollo Pharmacy",
    description: "Get flat 10% off on prescription medicines at Apollo Pharmacy, your trusted destination for genuine medicines and essential healthcare products.",
    longDescription: "Apollo Pharmacy is India's leading pharmacy chain providing genuine medicines, health products, and wellness solutions. With over 4000 stores nationwide, Apollo ensures quality healthcare products at your convenience.",
    pointsCost: 60000,
    originalValue: 120000,
    pointHeader: "Flat 10% off on medicines",
    savings: 12000,
    category: "Wellness",
    couponCode: "APOLLO10",
    brand: "Apollo Pharmacy",
    availability: "Available",
    rating: 4.6,
    reviewCount: 245,
    redemptionCount: 178,
    validUntil: "2025-10-31",
    image: "https://media.istockphoto.com/id/156292188/photo/doctor-holding-out-several-packs-of-a-variety-of-pills.jpg?s=612x612&w=0&k=20&c=WEYtSbG6FM0WDbm7E_3QT8ZCqIEwQ9tDnGakyg5hhIw=",
    redemptionSteps: [
      "Visit Apollo Pharmacy store or website",
      "Select your prescribed medicines",
      "Show coupon code APOLLO10 at checkout",
      "Get 10% discount on your purchase"
    ],
    termsAndConditions: [
      "Valid on prescription medicines only",
      "Valid at all Apollo Pharmacy stores",
      "Cannot be combined with other offers",
      "Prescription required for scheduled drugs",
      "Valid till 31st October 2025"
    ],
    eligibility: {
      segment: "All customers",
      redemptionMode: "In-store and online",
      clubbable: "Cannot be combined with other offers"
    },
    tags: ["Healthcare", "Pharmacy", "Prescription Medicines"],
    relatedRewards: ["cashback", "shopping", "dining"],
    faq: [
      {
        "question": "Is prescription required?",
        "answer": "Yes, prescription is required for scheduled drugs as per government regulations."
      },
      {
        "question": "Can I use this for health supplements?",
        "answer": "This offer is valid only on prescription medicines and may not apply to health supplements."
      }
    ]
  },
  // Recently activated items
  "activated-1": {
    id: "activated-1",
    title: "Amazon Gift Card",
    subtitle: "₹500 Amazon Gift Card for online shopping",
    description: "Use this Amazon Gift Card to shop for millions of products available on Amazon. Valid for electronics, books, clothing, and more.",
    longDescription: "Amazon Gift Cards provide the convenience of shopping online for a vast selection of products. From electronics to books, fashion to home essentials, use your gift card for any purchase on Amazon.in.",
    pointsCost: 50000,
    originalValue: 50000,
    pointHeader: "₹500 Gift Card",
    savings: 0,
    category: "Shopping",
    couponCode: "AMZN500GC",
    brand: "Amazon",
    availability: "Activated",
    rating: 4.8,
    reviewCount: 1250,
    redemptionCount: 5670,
    validUntil: "2026-05-28",
    image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    redemptionSteps: [
      "Login to your Amazon account",
      "Add items to cart",
      "Apply gift card code at checkout",
      "Complete your purchase"
    ],
    termsAndConditions: [
      "Valid on Amazon.in only",
      "Cannot be transferred or resold",
      "No cash value",
      "Check balance on Amazon account",
      "Valid for 1 year from activation"
    ],
    eligibility: {
      segment: "Activated on May 28, 2025",
      redemptionMode: "Online only",
      clubbable: "Can be combined with other offers"
    },
    tags: ["Gift Card", "Online Shopping", "Activated"],
    relatedRewards: ["shopping", "movie", "dining"],
    faq: [
      {
        "question": "How do I check my gift card balance?",
        "answer": "You can check your gift card balance in your Amazon account under 'Gift Cards'."
      },
      {
        "question": "Can I use multiple gift cards?",
        "answer": "Yes, you can apply multiple gift cards to a single purchase on Amazon."
      }
    ]
  },
  "activated-2": {
    id: "activated-2",
    title: "Coffee Shop Voucher",
    subtitle: "₹200 voucher for Café Coffee Day",
    description: "Enjoy your favorite coffee and snacks at Café Coffee Day with this ₹200 voucher. Valid at all CCD outlets across India.",
    longDescription: "Café Coffee Day is India's favorite coffee destination. Use this voucher to enjoy freshly brewed coffee, delicious snacks, and a comfortable ambiance at any CCD outlet nationwide.",
    pointsCost: 20000,
    originalValue: 20000,
    pointHeader: "₹200 CCD Voucher",
    savings: 0,
    category: "Dining",
    couponCode: "CCD200V",
    brand: "Café Coffee Day",
    availability: "Activated",
    rating: 4.2,
    reviewCount: 567,
    redemptionCount: 1234,
    validUntil: "2025-11-20",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    redemptionSteps: [
      "Visit any Café Coffee Day outlet",
      "Choose your items",
      "Show voucher code to cashier",
      "Pay remaining amount if bill exceeds ₹200"
    ],
    termsAndConditions: [
      "Valid at all CCD outlets in India",
      "Cannot be exchanged for cash",
      "Single use only",
      "Valid for 6 months from activation",
      "Cannot be combined with other offers"
    ],
    eligibility: {
      segment: "Activated on May 20, 2025",
      redemptionMode: "In-store only",
      clubbable: "Cannot be combined with other offers"
    },
    tags: ["Coffee", "Voucher", "Activated"],
    relatedRewards: ["dining", "movie", "shopping"],
    faq: [
      {
        "question": "Can I use this voucher partially?",
        "answer": "No, this is a single-use voucher. Any unused amount will be forfeited."
      },
      {
        "question": "Is this valid for online orders?",
        "answer": "No, this voucher is valid only at physical CCD outlets."
      }
    ]
  },
  "activated-3": {
    id: "activated-3",
    title: "Movie Ticket Discount",
    subtitle: "Buy 1 Get 1 Free movie tickets at PVR Cinemas",
    description: "Enjoy Buy 1 Get 1 Free movie tickets at PVR Cinemas. Valid for all shows except premium formats.",
    longDescription: "PVR Cinemas offers the latest movies in state-of-the-art theaters. Use this offer to enjoy a great movie experience with Buy 1 Get 1 Free tickets, perfect for a date or outing with friends.",
    pointsCost: 40000,
    originalValue: 60000,
    pointHeader: "Buy 1 Get 1 Free",
    savings: 20000,
    category: "Entertainment",
    couponCode: "PVRB1G1",
    brand: "PVR Cinemas",
    availability: "Activated",
    rating: 4.5,
    reviewCount: 789,
    redemptionCount: 345,
    validUntil: "2025-08-15",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    redemptionSteps: [
      "Visit PVR website or app",
      "Select movie and showtime",
      "Apply coupon code PVRB1G1",
      "Get second ticket free"
    ],
    termsAndConditions: [
      "Valid at all PVR outlets",
      "Excludes IMAX and 4DX shows",
      "Valid Monday to Thursday only",
      "Advance booking recommended",
      "Valid till 15th August 2025"
    ],
    eligibility: {
      segment: "Activated on May 15, 2025",
      redemptionMode: "Online and offline",
      clubbable: "Cannot be combined with other offers"
    },
    tags: ["Movies", "Entertainment", "Activated"],
    relatedRewards: ["movie", "dining", "shopping"],
    faq: [
      {
        "question": "Is this valid for weekend shows?",
        "answer": "No, this offer is valid only Monday to Thursday."
      },
      {
        "question": "Can I book premium format shows?",
        "answer": "No, this offer excludes IMAX, 4DX, and other premium formats."
      }
    ]
  }
};

function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0)
    return <div className="text-gray-500">No FAQs available.</div>;

  return (
    <div className="divide-y divide-gray-200">
      {faqs.map((faq, idx) => (
        <div key={idx} className="py-3">
          <button
            className="flex w-full items-center justify-between text-left font-semibold text-[#97144D] hover:text-[#7d1041] transition-colors focus:outline-none"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            aria-expanded={openIndex === idx}
          >
            <span className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-[#97144D]" />
              {faq.question}
            </span>
            {openIndex === idx ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === idx ? "max-h-40 mt-2" : "max-h-0"
            }`}
          >
            <div className="text-gray-700 text-sm bg-gray-50 rounded p-3 shadow-inner">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export const RewardDetailPage = ({ userData, rewardId, onBack, onRedeem, onRewardSelect }: RewardDetailPageProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showRedemptionModal, setShowRedemptionModal] = useState(false);
  const [showCouponCode, setShowCouponCode] = useState(false);

  // Scroll to top when this page mounts or rewardId changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [rewardId]);
  
  // Get reward data (fallback to luxury-watch if rewardId not found)
  const reward = mockRewardData[rewardId as keyof typeof mockRewardData] || mockRewardData["luxury-watch"];
  
  // Mock user points
  const userPoints = 85000;
  const canRedeem = userPoints >= reward.pointsCost;
  
  // Calculate savings percentage
  const savingsPercentage = Math.round((reward.savings / reward.originalValue) * 100);
  
  const handleRedemption = () => {
    if (canRedeem) {
      setShowRedemptionModal(true);
    }
  };
  
  const confirmRedemption = () => {
    // onRedeem(reward.id);
    setShowRedemptionModal(false);
    setShowCouponCode(true);
  };

  return (
    <div className="pt-[88px] min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <AxisButton 
              variant="outline" 
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Benefits
            </AxisButton>
            <div className="flex items-center gap-2 ml-auto">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Heart 
                  size={20} 
                  className={isLiked ? "fill-red-500 text-red-500" : "text-gray-400"} 
                />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Share2 size={20} className="text-gray-400" />
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative">
                <ImageWithFallback
                  src={reward.image}
                  alt={reward.title}
                  className="w-full h-96 object-cover rounded-xl"
                />
                {/* <Badge className="absolute top-4 left-4 bg-[#97144D] text-white">
                  {reward.availability}
                </Badge>
                {reward.tags.includes("Limited Edition") && (
                  <Badge className="absolute top-4 right-4 bg-orange-500 text-white">
                    Limited Edition
                  </Badge>
                )} */}
              </div>
              
              {/* Thumbnail Gallery */}
              {/* {reward.gallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {reward.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index 
                          ? "border-[#97144D] ring-2 ring-[#97144D]/20" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${reward.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )} */}
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{reward.category}</Badge>
                  <Badge variant="outline">{reward.brand}</Badge>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{reward.title}</h1>
                <p className="text-xl text-gray-600 mb-4">{reward.subtitle}</p>

                {/* Rating */}
                {/* <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(reward.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                    <span className="ml-1 font-medium">{reward.rating}</span>
                  </div>
                  <span className="text-gray-500">({reward.reviewCount} reviews)</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-500">{reward.redemptionCount} redeemed</span>
                </div> */}
              </div>
              
              {/* Pricing */}
              <div className="bg-gradient-to-r from-[#97144D]/5 to-[#12877F]/5 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-[#97144D]">
                      {reward.pointHeader}
                      {/* {reward.pointsCost.toLocaleString()} Points */}
                    </div>
                    {showCouponCode && (  
                      <div className="bg-green-50 mt-4 border border-green-200 text-green-800 p-4 rounded-lg mb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Coupon Code:</span>
                          <span>{reward.couponCode}</span>
                        </div>
                      </div>
                    )}
                    {/* <div className="text-sm text-gray-600">
                      Worth ₹{reward.originalValue.toLocaleString()}
                    </div> */}
                  </div>
                  {/* <div className="text-right">
                    <div className="text-lg font-semibold text-green-600">
                      Save ₹{reward.savings.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      {savingsPercentage}% off
                    </div>
                  </div> */}
                </div>
                
                {/* Points Balance */}
                <div className="mb-4">
                  {/* <div className="flex justify-between text-sm mb-1">
                    <span>Your Points Balance</span>
                    <span className={canRedeem ? "text-green-600" : "text-red-600"}>
                      {userPoints.toLocaleString()} points
                    </span>
                  </div> */}
                  {/* <Progress 
                    value={(userPoints / reward.pointsCost) * 100} 
                    className="h-2"
                  /> */}
                  {!canRedeem && (
                    <div className="text-sm text-red-600 mt-1">
                      Need {(reward.pointsCost - userPoints).toLocaleString()} more points
                    </div>
                  )}
                </div>
                
                {/* Redemption Button */}
                <AxisButton
                  variant={canRedeem ? "primary" : "outline"}
                  onClick={handleRedemption}
                  disabled={!canRedeem}
                  className="w-full"
                >
                  {canRedeem ? "Redeem Now" : "Insufficient Points"}
                </AxisButton>
              </div>
              
              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-gray-400" />
                  <span>Valid until {new Date(reward.validUntil).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield size={16} className="text-gray-400" />
                  <span>Burgundy Exclusive</span>
                </div>
                {/* <div className="flex items-center gap-2 text-sm">
                  <Gift size={16} className="text-gray-400" />
                  <span>Gift Wrapping Available</span>
                </div> */}
                <div className="flex items-center gap-2 text-sm">
                  <Users size={16} className="text-gray-400" />
                  <span>{reward.redemptionCount}+ Happy Customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Detailed Information Tabs */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="redemption">Redemption Steps</TabsTrigger>
            <TabsTrigger value="terms">Terms</TabsTrigger>
            <TabsTrigger value="faq">FAQ's</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {reward.description}
                    </p>
                  </CardContent>
                  <CardHeader>
                    <CardTitle>Brand Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      {reward.longDescription}
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                {/* Eligibility */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info size={20} />
                      Eligibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Multiple Uses</span>
                      <Badge variant="outline">{reward.eligibility.segment}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reddemption Mode</span>
                      <span>{reward.eligibility.redemptionMode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Clubbable</span>
                      <span>{reward.eligibility.clubbable}</span>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Tags */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {reward.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="redemption" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Redemption Steps</CardTitle>
                <CardDescription>
                  Detailed steps to redeem this reward
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  {reward.redemptionSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                      <span>{index + 1}. {step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle size={20} />
                  Terms & Conditions
                </CardTitle>
                <CardDescription>
                  Please read carefully before redeeming this reward
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reward.termsAndConditions.map((term, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border-l-4 border-[#97144D] bg-gray-50">
                      <span className="text-[#97144D] font-medium">{index + 1}.</span>
                      <span className="text-gray-700">{term}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            <CardContent>
              <FAQAccordion faqs={reward.faq} />
            </CardContent>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related Rewards */}
      <div className="bg-white border-t">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reward.relatedRewards.map((relatedId, index) => {
              const relatedReward = mockRewardData[relatedId as keyof typeof mockRewardData];
              if (!relatedReward) return null;
              
              return (
                <Card 
                  key={index} 
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => onRewardSelect?.(relatedId)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={relatedReward.image}
                      alt={relatedReward.title}
                      className="w-full h-full object-cover rounded-t-[10px]"
                    />
                    <Badge className="absolute top-3 left-3 bg-[#97144D] text-white text-xs">
                      {relatedReward.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <h3 className="font-semibold mb-1 line-clamp-1">{relatedReward.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{relatedReward.subtitle}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < Math.floor(relatedReward.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({relatedReward.reviewCount})</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="font-bold text-[#97144D]">
                          {relatedReward.pointHeader}
                        </span>
                      </div>
                      <AxisButton 
                        variant="outline" 
                        size="sm"
                        onClick={() => onRewardSelect?.(relatedId)}
                      >
                        View Details
                      </AxisButton>
                    </div>
                    
                    {/* Additional info */}
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <Clock size={12} />
                      <span>Valid until {new Date(relatedReward.validUntil).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Redemption Confirmation Modal */}
      {showRedemptionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#97144D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-[#97144D]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Confirm Redemption</h3>
              <p className="text-gray-600">
                Are you sure you want to redeem this reward?
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{reward.title}</span>
              </div>
              {/* <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Points Required</span>
                <span className="font-medium">{reward.pointsCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Your Balance After</span>
                <span className="font-medium">{(userPoints - reward.pointsCost).toLocaleString()}</span>
              </div> */}
            </div>
            
            <div className="flex gap-3">
              <AxisButton
                variant="outline"
                onClick={() => setShowRedemptionModal(false)}
                className="flex-1"
              >
                Cancel
              </AxisButton>
              <AxisButton
                variant="primary"
                onClick={confirmRedemption}
                className="flex-1"
              >
                Confirm Redemption
              </AxisButton>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
