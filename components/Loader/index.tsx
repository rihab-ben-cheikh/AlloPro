import { theme } from '@/restyle';
import React from 'react';
import { ActivityIndicator } from 'react-native';

interface LoaderProps {
 size?: number | 'small' | 'large' | undefined;
 color?: string;
}

export default function Loader(props: LoaderProps) {
 const { color, size } = props;

 return <ActivityIndicator size={size} color={color ? color : theme.colors.primary} />;
}
