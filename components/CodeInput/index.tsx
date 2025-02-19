import normalize from '@/normalize';
import { Box, Text, TextInput } from '@/restyle';
import React, { useEffect, useRef, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

const inputSize = normalize(45);

export type CodeInputProps<T extends FieldValues> = {
 control: Control<T>;
 name: Path<T>;
 error?: string | undefined;
};

export default function CodeInput<T extends FieldValues>(props: CodeInputProps<T>) {
 const { error, control, name } = props;

 const input1Ref = useRef(null);
 const input2Ref = useRef(null);
 const input3Ref = useRef(null);
 const input4Ref = useRef(null);

 const [input1, setInput1] = useState('');
 const [input2, setInput2] = useState('');
 const [input3, setInput3] = useState('');
 const [input4, setInput4] = useState('');

 const {
  field: { onChange },
 } = useController({
  control,
  name,
 });

 const handleInput = (
  text: string,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  nextRef: any,
  prevRef: any
 ) => {
  if (text === '') {
   if (prevRef) {
    prevRef.current.focus();
    setInput('');
   }
  } else {
   setInput(text);
   if (text.length === 1 && nextRef) {
    nextRef.current.focus();
   }
  }
 };

 useEffect(() => {
  onChange(input1 + input2 + input3 + input4);
 }, [input1, input2, input3, input4, onChange]);

 return (
  <Box>
   <Box flexDirection="row" alignItems="center" gap="s" justifyContent="center">
    <TextInput
     onChangeText={(text) => handleInput(text, setInput1, input2Ref, input1Ref)}
     paddingHorizontal="confirmCodePadding"
     fontFamily="Raleway-Regular"
     lineHeight={normalize(18)}
     fontSize={normalize(18)}
     borderRadius="smallCard"
     keyboardType="phone-pad"
     height={inputSize * 1.3}
     borderColor="border"
     width={inputSize}
     borderWidth={1.5}
     ref={input1Ref}
     placeholder="—"
     value={input1}
     maxLength={1}
    />
    <TextInput
     onChangeText={(text) => handleInput(text, setInput2, input3Ref, input1Ref)}
     paddingHorizontal="confirmCodePadding"
     fontFamily="Raleway-Regular"
     lineHeight={normalize(18)}
     fontSize={normalize(18)}
     borderRadius="smallCard"
     keyboardType="phone-pad"
     height={inputSize * 1.3}
     borderColor="border"
     width={inputSize}
     borderWidth={1.5}
     ref={input2Ref}
     placeholder="—"
     value={input2}
     maxLength={1}
    />
    <TextInput
     onChangeText={(text) => handleInput(text, setInput3, input4Ref, input2Ref)}
     paddingHorizontal="confirmCodePadding"
     fontFamily="Raleway-Regular"
     lineHeight={normalize(18)}
     fontSize={normalize(18)}
     borderRadius="smallCard"
     keyboardType="phone-pad"
     height={inputSize * 1.3}
     borderColor="border"
     width={inputSize}
     borderWidth={1.5}
     ref={input3Ref}
     placeholder="—"
     value={input3}
     maxLength={1}
    />
    <TextInput
     onChangeText={(text) => handleInput(text, setInput4, null, input3Ref)}
     paddingHorizontal="confirmCodePadding"
     fontFamily="Raleway-Regular"
     lineHeight={normalize(18)}
     fontSize={normalize(18)}
     borderRadius="smallCard"
     keyboardType="phone-pad"
     height={inputSize * 1.3}
     borderColor="border"
     width={inputSize}
     borderWidth={1.5}
     ref={input4Ref}
     placeholder="—"
     value={input4}
     maxLength={1}
    />
   </Box>
   {error ? <Text variant="inputError">{error}</Text> : null}
  </Box>
 );
}
