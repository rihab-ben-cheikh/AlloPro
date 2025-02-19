import normalize from '@/normalize';
import { Box, Image, Text, Theme, TouchableOpacity } from '@/restyle';
import { ReviewTypeEnum } from '@/types/generated';
import {
 badEmoji,
 decentEmoji,
 goodEmoji,
 greatEmoji,
 horribleEmoji,
 yummyEmoji,
} from '@assets/index';
import { useTheme } from '@shopify/restyle';
import React from 'react';

interface ReactionButtonProps {
 reviewable_type: string;
 type: ReviewTypeEnum | null;
 onPress?: VoidFunction;
 disabled?: boolean;
}

const emojiSize = normalize(20);

export default function ReactionButton(props: ReactionButtonProps) {
 const { type, onPress, disabled, reviewable_type } = props;

 const { sizes } = useTheme<Theme>();

 const renderReaction = React.useCallback(() => {
  switch (type) {
   case 'LOW':
    return (
     <Box flexDirection="row" alignItems="center" justifyContent="center" gap="xs">
      <Image
       source={reviewable_type === 'meal' ? horribleEmoji : badEmoji}
       height={emojiSize}
       width={emojiSize}
      />
      <Text color="primary" variant="semiBoldBody">
       {reviewable_type === 'meal' ? 'Horrible' : 'Bad'}
      </Text>
     </Box>
    );

   case 'MEDIUM':
    return (
     <Box flexDirection="row" alignItems="center" justifyContent="center" gap="xs">
      <Image
       source={reviewable_type === 'meal' ? decentEmoji : goodEmoji}
       height={emojiSize}
       width={emojiSize}
      />
      <Text color="primary" variant="semiBoldBody">
       {reviewable_type === 'meal' ? 'Descent' : 'Good'}
      </Text>
     </Box>
    );

   case 'HIGH':
    return (
     <Box flexDirection="row" alignItems="center" justifyContent="center" gap="xs">
      <Image
       source={reviewable_type === 'meal' ? yummyEmoji : greatEmoji}
       height={emojiSize}
       width={emojiSize}
      />
      <Text color="primary" variant="semiBoldBody">
       {reviewable_type === 'meal' ? 'Yummy' : 'Great'}
      </Text>
     </Box>
    );

   default:
    return (
     <Box flexDirection="row" alignItems="center" justifyContent="center" gap="xs">
      <Image
       source={reviewable_type === 'meal' ? yummyEmoji : greatEmoji}
       height={emojiSize}
       width={emojiSize}
      />
      <Text color="primary" variant="semiBoldBody">
       {reviewable_type === 'meal' ? 'Yummy' : 'Great'}
      </Text>
     </Box>
    );
  }
 }, [reviewable_type, type]);

 return (
  <TouchableOpacity
   height={sizes.smallButtonHeight}
   backgroundColor="primaryRgba"
   borderRadius="smallButton"
   justifyContent="center"
   paddingHorizontal="xs"
   borderColor="primary"
   alignItems="center"
   disabled={disabled}
   onPress={onPress}
   borderWidth={1}
  >
   {renderReaction()}
  </TouchableOpacity>
 );
}
