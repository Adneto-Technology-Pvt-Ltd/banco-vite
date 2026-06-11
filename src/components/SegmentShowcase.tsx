import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BadgeCheck, CheckCircle2, Crown, Gem, Shield, TrendingUp, WalletCards } from "lucide-react";

import { ImageWithFallback } from "./figma/ImageWithFallback";

import { AxisBurgandyImage, AxisLibertyImage, AxisPrestigeImage, AxisProrityImage, AxisEasyImage, AxisSampannImage } from "../assets";

type Segment = {
  id: string;
  name: string;
  tagline: string;
  headline: string;
  why: string;
  topHighlights: string[];
  keyBenefits: string[];
  exclusiveFeatures: string[];
  useCase: string;
  ctaLabel: string;
  ctaUrl: string;
  imageUrl: string;
  imageLabel: string;
  icon: typeof Crown;
};

const brandAccent = "#ED1164";

const segmentData: Segment[] = [
  {
    id: "burgundy",
    name: "Burgundy",
    tagline: "Premium",
    headline: "An exclusive banking experience designed to help you grow your wealth",
    why: "Designed for individuals seeking premium banking solutions, personalized wealth support, and enhanced privileges.",
    topHighlights: [
      "Dedicated Relationship Manager support",
      "Wealth management & investment solutions",
      "Exclusive privileges & curated experiences"
    ],
    keyBenefits: [
      "24/7 customer support via dedicated channels",
      "Higher transaction limits & enhanced banking capabilities",
      "Access to offers, rewards, and cashback programs"
    ],
    exclusiveFeatures: [
      "Wealth management solutions including deposits, mutual funds, and portfolio services",
      "Accelerated rewards on transactions",
      "Privileges extendable to family banking members"
    ],
    useCase: "Experience seamless banking with premium privileges, wealth solutions, and curated lifestyle benefits.",
    ctaLabel: "Explore Burgundy Benefits",
    ctaUrl: "https://www.axis.bank.in/burgundy",
    imageUrl: AxisBurgandyImage,
    imageLabel: "Burgundy Account",
    icon: Crown
  },
  {
    id: "priority",
    name: "Priority",
    tagline: "Privileged",
    headline: "A banking experience that rewards your success with exclusive privileges",
    why: "Ideal for customers looking for preferential services, lifestyle benefits, and enhanced banking support.",
    topHighlights: [
      "Priority Banking services",
      "Preferential pricing & benefits",
      "Lifestyle & travel privileges"
    ],
    keyBenefits: [
      "Priority service across phone banking and branches",
      "Dedicated relationship manager support",
      "Reward points program on transactions (EDGE Rewards)"
    ],
    exclusiveFeatures: [
      "Lifestyle benefits across dining, travel, and entertainment",
      "Preferential rates on loans, lockers, forex, and investments",
      "Access to investment and insurance solutions"
    ],
    useCase: "Enjoy a more rewarding everyday banking experience with added privileges and preferential treatment.",
    ctaLabel: "Explore Priority Benefits",
    ctaUrl: "https://www.axis.bank.in/priority-banking-program",
    imageUrl: AxisProrityImage,
    imageLabel: "Priority Account",
    icon: BadgeCheck
  },
    {
    id: "prestige",
    name: "Prestige",
    tagline: "Rewarding",
    headline: "A rewarding banking experience designed to enhance everyday banking",
    why: "Best suited for customers seeking enhanced benefits, rewards, and digital banking convenience.",
    topHighlights: [
      "Cashback on everyday spends",
      "Accelerated rewards program",
      "Enhanced digital banking"
    ],
    keyBenefits: [
      "Cashback on fuel, shopping, and travel spends via debit card",
      "24x7 banking services and higher transaction limits",
      "Annual benefits and rewards across categories"
    ],
    exclusiveFeatures: [
      "Accelerated EDGE reward points",
      "Free digital banking services and transactions",
      "Insurance coverage and lifestyle benefits"
    ],
    useCase: "Earn rewards on your everyday spending while enjoying a seamless and feature-rich banking experience.",
    ctaLabel: "Explore Prestige Benefits",
    ctaUrl: "https://www.axis.bank.in/accounts/savings-account/prestige-savings-account",
    imageUrl: AxisPrestigeImage,
    imageLabel: "Prestige Account",
    icon: Gem
  },
  {
    id: "sampann",
    name: "Sampann",
    tagline: "Standard",
    headline: "A savings account designed to support your growing financial needs",
    why: "Ideal for customers looking for a balance of rewards, services, and everyday banking benefits.",
    topHighlights: [
      "Cashback debit card benefits",
      "Dedicated banking assistance",
      "Reward-driven banking experience"
    ],
    keyBenefits: [
      "Cashback on fuel, shopping, and travel spends",
      "Access to 24x7 banking services",
      "Debit card with multiple reward-driven features"
    ],
    exclusiveFeatures: [
      "Dedicated relationship support for banking needs",
      "Discounts on loan processing fees",
      "Complimentary benefits and annual rewards packages"
    ],
    useCase: "Meet your everyday financial needs while earning rewards and accessing essential banking benefits.",
    ctaLabel: "Explore Sampann Benefits",
    ctaUrl: "https://www.axis.bank.in/accounts/savings-account/sampann-savings-account",
    imageUrl: AxisSampannImage,
    imageLabel: "Sampann Account",
    icon: TrendingUp
  },
  {
    id: "liberty",
    name: "Liberty",
    tagline: "Standard",
    headline: "A flexible savings account that adapts to your financial lifestyle",
    why: "Perfect for customers who want flexibility in maintaining balances while enjoying rewards and cashback.",
    topHighlights: [
      "Flexible balance or spend-based requirement",
      "Cashback on debit card spends",
      "Digital-first banking experience"
    ],
    keyBenefits: [
      "Flexibility to maintain balance or meet spend criteria",
      "Cashback benefits on debit card transactions",
      "24/7 digital banking and higher transaction limits"
    ],
    exclusiveFeatures: [
      "Weekend cashback across multiple categories",
      "Dining discounts and reward programs",
      "Insurance benefits on debit card usage"
    ],
    useCase: "Enjoy the flexibility to bank your way while earning rewards on your everyday spending.",
    ctaLabel: "Explore Liberty Benefits",
    ctaUrl: "https://www.axis.bank.in/accounts/savings-account/liberty-savings-account",
    imageUrl: AxisLibertyImage,
    imageLabel: "Liberty Account",
    icon: WalletCards
  },
    {
    id: "easy",
    name: "Easy",
    tagline: "Basic",
    headline: "A simple and convenient savings account for everyday banking needs",
    why: "Best suited for customers looking for easy, accessible, and hassle-free banking.",
    topHighlights: [
      "Easy account access and management",
      "Digital banking convenience",
      "Everyday rewards"
    ],
    keyBenefits: [
      "Secure and easy access to funds and transactions",
      "Digital banking with app-based services",
      "Cashback and rewards on transactions"
    ],
    exclusiveFeatures: [
      "Debit card with everyday offers and benefits",
      "Access to wide ATM and branch network",
      "Seamless account opening and management"
    ],
    useCase: "Manage your daily banking needs easily with a simple and convenient account.",
    ctaLabel: "Explore Easy Benefits",
    ctaUrl: "https://www.axis.bank.in/accounts/savings-account/easy-access-digital-savings-account",
    imageUrl: AxisEasyImage,
    imageLabel: "Easy Account",
    icon: Shield
  },
];

export const SegmentShowcase = () => {
  const [activeSegment, setActiveSegment] = useState("burgundy");
  const activeData = segmentData.find((segment) => segment.id === activeSegment) || segmentData[0];
  const IconComponent = activeData.icon;

  return (
    <section className="px-4 py-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {segmentData.map((segment) => {
              const TabIcon = segment.icon;
              const isActive = activeSegment === segment.id;

              return (
                <button
                  key={segment.id}
                  type="button"
                  onClick={() => setActiveSegment(segment.id)}
                  className={`min-h-[104px] rounded-xl px-4 py-4 transition-all duration-200 ${
                    isActive
                      ? "bg-[#97144D] text-white shadow-md"
                      : "bg-white text-[#4b3d43] hover:bg-[#f8f3f5]"
                  }`}
                >
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    {/* <TabIcon className={`h-5 w-5 ${isActive ? "text-white" : "text-[#5d4650]"}`} /> */}
                    <div className="text-lg font-bold">{segment.name}</div>
                    {/* <div className={`text-sm font-medium ${isActive ? "text-white/90" : "text-gray-500"}`}>
                      {segment.tagline}
                    </div> */}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <AnimatePresence mode="wait">
            <motion.article
              key={`${activeSegment}-content`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl bg-gradient-to-br from-[#97144D] to-[#7d1041] text-white shadow-xl p-8 md:p-10 min-h-[640px]"
            >
              <div className="flex items-start gap-4">
                {/* <div className="rounded-full bg-white/15 p-3">
                  <IconComponent className="h-7 w-7" />
                </div> */}
                <div>
                  <h2 className="text-3xl font-bold leading-tight">{activeData.name}</h2>
                </div>
              </div>

              <p className="mt-8 text-lg font-semibold leading-relaxed max-w-2xl">{activeData.headline}</p>

              <div className="mt-6 rounded-xl bg-white/12 p-5">
                <h3 className="text-lg font-bold mb-2">Why this is right for you</h3>
                <p className="text-white/90 leading-relaxed">{activeData.why}</p>
              </div>

              <div className="mt-8 space-y-7">
                <FeatureList title="Top Highlights" items={activeData.topHighlights} iconColor={brandAccent} />
                <FeatureList title="Key Benefits" items={activeData.keyBenefits} iconColor={brandAccent} />
                <FeatureList title="Exclusive Features" items={activeData.exclusiveFeatures} iconColor={brandAccent} />
              </div>

              <div className="mt-8 rounded-xl bg-white/10 p-4">
                <div className="text-sm uppercase tracking-wide text-white/70 mb-2">Lifestyle Use Case</div>
                <p className="text-white/95 leading-relaxed">{activeData.useCase}</p>
              </div>

              <a
                href={activeData.ctaUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-[#97144D] shadow-sm transition-colors hover:bg-[#FFF3F8]"
              >
                {activeData.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.article>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeSegment}-image`}
              initial={{ opacity: 0, x: 24, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -24, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative min-h-[460px] lg:min-h-[640px] rounded-2xl overflow-hidden shadow-xl bg-gray-100"
            >
              <ImageWithFallback
                src={activeData.imageUrl}
                alt={`${activeData.name} banking experience`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              {/* <div className="absolute left-6 right-6 bottom-6 rounded-xl bg-white/90 backdrop-blur-md p-5 shadow-lg">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xl font-bold text-gray-900">{activeData.imageLabel}</div>
                    <div className="text-sm font-medium text-gray-600">{activeData.tagline} Banking</div>
                  </div>
                  <div className="rounded-full bg-[#97144D] p-3 text-white">
                    <IconComponent className="h-5 w-5" />
                  </div>
                </div>
              </div> */}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

function FeatureList({ title, items, iconColor }: { title: string; items: string[]; iconColor: string }) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5" style={{ color: iconColor }} />
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <CheckCircle2 className="h-4 w-4 mt-1 shrink-0" style={{ color: iconColor }} />
            <span className="text-white/95 leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
