import { Box, Text, Theme, TouchableOpacity } from '@/restyle';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

type SelectableListProps<T extends FieldValues> = {
 control: Control<T>;
 name: Path<T>;
 data: string[];
 label?: React.ReactNode | undefined;
};
export default function SelectableList<T extends FieldValues>(props: SelectableListProps<T>) {
 const { control, name, data, label } = props;

 const {
  field: { onChange },
 } = useController({
  control,
  name,
 });

 const { sizes } = useTheme<Theme>();

 const [selectedItems, setSelectedItems] = React.useState(['']);

 const handleSelectItem = (itemSelected: string) => {
  const exists = selectedItems.includes(itemSelected);

  if (exists) {
   const removeItem = selectedItems.filter((item: string) => {
    return item !== itemSelected;
   });

   setSelectedItems(removeItem);
   onChange(removeItem);
  } else {
   setSelectedItems([...selectedItems, itemSelected]);
   onChange(selectedItems);
  }
 };

 const renderLabel = () => {
  if (label) {
   if (typeof label === 'string') {
    return <Text variant="body">{label}</Text>;
   }
   return label;
  }
  return;
 };

 return (
  <Box gap="s">
   {renderLabel()}
   <Box flexDirection="row" gap="s" flexWrap="wrap">
    {data.map((item: string, index: number) => {
     const isSelected = selectedItems.includes(item);
     return (
      <TouchableOpacity
       backgroundColor={isSelected ? 'primary' : 'softBg'}
       height={sizes.mediumButtonHeight}
       paddingHorizontal="s"
       borderRadius="smallButton"
       justifyContent="center"
       alignItems="center"
       key={index}
       onPress={() => {
        handleSelectItem(item);
       }}
      >
       <Text
        color={isSelected ? 'parentHighlited' : 'text'}
        variant={isSelected ? 'semiBoldBody' : 'body'}
       >
        {item}
       </Text>
      </TouchableOpacity>
     );
    })}
   </Box>
  </Box>
 );
}
