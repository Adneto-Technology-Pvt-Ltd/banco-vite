import { Mail, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type LoginInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const LoginInfoModal = ({ isOpen, onClose }: LoginInfoModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-info-title"
      >
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl md:p-10"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close login information"
            className="absolute right-5 top-5 text-gray-400 transition-colors hover:text-[#97144D]"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#97144D]/15 bg-[#FFF0F6] text-[#97144D]">
            <Mail className="h-8 w-8" />
          </div>

          <h2 id="login-info-title" className="text-2xl font-bold text-gray-900">
            Login Information
          </h2>
          <p className="mx-auto mt-5 max-w-xs text-base leading-relaxed text-gray-600">
            Please access the platform using the login link shared via email.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="mt-8 inline-flex min-h-[48px] w-full max-w-[220px] items-center justify-center rounded-full border-2 border-[#97144D]/60 px-8 font-bold text-[#97144D] transition-colors hover:bg-[#FFF0F6]"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
