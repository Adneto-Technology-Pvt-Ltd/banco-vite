import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CheckCircle, Star, ArrowRight, CreditCard, TrendingUp, Shield, Crown, Zap } from "lucide-react";

// Enhanced segment data with exact matching to the image
const segmentData = [
  {
    id: "burgundy",
    name: "Burgundy",
    tagline: "Premium",
    description: "Premium banking experience for high-net-worth individuals",
    minBalance: "₹10 Lakh",
    customerType: "High Net Worth",
    benefits: [
      "Premium OTT subscriptions",
      "Unlimited airport lounge access",
      "Personalized wealth management",
      "Preferential forex rates",
      "Dedicated relationship manager"
    ],
    uniqueFeatures: ["24/7 Priority Banking", "Global Concierge", "Investment Advisory"],
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "bg-[#97144d]",
    gradientFrom: "from-[#97144d]",
    gradientTo: "to-[#7d1041]",
    activeTabClass: "bg-[#97144d] text-white border-[#97144d]",
    textColor: "text-[#97144d]",
    icon: Crown,
    tier: "Premium",
    accentColor: "#97144d"
  },
  {
    id: "arise",
    name: "Arise",
    tagline: "Growth",
    description: "For those rising to the top of their career",
    minBalance: "₹2 Lakh",
    customerType: "Young Professionals",
    benefits: [
      "Dining privileges",
      "Travel insurance",
      "Investment advisory",
      "Annual health check-up",
      "Higher interest rates"
    ],
    uniqueFeatures: ["Career Growth Benefits", "Health & Wellness", "Investment Guidance"],
    imageUrl: "https://images.unsplash.com/photo-1589666564459-93cdd3ab856a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "bg-[#12877F]",
    gradientFrom: "from-[#12877F]",
    gradientTo: "to-[#0e6e67]",
    activeTabClass: "bg-[#12877F] text-white border-[#12877F]",
    textColor: "text-[#12877F]",
    icon: Zap,
    tier: "Growth",
    accentColor: "#12877F"
  },
  {
    id: "sampann",
    name: "Sampann",
    tagline: "Standard",
    description: "For individuals focused on financial growth",
    minBalance: "₹50,000",
    customerType: "Wealth Builders",
    benefits: [
      "Cashback offers",
      "Discount on lockers",
      "Free demand drafts",
      "Special credit card offers",
      "Reduced AMB requirements"
    ],
    uniqueFeatures: ["Savings Rewards", "Investment Options", "Financial Planning"],
    imageUrl: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "bg-[#b8860b]",
    gradientFrom: "from-[#b8860b]",
    gradientTo: "to-[#9a7209]",
    activeTabClass: "bg-[#b8860b] text-white border-[#b8860b]",
    textColor: "text-[#b8860b]",
    icon: TrendingUp,
    tier: "Standard",
    accentColor: "#b8860b"
  },
  {
    id: "liberty",
    name: "Liberty",
    tagline: "Standard",
    description: "Smart banking for everyday customers",
    minBalance: "₹25,000",
    customerType: "Regular Customers",
    benefits: [
      "Free ATM transactions",
      "Digital banking services",
      "Basic insurance coverage",
      "Bill payment rewards",
      "No minimum balance"
    ],
    uniqueFeatures: ["Digital First", "Convenience Banking", "Everyday Rewards"],
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "bg-[#1e5779]",
    gradientFrom: "from-[#1e5779]",
    gradientTo: "to-[#164660]",
    activeTabClass: "bg-[#1e5779] text-white border-[#1e5779]",
    textColor: "text-[#1e5779]",
    icon: CreditCard,
    tier: "Standard",
    accentColor: "#1e5779"
  },
  {
    id: "easy",
    name: "Easy",
    tagline: "Basic",
    description: "Simple banking for beginners",
    minBalance: "Zero Balance",
    customerType: "New to Banking",
    benefits: [
      "Exclusive benefits option",
      "Basic digital banking",
      "Debit card features",
      "Essential account services",
      "Low fee structure"
    ],
    uniqueFeatures: ["No Complications", "Easy Access", "Beginner Friendly"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "bg-[#4d7c0f]",
    gradientFrom: "from-[#4d7c0f]",
    gradientTo: "to-[#3d630c]",
    activeTabClass: "bg-[#4d7c0f] text-white border-[#4d7c0f]",
    textColor: "text-[#4d7c0f]",
    icon: Shield,
    tier: "Basic",
    accentColor: "#4d7c0f"
  }
];

export const SegmentShowcase = () => {
  const [activeSegment, setActiveSegment] = useState("burgundy");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const activeData = segmentData.find(s => s.id === activeSegment) || segmentData[0];

  // Handle tab change
  const handleTabChange = (segmentId: string) => {
    setActiveSegment(segmentId);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-8"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-[#97144D]/10 text-[#97144D] px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <Star className="h-4 w-4" />
            Banking Excellence
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold mb-4 text-gray-900"
          >
            Benefits Tailored To Your Account Type
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Choose the perfect account type for your best benefits. Each account offers unique features and rewards designed to enhance your banking experience.
          </motion.p>
        </motion.div>

        {/* Fixed Tabs Navigation - matching the image exactly */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-8"
        >
          <div className="bg-gray-50 rounded-2xl p-3 border border-gray-200">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {segmentData.map((segment) => {
                const IconComponent = segment.icon;
                const isActive = activeSegment === segment.id;
                const isHovered = hoveredTab === segment.id;
                
                return (
                  <motion.button
                    key={segment.id}
                    onClick={() => handleTabChange(segment.id)}
                    onMouseEnter={() => setHoveredTab(segment.id)}
                    onMouseLeave={() => setHoveredTab(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      relative px-4 py-4 rounded-xl transition-all duration-300 min-w-[120px] flex-1
                      flex flex-col items-center gap-2 group border-2
                      ${isActive 
                        ? `${segment.color} text-white shadow-lg border-transparent` 
                        : `bg-white ${segment.textColor} hover:bg-gray-50 border-transparent hover:shadow-md`
                      }
                    `}
                    style={{
                      boxShadow: isActive ? `0 8px 25px -5px ${segment.accentColor}40` : undefined
                    }}
                  >
                    {/* Icon */}
                    <motion.div
                      animate={isActive ? { rotate: [0, 5, -5, 0] } : {}}
                      transition={{ duration: 0.5 }}
                      className={`p-2 rounded-full ${isActive ? 'bg-white/20' : `bg-${segment.accentColor.replace('#', '')}/10`}`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </motion.div>
                    
                    {/* Text Content */}
                    <div className="text-center">
                      <div className="font-bold text-sm mb-1">{segment.name}</div>
                      <div className={`text-xs ${isActive ? 'text-white/90' : 'text-gray-500'}`}>
                        {segment.tagline}
                      </div>
                    </div>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
          {/* Content Card */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSegment}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Card className={`
                  border-0 shadow-xl text-white h-full min-h-[500px] 
                  bg-gradient-to-br ${activeData.gradientFrom} ${activeData.gradientTo}
                  relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500
                `}>
                  {/* Animated background elements */}
                  <div className="absolute inset-0 opacity-20">
                    <motion.div 
                      animate={{ 
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute top-4 right-4 w-32 h-32 rounded-full bg-white/20 blur-3xl"
                    />
                    <motion.div 
                      animate={{ 
                        x: [0, -50, 0],
                        y: [0, 100, 0],
                        scale: [1, 0.8, 1]
                      }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-white/10 blur-2xl"
                    />
                  </div>

                  <CardHeader className="relative z-10 pb-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-3 mb-4"
                    >
                      <motion.div 
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/20 backdrop-blur-sm rounded-full p-3"
                      >
                        <activeData.icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <div>
                        <CardTitle className="text-2xl font-bold">
                          {activeData.name}
                        </CardTitle>
                        <div className="text-white/90 font-medium">
                          {activeData.tagline} Banking
                        </div>
                      </div>
                    </motion.div>
                    
                    <CardDescription className="text-white/95 leading-relaxed">
                      {activeData.description}
                    </CardDescription>

                    {/* Account Details */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="grid grid-cols-2 gap-3 mt-4"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="bg-white/15 backdrop-blur-sm rounded-lg p-3 cursor-pointer"
                      >
                        <div className="text-white/80 text-xs">Minimum Balance</div>
                        <div className="text-white font-bold text-sm">{activeData.minBalance}</div>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="bg-white/15 backdrop-blur-sm rounded-lg p-3 cursor-pointer"
                      >
                        <div className="text-white/80 text-xs">Customer Type</div>
                        <div className="text-white font-bold text-xs">{activeData.customerType}</div>
                      </motion.div>
                    </motion.div>
                  </CardHeader>

                  <CardContent className="relative z-10 space-y-4">
                    {/* Benefits */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h4 className="font-bold mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Key Benefits
                      </h4>
                      <div className="space-y-2">
                        {activeData.benefits.slice(0, 3).map((benefit, index) => (
                          <motion.div
                            key={benefit}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            whileHover={{ x: 5 }}
                            className="flex items-start gap-2 group cursor-pointer"
                          >
                            <motion.div 
                              whileHover={{ scale: 1.2 }}
                              className="bg-white/20 rounded-full p-0.5 mt-1 group-hover:bg-white/30 transition-colors"
                            >
                              <CheckCircle className="h-3 w-3 text-white" />
                            </motion.div>
                            <span className="text-white/95 text-sm leading-relaxed flex-1">
                              {benefit}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Unique Features */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-3"
                    >
                      <h4 className="font-bold flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        Exclusive Features
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeData.uniqueFeatures.map((feature, index) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium border border-white/20 cursor-pointer"
                          >
                            {feature}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* CTA Button */}
                    {/* <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="pt-4"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.02 }} 
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                          <span>Open {activeData.name} Account</span>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </motion.div>
                        </Button>
                      </motion.div>
                    </motion.div> */}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Image Container */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSegment}
                initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden h-64 lg:h-[500px] bg-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-500 group"
              >
                <ImageWithFallback
                  src={activeData.imageUrl}
                  alt={`${activeData.name} Banking Services`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Enhanced overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${activeData.gradientFrom}/30 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500`}></div>
                
                {/* Floating info card */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{activeData.name} Account</div>
                      <div className="text-xs text-gray-600">{activeData.tagline} Banking</div>
                    </div>
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`${activeData.color} text-white rounded-full p-2`}
                    >
                      <activeData.icon className="h-4 w-4" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-[#97144D]/8 via-[#12877F]/8 to-[#97144D]/8 rounded-2xl p-6 border border-[#97144D]/10">
            <motion.h3 
              whileInView={{ scale: [0.9, 1.05, 1] }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold text-gray-900 mb-3"
            >
              Need help choosing the right account?
            </motion.h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6 text-sm">
              Our banking experts will help you find the perfect account for your needs
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-[#97144D] hover:bg-[#7d1041] text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm">
                  Get Recommendation
                </Button>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  className="border-[#97144D] text-[#97144D] hover:bg-[#97144D] hover:text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 text-sm"
                >
                  Compare All Accounts
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};