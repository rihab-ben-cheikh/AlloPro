import * as React from "react";
import Svg, { Path } from "react-native-svg";
import useIcon, { IconProps } from "../hooks/useIcon";

export default function PersonIcon(props: IconProps) {
  const { color, size, strokeWidth } = useIcon(props);

  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10.134 9.059a1.515 1.515 0 00-.275 0 3.683 3.683 0 01-3.558-3.692c0-2.042 1.65-3.7 3.7-3.7a3.696 3.696 0 01.133 7.392zM5.968 12.133c-2.017 1.35-2.017 3.55 0 4.892 2.291 1.533 6.05 1.533 8.341 0 2.017-1.35 2.017-3.55 0-4.892-2.283-1.525-6.041-1.525-8.341 0z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
