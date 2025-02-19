
import { useTheme } from '@shopify/restyle';
import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Theme } from '../restyle';
import normalize from '../normalize';

export type IconSize = 'tiny' | 'small' | 'medium' | 'large' | 'xLarge' | number;

export interface IconProps {
    color?: keyof Theme['colors'] | undefined;
    fillColor?: keyof Theme['colors'] | undefined;
    size?: IconSize | undefined;
    strokeWidth?: number | undefined;
    style?: StyleProp<ViewStyle> | undefined;
}

function useIcon(props: IconProps) {
    const { colors } = useTheme<Theme>();

    const size = React.useMemo(() => {
        switch (props.size) {
            case 'tiny':
                return normalize(14);
            case 'small':
                return normalize(18);
            case 'medium':
                return normalize(20);
            case 'large':
                return normalize(24);
            case 'xLarge':
                return normalize(30);
            default:
                if (typeof props.size === 'number') return normalize(props.size);
                else return normalize(20);
        }
    }, [props.size]);

    const color = React.useMemo(
        () => (props.color ? colors[props.color] : colors.text),
        [colors, props.color]
    );

    const fillColor = React.useMemo(
        () => (props.fillColor ? colors[props.fillColor] : colors.text),
        [colors, props.fillColor]
    );

    const strokeWidth = React.useMemo(() => props.strokeWidth || normalize(1.5), [props.strokeWidth]);

    return { size, color, strokeWidth, style: props.style, fillColor };
}

export default useIcon;
