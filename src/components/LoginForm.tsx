import { useState, useRef } from "react";
import { AxisButton } from "./AxisButton";
import { 
  AxisTextInput, 
  AxisPasswordInput, 
  AxisDateInput, 
  AxisDropdown,
  AxisCheckbox 
} from "./AxisFormComponents";

// Form data type
type FormData = {
  customerId: string;
  password: string;
  dateOfBirth: string;
  accountType: string;
  occupation: string;
accountType: string;
  occupation: string;
  gender: string;
  agreeTerms: boolean;
};

// Props for LoginForm component
type LoginFormProps = {
  onSubmit: (formData: FormData) => void;
  isLoading?: boolean;
};

export const LoginForm = ({ onSubmit, isLoading = false }: LoginFormProps) => {
  // Form state with default values
  const [formData, setFormData] = useState<FormData>({
    customerId: "adneto",
    password: "adneto",
    // dateOfBirth: "1980-05-10", // Format for input type="date" is YYYY-MM-DD
    // accountType: "Burgundy",
    // occupation: "Banking",
    // gender: "Female",
    agreeTerms: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Account type options based on Axis Bank segments
  const accountTypeOptions = [
    "Burgundy",
    "Prestige", 
    "Arise",
    "Sampann",
    "Liberty",
    "Easy",
    "Prime"
  ];

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  // Handle account type select
  const handleAccountTypeSelect = (accountType: string) => {
    setFormData({
      ...formData,
      accountType
    });
    
    // Clear error when field is edited
    if (errors.accountType) {
      setErrors({
        ...errors,
        accountType: ""
      });
    }
  };

  // Handle gender select
  const handleGenderSelect = (gender: string) => {
    setFormData({
      ...formData,
      gender
    });
    
    // Clear error when field is edited
    if (errors.gender) {
      setErrors({
        ...errors,
        gender: ""
      });
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      agreeTerms: checked
    });
    
    // Clear error when field is edited
    if (errors.agreeTerms) {
      setErrors({
        ...errors,
        agreeTerms: ""
      });
    }
  };

  // Toggle virtual keyboard
  const handleVirtualKeyboard = () => {
    // This would normally open a virtual keyboard
    alert("Virtual keyboard would open here");
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Required fields validation
    if (!formData.customerId) {
      newErrors.customerId = "Customer ID is required";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    
    // if (!formData.dateOfBirth) {
    //   newErrors.dateOfBirth = "Date of Birth is required";
    // }

    // if (!formData.accountType) {
    //   newErrors.accountType = "Account Type is required";
    // }
    
    // Terms agreement validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#97144D] mb-2">Welcome Back</h1>
        <p className="text-gray-600">Access your benefits and exclusive benefits</p>
      </div>
      
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 w-full">
          {/* Customer ID Field */}
          <AxisTextInput
            name="customerId"
            label="Customer ID"
            value={formData.customerId}
            placeholder="Enter your Customer ID"
            onChange={handleChange}
            hasTooltip={true}
            error={formSubmitted ? errors.customerId : undefined}
            required={true}
          />
          
          {/* Password Field */}
          <AxisPasswordInput
            name="password"
            label="Password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={handleChange}
            hasTooltip={true}
            error={formSubmitted ? errors.password : undefined}
            required={true}
            onVirtualKeyboard={handleVirtualKeyboard}
          />
          
          {/* Date of Birth Field */}
          {/* <AxisDateInput
            name="dateOfBirth"
            label="Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            hasTooltip={true}
            error={formSubmitted ? errors.dateOfBirth : undefined}
            required={true}
          /> */}

          {/* Account Type Dropdown */}
          {/* <AxisDropdown
            name="accountType"
            label="Account Type"
            value={formData.accountType}
            placeholder="Select your account type"
            options={accountTypeOptions}
            onChange={handleAccountTypeSelect}
            hasTooltip={true}
            error={formSubmitted ? errors.accountType : undefined}
            required={true}
          /> */}
          
          {/* Occupation Field */}
          {/* <AxisTextInput
            name="occupation"
            label="Occupation"
            value={formData.occupation}
            placeholder="Enter your occupation"
            onChange={handleChange}
          /> */}
          
          {/* Gender Dropdown */}
          {/* <AxisDropdown
            name="gender"
            label="Gender"
            value={formData.gender}
            placeholder="Select gender"
            options={["Male", "Female", "Other", "Prefer not to say"]}
            onChange={handleGenderSelect}
          /> */}
          
          {/* Terms and Conditions Checkbox */}
          <AxisCheckbox
            name="agreeTerms"
            label={
              <>
                I agree to all applicable{" "}
                <span className="text-[#97144d] cursor-pointer">Terms & Conditions</span>
              </>
            }
            checked={formData.agreeTerms}
            onChange={handleCheckboxChange}
            error={formSubmitted ? errors.agreeTerms : undefined}
          />
          
          {/* Forgot Password Link */}
          <div className="text-right">
            <a href="#" className="text-sm text-[#97144d] hover:underline">
              Forgot your password?
            </a>
          </div>
          
          {/* Login Button */}
          <div className="w-full mt-2">
            <AxisButton
              type="submit"
              variant="primary"
              fullWidth
              loading={isLoading}
              className="py-3"
            >
              Login to Your Account
            </AxisButton>
          </div>
        </div>
      </form>
    </div>
  );
};