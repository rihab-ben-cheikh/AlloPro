import { Box, Text, Theme, TouchableOpacity } from '@/restyle';
import { Option } from '@/types/others';
import useSelectInputModal from '@hooks/useSelectInputModal';
import ArrowDownIcon from '@icons/ArrowDownIcon';
import { useTheme } from '@shopify/restyle';
import * as React from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

export type SelectInputProps<T extends FieldValues> = {
 control: Control<T>;
 name: Path<T>;
 title: string;
 options: Option[];
 placeholder?: string;
 rightIcon?: React.ReactNode | undefined;
 leftIcon?: React.ReactNode | undefined;
 label?: React.ReactNode | undefined;
 searchable?: boolean | undefined;
 multiple?: boolean | undefined;
 error?: string | undefined;
};

export default function SelectInput<T extends FieldValues>(props: SelectInputProps<T>) {
 const { control, name, label, title, options, error, placeholder, searchable, multiple } = props;

 const {
  field: { onChange, value },
 } = useController({
  control,
  name,
  //@ts-ignore
  defaultValue: multiple ? [] : '',
 });

 const { sizes } = useTheme<Theme>();

 const { showSelectInputModal } = useSelectInputModal();

 const handleShowSelectInputModal = () => {
  showSelectInputModal({
   title,
   onChange,
   options,
   multiple,
   searchable,
   value,
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

 const renderPlaceholder = () => {
  const getValue = () => {
   if (Array.isArray(value) && value.length > 0) {
    return options
     .filter((option) => value.includes(option.value))
     .map((option) => option.label)
     .join(', ');
   } else if (value && !Array.isArray(value)) {
    return options.find((option) => option.value === value)?.label;
   }
   return null;
  };

  const resolvedValue = getValue();

  if (resolvedValue) {
   return <Text variant="body">{resolvedValue}</Text>;
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
    backgroundColor={error ? 'inputBgError' : 'inputBg'}
    borderColor={error ? 'inputBgError' : 'border'}
    onPress={handleShowSelectInputModal}
    paddingHorizontal="cardPadding"
    height={sizes.textInputHeight}
    justifyContent="space-between"
    borderRadius="button"
    alignItems={'center'}
    paddingVertical={'s'}
    flexDirection="row"
    borderWidth={1}
    gap="mediumGap"
    width={'100%'}
   >
    {renderPlaceholder()}
    <ArrowDownIcon color="caption" size={'small'} strokeWidth={1.5} />
   </TouchableOpacity>

   {error ? <Text variant="inputError">{error}</Text> : null}
  </Box>
 );
}
