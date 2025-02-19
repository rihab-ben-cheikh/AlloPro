import { useMe } from '@/api/use-me';
import { Box, Text, Theme, TouchableOpacity } from '@/restyle';
import ArrowDownIcon from '@icons/ArrowDownIcon';
import BagIcon from '@icons/BagIcon';
import MoonIcon from '@icons/MoonIcon';
import SunIcon from '@icons/SunIcon';
import UnreadNotificationsIcon from '@icons/UnreadNotificationsIcon';
import { useTheme } from '@shopify/restyle';
import { cartAtom } from '@stores/cart';
import { darkModeAtom } from '@stores/index';
import { useAtom, useAtomValue } from 'jotai';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
 handleGoToNotifications: VoidFunction;
 handleGoToOrders?: VoidFunction;
}

export default function Header(props: HeaderProps) {
 const { handleGoToNotifications, handleGoToOrders } = props;

 const { data: me } = useMe();

 const myCartData = useAtomValue(cartAtom);

 const { sizes } = useTheme<Theme>();

 const { t } = useTranslation('home');

 const [darkMode, setDarkMode] = useAtom(darkModeAtom);

 const { top } = useSafeAreaInsets();

 return (
  <Box
   justifyContent="space-between"
   height={sizes.headerHeight}
   style={{ marginTop: top }}
   alignItems="center"
   flexDirection="row"
   marginTop={'m'}
  >
   <Box gap="xs">
    {me?.type === 'CUSTOMER' ? (
     <Text color="caption">{t('Header.yourLocation')}</Text>
    ) : (
     <Text color="caption">Hi, {me?.name}!</Text>
    )}

    <Box flexDirection="row" gap="xs" alignItems="center">
     <Text variant="semiBoldBody">{me?.type === 'CUSTOMER' ? 'Ariana, Tunisia' : 'Last week'}</Text>
     <ArrowDownIcon strokeWidth={1.5} size={'tiny'} />
    </Box>
   </Box>
   <Box flexDirection="row" gap="s">
    {me?.type !== 'RIDER' && myCartData.length !== 0 && (
     <TouchableOpacity
      onPress={handleGoToOrders}
      height={sizes.smallButtonHeight}
      width={sizes.smallButtonHeight}
      borderRadius="avatarBorder"
      justifyContent="center"
      borderColor="border"
      alignItems="center"
      borderWidth={1}
     >
      <BagIcon strokeWidth={1.5} size={'small'} />
     </TouchableOpacity>
    )}
    <TouchableOpacity
     onPress={handleGoToNotifications}
     height={sizes.smallButtonHeight}
     width={sizes.smallButtonHeight}
     borderRadius="avatarBorder"
     justifyContent="center"
     borderColor="border"
     alignItems="center"
     borderWidth={1}
    >
     <UnreadNotificationsIcon strokeWidth={1.5} size={'small'} />
    </TouchableOpacity>
    <TouchableOpacity
     onPress={() => setDarkMode(!darkMode)}
     height={sizes.smallButtonHeight}
     width={sizes.smallButtonHeight}
     backgroundColor="darkElement"
     borderRadius="avatarBorder"
     justifyContent="center"
     borderColor="border"
     alignItems="center"
     borderWidth={1}
    >
     {darkMode ? (
      <SunIcon strokeWidth={1.5} size={'small'} color="darThemeIcon" />
     ) : (
      <MoonIcon strokeWidth={1.5} size={'small'} color="darThemeIcon" />
     )}
    </TouchableOpacity>
   </Box>
  </Box>
 );
}
