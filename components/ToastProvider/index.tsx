import normalize from '@/normalize';
import { AnimatedBox, Box, Pressable, Text, Theme } from '@/restyle';
import CloseCircleIcon from '@icons/CloseCircleIcon';
import CloseIcon from '@icons/CloseIcon';
import InfoCircleIcon from '@icons/InfoCircleIcon';
import TickCircleIcon from '@icons/TickCircleIcon';
import { toastAtom } from '@stores/index';
import { useAtom } from 'jotai';
import * as React from 'react';
import { SlideInUp, SlideOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const iconContainerSize = normalize(35);

interface ToastProviderProps {
 children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
 const { top } = useSafeAreaInsets();

 const [toast, setToast] = useAtom(toastAtom);

 React.useEffect(() => {
  if (toast.isVisible) {
   setTimeout(
    () =>
     setToast({
      ...toast,
      isVisible: false,
     }),
    toast.dismissAfter || 5000
   );
  }
 }, [setToast, toast, toast.isVisible]);

 const {
  bgColor,
  icon,
  color,
 }: { bgColor: keyof Theme['colors']; icon: React.ReactElement; color: keyof Theme['colors'] } =
  React.useMemo(() => {
   switch (toast?.type) {
    case 'DANGER':
     return {
      bgColor: 'dangerRgba',
      icon: <CloseCircleIcon size={'small'} color="parentHighlited" strokeWidth={1.5} />,
      color: 'danger',
     };
    case 'WARNING':
     return {
      bgColor: 'warningRgba',
      icon: <InfoCircleIcon size={'small'} color="parentHighlited" strokeWidth={1.5} />,
      color: 'warning',
     };
    case 'SUCCESS':
     return {
      bgColor: 'successRgba',
      icon: <TickCircleIcon size={'small'} color="parentHighlited" strokeWidth={1.5} />,
      color: 'success',
     };
    default:
     return {
      bgColor: 'infoRgba',
      icon: <InfoCircleIcon size={'small'} color="parentHighlited" strokeWidth={1.5} />,
      color: 'info',
     };
   }
  }, [toast]);

 return (
  <React.Fragment>
   {toast?.isVisible && (
    <AnimatedBox
     entering={SlideInUp.duration(600)}
     exiting={SlideOutUp.duration(600)}
     backgroundColor={bgColor}
     position="absolute"
     width={'100%'}
     zIndex={1}
     left={0}
     style={{
      paddingTop: top,
     }}
    >
     <Box
      flexDirection="row"
      alignItems="center"
      paddingVertical="s"
      paddingHorizontal="screenPadding"
      gap="s"
     >
      <Box
       height={iconContainerSize}
       width={iconContainerSize}
       borderRadius="smallCard"
       justifyContent="center"
       backgroundColor={color}
       alignItems="center"
      >
       {icon}
      </Box>
      <Box flex={1}>
       <Text color={color} variant="semiBoldBody" numberOfLines={1}>
        {toast?.title}
       </Text>
       <Text color={color} variant="caption">
        {toast?.description}
       </Text>
      </Box>
      <Pressable
       onPress={() =>
        setToast({
         ...toast,
         isVisible: false,
        })
       }
       justifyContent="center"
       alignItems="center"
      >
       <CloseIcon color={color} />
      </Pressable>
     </Box>
    </AnimatedBox>
   )}
   {children}
  </React.Fragment>
 );
}
