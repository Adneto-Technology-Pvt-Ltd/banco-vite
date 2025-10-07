import { useState, useEffect } from "react";
import { LoginForm } from "../components/LoginForm";
import { AxisButton } from "../components/AxisButton";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { AxisBankHeader } from "../components/AxisBankHeader";
import { LoginBgImage } from "../assets";

type LoginPageProps = {
  onLogin: (userData: {
    isLoggedIn: boolean;
    customerId?: string;
    name?: string;
    segment?: string;
    persona?: string;
  }) => void;
};

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Sample user data for demo purposes - now includes accountType matching
  const sampleUserData = {
    "CUST123": {
      name: "John Doe",
      segment: "Burgundy",
      persona: "senior-citizens",
      password: "password123",
      dateOfBirth: "1965-05-15",
      accountType: "Burgundy"
    },
    "CUST456": {
      name: "Jane Smith",
      segment: "Prestige",
      persona: "women",
      password: "password456",
      dateOfBirth: "1980-10-22",
      accountType: "Prestige"
    },
    "CUST789": {
      name: "Alex Chen",
      segment: "Prime",
      persona: "students",
      password: "password789",
      dateOfBirth: "1998-03-30",
      accountType: "Prime"
    },
    // Add the adneto user with accountType
    "adneto": {
      name: "Customer",
      segment: "Burgundy",
      persona: "professionals",
      password: "adneto",
      dateOfBirth: "1980-05-10",
      accountType: "Burgundy"
    }
  };

  const handleLogin = (formData: any) => {
    setIsLoading(true);
    setLoginError(null);
    
    // Simulate API call
    setTimeout(() => {
      const user = sampleUserData[formData.customerId as keyof typeof sampleUserData];
      
      if (user) {
        // Check credentials including account type
        if (user.password === formData.password ) {
          onLogin({
            isLoggedIn: true,
            customerId: formData.customerId,
            // name: user.name,
            // segment: user.segment,
            // persona: user.persona
          });
        } else {
          // More specific error messages
          // if (user.password !== formData.password) {
          //   setLoginError("Invalid password");
          // } else if (user.dateOfBirth !== formData.dateOfBirth) {
          //   setLoginError("Invalid date of birth");
          // } else if (user.accountType !== formData.accountType) {
          //   setLoginError("Account type does not match our records");
          // } else {
          //   setLoginError("Invalid credentials");
          // }
        }
      } else {
        setLoginError("Customer ID not found");
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <AxisBankHeader 
        userData={{ isLoggedIn: false }}
        currentStage="awareness"
        onStageChange={() => {}}
        onLogin={() => {}}
        onLogout={() => {}}
      />
      
      <div className="flex flex-col md:flex-row pt-[88px]">
        {/* Background Image (left side on desktop, full bg on mobile) */}
        <div className={`${isMobile ? 'fixed inset-0 z-0 top-[88px]' : 'hidden md:block md:w-3/5 relative'}`}>
          <div className={`absolute inset-0 ${isMobile ? 'bg-black/40' : 'bg-gradient-to-r from-black/50 to-transparent'}`}></div>
          <ImageWithFallback 
            // src="https://images.unsplash.com/photo-1614957004130-7b7dbc14f11d?q=80&w=2000&auto=format&fit=crop"
            src={LoginBgImage}
            alt="Axis Bank Banking Services" 
            className="w-full h-full object-cover"
          />
          
          {/* Bank logo watermark and text */}
          <div className={`absolute ${isMobile ? 'top-28 left-6' : 'top-12 left-12'}`}>
            <div className="bg-[#97144D] p-4 md:p-6 text-white inline-block">
              <h2 className="text-2xl md:text-3xl font-bold">Axis Bank</h2>
            </div>
            <div className="mt-2 md:mt-4 text-white">
              <p className="text-sm md:text-base">Benefits Portal | Axis Bank</p>
            </div>
          </div>
          
          {/* Value proposition */}
          {!isMobile && (
            <div className="absolute top-60 left-12 max-w-md text-white">
              <h2 className="text-3xl font-bold mb-4">Exclusive benefits await you</h2>
              <p className="text-lg opacity-90 mb-6">
                Access tailored benefits designed specifically for your financial journey.
              </p>
            </div>
          )}
        </div>
        
        {/* Login form (right side) */}
        <div className={`
          w-full md:w-2/5 min-h-screen 
          flex flex-col justify-center items-center 
          py-16 px-4 md:px-8 lg:px-12
          bg-white relative z-10
          ${isMobile ? 'bg-opacity-95' : ''}
        `}>
          <div className="w-full max-w-md">
            {/* Logo for mobile */}
            {isMobile && (
              <div className="flex justify-center mb-8">
                <img 
                  src="https://www.axisbank.com/assets/images/logo.png" 
                  alt="Axis Bank" 
                  className="h-10"
                />
              </div>
            )}
            
            {/* Main Login Form */}
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
            
            {/* Error Message */}
            {loginError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
                {loginError}
              </div>
            )}
            
            {/* Default credentials hint */}
            <div className="mt-4 text-center p-3 bg-[#EBF9F8] rounded-lg border border-[#12877F]/20">
              <p className="text-xs text-gray-600">
                <strong>Default credentials:</strong> Customer ID: adneto | Password: adneto
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};