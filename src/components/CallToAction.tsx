import { ArrowRight, Shield, Gift, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { AxisButton } from "./AxisButton";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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
      color: "#12877F"
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
      description: "Premium banking with personalized wealth management and exclusive lifestyle privileges."
    },
    {
      name: "Prestige", 
      color: "#12877F",
      description: "Priority banking with relationship manager and special rates on loans and deposits."
    },
    {
      name: "Arise",
      color: "#97144D", 
      description: "Enhanced everyday banking with digital convenience and attractive benefits."
    },
    {
      name: "Liberty",
      color: "#12877F",
      description: "Simple, low-cost banking with essential features and digital access."
    }
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
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
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Modern banking and financial services"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#97144D]/30 to-transparent"></div>
                
                {/* Enhanced Floating Stats Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20"
                >
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { value: "4M+", label: "Happy Customers", color: "#97144D" },
                      { value: "500+", label: "Reward Partners", color: "#12877F" },
                      { value: "24/7", label: "Digital Support", color: "#97144D" }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        whileHover={{ scale: 1.1 }}
                        className="cursor-pointer"
                      >
                        <motion.div 
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                          className="font-bold text-lg"
                          style={{ color: stat.color }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-xs text-gray-600">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced Account Benefits Card */}
            <motion.div
              whileHover={{ scale: 1.01, y: -2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <motion.h3 
                whileInView={{ scale: [0.95, 1.05, 1] }}
                className="text-xl font-bold mb-4 text-[#97144D]"
              >
                Account Benefits by Segment
              </motion.h3>
              <p className="mb-4 text-gray-700 text-sm leading-relaxed">
                Axis Bank offers different account types to match your unique needs and financial goals.
              </p>
              
              <div className="space-y-3">
                {segments.map((segment, index) => (
                  <motion.div
                    key={segment.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5, backgroundColor: "rgba(249, 250, 251, 0.8)" }}
                    className="p-3 rounded-lg transition-all duration-200 cursor-pointer"
                  >
                    <h4 className="font-bold text-gray-900 flex items-center mb-1">
                      <motion.span 
                        whileHover={{ scale: 1.3 }}
                        className="inline-block w-2 h-2 rounded-full mr-3"
                        style={{ backgroundColor: segment.color }}
                      />
                      {segment.name}
                    </h4>
                    <p className="text-gray-600 text-xs ml-5 leading-relaxed">
                      {segment.description}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <AxisButton 
                    variant="outline" 
                    className="w-full btn-micro text-sm"
                  >
                    Explore Benefits
                  </AxisButton>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};