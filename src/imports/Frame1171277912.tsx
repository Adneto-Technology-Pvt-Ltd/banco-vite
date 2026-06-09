function Frame1171277912Helper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="css-ebafv2 relative shrink-0">
      <p className="adjustLetterSpacing block leading-[20px] whitespace-pre text-center sm:text-left">
        {children}
      </p>
    </div>
  );
}

export default function Frame1171277912() {
  return (
    <div className="bg-[#444444] relative w-full min-h-[60px]">
      <div className="flex flex-col sm:flex-row items-center relative w-full h-full">
        <div className="box-border content-stretch flex flex-col sm:flex-row font-['Lato:Regular',_sans-serif] items-center justify-between leading-[0] not-italic px-4 sm:px-[60px] py-3.5 relative w-full text-[#e2e2e2] text-[12px] sm:text-[14px] text-center sm:text-left tracking-[0.24px] gap-2 sm:gap-0 h-full md:h-[60px]">

          {/* Mobile: Stack vertically, Desktop: Side by side */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0">
            <Frame1171277912Helper>
              <span className="inline sm:hidden">© {new Date().getFullYear()} Axis Bank</span>
              <span className="hidden sm:inline">Copyright © {new Date().getFullYear()} Axis Bank  |  Terms & Conditions  |  Privacy Policy  |  Contact Us.</span>
            </Frame1171277912Helper>
          </div>

          {/* Mobile links - Show separately on mobile */}
          <div className="flex flex-col sm:hidden items-center gap-1 text-[11px]">
            <div className="flex flex-wrap justify-center gap-2">
              <span className="cursor-pointer hover:text-white transition-colors">Terms & Conditions</span>
              <span>|</span>
              <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
              <span>|</span>
              <span className="cursor-pointer hover:text-white transition-colors">Contact Us</span>
            </div>
          </div>
          {/* Powered by - Always shown */}
          <Frame1171277912Helper>Powered by Adneto</Frame1171277912Helper>
        </div>
      </div>
    </div>
  );
}