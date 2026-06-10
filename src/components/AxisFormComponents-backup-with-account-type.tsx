import { useState, useRef, forwardRef, useEffect } from "react";
import { Eye, EyeOff, Calendar, ChevronDown, Info } from "lucide-react";

// SVG paths for icons
const svgPaths = {
  keyboardIcon: "M2 2.5V9.5H10V2.5H2ZM1.5 1.5H10.5C10.6326 1.5 10.7598 1.55268 10.8536 1.64645C10.9473 1.74021 11 1.86739 11 2V10C11 10.1326 10.9473 10.2598 10.8536 10.3536C10.7598 10.4473 10.6326 10.5 10.5 10.5H1.5C1.36739 10.5 1.24021 10.4473 1.14645 10.3536C1.05268 10.2598 1 10.1326 1 10V2C1 1.86739 1.05268 1.74021 1.14645 1.64645C1.24021 1.55268 1.36739 1.5 1.5 1.5V1.5ZM3 3.5H4V4.5H3V3.5ZM3 5.5H4V6.5H3V5.5ZM3 7.5H9V8.5H3V7.5ZM5.5 5.5H6.5V6.5H5.5V5.5ZM5.5 3.5H6.5V4.5H5.5V3.5ZM8 3.5H9V4.5H8V3.5ZM8 5.5H9V6.5H8V5.5Z",
  checkboxChecked: "M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM10.6931 16.3335C10.306 16.7058 9.694 16.7058 9.30689 16.3335L5.72744 12.8918C5.33038 12.51 5.33038 11.8746 5.72744 11.4928V11.4928C6.10307 11.1317 6.69693 11.1317 7.07256 11.4928L10 14.3077L16.9274 7.64669C17.3031 7.2855 17.8969 7.2855 18.2726 7.64669V7.64669C18.6696 8.02848 18.6696 8.66383 18.2726 9.04562L10.6931 16.3335Z",
  chevronDown: "M12 13.5687L16.2788 9.29497C16.6725 8.90168 17.3109 8.90168 17.7047 9.29497C18.0984 9.68827 18.0984 10.3259 17.7047 10.7192L12.7131 15.705C12.3192 16.0983 11.6807 16.0983 11.2869 15.705L6.29532 10.7192C5.90156 10.3259 5.90156 9.68827 6.29532 9.29497C6.68907 8.90168 7.32748 8.90168 7.72124 9.29497L12 13.5687Z",
  calendarIcon: "M17 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H7V1H9V3H15V1H17V3ZM15 5H9V7H7V5H4V9H20V5H17V7H15V5ZM20 11H4V19H20V11Z"
};

interface TextInputProps {
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasTooltip?: boolean;
  error?: string;
  type?: string;
  required?: boolean;
}

export const AxisTextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ name, label, value, placeholder = "Enter information", onChange, hasTooltip = false, error, type = "text", required = false }, ref) => {
    return (
      <div className="relative size-full" data-name="Text_Input">
        <div className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-0 relative size-full">
          {/* Label */}
          <div className="relative shrink-0 w-full" data-name="label_wrapper">
            <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative w-full">
              <div className="relative shrink-0 w-full" data-name="label">
                <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative w-full">
                  <div className="relative shrink-0" data-name="label_text_container">
                    <div className="relative size-full">
                      <div className="box-border content-stretch flex flex-row items-start justify-start pl-0 pr-0.5 py-0.5 relative">
                        <div className="css-qgucv1 flex flex-col font-['Lato:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#282828] text-[14px] text-left text-nowrap tracking-[0.24px]">
                          <p className="adjustLetterSpacing block leading-[20px] whitespace-pre">
                            {label} {required && <span className="text-[#d4183d]">*</span>}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tooltip */}
                  {hasTooltip && (
                    <div className="relative">
                      <div className="size-5">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M10 18.3333C5.3975 18.3333 1.66667 14.6025 1.66667 10C1.66667 5.3975 5.3975 1.66667 10 1.66667C14.6025 1.66667 18.3333 5.3975 18.3333 10C18.3333 14.6025 14.6025 18.3333 10 18.3333ZM10 16.6667C11.7681 16.6667 13.4638 15.9643 14.714 14.714C15.9643 13.4638 16.6667 11.7681 16.6667 10C16.6667 8.23189 15.9643 6.5362 14.714 5.28596C13.4638 4.03571 11.7681 3.33333 10 3.33333C8.23189 3.33333 6.5362 4.03571 5.28596 5.28596C4.03571 6.5362 3.33333 8.23189 3.33333 10C3.33333 11.7681 4.03571 13.4638 5.28596 14.714C6.5362 15.9643 8.23189 16.6667 10 16.6667V16.6667ZM9.16667 5.83333H10.8333V7.5H9.16667V5.83333ZM9.16667 9.16667H10.8333V14.1667H9.16667V9.16667Z"
                            fill="#404040"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Input */}
          <div
            className={`bg-[#ffffff] relative rounded shrink-0 w-full ${error ? 'border-[#d4183d]' : ''}`}
            data-name="input"
          >
            <div className={`absolute border ${error ? 'border-[#d4183d]' : 'border-[#e2e2e2]'} border-solid inset-0 pointer-events-none rounded`} />
            <div className="flex flex-row items-center relative size-full">
              <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-[8px] relative w-full">
                <div className="flex flex-row items-center self-stretch w-full">
                  <div
                    className="basis-0 grow h-full min-h-px min-w-px relative shrink-0"
                    data-name="input_text_container"
                  >
                    <div className="flex flex-row items-center relative size-full">
                      <div className="box-border content-stretch flex flex-row items-center justify-start px-0 py-1 relative size-full">
                        <input
                          ref={ref}
                          type={type}
                          name={name}
                          value={value}
                          onChange={onChange}
                          placeholder={placeholder}
                          className={`w-full py-1 px-0 outline-none bg-transparent font-['Lato:Regular',_sans-serif] text-[14px] tracking-[0.24px] ${
                            value ? 'text-[#282828]' : 'text-[#9d9d9d]'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Error message */}
          {error && (
            <div className="text-[#d4183d] text-xs mt-1">{error}</div>
          )}
        </div>
      </div>
    );
  }
);

AxisTextInput.displayName = "AxisTextInput";

interface PasswordInputProps {
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasTooltip?: boolean;
  error?: string;
  required?: boolean;
  onVirtualKeyboard?: () => void;
}

export const AxisPasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ name, label, value, placeholder = "Enter your password", onChange, hasTooltip = false, error, required = false, onVirtualKeyboard }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    
    return (
      <div className="flex flex-col gap-1 w-full">
        <div className="relative size-full" data-name="Password_input">
          <div className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-0 relative size-full">
            {/* Label */}
            <div className="relative shrink-0 w-full" data-name="label_wrapper">
              <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative w-full">
                <div className="relative shrink-0 w-full" data-name="label">
                  <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative w-full">
                    <div className="relative shrink-0" data-name="label_text_container">
                      <div className="relative size-full">
                        <div className="box-border content-stretch flex flex-row items-start justify-start pl-0 pr-0.5 py-0.5 relative">
                          <div className="css-qgucv1 flex flex-col font-['Lato:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#282828] text-[14px] text-left text-nowrap tracking-[0.24px]">
                            <p className="adjustLetterSpacing block leading-[20px] whitespace-pre">
                              {label} {required && <span className="text-[#d4183d]">*</span>}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tooltip */}
                    {hasTooltip && (
                      <div className="relative">
                        <div className="size-5">
                          <svg
                            className="block size-full"
                            fill="none"
                            preserveAspectRatio="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M10 18.3333C5.3975 18.3333 1.66667 14.6025 1.66667 10C1.66667 5.3975 5.3975 1.66667 10 1.66667C14.6025 1.66667 18.3333 5.3975 18.3333 10C18.3333 14.6025 14.6025 18.3333 10 18.3333ZM10 16.6667C11.7681 16.6667 13.4638 15.9643 14.714 14.714C15.9643 13.4638 16.6667 11.7681 16.6667 10C16.6667 8.23189 15.9643 6.5362 14.714 5.28596C13.4638 4.03571 11.7681 3.33333 10 3.33333C8.23189 3.33333 6.5362 4.03571 5.28596 5.28596C4.03571 6.5362 3.33333 8.23189 3.33333 10C3.33333 11.7681 4.03571 13.4638 5.28596 14.714C6.5362 15.9643 8.23189 16.6667 10 16.6667V16.6667ZM9.16667 5.83333H10.8333V7.5H9.16667V5.83333ZM9.16667 9.16667H10.8333V14.1667H9.16667V9.16667Z"
                              fill="#404040"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Password Input */}
            <div
              className={`bg-[#ffffff] relative rounded shrink-0 w-full ${error ? 'border-[#d4183d]' : ''}`}
              data-name="input"
            >
              <div className={`absolute border ${error ? 'border-[#d4183d]' : 'border-[#e2e2e2]'} border-solid inset-0 pointer-events-none rounded`} />
              <div className="flex flex-row items-center relative size-full">
                <div className="box-border content-stretch flex flex-row gap-1 items-center justify-between p-[8px] relative w-full">
                  <div className="flex flex-row items-center self-stretch">
                    <div
                      className="basis-0 grow h-full min-h-px min-w-px relative shrink-0"
                      data-name="input_text_container"
                    >
                      <div className="flex flex-row items-center relative size-full">
                        <div className="box-border content-stretch flex flex-row items-center justify-start px-0 py-1 relative size-full">
                          <input
                            ref={ref}
                            type={showPassword ? "text" : "password"}
                            name={name}
                            value={value}
                            onChange={onChange}
                            placeholder={placeholder}
                            className={`w-full py-1 px-0 outline-none bg-transparent font-['Lato:Regular',_sans-serif] text-[14px] tracking-[0.24px] ${
                              value ? 'text-[#282828]' : 'text-[#9d9d9d]'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Show/Hide Button */}
                  <div className="flex flex-row items-center self-stretch">
                    <div className="h-full relative shrink-0 flex items-center" data-name="trailing_icon_container">
                      <div className="box-border content-stretch flex flex-row gap-2.5 h-full items-center justify-start p-0 relative">
                        <div className="relative shrink-0 rounded-lg">
                          <div className="flex flex-row items-center justify-center relative size-full">
                            <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-1 py-2 relative">
                              <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="css-oqoy0g flex flex-col font-['Lato:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#ed1164] text-[12px] text-center text-nowrap tracking-[1px] uppercase"
                              >
                                <p className="adjustLetterSpacing block leading-[12px] whitespace-pre">
                                  {showPassword ? "HIDE" : "SHOW"}
                                </p>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Error message */}
            {error && (
              <div className="text-[#d4183d] text-xs mt-1">{error}</div>
            )}
          </div>
        </div>
        
        {/* Virtual Keyboard Button */}
        {/* {onVirtualKeyboard && (
          <div className="flex flex-row gap-1 items-center">
            <button
              type="button"
              onClick={onVirtualKeyboard}
              className="flex items-center justify-center px-1 py-2"
            >
              <div className="relative shrink-0">
                <div className="flex flex-row items-center justify-center relative size-full">
                  <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-1 py-2 relative">
                    <div className="overflow-clip relative size-3">
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 12 12"
                      >
                        <path
                          d={svgPaths.keyboardIcon}
                          fill="#ED1164"
                        />
                      </svg>
                    </div>
                    <div className="css-oqoy0g flex flex-col font-['Lato:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#ed1164] text-[12px] text-center text-nowrap tracking-[1px] uppercase">
                      <p className="adjustLetterSpacing block leading-[12px] whitespace-pre">
                        use virtual keyboard
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        )} */}
      </div>
    );
  }
);

AxisPasswordInput.displayName = "AxisPasswordInput";

interface DateInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasTooltip?: boolean;
  error?: string;
  required?: boolean;
}

export const AxisDateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ name, label, value, onChange, hasTooltip = false, error, required = false }, ref) => {
    const dateInputRef = useRef<HTMLInputElement | null>(null);
    
    const handleCalendarClick = () => {
      const inputElement = typeof ref === 'function' ? null : (ref?.current || dateInputRef.current);
      if (inputElement) {
        inputElement.showPicker();
      }
    };
    
    // Format date to dd/mm/yyyy
    const formatDate = (dateString: string): string => {
      if (!dateString) return "";
      
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      
      return `${day}/${month}/${year}`;
    };
    
    return (
      <div className="relative size-full" data-name="Date_Input">
        <div className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-0 relative size-full">
          {/* Label */}
          <div className="relative shrink-0 w-full" data-name="label_wrapper">
            <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative w-full">
              <div className="relative shrink-0 w-full" data-name="label">
                <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative w-full">
                  <div className="relative shrink-0" data-name="label_text_container">
                    <div className="relative size-full">
                      <div className="box-border content-stretch flex flex-row items-start justify-start pl-0 pr-0.5 py-0.5 relative">
                        <div className="css-qgucv1 flex flex-col font-['Lato:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#282828] text-[14px] text-left text-nowrap tracking-[0.24px]">
                          <p className="adjustLetterSpacing block leading-[20px] whitespace-pre">
                            {label} {required && <span className="text-[#d4183d]">*</span>}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tooltip */}
                  {hasTooltip && (
                    <div className="relative">
                      <div className="size-5">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M10 18.3333C5.3975 18.3333 1.66667 14.6025 1.66667 10C1.66667 5.3975 5.3975 1.66667 10 1.66667C14.6025 1.66667 18.3333 5.3975 18.3333 10C18.3333 14.6025 14.6025 18.3333 10 18.3333ZM10 16.6667C11.7681 16.6667 13.4638 15.9643 14.714 14.714C15.9643 13.4638 16.6667 11.7681 16.6667 10C16.6667 8.23189 15.9643 6.5362 14.714 5.28596C13.4638 4.03571 11.7681 3.33333 10 3.33333C8.23189 3.33333 6.5362 4.03571 5.28596 5.28596C4.03571 6.5362 3.33333 8.23189 3.33333 10C3.33333 11.7681 4.03571 13.4638 5.28596 14.714C6.5362 15.9643 8.23189 16.6667 10 16.6667V16.6667ZM9.16667 5.83333H10.8333V7.5H9.16667V5.83333ZM9.16667 9.16667H10.8333V14.1667H9.16667V9.16667Z"
                            fill="#404040"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Date Input */}
          <div
            className={`bg-[#ffffff] relative rounded shrink-0 w-full ${error ? 'border-[#d4183d]' : ''}`}
            data-name="input"
          >
            <div className={`absolute border ${error ? 'border-[#d4183d]' : 'border-[#b4b4b4]'} border-solid inset-0 pointer-events-none rounded`} />
            <div className="flex flex-row items-center relative size-full">
              <div className="box-border content-stretch flex flex-row gap-1 items-center justify-between p-[8px] relative w-full">
                <input
                  ref={(node) => {
                    // Handle both refs
                    if (typeof ref === 'function') {
                      ref(node);
                    } else if (ref) {
                      ref.current = node;
                    }
                    dateInputRef.current = node;
                  }}
                  type="date"
                  name={name}
                  value={value}
                  onChange={onChange}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                />
                <div className="w-full py-1 px-0 font-['Lato:Regular',_sans-serif] text-[14px] tracking-[0.24px] text-[#9d9d9d]">
                  {value ? formatDate(value) : "dd/mm/yyyy"}
                </div>
                
                {/* Calendar Icon */}
                <div className="h-full relative">
                  <div className="h-full flex items-center">
                    <button
                      type="button"
                      onClick={handleCalendarClick}
                      className="h-full flex items-center"
                    >
                      <div className="size-6">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d={svgPaths.calendarIcon}
                            fill="#404040"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Error message */}
          {error && (
            <div className="text-[#d4183d] text-xs mt-1">{error}</div>
          )}
        </div>
      </div>
    );
  }
);

AxisDateInput.displayName = "AxisDateInput";

interface DropdownProps {
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  options: string[];
  onChange: (value: string) => void;
  hasTooltip?: boolean;
  error?: string;
  required?: boolean;
}

export const AxisDropdown = ({ name, label, value, placeholder = "Select an option", options, onChange, hasTooltip = false, error, required = false }: DropdownProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle option selection
  const handleSelect = (option: string) => {
    onChange(option);
    setShowOptions(false);
  };
  
  return (
    <div className="relative size-full" data-name="Dropdown">
      <div className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-0 relative size-full">
        {/* Label */}
        <div className="relative shrink-0 w-full" data-name="label_wrapper">
          <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative w-full">
            <div className="relative shrink-0 w-full" data-name="label">
              <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative w-full">
                <div className="relative shrink-0" data-name="label_text_container">
                  <div className="relative size-full">
                    <div className="box-border content-stretch flex flex-row items-start justify-start pl-0 pr-0.5 py-0.5 relative">
                      <div className="css-qgucv1 flex flex-col font-['Lato:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#282828] text-[14px] text-left text-nowrap tracking-[0.24px]">
                        <p className="adjustLetterSpacing block leading-[20px] whitespace-pre">
                          {label} {required && <span className="text-[#d4183d]">*</span>}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Tooltip */}
                {hasTooltip && (
                  <div className="relative">
                    <div className="size-5">
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M10 18.3333C5.3975 18.3333 1.66667 14.6025 1.66667 10C1.66667 5.3975 5.3975 1.66667 10 1.66667C14.6025 1.66667 18.3333 5.3975 18.3333 10C18.3333 14.6025 14.6025 18.3333 10 18.3333ZM10 16.6667C11.7681 16.6667 13.4638 15.9643 14.714 14.714C15.9643 13.4638 16.6667 11.7681 16.6667 10C16.6667 8.23189 15.9643 6.5362 14.714 5.28596C13.4638 4.03571 11.7681 3.33333 10 3.33333C8.23189 3.33333 6.5362 4.03571 5.28596 5.28596C4.03571 6.5362 3.33333 8.23189 3.33333 10C3.33333 11.7681 4.03571 13.4638 5.28596 14.714C6.5362 15.9643 8.23189 16.6667 10 16.6667V16.6667ZM9.16667 5.83333H10.8333V7.5H9.16667V5.83333ZM9.16667 9.16667H10.8333V14.1667H9.16667V9.16667Z"
                          fill="#404040"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Dropdown */}
        <div ref={dropdownRef} className="relative w-full">
          <div
            className={`bg-[#ffffff] relative rounded shrink-0 w-full ${error ? 'border-[#d4183d]' : ''}`}
            data-name="input"
            onClick={() => setShowOptions(!showOptions)}
          >
            <div className={`absolute border ${error ? 'border-[#d4183d]' : 'border-[#e2e2e2]'} border-solid inset-0 pointer-events-none rounded`} />
            <div className="flex flex-row items-center relative size-full">
              <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-[8px] relative w-full">
                <div className="flex flex-row items-center self-stretch">
                  <div
                    className="basis-0 grow h-full min-h-px min-w-px relative shrink-0"
                    data-name="input_text_container"
                  >
                    <div className="flex flex-row items-center relative size-full">
                      <div className="box-border content-stretch flex flex-row items-center justify-start px-0 py-1 relative size-full">
                        <div className={`basis-0 flex flex-col font-['Lato:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 ${value ? 'text-[#282828]' : 'text-[#9d9d9d]'} text-[14px] text-left tracking-[0.24px]`}>
                          <p className="adjustLetterSpacing block leading-[20px]">
                            {value || placeholder}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center self-stretch">
                  <div className="relative shrink-0 h-full" data-name="trailing_icon_container">
                    <div className="box-border content-stretch flex flex-row gap-2.5 h-full items-start justify-start p-[2px] relative">
                      <div className="overflow-clip relative shrink-0 size-6" data-name="trailing_icon">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d={svgPaths.chevronDown}
                            fill="#404040"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dropdown Options */}
          {showOptions && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-[#e2e2e2] rounded shadow-md">
              {options.map((option) => (
                <div
                  key={option}
                  className="px-4 py-2 hover:bg-[#f5f5f5] cursor-pointer font-['Lato:Regular',_sans-serif] text-[14px]"
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Error message */}
        {error && (
          <div className="text-[#d4183d] text-xs mt-1">{error}</div>
        )}
      </div>
    </div>
  );
};

interface CheckboxProps {
  name: string;
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export const AxisCheckbox = ({ name, label, checked, onChange, error }: CheckboxProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex flex-row gap-2 items-start w-full">
        <div 
          className="size-6 cursor-pointer" 
          onClick={() => onChange(!checked)}
        >
          {checked ? (
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 24 24"
            >
              <path
                clipRule="evenodd"
                d={svgPaths.checkboxChecked}
                fill="#ED1164"
                fillRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#282828" strokeWidth="2" fill="transparent" />
            </svg>
          )}
        </div>
        <div className="flex-grow font-['Lato:Regular',_sans-serif] font-normal text-[14px] tracking-[0.24px] leading-[20px] text-[#282828]">
          {label}
        </div>
      </div>
      {error && (
        <div className="text-[#d4183d] text-xs mt-1 ml-8">{error}</div>
      )}
    </div>
  );
};