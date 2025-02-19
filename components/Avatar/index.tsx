import normalize from '@/normalize';
import { Image, Theme, TouchableOpacity } from '@/restyle';
import { BoxProps } from '@shopify/restyle';
import * as React from 'react';
import { ImageProps } from 'react-native';
import { TouchableOpacityProps } from 'react-native-gesture-handler';

import { avatarPlaceholder } from '../../assets';

interface AvatarProps {
 size?: number | undefined;
 uri?: string | undefined | null;
 onPress?: VoidFunction | undefined;
 square?: boolean | undefined;
 useBorder?: boolean | undefined;
 onTop?: React.JSX.Element | undefined;
 imageProps?: (BoxProps<Theme> & ImageProps) | undefined;
 touchableProps?: (BoxProps<Theme> & TouchableOpacityProps) | undefined;
 withoutRadius?: boolean | undefined;
 smallRadius?: boolean | undefined;
}
export default function Avatar({
 onPress,
 size,
 uri,
 square,
 useBorder,
 onTop,
 imageProps,
 touchableProps,
 withoutRadius,
 smallRadius,
}: AvatarProps) {
 const source = uri
  ? {
     source: {
      uri,
     },
    }
  : { source: avatarPlaceholder };

 const getBorderRadius = () => {
  if (withoutRadius) {
   return normalize(0);
  }
  if (smallRadius) {
   return normalize(4);
  }
  if (square) {
   return normalize(8);
  }
  if (size) {
   return size / 2;
  }
  return normalize(40) / 2;
 };

 return (
  <TouchableOpacity
   height={size || normalize(40)}
   width={size || normalize(40)}
   onPress={onPress}
   style={{
    borderRadius: getBorderRadius(),
   }}
   {...touchableProps}
  >
   <Image
    {...source}
    borderWidth={useBorder ? 1 : 0}
    borderColor="border"
    height={size || normalize(40)}
    width={size || normalize(50)}
    style={{
     borderRadius: getBorderRadius(),
    }}
    {...imageProps}
   />
   {onTop && onTop}
  </TouchableOpacity>
 );
}
