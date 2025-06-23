/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#41EAD4FC';
const tintColorDark = '#41EADFFC';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    secondary: '#FB923C',
    icon: '#687076',
    badge: '#c0c9cf',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    secondary: '#FB923C',
    icon: '#9BA1A6',
    badge: '#2A2D30',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
