import * as React from "react";
import Svg, { Path } from "react-native-svg";
import useIcon, { IconProps } from "../hooks/useIcon";

export default function ArrowUpIcon(props: IconProps) {
  const { color, size, strokeWidth } = useIcon(props);

  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M16.6 12.541l-5.433-5.433a1.655 1.655 0 00-2.333 0L3.4 12.541"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
