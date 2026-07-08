import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { ImageWithFallback } from "./figma/ImageWithFallback";

import { AxisButton } from "./AxisButton";

import { LoginInfoModal } from "./LoginInfoModal";

import { footerBanner, footerBannerMobile, AxisBannerfooter1, AxisBannerfooter2 } from "../assets";

type RewardsShowcaseProps = {
  onPlayGames: () => void;
  onExploreRewards: () => void;
  onLogin: () => void;
  onRewardSelect?: (rewardId: string) => void;
  isLoggedIn?: boolean;
};

const carouselImages = [
  {
    image: footerBanner,
    mobileImage: footerBannerMobile,
    alt: "Axis Bank benefits experience"
  },
  {
    image: AxisBannerfooter2,
    mobileImage: AxisBannerfooter2,
    alt: "Axis Bank savings account benefits"
  },
  {
    image: AxisBannerfooter1,
    mobileImage: AxisBannerfooter1,
    alt: "Burgundy banking experience"
  },
];

export const RewardsShowcase = ({ onPlayGames, onExploreRewards, onLogin, onRewardSelect ,isLoggedIn}: RewardsShowcaseProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLoginInfo, setShowLoginInfo] = useState(false);
  const activeImage = carouselImages[activeImageIndex];

  const goToNextImage = () => {
    setActiveImageIndex((currentIndex) => (
      currentIndex === carouselImages.length - 1 ? 0 : currentIndex + 1
    ));
  };

  useEffect(() => {
    if (isLoggedIn) return undefined;

    const intervalId = window.setInterval(goToNextImage, 4500);

    return () => window.clearInterval(intervalId);
  }, [isLoggedIn]);

  return (
    <section className="w-full overflow-hidden">
      <div className="relative w-full bg-gradient-to-r from-[#f9f9f9] to-[#FFF0F6]">
          {!isLoggedIn &&
           (
             <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/80">
                <div className="md:flex items-center">
                  <div className="md:w-1/2 p-8 md:p-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#97144D] mb-3">
                      Your Personalized Offers Await
                    </h2>
                    <p className="text-gray-700 mb-6 max-w-lg">
                      Login to explore curated offers and privileges tailored to your lifestyle. Enjoy premium savings, exclusive deals and experiences designed just for you.
                    </p>
                    <AxisButton
                      variant="primary"
                      onClick={() => setShowLoginInfo(true)}
                      className="w-full md:w-auto"
                    >
                      <span className="flex items-center justify-center">
                        Login to Explore Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </AxisButton>
                  </div>

                  <div className="relative h-64 md:h-[360px] md:w-1/2 md:self-stretch">
                    <div className="absolute inset-0 h-full overflow-hidden">
                      <AnimatePresence initial={false}>
                        <motion.picture
                          key={activeImage.alt}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="absolute inset-0 block h-full w-full"
                        >
                          <source media="(max-width: 767px)" srcSet={activeImage.mobileImage} />
                          <ImageWithFallback
                            src={activeImage.image}
                            alt={activeImage.alt}
                            className="h-full w-full object-cover"
                          />
                        </motion.picture>
                      </AnimatePresence>

                      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center">
                        <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 shadow-md backdrop-blur-sm">
                          {carouselImages.map((image, index) => (
                            <button
                              key={image.alt}
                              type="button"
                              onClick={() => setActiveImageIndex(index)}
                              aria-label={`Show carousel image ${index + 1}`}
                              className={`h-2.5 rounded-full transition-all ${
                                activeImageIndex === index ? "w-7 bg-[#97144D]" : "w-2.5 bg-[#D8B7C6] hover:bg-[#97144D]/60"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
      <LoginInfoModal isOpen={showLoginInfo} onClose={() => setShowLoginInfo(false)} />
    </section>
  );
};
