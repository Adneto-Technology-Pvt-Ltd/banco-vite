import React from "react";
import Frame1171277912 from "../imports/Frame1171277912";

type AxisFooterProps = {
  onNavigate?: (destination: string) => void;
};

export function AxisFooter(_props: AxisFooterProps) {
  return (
    <div style={{
      width: '100%',
      height: '60px',
      fontFamily: 'Lato, Arial, sans-serif'
    }}>
      <Frame1171277912 />
    </div>
  );
}
