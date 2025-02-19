import { theme } from '@/restyle';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { ColorValue, Switch, SwitchProps } from 'react-native';

export type SwitchInputProps<T extends FieldValues> = {
 control: Control<T>;
 name: Path<T>;
 checkedColor?: ColorValue | undefined;
 switchProps?: SwitchProps;
};

function SwitchInput<T extends FieldValues>(props: SwitchInputProps<T>) {
 const { control, name, checkedColor, switchProps } = props;
 return (
  <Controller
   control={control}
   name={name}
   render={({ field: { onChange, value } }) => (
    <Switch
     {...switchProps}
     trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
     thumbColor={
      value ? (checkedColor ? checkedColor : theme.colors.lightElement) : theme.colors.lightElement
     }
     onValueChange={onChange}
     value={value}
    />
   )}
  />
 );
}

export default SwitchInput;
