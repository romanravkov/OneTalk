import theme from '../styles/theme';

declare module '@react-navigation/native' {
    export type ExtendedTheme = typeof theme.darkTheme;
    export function useTheme(): ExtendedTheme;
}
