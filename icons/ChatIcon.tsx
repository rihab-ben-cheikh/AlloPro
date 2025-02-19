import * as React from "react";
import Svg, { Path } from "react-native-svg";
import useIcon, { IconProps } from "../hooks/useIcon";

export default function ChatIcon(props: IconProps) {
  const { color, size, strokeWidth } = useIcon(props);

  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M18.333 5.208v4.25c0 1.058-.35 1.95-.975 2.566-.617.625-1.509.975-2.567.975v1.509c0 .566-.633.908-1.1.591l-.808-.533c.075-.258.108-.542.108-.842v-3.391c0-1.7-1.133-2.834-2.833-2.834H4.499c-.116 0-.225.009-.333.017V5.208c0-2.125 1.417-3.542 3.542-3.542h7.083c2.125 0 3.542 1.417 3.542 3.542z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.991 10.333v3.392c0 .3-.033.583-.108.842-.309 1.225-1.325 1.991-2.725 1.991H7.89l-2.517 1.675a.56.56 0 01-.875-.466v-1.209c-.85 0-1.558-.283-2.05-.775-.5-.5-.783-1.208-.783-2.058v-3.392c0-1.583.983-2.675 2.5-2.816.108-.009.217-.017.333-.017h5.659c1.7 0 2.833 1.133 2.833 2.833z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
