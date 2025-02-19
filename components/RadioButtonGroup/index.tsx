import normalize from '@/normalize';
import { Box, Text, Theme, TouchableOpacity, theme } from '@/restyle';
import { Option } from '@/types/others';
import React from 'react';
import { Control, FieldValues, Path, PathValue, useController } from 'react-hook-form';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type RadioButtonGroupProps<T extends FieldValues> = {
 control: Control<T>;
 name: Path<T>;
 options: Option[];
 label?: React.ReactNode | undefined;
 checkedColor?: keyof Theme['colors'] | undefined;
 // eslint-disable-next-line unused-imports/no-unused-vars
 showLabelAs?: ((option: Option) => React.ReactNode | string) | undefined;
 optionsContainerStyle?: StyleProp<ViewStyle> | undefined;
 labelStyle?: StyleProp<TextStyle> | undefined;
 defaultValue?: PathValue<T, Path<T>> | undefined;
 onLeft?: boolean | undefined;
 isHorizontal?: boolean | undefined;
};

export default function RadioButtonGroup<T extends FieldValues>(props: RadioButtonGroupProps<T>) {
 const {
  control,
  options,
  name,
  checkedColor,
  label,
  showLabelAs,
  optionsContainerStyle,
  defaultValue,
  onLeft,
  labelStyle,
  isHorizontal,
 } = props;

 const {
  field: { onChange, value },
 } = useController({
  control,
  name,
  defaultValue,
 });

 const renderOptionLabel = (item: Option) => {
  if (showLabelAs) {
   return showLabelAs(item);
  }
  if (item.label) {
   return (
    <TouchableOpacity
     onPress={() => {
      onChange(item.value);
     }}
    >
     {typeof item.label === 'string' ? (
      <Text color={item.value === value ? 'primary' : 'text'} style={labelStyle}>
       {item.label}
      </Text>
     ) : (
      item.label
     )}
    </TouchableOpacity>
   );
  }
  return null;
 };

 const renderOptionInfo = (item: Option) => {
  if (item.info)
   return (
    <Text variant="info" color="caption">
     {item.info}
    </Text>
   );
 };

 const renderLabel = () => {
  if (label) {
   if (typeof label === 'string') {
    return <Text variant="label">{label}</Text>;
   }
  }
  return <Box>{label}</Box>;
 };

 return (
  <Box width={'100%'} gap="s">
   {renderLabel()}
   <Box
    gap="s"
    flexDirection={isHorizontal ? 'row' : 'column'}
    justifyContent={isHorizontal ? 'space-between' : 'flex-start'}
   >
    {options.map((item, index) => (
     <TouchableOpacity
      backgroundColor={onLeft ? 'transparent' : item.value === value ? 'primaryRgba' : 'softBg'}
      height={onLeft ? theme.sizes.smallerButtonHeight : theme.sizes.largeButtonHeight}
      justifyContent={item.info || onLeft ? 'flex-start' : 'space-between'}
      alignItems={onLeft || isHorizontal ? 'flex-start' : 'center'}
      paddingHorizontal={onLeft ? 'zero' : 's'}
      onPress={() => onChange(item.value)}
      gap={onLeft ? 's' : 'mediumGap'}
      style={optionsContainerStyle}
      flexDirection="row"
      width={isHorizontal ? 'auto' : '100%'}
      key={index}
     >
      {!onLeft && (
       <Box>
        {renderOptionLabel(item)}
        {renderOptionInfo(item)}
       </Box>
      )}

      <Box
       borderColor={item.value === value ? (checkedColor ? checkedColor : 'primary') : 'border'}
       borderWidth={1}
       height={normalize(theme.sizes.smallButtonHeight / 2)}
       width={normalize(theme.sizes.smallButtonHeight / 2)}
       justifyContent="center"
       borderRadius="card"
       alignItems="center"
      >
       <Box
        borderColor={item.value === value ? (checkedColor ? checkedColor : 'primary') : 'appBg'}
        backgroundColor={
         item.value === value ? (checkedColor ? checkedColor : 'primary') : 'transparent'
        }
        height={normalize(theme.sizes.smallButtonHeight / 3)}
        width={normalize(theme.sizes.smallButtonHeight / 3)}
        borderWidth={item.value === value ? 1 : 0}
        borderRadius="card"
       />
      </Box>
      {onLeft && (
       <Box>
        {renderOptionLabel(item)}
        {renderOptionInfo(item)}
       </Box>
      )}
     </TouchableOpacity>
    ))}
   </Box>
  </Box>
 );
}
