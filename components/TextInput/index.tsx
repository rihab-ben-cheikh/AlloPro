import { Box, Text, Theme } from '@/restyle';
import { BoxProps, useTheme } from '@shopify/restyle';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native';

export type TextInputProps<T extends FieldValues> = {
 control: Control<T>;
 name: Path<T>;
 wrapperProps?: BoxProps<Theme> | undefined;
 nativeProps?: RNTextInputProps | undefined;
 rightIcon?: React.ReactNode | undefined;
 leftIcon?: React.ReactNode | undefined;
 label?: React.ReactNode | undefined;
 leftIconWithoutBorder?: boolean | undefined;
 multiLine?: boolean | undefined;
 error?: string | undefined;
};

function TextInput<T extends FieldValues>(props: TextInputProps<T>) {
 const {
  control,
  name,
  leftIconWithoutBorder,
  wrapperProps,
  nativeProps,
  multiLine,
  rightIcon,
  leftIcon,
  label,
  error,
 } = props;

 const { sizes, colors, textVariants } = useTheme<Theme>();

 const renderLabel = () => {
  if (label) {
   if (typeof label === 'string') {
    return (
     <Text variant="body" color="caption">
      {label}
     </Text>
    );
   }
   return label;
  }
  return;
 };

 return (
  <Box width={'100%'} gap="mediumGap" {...wrapperProps}>
   {renderLabel()}
   <Box
    paddingHorizontal="cardPadding"
    backgroundColor={error ? 'inputBgError' : 'inputBg'}
    height={multiLine ? sizes.textAreaInputHeight : sizes.textInputHeight}
    borderColor={error ? 'inputBorderError' : 'border'}
    borderRadius="button"
    alignItems={multiLine ? 'flex-start' : 'center'}
    flexDirection="row"
    borderWidth={error ? 2 : 1}
    gap="mediumGap"
    width={'100%'}
   >
    {leftIcon && (
     <Box
      height={sizes.textInputHeight}
      borderRightColor={'border'}
      paddingRight="cardPadding"
      justifyContent="center"
      alignItems="center"
      borderRightWidth={leftIconWithoutBorder ? 0 : 1}
     >
      {leftIcon}
     </Box>
    )}
    <Box flex={1} borderWidth={0}>
     <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, onBlur } }) => (
       <RNTextInput
        {...nativeProps}
        placeholder={nativeProps?.placeholder || '...'}
        onChangeText={onChange}
        multiline={multiLine}
        placeholderTextColor={colors.caption}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
         fontSize: textVariants.body.fontSize,
         color: colors.text,
         fontFamily: 'Raleway-Regular',
        }}
        onBlur={onBlur}
        value={value}
        ref={null}
       />
      )}
     />
    </Box>
    {rightIcon && <Box>{rightIcon}</Box>}
   </Box>
   {error ? <Text variant="inputError">{error}</Text> : null}
  </Box>
 );
}

export default TextInput;
