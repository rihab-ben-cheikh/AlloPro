import { AnimatedBox, Box, Text, Theme, TouchableOpacity } from '@/restyle';
import {
 badEmoji,
 decentEmoji,
 goodEmoji,
 greatEmoji,
 horribleEmoji,
 sadEmoji,
 yummyEmoji,
} from '@assets/index';
import CloseIcon from '@icons/CloseIcon';
import { useTheme } from '@shopify/restyle';
import { isModalVisibleAtom, modalAtom } from '@stores/index';
import { useAtom, useAtomValue } from 'jotai';
import React from 'react';
import { Modal } from 'react-native';
import Animated, {
 Easing,
 SlideInDown,
 SlideOutDown,
 useAnimatedStyle,
 useSharedValue,
 withDelay,
 withRepeat,
 withSequence,
 withTiming,
} from 'react-native-reanimated';

interface ModalProviderProps {
 children: React.ReactNode;
}

export default function ModalProvider(props: ModalProviderProps) {
 const { children } = props;

 const { sizes, spacing } = useTheme<Theme>();

 const modal = useAtomValue(modalAtom);

 const scale = useSharedValue(1);

 const [isVisible, setIsVisible] = useAtom(isModalVisibleAtom);

 React.useEffect(() => {
  const duration = 1000;
  const pauseDuration = 500;

  scale.value = withRepeat(
   withSequence(
    withTiming(1.1, {
     duration,
     easing: Easing.bounce,
    }),
    withDelay(pauseDuration, withTiming(1.1, { duration: 0 })),
    withTiming(1, {
     duration,
     easing: Easing.bounce,
    }),
    withDelay(pauseDuration, withTiming(1, { duration: 0 }))
   ),
   -1,
   false
  );
 }, [scale]);

 const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
 }));

 const getIcon = (): React.ReactElement => {
  switch (modal?.type) {
   case 'LOW':
    return modal.isMeal ? (
     <Animated.Image style={animatedStyle} source={horribleEmoji} />
    ) : (
     <Animated.Image style={animatedStyle} source={badEmoji} />
    );
   case 'MEDIUM':
    return modal.isMeal ? (
     <Animated.Image style={animatedStyle} source={decentEmoji} />
    ) : (
     <Animated.Image style={animatedStyle} source={goodEmoji} />
    );
   case 'HIGH':
    return modal.isMeal ? (
     <Animated.Image style={animatedStyle} source={yummyEmoji} />
    ) : (
     <Animated.Image style={animatedStyle} source={greatEmoji} />
    );
   case 'SAD':
    return <Animated.Image style={animatedStyle} source={sadEmoji} />;
   default:
    return modal?.isMeal ? (
     <Animated.Image style={animatedStyle} source={yummyEmoji} />
    ) : (
     <Animated.Image style={animatedStyle} source={greatEmoji} />
    );
  }
 };

 return (
  <React.Fragment>
   {isVisible && (
    <Box justifyContent="center" alignItems="center">
     <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
       setIsVisible(false);
      }}
     >
      <Box backgroundColor="blackRgba" justifyContent="center" alignItems="center" flex={1}>
       <AnimatedBox
        entering={SlideInDown}
        exiting={SlideOutDown}
        maxWidth={sizes.screenWidth - spacing.screenPadding * 2}
        width={sizes.screenWidth - spacing.screenPadding * 2}
        backgroundColor="appBg"
        padding="screenPadding"
        borderRadius="card"
        margin="m"
       >
        <Box
         borderRadius="avatarBorder"
         backgroundColor="appBg"
         alignItems="center"
         justifyContent="center"
         position="absolute"
         padding="xs"
         top={-40}
         left={'45%'}
        >
         {getIcon()}
        </Box>

        <Box position="absolute" right={10} top={10}>
         <TouchableOpacity onPress={() => setIsVisible(false)}>
          <CloseIcon color="caption" />
         </TouchableOpacity>
        </Box>
        <Box marginTop="l" gap="s">
         <Text variant="title" textAlign="center">
          {modal?.title}
         </Text>
         <Text
          color={modal?.isDescriptionBlack ? 'text' : 'caption'}
          textAlign="center"
          variant="body"
         >
          {modal?.description}
         </Text>
         {modal?.content}
        </Box>
       </AnimatedBox>
      </Box>
     </Modal>
    </Box>
   )}
   {children}
  </React.Fragment>
 );
}
