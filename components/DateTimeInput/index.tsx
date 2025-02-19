import { Box, Text, Theme, TouchableOpacity } from '@/restyle';
import useDateTimeInputModal from '@hooks/useDateTimeInputModal';
import useTime from '@hooks/useTime';
import CalendarIcon from '@icons/CalendarIcon';
import ClockIcon from '@icons/ClockIcon';
import StopWatchIcon from '@icons/StopWatchIcon';
import { useTheme } from '@shopify/restyle';
import * as React from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

interface DateTimeInputProps<T extends FieldValues> {
 name: Path<T>;
 control: Control<T>;
 mode: 'date' | 'time';
 placeholder?: string | undefined;
 error?: string | undefined;
 rightIcon?: React.ReactNode | undefined;
 leftIcon?: React.ReactNode | undefined;
 label?: React.ReactNode | undefined;
 withoutBorder?: boolean;
 isDuration?: boolean;
}

export default function DateTimeInput<T extends FieldValues>({
 control,
 name,
 mode,
 withoutBorder,
 placeholder,
 isDuration,
 label,
 error,
}: DateTimeInputProps<T>) {
 const {
  field: { value, onChange },
 } = useController({
  name,
  control,
 });

 const { sizes } = useTheme<Theme>();

 const { getReadableDate, getReadableTime } = useTime();

 const { showDateTimeInputModal } = useDateTimeInputModal();

 const handleShowDateTimeInputModal = () => {
  showDateTimeInputModal({
   onChange,
   value,
   mode,
  });
 };

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

 const renderInputValue = () => {
  if (value) {
   return (
    <Text color="text" variant="body">
     {mode === 'time'
      ? getReadableTime(value)
      : (value as any) instanceof Date
        ? getReadableDate(value)
        : value}
    </Text>
   );
  } else if (placeholder) {
   return (
    <Text color="caption" variant="body">
     {placeholder}
    </Text>
   );
  } else {
   return (
    <Text color="caption" variant="body">
     ---
    </Text>
   );
  }
 };

 return (
  <Box gap="mediumGap" width={'100%'}>
   {renderLabel()}
   <TouchableOpacity
    justifyContent={!isDuration ? 'space-between' : 'flex-start'}
    backgroundColor={error ? 'inputBgError' : 'inputBg'}
    borderColor={error ? 'inputBgError' : 'border'}
    onPress={handleShowDateTimeInputModal}
    paddingHorizontal="cardPadding"
    height={sizes.textInputHeight}
    borderRadius="button"
    alignItems={'center'}
    paddingVertical={'s'}
    flexDirection="row"
    borderWidth={withoutBorder ? 0 : 1}
    gap="mediumGap"
    width={'100%'}
   >
    {isDuration && (
     <Box
      height={sizes.textInputHeight}
      borderRightColor={'border'}
      paddingRight="cardPadding"
      justifyContent="center"
      borderRightWidth={1}
      alignItems="center"
     >
      <StopWatchIcon color="caption" strokeWidth={1.5} />
     </Box>
    )}
    {renderInputValue()}
    {!isDuration && !withoutBorder ? (
     mode === 'date' ? (
      <CalendarIcon color="caption" size={'small'} strokeWidth={1.5} />
     ) : (
      <ClockIcon color="caption" size={'small'} strokeWidth={1.5} />
     )
    ) : null}
   </TouchableOpacity>

   {error ? <Text variant="inputError">{error}</Text> : null}
  </Box>
 );
}
