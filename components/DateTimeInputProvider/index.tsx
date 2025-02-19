import { Box, Text, Theme, TouchableOpacity } from '@/restyle';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useTheme } from '@shopify/restyle';
import { dateTimeInputAtom, isDateTimeModalInputVisibleAtom } from '@stores/index';
import { useAtom, useAtomValue } from 'jotai';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type DateTimeInputProviderProps = {
 children: React.ReactNode;
};

export default function DateTimeInputProvider(props: DateTimeInputProviderProps) {
 const { children } = props;

 const { sizes } = useTheme<Theme>();

 const { bottom } = useSafeAreaInsets();

 const dateTimeInput = useAtomValue(dateTimeInputAtom);

 const [isVisible, setIsVisible] = useAtom(isDateTimeModalInputVisibleAtom);

 const [date, setDate] = React.useState<Date>(new Date());

 const onChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
  if (selectedDate) {
   const currentDate = selectedDate;
   setDate(currentDate);
  }
 };

 const onAndroidChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
  setIsVisible(false);
  if (selectedDate) {
   const currentDate = selectedDate;
   setDate(currentDate);
   dateTimeInput?.onChange(currentDate);
  }
 };

 const onDoneClicked = () => {
  setIsVisible(false);
  dateTimeInput?.onChange(date);
 };

 const onCancelClicked = () => {
  setIsVisible(false);
  dateTimeInput?.onChange();
 };

 return (
  <React.Fragment>
   {isVisible &&
    (Platform.OS === 'ios' ? (
     <Box
      backgroundColor="transparent"
      position="absolute"
      width={'100%'}
      height={'100%'}
      zIndex={1}
     >
      <Box
       bottom={bottom}
       backgroundColor="appBg"
       borderTopWidth={0.5}
       borderTopColor={'border'}
       position="absolute"
       width={'100%'}
      >
       <Box
        paddingHorizontal="screenPadding"
        borderBottomWidth={0.5}
        borderBottomColor={'border'}
        justifyContent="space-between"
        flexDirection="row"
        height={sizes.smallButtonHeight}
       >
        <TouchableOpacity onPress={onCancelClicked} justifyContent="center" alignItems="center">
         <Text variant="semiBoldBody" color="caption">
          Cancel
         </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDoneClicked} justifyContent="center" alignItems="center">
         <Text variant="semiBoldBody" color="primary">
          Done
         </Text>
        </TouchableOpacity>
       </Box>
       <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={dateTimeInput?.mode}
        is24Hour={true}
        onChange={onChange}
        display={'spinner'}
       />
      </Box>
     </Box>
    ) : (
     <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode={dateTimeInput?.mode}
      is24Hour={true}
      onChange={onAndroidChange}
      display={'default'}
     />
    ))}
   {children}
  </React.Fragment>
 );
}
