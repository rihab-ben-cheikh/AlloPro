import * as React from "react";
import Svg, { Path } from "react-native-svg";
import useIcon, { IconProps } from "../hooks/useIcon";

export default function EyeIcon(props: IconProps) {
  const { color, size, strokeWidth } = useIcon(props);
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      
    >
      <Path
        d="M12.984 10a2.98 2.98 0 01-2.983 2.983A2.98 2.98 0 017.018 10 2.98 2.98 0 0110 7.017 2.98 2.98 0 0112.984 10z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 16.891c2.941 0 5.683-1.733 7.591-4.733.75-1.175.75-3.15 0-4.325-1.908-3-4.65-4.733-7.591-4.733-2.942 0-5.683 1.733-7.592 4.733-.75 1.175-.75 3.15 0 4.325 1.909 3 4.65 4.733 7.592 4.733z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
