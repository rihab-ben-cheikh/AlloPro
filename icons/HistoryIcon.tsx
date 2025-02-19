import * as React from "react";
import Svg, { Path } from "react-native-svg";
import useIcon, { IconProps } from "../hooks/useIcon";

export default function HistoryIcon(props: IconProps) {
  const { color, size, strokeWidth } = useIcon(props);

  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M5.833 10C2.5 10 2.5 11.492 2.5 13.333v.834c0 2.3 0 4.166 4.167 4.166h6.666c3.334 0 4.167-1.866 4.167-4.166v-.834c0-1.841 0-3.333-3.333-3.333-.834 0-1.067.175-1.5.5l-.85.9a2.499 2.499 0 01-3.642 0l-.842-.9c-.433-.325-.666-.5-1.5-.5z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.833 10V5c0-1.842 0-3.334-3.334-3.334h-5c-3.333 0-3.333 1.492-3.333 3.333v5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.791 7.691h2.775M8.1 5.191h4.166"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
