import { AnimatedBox, Theme } from '@/restyle';
import { IconSize } from '@hooks/useIcon';
import SpinIcon from '@icons/SpinIcon';
import * as React from 'react';
import {
 cancelAnimation,
 useAnimatedStyle,
 useSharedValue,
 withRepeat,
 withTiming,
} from 'react-native-reanimated';

interface AnimatedSpinnerProps {
 loading: boolean;
 iconSize?: IconSize | undefined;
 color?: keyof Theme['colors'] | undefined;
}

export default function AnimatedSpinner({ loading, color, iconSize }: AnimatedSpinnerProps) {
 const spin = useSharedValue(0);

 const spinnerWrapperAnimatedStyle = useAnimatedStyle(() => ({
  transform: [{ rotate: `${spin.value}deg` }],
 }));

 React.useEffect(() => {
  if (loading) {
   spin.value = 0;
   spin.value = withRepeat(withTiming(360, { duration: 1000 }), -1);
  } else {
   cancelAnimation(spin);
   spin.value = 0;
  }

  return () => {
   cancelAnimation(spin);
  };
 }, [loading, spin]);

 return (
  <AnimatedBox style={spinnerWrapperAnimatedStyle}>
   <SpinIcon color={color || 'parentHighlited'} size={iconSize || 'large'} />
  </AnimatedBox>
 );
}
