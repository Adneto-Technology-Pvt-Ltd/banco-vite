import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Crown, TrendingUp, Zap, Shield, CreditCard, Star, Menu, X, User, LogOut, Home, Gift, HeadphonesIcon, Users, Search } from "lucide-react";
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
  onSearch?: (query: string) => void; // Add search callback
  searchResults?: any[]; // Add search results
  onSearchResultSelect?: (rewardId: string) => void; // Add search result selection

};

// Search suggestions data
const searchSuggestions = [
  { id: "dining", title: "15% Offer applicable on total bill", category: "Dining", brand: "Vietnom Restaurant" },
  { id: "lounge", title: "Save 20% on IHG Hotel Stays", category: "Travel", brand: "IHG Hotels" },
  { id: "shopping", title: "Additional 20% off", category: "Shopping", brand: "Marks & Spencer" },
  { id: "movie", title: "25% Off Sony LIV Premium Packs", category: "Entertainment", brand: "Sony LIV" },
  { id: "cashback", title: "Get 10% off on subscription", category: "Financial", brand: "BUSY Software" },
  { id: "wellness", title: "Flat 10% Off on Medicines", category: "Wellness", brand: "Apollo Pharmacy" },
  { id: "luxury-watch", title: "Get Flat 25% Off", category: "Entertainment", brand: "Sony LIV" },
  { id: "premium-jewelry", title: "Flat 25% off on making charges", category: "Jewelry", brand: "Kalyan Jewellers" }
];

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
    color: "#ED1164",
    bgGradient: "from-[#ED1164] to-[#C70D53]",
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

// Desktop Search Component
function DesktopSearch({
  onSearch,
  searchResults,
  onSearchResultSelect
}: {
  onSearch?: (query: string) => void;
  searchResults?: any[];
  onSearchResultSelect?: (rewardId: string) => void;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = searchSuggestions.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchQuery]);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isSearchOpen]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleResultSelect = (rewardId: string) => {
    onSearchResultSelect?.(rewardId);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="relative" ref={searchRef}>
      <motion.button
        onClick={() => setIsSearchOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Search className="h-5 w-5 text-gray-600" />
      </motion.button>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
          >
            {/* Search Input */}
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search rewards, categories..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#97144D]/30 focus:border-[#97144D]"
                  autoFocus
                />
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-80 overflow-y-auto">
              {filteredSuggestions.length > 0 ? (
                <div>
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Search Results
                  </div>
                  {filteredSuggestions.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleResultSelect(item.id)}
                      className="w-full flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors text-left"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="p-2 bg-[#97144D]/10 rounded-lg flex-shrink-0">
                        <Gift className="h-4 w-4 text-[#97144D]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 truncate">{item.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                            {item.category}
                          </span>
                          <span className="text-xs text-gray-500">{item.brand}</span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : searchQuery.trim() ? (
                <div className="p-8 text-center text-gray-500">
                  <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No rewards found for "{searchQuery}"</p>
                </div>
              ) : (
                <div className="p-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Popular Categories
                  </div>
                  {["Dining", "Travel", "Shopping", "Entertainment", "Wellness"].map((category) => (
                    <button
                      key={category}
                      onClick={() => handleSearch(category)}
                      className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                    >
                      <Gift className="h-4 w-4 text-[#97144D]" />
                      <span className="text-sm text-gray-700">{category}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mobile Search Component
function MobileSearch({
  onSearch,
  onSearchResultSelect
}: {
  onSearch?: (query: string) => void;
  onSearchResultSelect?: (rewardId: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = searchSuggestions.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleResultSelect = (rewardId: string) => {
    onSearchResultSelect?.(rewardId);
    setSearchQuery("");
  };

  return (
    <div className="pt-4 border-t border-gray-200">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Search Rewards</p>
      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search rewards, categories..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#97144D]/30 focus:border-[#97144D]"
        />
      </div>

      {/* Search Results */}
      {filteredSuggestions.length > 0 ? (
        <div className="bg-gray-50 rounded-lg p-2 max-h-48 overflow-y-auto">
          {filteredSuggestions.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => handleResultSelect(item.id)}
              className="w-full flex items-start gap-3 p-3 rounded-lg text-left hover:bg-white transition-colors"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-2 bg-[#97144D]/10 rounded-lg flex-shrink-0">
                <Gift className="h-4 w-4 text-[#97144D]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900 line-clamp-1">{item.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                    {item.category}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      ) : searchQuery.trim() ? (
        <div className="text-center py-4 text-gray-500">
          <Search className="h-6 w-6 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">No rewards found</p>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Popular Categories
          </div>
          {["Dining", "Travel", "Shopping", "Entertainment"].map((category) => (
            <button
              key={category}
              onClick={() => handleSearch(category)}
              className="w-full flex items-center gap-3 p-2 hover:bg-white rounded-lg transition-colors text-left"
            >
              <Gift className="h-4 w-4 text-[#97144D]" />
              <span className="text-sm text-gray-700">{category}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Mobile Menu Component
function MobileMenu({ isOpen, onClose, userData, currentStage, onStageChange, onLogin, onLogout, onSearch, onSearchResultSelect }: {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData;
  currentStage: string;
  onStageChange: (stage: string) => void;
  onLogin: () => void;
  onLogout: () => void;
  onSearch?: (query: string) => void;
  onSearchResultSelect?: (rewardId: string) => void;
}) {
  const [showPersonaDropdown, setShowPersonaDropdown] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  const journeyStages = userData.isLoggedIn
    ? [
        { text: "Home", key: "home", icon: Home },
        { text: "Benefits", key: "rewards", icon: Gift },
        { text: "Redemption Status", key: "post-redemption", icon: Gift },
      ]
    : [
        { text: "Home", key: "home", icon: Home }
      ];

  const handleMenuItemClick = (key: string) => {
    onStageChange(key);
    onClose();
  };

  const handlePersonaSelect = (personaId: string) => {
    console.log('Selected persona:', personaId);
    setShowPersonaDropdown(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          {/* Menu */}
          <motion.div
            ref={menuRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#97144D] to-[#7d1041] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {userData.isLoggedIn ? (
                  <>
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Welcome back!</p>
                      <p className="text-white/80 text-xs">{userData.name || 'Valued Customer'}</p>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-white font-semibold">Menu</p>
                    <p className="text-white/80 text-xs">Navigate & Explore</p>
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2">
              {/* Navigation Links */}
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Navigation</p>
                {journeyStages.map((stage) => {
                  const IconComponent = stage.icon;
                  return (
                    <motion.button
                      key={stage.key}
                      onClick={() => handleMenuItemClick(stage.key)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                        currentStage === stage.key
                          ? 'bg-[#97144D]/10 text-[#97144D] border border-[#97144D]/20'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium">{stage.text}</span>
                      {currentStage === stage.key && (
                        <motion.div
                          layoutId="activeMobileIndicator"
                          className="ml-auto w-2 h-2 bg-[#97144D] rounded-full"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Mobile Search */}
              <MobileSearch
                onSearch={onSearch}
                onSearchResultSelect={onSearchResultSelect}
              />

              {/* Persona Type Dropdown */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Account Type</p>
                <motion.button
                  onClick={() => setShowPersonaDropdown(!showPersonaDropdown)}
                  className="w-full flex items-center justify-between p-3 rounded-lg text-left hover:bg-gray-50 transition-colors border border-gray-200"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-700">Persona Type</span>
                  </div>
                  <motion.div
                    animate={{ rotate: showPersonaDropdown ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                  </motion.div>
                </motion.button>

                {/* Persona Dropdown */}
                <AnimatePresence>
                  {showPersonaDropdown && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 overflow-hidden"
                    >
                      <div className="bg-gray-50 rounded-lg p-2 max-h-60 overflow-y-auto">
                        {accountSegments.map((segment, index) => {
                          const IconComponent = segment.icon;
                          return (
                            <motion.button
                              key={segment.id}
                              onClick={() => handlePersonaSelect(segment.id)}
                              className="w-full flex items-start gap-3 p-3 rounded-lg text-left hover:bg-white transition-colors"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ x: 4 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {/* <div
                                className="p-2 rounded-lg flex-shrink-0"
                                style={{ backgroundColor: `${segment.color}20` }}
                              >
                                <IconComponent
                                  className="h-4 w-4"
                                  style={{ color: segment.color }}
                                />
                              </div> */}
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-gray-900">{segment.name}</p>
                                <p className="text-xs text-gray-600 line-clamp-2">{segment.description}</p>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Support */}
              <div className="pt-4 border-t border-gray-200">
                <motion.button
                  onClick={() => {
                    console.log('Navigate to support');
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-gray-50 transition-colors text-gray-700"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <HeadphonesIcon className="h-5 w-5" />
                  <span className="font-medium">Support</span>
                </motion.button>
              </div>

              {/* Login/Logout Button */}
              <div className="pt-4 border-t border-gray-200">
                <motion.button
                  onClick={() => {
                    userData.isLoggedIn ? onLogout() : onLogin();
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-[#97144D] text-white font-medium transition-colors hover:bg-[#7d1041]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {userData.isLoggedIn ? (
                    <>
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </>
                  ) : (
                    <>
                      <User className="h-5 w-5" />
                      <span>Login</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

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
          className="absolute top-full left-[-180px] mt-2 w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
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
                    onClose();
                  }}
                >
                  <div className="flex items-start gap-3">
                    {/* <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      className="p-2 rounded-xl"
                      style={{ backgroundColor: `${segment.color}15` }}
                    >
                      <IconComponent
                        className="h-5 w-5"
                        style={{ color: segment.color }}
                      />
                    </motion.div> */}

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

function NavLink({ text, onClick, active, hasDropdown = false }: {
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
  onLogout,
  onSearch,
  searchResults,
  onSearchResultSelect
}: AxisBankHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Define top navigation links with dropdown support
  const topNavLinks: Array<{ text: string; key: string; hasDropdown: boolean }> = [
    // { text: "Persona Type", key: "accounts", hasDropdown: true },
    // { text: "Benefit", key: "rewards", hasDropdown: false },
    // { text: "Support", key: "support", hasDropdown: false }
  ];

  const journeyStages = userData.isLoggedIn
    ? [
        { text: "Home", key: "home" },
        { text: "Benefits", key: "rewards" },
        { text: "Redemption Status", key: "post-redemption" },
      ]
    : [];

  const handleStageClick = (stage: string) => {
    onStageChange(stage);
  };
  // Handle logo click to go to home page and close login popup if open
  const handleLogoClick = () => {
    onStageChange("home");
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
    <>
      <div className="h-[80px] md:h-[88px] w-full fixed top-0 left-0 z-50 bg-white shadow-none md:shadow-sm">
        <div className="relative size-full" data-name="Component 1">
          <div className="absolute bg-[#ffffff] inset-0" />
          <div
            className="absolute bottom-[18.182%] left-0 right-0 top-0"
            data-name="Nav BAr - desktop"
          >
            <Header onLogoClick={handleLogoClick} />
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:block">
            {/* Enhanced Top navigation links with dropdown */}
            <div className="absolute bottom-3/4 left-[81.667%] right-[4.931%] top-[4.545%]">
              <div className="box-border content-stretch flex flex-row font-['Lato'] gap-[25px] items-center justify-end leading-[0] p-0 relative size-full text-[#ffffff] text-[12px] text-left text-nowrap tracking-[0.32px]">
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

            <div className="absolute bottom-[13.636%] left-[50.833%] right-[4.236%] top-[47.727%]">
              <div className="box-border content-stretch flex flex-row gap-[30px] items-center justify-end p-0 relative size-full">
                {/* <DesktopSearch
                  onSearch={onSearch}
                  searchResults={searchResults}
                  onSearchResultSelect={onSearchResultSelect}
                /> */}

                {journeyStages.map((stage) => (
                  <motion.div
                    key={stage.key}
                    onClick={() => handleStageClick(stage.key)}
                    whileHover={{ y: -1, scale: 1.02 }}
                    whileTap={{ y: 0, scale: 0.98 }}
                    className={`cursor-pointer font-['Lato'] leading-[0] relative shrink-0 text-left text-nowrap tracking-[0.24px] transition-all duration-200 ${
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
                {/* <motion.div
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
                          <div className="flex flex-col font-['Lato'] font-bold justify-center leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-center text-nowrap tracking-[0.32px]">
                            <p className="adjustLetterSpacing block leading-[18px] whitespace-pre">
                              {userData.isLoggedIn ? "Logout" : "Login"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div> */}
              </div>
            </div>
          </div>

          {/* Mobile Hamburger Menu Button */}
          {/* <div className="lg:hidden absolute right-4 top-[54px] transform -translate-y-1/2">
            <motion.button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-lg bg-[#97144D] text-white hover:bg-[#7d1041] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="h-6 w-6" />
            </motion.button>
          </div> */}
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userData={userData}
        currentStage={currentStage}
        onStageChange={onStageChange}
        onLogin={onLogin}
        onLogout={onLogout}
        onSearch={onSearch}
        onSearchResultSelect={onSearchResultSelect}
      />
    </>
  );
};
