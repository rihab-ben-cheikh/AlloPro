import { AnimatedBox, Text, Theme, TouchableOpacity } from '@/restyle';
import BagIcon from '@icons/BagIcon';
import HomeIcon from '@icons/HomeIcon';
import ProfileIcon from '@icons/ProfileIcon';
import SearchIcon from '@icons/SearchIcon';
import { useKeyboard } from '@react-native-community/hooks';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '@shopify/restyle';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { FadeInDown, FadeOutDown } from 'react-native-reanimated';

export default function CustomerTabBar({ insets, state, navigation }: BottomTabBarProps) {
 const { sizes } = useTheme<Theme>();

 const { t } = useTranslation('global');

 const { keyboardShown } = useKeyboard();

 if (keyboardShown) return null;

 return (
  <AnimatedBox
   exiting={FadeOutDown}
   entering={FadeInDown}
   height={Platform.OS === 'android' ? sizes.stepperHeight : sizes.tabbarHeight}
   flexDirection="row"
   backgroundColor="appBg"
   alignItems="center"
   justifyContent="space-between"
   paddingHorizontal="tabbarHorizontalPadding"
   style={{
    paddingBottom: insets.bottom - 15,
   }}
   borderTopWidth={1}
   borderTopColor={'border'}
  >
   {state.routes.map((route, k) => {
    const active = k === state.index;

    const icon = () => {
     if (k === 0) return <HomeIcon color={active ? 'primary' : 'caption'} strokeWidth={1.5} />;
     else if (k === 1) return <BagIcon color={active ? 'primary' : 'caption'} strokeWidth={1.5} />;
     else if (k === 2) return <SearchIcon color={active ? 'primary' : 'caption'} />;
     return <ProfileIcon color={active ? 'primary' : 'caption'} strokeWidth={1.5} />;
    };

    const label = () => {
     if (k === 0)
      return (
       <Text color={active ? 'primary' : 'caption'} variant={'tabBarLabel'}>
        {t('CustomerTabBar.home')}
       </Text>
      );
     else if (k === 1)
      return (
       <Text color={active ? 'primary' : 'caption'} variant={'tabBarLabel'}>
        {t('CustomerTabBar.orders')}
       </Text>
      );
     else if (k === 2)
      return (
       <Text color={active ? 'primary' : 'caption'} variant={'tabBarLabel'}>
        {t('CustomerTabBar.explore')}
       </Text>
      );

     return (
      <Text color={active ? 'primary' : 'caption'} variant={'tabBarLabel'}>
       {t('CustomerTabBar.profile')}
      </Text>
     );
    };

    const onPress = () => {
     const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
     });

     if (!active && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
     }
    };
    return <TabbarItem active={active} icon={icon()} key={k} onPress={onPress} label={label()} />;
   })}
  </AnimatedBox>
 );
}

const TabbarItem = ({
 icon,
 onPress,
 label,
}: {
 active: boolean;
 icon: React.JSX.Element;
 onPress: VoidFunction;
 label: React.JSX.Element;
}) => {
 return (
  <TouchableOpacity alignItems="center" justifyContent="center" onPress={onPress} gap="xs">
   {icon}
   {label}
  </TouchableOpacity>
 );
};
