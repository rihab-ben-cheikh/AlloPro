import { Box, Text, TextInput, Theme, TouchableOpacity } from '@/restyle';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import FilterIcon from '@icons/FilterIcon';
import SearchIcon from '@icons/SearchIcon';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextInputProps } from 'react-native';

export type SelectInputProps = {
 filterBottomSheet?: (
  // eslint-disable-next-line unused-imports/no-unused-vars
  bottomSheetRef: React.RefObject<BottomSheetModalMethods>
 ) => React.ReactNode | undefined;
 rightIcon?: React.ReactNode | undefined;
 leftIcon?: React.ReactNode | undefined;
 label?: React.ReactNode | undefined;
 error?: string | undefined;
 nativeProps?: TextInputProps | undefined;
 // eslint-disable-next-line unused-imports/no-unused-vars
 onChangeText?: (t: string) => void | undefined;
};

export default function SearchInput(props: SelectInputProps) {
 const { filterBottomSheet, error, label, leftIcon, rightIcon, nativeProps, onChangeText } = props;

 const bottomSheetRef = React.useRef<BottomSheetModal>(null);

 const { sizes, colors } = useTheme<Theme>();

 const { t } = useTranslation('global');

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
  return null;
 };

 return (
  <Box gap="mediumGap" width={'100%'}>
   {renderLabel()}
   <Box
    backgroundColor={error ? 'inputBgError' : 'inputBg'}
    borderColor={error ? 'inputBgError' : 'border'}
    height={sizes.textInputHeight}
    paddingHorizontal="cardPadding"
    borderWidth={error ? 2 : 1}
    borderRadius="button"
    alignItems={'center'}
    flexDirection="row"
    width={'100%'}
    gap="s"
   >
    {leftIcon ? leftIcon : <SearchIcon size={'small'} strokeWidth={1.5} />}

    <Box flex={1} borderWidth={0}>
     <TextInput
      onChangeText={onChangeText}
      placeholder={nativeProps?.placeholder || t('SearchInput.typeSomething')}
      placeholderTextColor={colors.caption}
     />
    </Box>
    {filterBottomSheet && (
     <TouchableOpacity onPress={() => bottomSheetRef.current?.present()}>
      {rightIcon ? rightIcon : <FilterIcon size={'small'} strokeWidth={1.5} />}
     </TouchableOpacity>
    )}
   </Box>
   {filterBottomSheet && filterBottomSheet(bottomSheetRef)}
   {error ? <Text variant="inputError">{error}</Text> : null}
  </Box>
 );
}
