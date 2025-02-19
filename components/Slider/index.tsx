import normalize from '@/normalize';
import { Box, Text, Theme } from '@/restyle';
import { Slider as RNSlider } from '@miblanchard/react-native-slider';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import { Control, FieldValues, Path, PathValue, useController } from 'react-hook-form';

type SliderProps<T extends FieldValues> = {
 control: Control<T>;
 name: Path<T>;
 maximumTrackTintColor?: keyof Theme['colors'] | undefined;
 minimumTrackTintColor?: keyof Theme['colors'] | undefined;
 defaultValue?: PathValue<T, Path<T>> | undefined;
 label?: React.ReactNode | undefined;
 info?: React.ReactNode | undefined;
 maximumValue?: number | undefined;
 minimumValue?: number | undefined;
 disabled?: boolean | undefined;
 isDouble?: [number, number];
 variant?: string;
};

const thumbSize = normalize(13);

export default function Slider<T extends FieldValues>(props: SliderProps<T>) {
 const {
  control,
  name,
  label,
  info,
  maximumTrackTintColor,
  minimumTrackTintColor,
  maximumValue,
  minimumValue,
  defaultValue,
  disabled,
  isDouble,
  variant,
 } = props;

 const {
  field: { onChange, value },
 } = useController({
  control,
  name,
  defaultValue,
 });

 const { colors, sizes } = useTheme<Theme>();

 const renderThumbComponent = React.useCallback(() => {
  return (
   <Box
    borderRadius="smallButton"
    backgroundColor="primary"
    justifyContent="center"
    alignItems="center"
    height={thumbSize}
    width={thumbSize}
   >
    <Box
     backgroundColor="parentHighlited"
     borderRadius="smallButton"
     height={thumbSize - 6}
     width={thumbSize - 6}
    />
   </Box>
  );
 }, []);

 const renderLabel = () => {
  let formattedString = value ? Math.trunc(parseFloat(value)) : 0;

  if (label && !isDouble) {
   if (typeof label === 'string') {
    return (
     <Box flexDirection="row" alignItems="center">
      <Text variant="label">{label} </Text>
      <Text variant="semiBoldBody" color="primary">
       - {formattedString}
      </Text>
     </Box>
    );
   } else {
    return (
     <Box flexDirection="row" alignItems="center">
      {label}
      <Text> - {formattedString}</Text>
     </Box>
    );
   }
  } else {
   if (typeof label === 'string') {
    return <Text variant="body">{label}</Text>;
   } else {
    return label;
   }
  }
 };

 const renderInfo = () => {
  if (info) {
   if (typeof info === 'string') {
    return <Text variant="label">{info} </Text>;
   }
  }
  return (
   <Box flexDirection="row" alignItems="center">
    {info}
   </Box>
  );
 };

 const renderRangeValues = () => {
  if (isDouble) {
   let formattedValues = value ? value.map((value: string) => Math.trunc(parseFloat(value))) : 0;

   return (
    <Box flexDirection="row" gap="s" alignItems="center">
     <Text variant="smallBody" color="caption">
      From
     </Text>
     <Box
      borderRadius="smallButton"
      borderWidth={0.5}
      height={sizes.smallButtonHeight}
      paddingHorizontal="s"
      alignItems="center"
      justifyContent="center"
      borderColor="caption"
     >
      <Text>
       {formattedValues ? formattedValues[0] : isDouble[0]} <Text color="caption"> {variant}</Text>
      </Text>
     </Box>
     <Text variant="smallBody" color="caption">
      To
     </Text>
     <Box
      height={sizes.smallButtonHeight}
      borderRadius="smallButton"
      justifyContent="center"
      borderColor="caption"
      paddingHorizontal="s"
      alignItems="center"
      borderWidth={0.5}
     >
      <Text>
       {formattedValues ? formattedValues[1] : isDouble[1]}
       <Text color="caption"> {variant}</Text>
      </Text>
     </Box>
    </Box>
   );
  }
 };

 return (
  <Box>
   {renderLabel()}
   <RNSlider
    value={isDouble ? isDouble : value}
    onValueChange={onChange}
    renderThumbComponent={() => renderThumbComponent()}
    maximumTrackTintColor={maximumTrackTintColor ? maximumTrackTintColor : colors.softBg}
    minimumTrackTintColor={minimumTrackTintColor ? minimumTrackTintColor : colors.primary}
    minimumValue={minimumValue ? minimumValue : 0}
    maximumValue={maximumValue ? maximumValue : 100}
    disabled={disabled}
   />
   {renderInfo()}
   {renderRangeValues()}
  </Box>
 );
}
