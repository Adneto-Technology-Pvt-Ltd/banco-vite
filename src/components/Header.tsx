import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Menu, X, User, LogOut, User2, Settings, CreditCard } from "lucide-react";
import Avatar from "../imports/Avatar-15-4638";

// SVG paths for logos and icons
const svgPaths = {
  band: "M0 0V28.3642H1113.75V9.35935e-05L0 0Z",
  fixedBand: "M0 1.14661e-06V72H250.236C258.725 72.0033 261.911 64.8044 261.911 64.8044C261.911 64.8044 273.164 46.0375 278.516 36.6958C283.875 27.3542 292.346 28.3454 292.346 28.3454H327.273V0L0 1.14661e-06Z",
  logoFill4: "M87.3911 56.54H72.386L63.2719 40.6546H78.2736L87.3911 56.54Z",
  logoFill6: "M63.2194 14.7273L70.7403 27.6638L54.1219 56.5393H39.1503L63.2194 14.7273Z",
  logoFill8: "M132.596 29.3709C132.278 28.8587 131.897 28.4839 131.455 28.2429C131.013 28.0019 130.461 27.878 129.798 27.878C129.052 27.878 128.483 28.0454 128.091 28.3868C127.696 28.7249 127.502 29.1499 127.502 29.6621C127.502 30.5156 128.128 31.1214 129.383 31.4862L131.144 32.0017C132.566 32.4167 133.617 32.9924 134.283 33.7321C134.956 34.4685 135.294 35.3521 135.294 36.373C135.294 37.0223 135.164 37.6282 134.906 38.1871C134.648 38.7461 134.283 39.2314 133.808 39.6331C133.336 40.0414 132.754 40.3661 132.081 40.5971C131.405 40.8347 130.648 40.9518 129.818 40.9518C128.148 40.9518 126.829 40.5803 125.862 39.8339C124.895 39.0875 124.316 38.0097 124.121 36.6006L126.692 36.1253C126.843 37.0525 127.184 37.7386 127.716 38.1871C128.248 38.6356 128.951 38.8599 129.818 38.8599C130.719 38.8599 131.411 38.6423 131.89 38.2072C132.379 37.7721 132.616 37.2098 132.616 36.5203C132.616 36.1421 132.556 35.8274 132.429 35.5664C132.305 35.3019 132.128 35.071 131.9 34.8702C131.676 34.6693 131.408 34.502 131.094 34.3647C130.782 34.2275 130.448 34.1037 130.089 33.9899L128.389 33.4911C127.174 33.1364 126.277 32.6343 125.698 31.9916C125.119 31.349 124.828 30.5691 124.828 29.6621C124.828 29.093 124.945 28.5742 125.179 28.0956C125.413 27.6203 125.748 27.2086 126.183 26.8739C126.618 26.5359 127.137 26.2681 127.736 26.0773C128.342 25.8832 129.015 25.7861 129.758 25.7861C131.027 25.7861 132.064 26.0171 132.864 26.4823C133.667 26.9409 134.267 27.5668 134.668 28.3567L132.596 29.3709ZM119.044 40.6841H121.675V26.0338H119.044V40.6841ZM108.353 33.0159L103.423 26.0338H106.449L109.886 31.0913L113.347 26.0338H116.333L111.339 33.0393L116.748 40.6841H113.719L109.826 35.0476L105.89 40.6841H102.841L108.353 33.0159ZM91.5105 35.3187H96.7956L94.2016 30.3047L91.5105 35.3187ZM97.8468 37.3905H90.4095L88.6087 40.6841H85.7938L94.2218 25.4949L102.489 40.6841H99.6308L97.8468 37.3905Z",
  logoFill10: "M193.266 26.0335H195.897V31.9177L202.631 26.0335H205.989L198.26 32.6842L206.196 40.6837H202.715L196.416 34.2606L195.897 34.7192V40.6837H193.266V26.0335ZM177.227 30.9872V40.6837H174.596V25.6184L187.154 35.8137V26.0334H189.785V41.1791L177.227 30.9872ZM161.522 35.315H166.807L164.217 30.301L161.522 35.315ZM167.862 37.3935H160.424L158.62 40.6838H155.802L164.237 25.4946L172.504 40.6838H169.646L167.862 37.3935ZM149.878 38.5684C150.845 38.5684 151.618 38.391 152.197 38.0295C152.78 37.6747 153.068 37.1258 153.068 36.3961C153.068 35.6463 152.78 35.0974 152.197 34.7493C151.618 34.3945 150.845 34.2171 149.878 34.2171H147.91V38.5684H149.878ZM148.944 32.2892C149.814 32.2892 150.474 32.1051 150.925 31.7302C151.374 31.3587 151.598 30.8432 151.598 30.1772C151.598 29.5144 151.374 28.9956 150.925 28.6241C150.474 28.2492 149.824 28.0651 148.964 28.0651H147.91V32.2892H148.944ZM145.279 26.0346H148.8C150.581 26.0346 151.919 26.4027 152.82 27.1324C153.717 27.8654 154.165 28.8394 154.165 30.0544C154.165 30.5799 154.025 31.0987 153.744 31.5974C153.459 32.1029 153.074 32.5179 152.592 32.8325C153.526 33.107 154.276 33.5655 154.845 34.2082C155.414 34.8508 155.698 35.6073 155.698 36.4775C155.698 37.0298 155.588 37.562 155.37 38.0774C155.149 38.5862 154.801 39.0347 154.326 39.4196C153.851 39.8079 153.238 40.1125 152.495 40.3401C151.749 40.571 150.855 40.6848 149.807 40.6848H145.279V26.0346Z"
};

type HeaderProps = {
  userData?: {
    isLoggedIn: boolean;
    customerId?: string;
    name?: string;
    segment?: string;
    persona?: string;
  };
  currentStage: string;
  onStageChange: (stage: string) => void;
  onLogin: () => void;
  onLogout: () => void;
};

export const Header = ({
  userData,
  currentStage,
  onStageChange,
  onLogin,
  onLogout
}: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to check if viewport is mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initially
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Journey stages for navigation
  const journeyStages = [
    { id: "awareness", label: "Awareness", left: "calc(50% + 62px)" },
    { id: "discovery", label: "Discovery", left: "calc(58.3333% + 41px)" },
    { id: "activation", label: "Activation", left: "calc(66.6667% + 14px)" },
    { id: "redemption", label: "Redemption", left: "calc(75% - 11px)" },
    { id: "post-redemption", label: "Post Redemption", left: "calc(83.3333% - 24px)" }
  ];

  // Top red band items
  const topMenuItems = [
    { id: "accounts", label: "Accounts", left: "calc(83.3333% - 24px)" },
    { id: "rewards", label: "Benefits", left: "calc(91.6667% - 67px)" },
    { id: "support", label: "Support", left: "calc(91.6667% + 4.99997px)" }
  ];

  const isLoggedIn = userData?.isLoggedIn || false;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };
  
  // Desktop Header
  if (!isMobile) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white h-[90px]">
        <div className="relative h-full w-full">
          {/* White background for menu area */}
          <div className="absolute bg-[#ffffff] h-[88px] left-0 top-px w-full" />
          
          {/* Axis Logo + Red Band */}
          <div className="absolute h-[72px] left-0 top-0 w-[326.25px]" data-name="axis-logo-fixed">
            <div className="absolute h-[72px] left-0 top-0 w-[327.273px]" data-name="fixed-band">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 328 72"
              >
                <g id="fixed-band">
                  <path
                    clipRule="evenodd"
                    d={svgPaths.fixedBand}
                    fill="#97144D"
                    fillRule="evenodd"
                    id="band"
                  />
                  <g id="axis-bank-logo">
                    <path
                      clipRule="evenodd"
                      d={svgPaths.logoFill4}
                      fill="white"
                      fillRule="evenodd"
                      id="Fill 4"
                    />
                    <path
                      clipRule="evenodd"
                      d={svgPaths.logoFill6}
                      fill="white"
                      fillRule="evenodd"
                      id="Fill 6"
                    />
                    <path
                      clipRule="evenodd"
                      d={svgPaths.logoFill8}
                      fill="white"
                      fillRule="evenodd"
                      id="Fill 8"
                    />
                    <path
                      clipRule="evenodd"
                      d={svgPaths.logoFill10}
                      fill="white"
                      fillRule="evenodd"
                      id="Fill 10"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
          
          {/* Red Band Extension */}
          <div 
            className="absolute h-[28.364px] top-0 w-[1113.75px]"
            data-name="band"
            style={{ left: "calc(16.6667% + 86.25px)" }}
          >
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 1114 29"
            >
              <path
                d={svgPaths.band}
                fill="#97144D"
                id="band"
              />
            </svg>
          </div>
          
          {/* Top Red Band Menu Items */}
          {topMenuItems.map((item) => (
            <div 
              key={item.id}
              className="absolute css-iouovj font-['Lato:Regular',_sans-serif] font-normal leading-[0] not-italic text-[#ffffff] text-[12px] text-left text-nowrap top-1 tracking-[0.32px] cursor-pointer"
              style={{ left: item.left }}
              onClick={() => onStageChange(item.id)}
            >
              <p className="adjustLetterSpacing block leading-[18px] whitespace-pre">
                {item.label}
              </p>
            </div>
          ))}
          
          {/* Customer Journey Stages (lower section) */}
          {journeyStages.map((stage) => (
            <div 
              key={stage.id}
              className={`absolute css-4cnz3l font-['Lato:Regular',_sans-serif] font-normal leading-[0] not-italic text-[${currentStage === stage.id ? '#97144D' : '#000000'}] text-[14px] text-left text-nowrap top-[49px] tracking-[0.24px] cursor-pointer`}
              style={{ left: stage.left }}
              onClick={() => onStageChange(stage.id)}
            >
              <p className="adjustLetterSpacing block leading-[20px] whitespace-pre">
                {stage.label}
              </p>
            </div>
          ))}
          
          {/* Login Button or Avatar with Dropdown */}
          {isLoggedIn ? (
            <div 
              ref={userDropdownRef}
              className="absolute right-4 top-[42px] flex items-center"
            >
              {/* User Name */}
              <span className="mr-2 text-[14px] font-normal text-[#282828]">
                {userData?.name || "User"}
              </span>
              
              {/* Avatar (clickable) */}
              <div 
                className="cursor-pointer relative" 
                onClick={toggleUserDropdown}
              >
                <div className="transform scale-150">
                  <Avatar />
                </div>
                
                {/* User Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 top-10 w-48 bg-white shadow-lg rounded-md border border-[#f0f0f0] z-50 py-1">
                    <div className="px-4 py-2 border-b border-[#f0f0f0]">
                      <p className="text-sm text-[#666666]">Signed in as</p>
                      <p className="font-medium text-[#282828]">{userData?.customerId || "Customer"}</p>
                    </div>
                    
                    <div className="py-1">
                      <button className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-[#f8f8f8] text-[14px] text-[#282828]">
                        <User2 size={16} />
                        <span>Profile</span>
                      </button>
                      <button className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-[#f8f8f8] text-[14px] text-[#282828]">
                        <CreditCard size={16} />
                        <span>My Accounts</span>
                      </button>
                      <button className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-[#f8f8f8] text-[14px] text-[#282828]">
                        <Settings size={16} />
                        <span>Settings</span>
                      </button>
                    </div>
                    
                    <div className="border-t border-[#f0f0f0] py-1">
                      <button 
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-[#f8f8f8] text-[14px] text-[#97144D]"
                      >
                        <LogOut size={16} className="text-[#97144D]" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div
              className="absolute bg-[#97144d] rounded top-[42px] cursor-pointer"
              style={{ left: "calc(91.6667% - 5.00003px)" }}
              onClick={onLogin}
            >
              <div className="flex flex-row justify-center relative items-center overflow-clip">
                <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative">
                  <div className="relative shrink-0">
                    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-center overflow-clip p-0 relative">
                      <div className="css-iouovj flex flex-col font-['Lato:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[12px] text-center text-nowrap tracking-[0.32px]">
                        <p className="adjustLetterSpacing block leading-[18px] whitespace-pre">
                          Login
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    );
  }
  
  // Mobile Header
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="relative h-[72px] w-full bg-white">
        {/* Mobile Nav Bar */}
        <div className="relative h-[72px] w-full" data-name="nav bar">
          <div className="absolute inset-0 h-[28px]" data-name="fixed-band">
            <svg
              className="block h-full w-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 390 28"
            >
              <path
                d={svgPaths.band}
                fill="#97144D"
                id="band"
              />
            </svg>
          </div>
          
          <div className="absolute left-0 top-0 h-[72px] w-[120px]">
            <svg
              className="block h-full w-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 120 72"
            >
              <path
                clipRule="evenodd"
                d={svgPaths.fixedBand}
                fill="#97144D"
                fillRule="evenodd"
                id="band"
              />
              <g id="axis-bank-logo" transform="scale(0.4) translate(30, 25)">
                <path
                  clipRule="evenodd"
                  d={svgPaths.logoFill4}
                  fill="white"
                  fillRule="evenodd"
                  id="Fill 4"
                />
                <path
                  clipRule="evenodd"
                  d={svgPaths.logoFill6}
                  fill="white"
                  fillRule="evenodd"
                  id="Fill 6"
                />
                <path
                  clipRule="evenodd"
                  d={svgPaths.logoFill8}
                  fill="white"
                  fillRule="evenodd"
                  id="Fill 8"
                />
                <path
                  clipRule="evenodd"
                  d={svgPaths.logoFill10}
                  fill="white"
                  fillRule="evenodd"
                  id="Fill 10"
                />
              </g>
            </svg>
          </div>
          
          {/* Hamburger Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="absolute right-5 top-[40px] transform -translate-y-1/2 text-[#282828]"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Mobile Top Menu Items */}
          <div className="absolute top-[5px] left-[130px] flex space-x-4">
            {topMenuItems.map((item, index) => (
              <button 
                key={item.id}
                className="text-white text-[11px] font-normal tracking-[0.32px]"
                onClick={() => onStageChange(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Login Button or Avatar */}
          {isLoggedIn ? (
            <div 
              ref={userDropdownRef}
              className="absolute top-[42px] left-[130px] flex items-center"
            >
              {/* Avatar (clickable) */}
              <div 
                className="cursor-pointer relative flex items-center" 
                onClick={toggleUserDropdown}
              >
                <span className="mr-2 text-[14px] font-normal text-[#282828]">
                  {userData?.name || "User"}
                </span>
                <div className="transform scale-125">
                  <Avatar />
                </div>
                
                {/* User Dropdown Menu for Mobile */}
                {isUserDropdownOpen && (
                  <div className="absolute left-0 top-10 w-48 bg-white shadow-lg rounded-md border border-[#f0f0f0] z-50 py-1">
                    <button 
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-[#f8f8f8] text-[14px] text-[#97144D]"
                    >
                      <LogOut size={16} className="text-[#97144D]" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="absolute top-[42px] left-[130px] bg-[#97144d] text-white text-[12px] font-bold rounded px-3 py-1 tracking-[0.24px]"
            >
              Login
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-white shadow-md z-50">
          <div className="flex flex-col p-4">
            {/* Journey Stages */}
            <div className="flex flex-col">
              {journeyStages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => {
                    onStageChange(stage.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-3 border-b border-[#f0f0f0] ${
                    currentStage === stage.id ? "text-[#97144D]" : "text-[#282828]"
                  }`}
                >
                  <span className="font-['Lato:Regular',_sans-serif] text-[14px] tracking-[0.24px]">
                    {stage.label}
                  </span>
                </button>
              ))}
            </div>
            
            {/* User Section */}
            {isLoggedIn && (
              <div className="mt-6 pt-4 border-t border-[#f0f0f0]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="transform scale-125">
                    <Avatar />
                  </div>
                  <span className="font-['Lato:Bold',_sans-serif] text-[16px] font-bold">
                    {userData?.name || "User"}
                  </span>
                </div>
                
                <div className="mt-3">
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-[#97144D] text-[14px]"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};