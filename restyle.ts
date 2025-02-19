import {
    BoxProps,
    TypographyProps,
    backgroundColor,
    border,
    createBox,
    createRestyleComponent,
    createText,
    createTheme,
    layout,
    shadow,
    spacing,
    typography,
} from '@shopify/restyle';

import {
    Dimensions,
    Image as RNImage,
    ImageProps as RNImageProps,
    Pressable as RNPressable,
    PressableProps as RNPressableProps,
    TextInputProps as RNTextInptProps,
    TextInput as RNTextInput,
    TouchableOpacity as RNTouchableOpacity,
    TouchableOpacityProps as RNTouchableOpacityProps,
    ViewProps,
} from 'react-native';

import Animated from 'react-native-reanimated';
import {
    SafeAreaView as RNSafeAreaView,
    SafeAreaViewProps as RNSafeAreaViewProps,
} from 'react-native-safe-area-context';
import normalize from './normalize';

function normalizeLineHeight(lineHeight: number) {
    return normalize(lineHeight * 1.4);
}

export const palette = {
    primary: '#1BB2A9',
    black: '#2A3037',
    lightGrey: '#00000026',
    darkGrey: '#AAACAE',
    red: '#FF3C33',
    yellow: '#F7CE45',
    blue: '#69BCEB',
    green: '#2CD142',
    purple: '#5352E2',
    lightPurple: '#908EFF',
    orange: '#FF950D',
    white: '#fff',
    whiteRgba: '#ffffff26',
};

export const theme = createTheme({
    colors: {
        primary: palette.primary,
        primaryRgba: '#1bb2a91a',
        text: palette.black,
        border: palette.lightGrey,
        caption: palette.darkGrey,
        danger: palette.red,
        dangerRgba: '#FFE2E0',
        warning: palette.yellow,
        warningRgba: '#FEF8E3',
        info: palette.blue,
        infoRgba: '#E9F5FC',
        success: palette.green,
        successRgba: '#DFF8E3',
        transparent: 'transparent',
        softBg: '#FBFBFB',
        appBg: palette.white,
        inputBgError: 'rgba(226, 54, 54, 0.05)',
        inputBorderError: 'rgba(226, 54, 54, 0.2)',
        greyCard: '#F5F5F5',
        halfBlackBackground: 'rgba(1, 1,1, 0.2)',
        parentHighlited: palette.white,
        lightElement: palette.white,
        darkElement: '#000000',
        cardBackground: palette.white,
        disabled: '#FDFEFF',
        inactiveColor: '#F3F4F6',
        loadingButton: palette.darkGrey,
        blackRgba: 'rgba(1,1,1,0.5)',
        inputBg: palette.white,
        darThemeIcon: palette.white,
        hilightedOnTop: 'rgba(255, 255, 255, 0.6)',
        processing: palette.orange,
        processingHighlited: '#FBF3ED',
    },
    spacing: {
        xs: normalize(5),
        s: normalize(10),
        m: normalize(20),
        l: normalize(25),
        xl: normalize(30),
        smallGap: normalize(2),
        mediumGap: normalize(5),
        largeGap: normalize(16),
        xLargeGap: normalize(20),
        screenPadding: normalize(20),
        cardPadding: normalize(12),
        inputPadding: normalize(8),
        formPadding: normalize(20),
        auto: 'auto',
        full: 'auto',
        zero: 0,
        tabbarHorizontalPadding: normalize(25),
        confirmCodePadding: normalize(16),
        stepperPadding: normalize(60),
        xxLargeGap: normalize(40),
        xxs: normalize(2),
    },
    borderRadii: {
        none: 0,
        one: 1,
        button: 16,
        smallButton: 8,
        card: 16,
        textInput: 16,
        checkBox: 4,
        smallCard: 8,
        avatarBorder: normalize(120 / 2),
        roundButton: normalize(100 / 2),
        smallerCard: 8,
    },
    textVariants: {
        defaults: {
            color: 'text',
            fontSize: normalize(12),
            lineHeight: normalizeLineHeight(12),
            fontFamily: 'Raleway-Regular',
        },
        title: {
            fontSize: normalize(18),
            lineHeight: normalizeLineHeight(18),
            color: 'text',
            fontFamily: 'Raleway-SemiBold',
        },
        subTitle: {
            fontSize: normalize(16),
            lineHeight: normalizeLineHeight(16),
            color: 'text',
            fontFamily: 'Raleway-SemiBold',
        },
        bigBody: {
            color: 'text',
            fontSize: normalize(14),
            lineHeight: normalizeLineHeight(14),
            fontFamily: 'Raleway-Regular',
        },
        semiBoldBigBody: {
            color: 'text',
            fontSize: normalize(14),
            lineHeight: normalizeLineHeight(14),
            fontFamily: 'Raleway-SemiBold',
        },
        body: {
            fontSize: normalize(12),
            lineHeight: normalizeLineHeight(12),
        },
        semiBoldBody: {
            fontSize: normalize(12),
            lineHeight: normalizeLineHeight(12),
            fontFamily: 'Raleway-SemiBold',
        },
        smallBody: {
            fontSize: normalize(10),
            lineHeight: normalizeLineHeight(10),
            fontWeight: '400',
            fontFamily: 'Raleway-Regular',
        },

        semiBoldSmallBody: {
            fontSize: normalize(10),
            lineHeight: normalizeLineHeight(9),
            fontFamily: 'Raleway-SemiBold',
        },

        label: {
            fontSize: normalize(12),
            lineHeight: normalizeLineHeight(12),
        },
        caption: {
            fontSize: normalize(12),
            lineHeight: normalizeLineHeight(12),
        },
        inputError: {
            fontSize: normalize(10),
            lineHeight: normalizeLineHeight(10),
            color: 'danger',
        },
        button: {
            fontSize: normalize(12),
            lineHeight: normalizeLineHeight(10), // Keep it less than fontSize
            fontFamily: 'Raleway-SemiBold',
        },
        tabBarLabelFocused: {
            fontSize: normalize(10),
            lineHeight: normalizeLineHeight(10),
            fontFamily: 'Raleway-SemiBold',
        },
        tabBarLabel: {
            fontSize: normalize(10),
            lineHeight: normalizeLineHeight(10),
        },
        info: {
            fontSize: normalize(10),
            lineHeight: normalizeLineHeight(9),
        },
        semiBoldInfo: {
            fontSize: normalize(10),
            lineHeight: normalizeLineHeight(10),
            fontFamily: 'Raleway-SemiBold',
        },
    },
    sizes: {
        smallerButtonHeight: normalize(20),
        smallButtonHeight: normalize(30),
        mediumButtonHeight: normalize(40),
        largeButtonHeight: normalize(46),
        headerHeight: normalize(60),
        textInputHeight: normalize(46),
        textAreaInputHeight: normalize(100),
        tabbarHeight: normalize(80),
        screenHeight: Dimensions.get('window').height,
        screenWidth: Dimensions.get('window').width,
        stepperHeight: normalize(60),
        orderStatusButtonHeight: normalize(25),
        editProfileAvatarHeight: normalize(90),
        sliderSize: normalize(12),
        progressChartHeight: normalize(9),
    },
});

export type Theme = typeof theme;

export const darkTheme: Theme = {
    ...theme,
    colors: {
        ...theme.colors,
        text: '#FCFCFC',
        caption: '#6D6D6D',
        border: palette.whiteRgba,
        softBg: '#292929',
        appBg: '#1F1F1F',
        cardBackground: '#1F1F1F',
        disabled: '#212121',
        inactiveColor: '#232323',
        lightElement: '#1F1F1F',
        parentHighlited: '#FCFCFC',
        inputBg: '#292929',
        darkElement: palette.white,
        darThemeIcon: palette.black,
        blackRgba: palette.whiteRgba,
        hilightedOnTop: '#3A3838',
        processing: palette.orange,
        processingHighlited: 'rgba(252, 168, 112, 0.01)',
    },
};

export const Box = createBox<Theme>();
export const Text = createText<Theme>();

type AnimatedViewProps = Animated.AnimateProps<ViewProps & { children?: React.ReactNode }>;
type AnimatedBoxProps = BoxProps<Theme> & AnimatedViewProps;
export const AnimatedBox = createRestyleComponent<AnimatedBoxProps, Theme>(
    [spacing, backgroundColor, spacing, border, shadow, layout],
    Animated.View
);

type PressableProps = BoxProps<Theme> & RNPressableProps;
export const Pressable = createRestyleComponent<PressableProps, Theme>(
    [spacing, backgroundColor, spacing, border, shadow, layout],
    RNPressable
);

type TouchableOpacityProps = BoxProps<Theme> & RNTouchableOpacityProps;
export const TouchableOpacity = createRestyleComponent<TouchableOpacityProps, Theme>(
    [spacing, backgroundColor, spacing, border, shadow, layout],
    RNTouchableOpacity
);

type ImageProps = BoxProps<Theme> & RNImageProps;
export const Image = createRestyleComponent<ImageProps, Theme>(
    [spacing, backgroundColor, spacing, border, shadow, layout],
    RNImage
);

type TextInputProps = BoxProps<Theme> & RNTextInptProps & TypographyProps<Theme>;
export const TextInput = createRestyleComponent<TextInputProps, Theme>(
    [spacing, backgroundColor, spacing, border, shadow, layout, typography],
    RNTextInput
);

type SafeAreaViewProps = BoxProps<Theme> & RNSafeAreaViewProps;
export const SafeAreaView = createRestyleComponent<SafeAreaViewProps, Theme>(
    [spacing, backgroundColor, spacing, border, shadow, layout],
    RNSafeAreaView
);


