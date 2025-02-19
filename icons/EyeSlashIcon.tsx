import * as React from "react"
import Svg, { Path } from "react-native-svg"
import useIcon, { IconProps } from "../hooks/useIcon"

export default function EyeSlashIcon(props: IconProps) {
    const { size, color, strokeWidth } = useIcon(props)
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill="none"

        >
            <Path
                d="M12.11 7.892l-4.217 4.216a2.98 2.98 0 114.217-4.217z"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M14.85 4.808c-1.458-1.1-3.125-1.7-4.85-1.7-2.942 0-5.683 1.734-7.592 4.734-.75 1.175-.75 3.15 0 4.325a11.938 11.938 0 002.259 2.641M7.018 16.275c.95.4 1.958.617 2.983.617 2.942 0 5.683-1.734 7.592-4.734.75-1.175.75-3.15 0-4.325a13.504 13.504 0 00-.884-1.225M12.924 10.583a2.97 2.97 0 01-2.35 2.35M7.891 12.108l-6.225 6.225M18.332 1.667l-6.225 6.225"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

