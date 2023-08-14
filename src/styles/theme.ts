import { Theme } from '@react-navigation/native';

export type ThemeType = Theme & typeof darkTheme;

const primary = '#35CE8D';
const darkPrimary = '#249164';
const darkTheme = {
    dark: true,
    colors: {
        // required for navigation
        primary: darkPrimary,
        background: '#161616',
        card: '#222222',
        text: '#e3e3e3',
        border: '#333333',
        notification: '#FD6150',
        // end of required for navigation

        icon: '#e3e3e3',

        block: '#202020',

        background1: '#202020',
        background2: '#303030',
        background3: '#404040',

        primaryText: '#e3e3e3',
        disabledPrimary: '#616161',
        textOnPrimary: '#fcfcfc',

        gray1: '#CFCCCC',
        gray2: '#999999',
        gray3: '#777777',
        gray4: '#555555',
        gray5: '#444444',

        disabled: '#616161',
        // static
        white: '#FFFFFF',
        black: '#222222',
        primaryBlack: '#313131',
        red: '#DD2E2E',
        yellow: '#FBBC41',
        green: '#3FEC50',
    },
};

const lightTheme = {
    dark: false,
    colors: {
        // required for navigation
        primary: primary,
        background: '#F2F4F4',
        card: '#F0F0F0',
        text: '#212121',
        border: '#dbdbdb',
        notification: '#FD6150',
        // end of required for navigation

        icon: primary,
        block: '#fcfcfc',

        background1: '#ffffff',
        background2: '#e7e7e7',
        background3: '#dcdcdc',

        primaryText: primary,
        textOnPrimary: '#fcfcfc',
        disabledPrimary: '#b8b8b8',

        gray1: '#333333',
        gray2: '#555555',
        gray3: '#666666',
        gray4: '#999999',
        gray5: '#CFCCCC',

        disabled: '#b8b8b8',
        // static
        white: '#FFFFFF',
        black: '#222222',
        primaryBlack: '#313131',
        red: '#DD2E2E',
        yellow: '#FBBC41',
        green: '#3FEC50',
    },
};

export default {
    darkTheme,
    lightTheme,
};
