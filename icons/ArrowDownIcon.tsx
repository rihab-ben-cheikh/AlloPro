import * as React from "react";
import Svg, { Path } from "react-native-svg";
import useIcon, { IconProps } from "../hooks/useIcon";

export default function ArrowDownIcon(props: IconProps) {
  const { color, size, strokeWidth } = useIcon(props);

  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M16.6 7.459l-5.433 5.433a1.655 1.655 0 01-2.333 0L3.4 7.46"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
