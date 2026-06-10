import { ArrowRight, Shield, Gift, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

import { AxisButton } from "./AxisButton";

import { ImageWithFallback } from "./figma/ImageWithFallback";

import { whyChooseBanner } from "../assets";

type CallToActionProps = {
  isLoggedIn?: boolean;
  onOpenAccount?: () => void;
  onExploreRewards?: () => void;
};

export const CallToAction = ({ isLoggedIn, onOpenAccount, onExploreRewards }: CallToActionProps) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    {
      icon: Shield,
      title: "Safe & Secure Banking",
      description: "Enhanced security features to protect your money and transactions.",
      color: "#97144d"
    },
    {
      icon: Gift,
      title: "Personalized Benefits",
      description: "Enjoy benefits and offers tailored to your spending habits and lifestyle.",
      color: "#ED1164"
    },
    {
      icon: CreditCard,
      title: "Seamless Digital Banking",
      description: "Access your account anytime, anywhere with our award-winning digital platform.",
      color: "#97144d"
    }
  ];

  const segments = [
    {
      name: "Burgundy",
      color: "#97144D",
      description: "Luxury experiences & global privileges"
    },
    {
      name: "Priority",
      color: "#97144D",
      description: "Premium savings on travel, dining & lifestyle"
    },
    {
      name: "Prestige",
      color: "#97144D",
      description: "Smart savings on everyday spends"
    },
    {
      name: "Sampann",
      color: "#97144D",
      description: "Everyday banking with added rewards"
    },
    {
      name: "Liberty",
      color: "#97144D",
      description: "Flexible banking with choice-based benefits"
    },
    {
      name: "Easy",
      color: "#97144D",
      description: "Simple banking with essential savings offers"
    },
  ];

  return (
    <section className="py-8 px-4 bg-white">
      {/* Reduced padding from py-16 to py-8 */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
        >
          {/* Content Section */}
          <motion.div variants={itemVariants}>
            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold mb-4 text-gray-900"
            >
              Why Choose Axis Bank Savings Account?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-gray-700 mb-6 leading-relaxed"
            >
              An Axis Bank Savings Account offers you more than just a place to keep your money.
              Enjoy a comprehensive banking experience with personalized benefits, digital convenience, and exclusive benefits.
            </motion.p>

            {/* Features List with Micro-interactions */}
            <motion.div
              variants={itemVariants}
              className="space-y-4 mb-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="flex items-start group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                    className="mr-4 p-2 rounded-full"
                    style={{ backgroundColor: feature.color }}
                  >
                    <feature.icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-[#97144D] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons with Enhanced Micro-interactions */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3"
            >
              {isLoggedIn ? (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <AxisButton
                    onClick={onExploreRewards}
                    variant="primary"
                    className="w-full btn-micro"
                  >
                    <span>Explore Your Benefits</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </AxisButton>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1"
                  >
                    <AxisButton
                      onClick={onExploreRewards}
                      variant="outline"
                      className="w-full btn-micro"
                    >
                      Explore Benefits
                    </AxisButton>
                  </motion.div>
                  {/* <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1"
                  >
                    <AxisButton
                      onClick={onOpenAccount}
                      variant="primary"
                      className="w-full btn-micro"
                    >
                      <span>Open Account</span>
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </motion.div>
                    </AxisButton>
                  </motion.div> */}
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Visual Section */}
          <motion.div
            variants={itemVariants}
            className="lg:order-2"
          >
            {/* Enhanced Main Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative mb-6"
            >
              <div className="relative min-h-[360px] rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src={whyChooseBanner}
                  alt="Modern banking and financial services"
                  className="w-full h-[360px] object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-[#97144D]/30 to-transparent"></div> */}

                {/* Enhanced Floating Stats Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="absolute inset-x-4 bottom-4 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-lg border border-white/20"
                >
                  <div className="font-bold text-base md:text-lg px-4 mb-4 text-gray-900">Why Explore Axis Offers?</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { value: "Curated for You", label: "", color: "#97144D" },
                      { value: "Trusted Partners", label: "", color: "#ED1164" },
                      { value: "Seamless Experience", label: "", color: "#97144D" }
                      // { value: "Curated for You", label: "Enhanced security features to protect your money and transactions.", color: "#97144D" },
                      // { value: "Trusted Partners", label: "Enjoy benefits and offers tailored to your spending habits and lifestyle.", color: "#ED1164" },
                      // { value: "Seamless Experience", label: "Access your account anytime, anywhere with our award-winning digital platform.", color: "#97144D" }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        whileHover={{ y: -2 }}
                        className="cursor-pointer text-center px-2"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                          className="font-bold text-sm md:text-base leading-tight"
                          style={{ color: stat.color }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-sm text-gray-600 leading-snug mt-2 max-w-[16rem] mx-auto">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Account Benefits Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45 }}
          className="mt-8 rounded-2xl border border-[#97144D]/10 bg-gradient-to-br from-white via-white to-[#FFF3F8] p-5 shadow-lg md:p-8"
        >
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <motion.h3
                whileInView={{ opacity: [0.7, 1], y: [8, 0] }}
                viewport={{ once: true }}
                className="text-xl font-bold text-[#97144D] md:text-2xl"
              >
                Unlock Benefits Designed for Every Segment
              </motion.h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-700 md:text-base">
                Axis Bank offers different account types to match your unique needs and financial goals.
              </p>
            </div>
            {/* <div className="hidden h-1 w-32 rounded-full bg-[#97144D]/20 md:block" /> */}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {segments.map((segment, index) => (
              <motion.div
                key={segment.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                className="group flex min-h-[80px] cursor-pointer items-start gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#97144D]/30 hover:shadow-md"
              >
                <motion.span
                  whileHover={{ scale: 1.08 }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#97144D]/10 text-sm font-bold text-[#97144D] transition-colors duration-300 group-hover:bg-[#97144D] group-hover:text-white"
                >
                  {index + 1}
                </motion.span>
                <div>
                  <h4 className="font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#97144D]">
                    {segment.name}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {segment.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
