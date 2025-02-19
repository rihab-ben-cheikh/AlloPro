import * as React from "react";
import Svg, { Path } from "react-native-svg";
import useIcon, { IconProps } from "../hooks/useIcon";

export default function ProfileIcon(props: IconProps) {
  const { color, size, strokeWidth } = useIcon(props);

  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 10a4.167 4.167 0 100-8.334 4.167 4.167 0 000 8.333zM17.159 18.333c0-3.225-3.209-5.833-7.159-5.833-3.95 0-7.158 2.608-7.158 5.833"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
