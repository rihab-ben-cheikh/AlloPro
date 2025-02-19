import { Text, Theme, TouchableOpacity, theme } from '@/restyle';
import { BoxProps, TextProps, useTheme } from '@shopify/restyle';
import * as _ from 'lodash';
import React from 'react';
import Animated, {
 cancelAnimation,
 interpolateColor,
 useAnimatedStyle,
 useDerivedValue,
 useSharedValue,
 withRepeat,
 withTiming,
} from 'react-native-reanimated';

import AnimatedSpinner from '../AnimatedSpinner';

type ButtonProps = {
 onPress: VoidFunction;
 text: string;
 loading?: boolean | undefined;
 disabled?: boolean | undefined;
 size?: keyof Theme['sizes'] | undefined;
 backgroundColor?: keyof Theme['colors'] | undefined;
 textProps?: TextProps<Theme> | undefined;
} & BoxProps<Theme>;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function Button(props: ButtonProps) {
 const { onPress, text, loading, disabled, size, backgroundColor, textProps } = props;

 const { colors } = useTheme<Theme>();

 const spin = useSharedValue(0);

 const bgColor = useDerivedValue(() => {
  if (disabled || loading) return 1;
  return 0;
 }, [loading, disabled]);

 const buttonAnimatedStyle = useAnimatedStyle(() => {
  return {
   backgroundColor: withTiming(
    interpolateColor(
     bgColor.value,
     [0, 1],
     [backgroundColor ? colors[backgroundColor] : colors.primary, colors.loadingButton]
    )
   ),
  };
 }, [disabled]);

 React.useEffect(() => {
  if (loading) {
   spin.value = withRepeat(withTiming(spin.value + 360, { duration: 1000 }), -1);
  }
  return () => cancelAnimation(spin);
 }, [loading, spin]);

 return (
  <AnimatedTouchableOpacity
   disabled={_.isBoolean(disabled) ? disabled : loading}
   height={size ? theme.sizes[size] : theme.sizes.largeButtonHeight}
   style={buttonAnimatedStyle}
   justifyContent="center"
   borderRadius="button"
   alignItems="center"
   {...props}
   onPress={onPress}
  >
   {loading ? (
    <AnimatedSpinner loading={loading} iconSize={'small'} />
   ) : (
    <Text variant="button" color="parentHighlited" {...textProps}>
     {text}
    </Text>
   )}
  </AnimatedTouchableOpacity>
 );
}
