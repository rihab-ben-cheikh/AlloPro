import normalize from '@/normalize';
import { Box, Text, TextInput, Theme, TouchableOpacity } from '@/restyle';
import CloseIcon from '@icons/CloseIcon';
import SearchIcon from '@icons/SearchIcon';
import TickIcon from '@icons/TickIcon';
import { useTheme } from '@shopify/restyle';
import { isSelectInputModalVisibleAtom, selectInputAtom } from '@stores/index';
import { useAtom, useAtomValue } from 'jotai';
import React from 'react';
import { Modal, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type SelectInputProviderProps = {
 children: React.ReactNode;
};

export default function SelectInputProvider(props: SelectInputProviderProps) {
 const { children } = props;

 const { top, bottom } = useSafeAreaInsets();

 const { textVariants, sizes } = useTheme<Theme>();

 const selectInput = useAtomValue(selectInputAtom);

 const [isVisible, setIsVisible] = useAtom(isSelectInputModalVisibleAtom);

 const [selected, setSelected] = React.useState<(string | number)[] | string | number>(
  selectInput?.multiple ? [] : ''
 );

 const [term, setTerm] = React.useState('');

 React.useEffect(() => {
  if (selectInput?.value) {
   setSelected(selectInput.multiple ? selectInput.value || [] : selectInput.value || '');
  }
 }, [selectInput, selectInput?.multiple, selectInput?.value]);

 const filtered = React.useMemo(() => {
  if (term) return selectInput?.options.filter((o) => o.label.includes(term)) || [];
  return selectInput?.options || [];
 }, [selectInput?.options, term]);

 const handleCloseModal = () => {
  setTerm('');
  setIsVisible(false);
 };

 const handleSelectOption = (option: string | number) => {
  if (selectInput?.multiple && selected instanceof Array) {
   const exists = selected.includes(option);
   if (exists) {
    const removeOption = selected.filter((item: string | number) => item !== option);
    setSelected(removeOption);
   } else {
    setSelected([...selected, option]);
   }
  } else {
   selectInput?.onChange(option);
   setSelected(option);
   handleCloseModal();
  }
 };

 const handleConfirmSelection = () => {
  selectInput?.onChange(selected);
  handleCloseModal();
 };

 return (
  <React.Fragment>
   {isVisible && (
    <Box justifyContent="center" alignItems="center">
     <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleCloseModal}
     >
      <Box
       backgroundColor="appBg"
       flex={1}
       style={{ paddingTop: top + 10, paddingBottom: bottom }}
       gap="l"
      >
       <Box width={'100%'}>
        <Text variant="semiBoldBody" textAlign="center">
         {selectInput?.title}
        </Text>
        <Box position="absolute" left={20}>
         <TouchableOpacity onPress={handleCloseModal}>
          <CloseIcon />
         </TouchableOpacity>
        </Box>
        {selectInput?.multiple && (
         <Box position="absolute" right={20}>
          <TouchableOpacity onPress={handleConfirmSelection}>
           <Text variant="semiBoldSmallBody">Ok</Text>
          </TouchableOpacity>
         </Box>
        )}
       </Box>
       <ScrollView>
        <Box paddingHorizontal="screenPadding">
         {selectInput?.searchable && (
          <Box
           height={sizes.textInputHeight}
           paddingHorizontal="s"
           borderRadius="button"
           borderColor="border"
           alignItems="center"
           flexDirection="row"
           marginBottom="s"
           borderWidth={1}
           gap="s"
           justifyContent="space-between"
          >
           <Box
            height={sizes.textInputHeight}
            alignItems="center"
            flexDirection="row"
            gap="s"
            flex={1}
           >
            <SearchIcon size={'small'} color="border" />
            <TextInput
             style={{ fontSize: textVariants.body.fontSize, flex: normalize(1) }}
             height={sizes.textInputHeight}
             placeholder="Search..."
             borderRadius="button"
             value={term}
             onChangeText={(t) => {
              setTerm(t);
             }}
            />
           </Box>
           <TouchableOpacity
            justifyContent="center"
            alignItems="center"
            onPress={() => {
             setTerm('');
            }}
           >
            <CloseIcon />
           </TouchableOpacity>
          </Box>
         )}

         {filtered.map((option, index: number) => {
          const isSelected =
           selected instanceof Array ? selected.includes(option.value) : selected === option.value;

          return (
           <TouchableOpacity
            onPress={() => handleSelectOption(option.value)}
            justifyContent="space-between"
            paddingVertical="s"
            flexDirection="row"
            key={index}
           >
            <Text
             variant={isSelected ? 'semiBoldBody' : 'body'}
             color={isSelected ? 'primary' : 'text'}
            >
             {option.label}
            </Text>
            {isSelected && <TickIcon size={'tiny'} color="primary" />}
           </TouchableOpacity>
          );
         })}
        </Box>
       </ScrollView>
      </Box>
     </Modal>
    </Box>
   )}
   {children}
  </React.Fragment>
 );
}
