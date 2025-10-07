import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Crown, TrendingUp, Zap, Shield, CreditCard, Star } from "lucide-react";
import svgPaths from "../imports/svg-6it17n7v1m";
import { AxisButton } from "./AxisButton";

type UserData = {
  isLoggedIn: boolean;
  customerId?: string;
  name?: string;
  segment?: string;
  persona?: string;
};

type AxisBankHeaderProps = {
  userData: UserData;
  currentStage: string;
  onStageChange: (stage: string) => void;
  onLogin: () => void;
  onLogout: () => void;
};

// Account segment data for dropdown
const accountSegments = [
  {
    id: "senior-citizens",
    name: "Senior Citizens",
    // tagline: "Ultra Premium Banking",
    // minBalance: "₹10 Lakh",
    icon: Crown,
    color: "#97144D",
    bgGradient: "from-[#97144D] to-[#7d1041]",
    description: "Senior Savings Account offers retirees higher interest rates."
  },
  {
    id: "women",
    name: "Women",
    // tagline: "Enhanced Value Banking",
    // minBalance: "₹5 Lakh",
    icon: Star,
    color: "#404040",
    bgGradient: "from-[#404040] to-[#2a2a2a]",
    description: "Empowers women with financial independence."
  },
  {
    id: "self-employed",
    name: "Self Employed",
    // tagline: "Rising Professionals",
    // minBalance: "₹2 Lakh",
    icon: Zap,
    color: "#12877F",
    bgGradient: "from-[#12877F] to-[#0e6e67]",
    description: "For business owners and entrepreneurs."
  },
  {
    id: "rural-mass-farmers",
    name: "Rural Mass/Farmers",
    // tagline: "Wealth Building Focus",
    // minBalance: "₹50,000",
    icon: TrendingUp,
    color: "#b8860b",
    bgGradient: "from-[#b8860b] to-[#9a7209]",
    description: "Supports farmers with accessible banking."
  },
  {
    id: "salaried",
    name: "Salaried",
    // tagline: "Smart Everyday Banking",
    // minBalance: "₹25,000",
    icon: CreditCard,
    color: "#1e5779",
    bgGradient: "from-[#1e5779] to-[#164660]",
    description: "Easy Access Salary Account for professionals."
  },
  // {
  //   id: "easy",
  //   name: "Easy",
  //   tagline: "Simple & Accessible",
  //   minBalance: "Zero Balance",
  //   icon: Shield,
  //   color: "#4d7c0f",
  //   bgGradient: "from-[#4d7c0f] to-[#3d630c]",
  //   description: "Simple banking for beginners"
  // }
];

// Navigation item type
type NavigationItem = {
  text: string;
  key: string;
  onClick: () => void;
  active: boolean;
  hasDropdown?: boolean;
};

function AccountsDropdown({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-[-100px] mt-2 w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
          style={{ transform: "translateX(-50%)" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#97144D] to-[#7d1041] text-white p-4">
            <h3 className="font-bold text-lg mb-1">Choose Your Persona Type</h3>
            <p className="text-white/90 text-sm">Find the perfect banking solution for your needs</p>
          </div>

          {/* Account Options */}
          <div className="max-h-[400px] overflow-y-auto">
            {accountSegments.map((segment, index) => {
              const IconComponent = segment.icon;
              return (
                <motion.div
                  key={segment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.8)", x: 4 }}
                  className="p-4 border-b border-gray-100 last:border-b-0 cursor-pointer transition-all duration-200 group"
                  onClick={() => {
                    // Handle account selection
                    console.log('Selected account:', segment.id);
                    onClose();
                  }}
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      className="p-2 rounded-xl"
                      style={{ backgroundColor: `${segment.color}15` }}
                    >
                      <IconComponent 
                        className="h-5 w-5" 
                        style={{ color: segment.color }}
                      />
                    </motion.div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-gray-900 group-hover:text-[#97144D] transition-colors">
                          {segment.name}
                        </h4>
                        {/* <span 
                          className="text-xs font-medium px-2 py-1 rounded-full"
                          style={{ 
                            backgroundColor: `${segment.color}15`,
                            color: segment.color 
                          }}
                        >
                          {segment.minBalance}
                        </span> */}
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{segment.tagline}</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{segment.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Footer */}
          {/* <div className="bg-gray-50 p-4 border-t border-gray-100">
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-[#97144D] text-white rounded-xl py-2 px-4 text-sm font-semibold hover:bg-[#7d1041] transition-colors"
                onClick={() => {
                  console.log('Open new account');
                  onClose();
                }}
              >
                Open New Account
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 border border-[#97144D] text-[#97144D] rounded-xl py-2 px-4 text-sm font-semibold hover:bg-[#97144D] hover:text-white transition-all"
                onClick={() => {
                  console.log('Compare accounts');
                  onClose();
                }}
              >
                Compare All
              </motion.button>
            </div>
          </div> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavLink({ 
  text, 
  onClick, 
  active, 
  hasDropdown = false 
}: { 
  text: string; 
  onClick: () => void; 
  active: boolean;
  hasDropdown?: boolean;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClick = () => {
    if (hasDropdown) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      onClick();
    }
  };

  return (
    <div className="relative">
      <motion.div 
        className={`relative shrink-0 cursor-pointer transition-all duration-200 hover:opacity-90 ${active ? 'font-bold' : ''} ${hasDropdown ? 'flex items-center gap-1' : ''}`}
        onClick={handleClick}
        whileHover={{ y: -1 }}
        whileTap={{ y: 0 }}
      >
        <p className="adjustLetterSpacing block leading-[18px] text-nowrap whitespace-pre">
          {text}
        </p>
        {hasDropdown && (
          <motion.div
            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-3 w-3 text-white" />
          </motion.div>
        )}
        {active && (
          <motion.div 
            layoutId="activeNavIndicator"
            className="h-0.5 bg-white absolute -bottom-1 left-0 right-0 rounded-full"
          />
        )}
      </motion.div>
      
      {hasDropdown && (
        <AccountsDropdown 
          isOpen={isDropdownOpen} 
          onClose={() => setIsDropdownOpen(false)} 
        />
      )}
    </div>
  );
}

function FixedBand({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      className="absolute h-[72px] left-0 top-0 w-[327.273px] cursor-pointer transition-opacity duration-200 hover:opacity-90"
      data-name="fixed-band"
      onClick={onClick}
      title="Go to Home"
      aria-label="Axis Bank Home"
      role="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 328 72"
      >
        <g id="fixed-band">
          <path
            clipRule="evenodd"
            d={svgPaths.p3c4c8ff2}
            fill="var(--fill-0, #97144D)"
            fillRule="evenodd"
            id="band"
          />
          <g id="axis-bank-logo">
            <path
              clipRule="evenodd"
              d={svgPaths.pea23400}
              fill="var(--fill-0, white)"
              fillRule="evenodd"
              id="Fill 4"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p39df600}
              fill="var(--fill-0, white)"
              fillRule="evenodd"
              id="Fill 6"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p1364ee40}
              fill="var(--fill-0, white)"
              fillRule="evenodd"
              id="Fill 8"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p1459dff0}
              fill="var(--fill-0, white)"
              fillRule="evenodd"
              id="Fill 10"
            />
          </g>
        </g>
      </svg>
    </motion.div>
  );
}

function AxisLogoFixed({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="h-[72px] relative shrink-0 w-[326.25px]"
      data-name="axis-logo-fixed"
    >
      <FixedBand onClick={onClick} />
    </div>
  );
}

function Header({ onLogoClick }: { onLogoClick: () => void }) {
  return (
    <div className="absolute bg-[#ffffff] inset-0" data-name="header">
      <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative w-full">
        <AxisLogoFixed onClick={onLogoClick} />
        <div
          className="basis-0 grow h-[29px] min-h-px min-w-px relative shrink-0"
          data-name="band"
        >
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 1114 29"
          >
            <path
              d={svgPaths.p176da780}
              fill="var(--fill-0, #97144D)"
              id="band"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export const AxisBankHeader = ({
  userData,
  currentStage,
  onStageChange,
  onLogin,
  onLogout
}: AxisBankHeaderProps) => {
  // Define top navigation links with dropdown support
  const topNavLinks = [
    { text: "Persona Type", key: "accounts", hasDropdown: true },
    { text: "Benefit", key: "rewards", hasDropdown: false },
    { text: "Support", key: "support", hasDropdown: false }
  ];

  // Define journey stage links - UPDATED NAMES
  // const journeyStages = [
  //   { text: "Home", key: "home" },
  //   // { text: "Discovery", key: "discovery" },
  //   { text: "Rewards", key: "rewards" },
  //   // { text: "Redemption", key: "redemption" },
  //   { text: "Post Redemption", key: "post-redemption" }
  // ];

  // Define journey stage links - show only "Home" if not logged in,
  // and "Home", "Rewards", "Post Redemption" if logged in
  const journeyStages = userData.isLoggedIn
    ? [
        { text: "Home", key: "home" },
        // { text: "Discovery", key: "discovery" },
        { text: "Benefits", key: "rewards" },
        // { text: "Redemption", key: "redemption" },
        { text: "Post Redemption", key: "post-redemption" },
      ]
    : [
        { text: "Home", key: "home" }
      ];

  const handleStageClick = (stage: string) => {
    onStageChange(stage);
  };
  // Handle logo click to go to home page and close login popup if open
  const handleLogoClick = () => {
    onStageChange("home");
    console.log("Navigate to home", onStageChange("home"));
    
  };

  // Handle top nav clicks
  const handleTopNavClick = (key: string) => {
    switch (key) {
      case "rewards":
        onStageChange("rewards");
        break;
      case "support":
        // Handle support navigation
        console.log("Navigate to support");
        break;
      // accounts is handled by dropdown
      default:
        break;
    }
  };

  // Add the SUBZERO 2.0 branding element (visible only on certain pages)
  const showSubzero = currentStage === "home" || !userData.isLoggedIn;

  return (
    <div className="h-[88px] w-full fixed top-0 left-0 z-50 bg-white shadow-sm">
      <div className="relative size-full" data-name="Component 1">
        <div className="absolute bg-[#ffffff] inset-0" />
        <div
          className="absolute bottom-[18.182%] left-0 right-0 top-0"
          data-name="Nav BAr - desktop"
        >
          <Header onLogoClick={handleLogoClick} />
        </div>

        {/* Enhanced Top navigation links with dropdown */}
        <div className="absolute bottom-3/4 left-[81.667%] right-[4.931%] top-[4.545%]">
          <div className="box-border content-stretch flex flex-row font-['Arial'] gap-[25px] items-center justify-end leading-[0] p-0 relative size-full text-[#ffffff] text-[12px] text-left text-nowrap tracking-[0.32px]">
            {topNavLinks.map((link) => (
              <NavLink 
                key={link.key} 
                text={link.text} 
                onClick={() => handleTopNavClick(link.key)} 
                active={false}
                hasDropdown={link.hasDropdown}
              />
            ))}
          </div>
        </div>
        
        {/* Enhanced Journey stage navigation */}
        <div className="absolute bottom-[13.636%] left-[50.833%] right-[4.236%] top-[47.727%]">
          <div className="box-border content-stretch flex flex-row gap-[30px] items-center justify-end p-0 relative size-full">
            <div className="relative shrink-0 size-5" data-name="Group">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 20 20"
              >
                <g id="Group">
                  <g id="Vector"></g>
                  <path
                    d={svgPaths.p2c0f3700}
                    fill="var(--fill-0, #282828)"
                    id="Vector_2"
                  />
                </g>
              </svg>
            </div>
            
            {journeyStages.map((stage) => (
              <motion.div 
                key={stage.key}
                onClick={() => handleStageClick(stage.key)}
                whileHover={{ y: -1, scale: 1.02 }}
                whileTap={{ y: 0, scale: 0.98 }}
                className={`cursor-pointer font-['Arial'] leading-[0] relative shrink-0 text-left text-nowrap tracking-[0.24px] transition-all duration-200 ${
                  currentStage === stage.key 
                    ? "css-6rx6jg text-[#97144d]" 
                    : "css-4cnz3l text-[#000000] hover:text-[#97144d]"
                } text-[14px]`}
              >
                <p className={`adjustLetterSpacing block leading-[20px] whitespace-pre ${
                  currentStage === stage.key ? "font-bold" : ""
                }`}>
                  {stage.text}
                </p>
                {currentStage === stage.key && (
                  <motion.div
                    layoutId="activeStageIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#97144d] rounded-full"
                  />
                )}
              </motion.div>
            ))}
            
            {/* Enhanced Login/Logout Button */}
            <motion.div
              className="bg-[#97144d] relative rounded shrink-0 cursor-pointer"
              onClick={userData.isLoggedIn ? onLogout : onLogin}
              whileHover={{ scale: 1.05, backgroundColor: "#7d1041" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
                <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative">
                  <div className="relative shrink-0">
                    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-center overflow-clip p-0 relative">
                      <div className="flex flex-col font-['Arial'] font-bold justify-center leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-center text-nowrap tracking-[0.32px]">
                        <p className="adjustLetterSpacing block leading-[18px] whitespace-pre">
                          {userData.isLoggedIn ? "Logout" : "Login"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Conditionally show SUBZERO 2.0 branding */}
        {showSubzero && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute hidden right-5 top-1 z-10 scale-[0.15] origin-top-right"
          >
            <div className="absolute bg-[#ebf9f8] h-[135px] right-0 rounded-[23.8098px] top-[32px] w-[187.801px]">
              <div className="absolute flex flex-col font-['Arial'] font-bold justify-center leading-[0] left-6 text-[#12877f] text-[95.2392px] text-left text-nowrap top-[66.5px] tracking-[1.78574px] translate-y-[-50%]">
                <p className="adjustLetterSpacing block leading-[130.954px] whitespace-pre">
                  2.0
                </p>
              </div>
            </div>
            <div className="absolute h-[83px] right-[280px] top-[58px] w-[510.458px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 511 83"
              >
                <g id="SUBZERO">
                  <path d={svgPaths.p13abcc80} fill="var(--fill-0, #97144D)" />
                  <path d={svgPaths.p1aac0900} fill="var(--fill-0, #97144D)" />
                  <path d={svgPaths.p2c40a800} fill="var(--fill-0, #97144D)" />
                  <path d={svgPaths.p13d03fc0} fill="var(--fill-0, #97144D)" />
                  <path d={svgPaths.p3d078a80} fill="var(--fill-0, #97144D)" />
                  <path d={svgPaths.p232e6f00} fill="var(--fill-0, #97144D)" />
                  <path d={svgPaths.p23b43a80} fill="var(--fill-0, #97144D)" />
                </g>
              </svg>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};