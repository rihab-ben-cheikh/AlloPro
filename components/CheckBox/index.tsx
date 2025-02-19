import { Box, Text, Theme, TouchableOpacity } from '@/restyle';
import React from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

export type CheckBoxProps<T extends FieldValues> = {
 control: Control<T>;
 name: Path<T>;
 label: React.ReactNode | undefined;
 labelTextColor?: keyof Theme['colors'] | undefined;
 checkedColor?: keyof Theme['colors'] | undefined;
};

export default function CheckBox<T extends FieldValues>(props: CheckBoxProps<T>) {
 const { control, name, label, checkedColor, labelTextColor } = props;

 const {
  field: { onChange, value },
 } = useController({
  control,
  name,
 });

 const renderLabel = () => {
  if (label) {
   if (typeof label === 'string') {
    return <Text color={labelTextColor || 'text'}>{label}</Text>;
   }
   return label;
  }
  return;
 };
 return (
  <TouchableOpacity onPress={() => onChange(!value)}>
   <Box flexDirection="row" alignItems="center">
    <Box
     width={20}
     height={20}
     borderWidth={1}
     borderRadius={'checkBox'}
     marginRight={'s'}
     justifyContent="center"
     alignItems="center"
     borderColor={value ? (checkedColor ? checkedColor : 'primary') : 'border'}
    >
     {value && (
      <Box
       width={20}
       height={20}
       borderRadius={'checkBox'}
       justifyContent="center"
       alignItems="center"
       backgroundColor={checkedColor || 'primary'}
      >
       <Text color="parentHighlited" variant="label">
        &#x2713;
       </Text>
      </Box>
     )}
    </Box>
    {renderLabel()}
   </Box>
  </TouchableOpacity>
 );
}
