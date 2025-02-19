import * as React from "react";
import Svg, { Path } from "react-native-svg";
import useIcon, { IconProps } from "../hooks/useIcon";

export default function HomeIcon(props: IconProps) {
  const { color, size, strokeWidth } = useIcon(props);

  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M7.517 2.367l-4.492 3.5c-.75.583-1.358 1.825-1.358 2.767v6.175a3.521 3.521 0 003.508 3.517h9.65a3.52 3.52 0 003.509-3.509V8.75c0-1.008-.675-2.3-1.5-2.875l-5.15-3.608c-1.167-.817-3.042-.775-4.167.1zM10 14.992v-2.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
