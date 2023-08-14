import React from 'react';
import ReactComponents, {
    StyleProp,
    StyleSheet,
    TextStyle,
} from 'react-native';

const NativeText = ReactComponents.Text;

export interface TextPropsType extends ReactComponents.TextProps {
    style?: StyleProp<TextStyle>;
    size?: number;
    color?: string;
    fontStyle?: FontStyleType;
    fontWeight?: FontWeightType;
    align?: TextStyle['textAlign'];
}

type FontStyleType = 'normal' | 'italic';

type FontWeightType =
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';

export const fontsConfig = {
    normal: {
        '100': 'Montserrat-Thin',
        '200': 'Montserrat-ExtraLight',
        '300': 'Montserrat-Light',
        '400': 'Montserrat-Regular',
        '500': 'Montserrat-Medium',
        '600': 'Montserrat-SemiBold',
        '700': 'Montserrat-Bold',
        '800': 'Montserrat-ExtraBold',
        '900': 'Montserrat-Black',
    },
    italic: {
        '100': 'Montserrat-ThinItalic',
        '200': 'Montserrat-ExtraLightItalic',
        '300': 'Montserrat-LightItalic',
        '400': 'Montserrat-Regular',
        '500': 'Montserrat-MediumItalic',
        '600': 'Montserrat-SemiBoldItalic',
        '700': 'Montserrat-BoldItalic',
        '800': 'Montserrat-ExtraBoldItalic',
        '900': 'Montserrat-BlackItalic',
    },
};

export const convertingFont = (
    fontStyle: FontStyleType,
    fontWeight: FontWeightType,
) => {
    return {
        fontFamily: fontsConfig[fontStyle][fontWeight],
    };
};

const Text: React.FC<TextPropsType> = ({
    children,
    style,
    fontStyle = 'normal',
    fontWeight = '400',
    size = 16,
    color = 'black',
    align = 'left',
    ...props
}) => {
    const styles = getStyles(size, color, align);
    return (
        <NativeText
            style={[styles.text, style, convertingFont(fontStyle, fontWeight)]}
            {...props}>
            {children}
        </NativeText>
    );
};

const getStyles = (
    size: number,
    color: string,
    align: TextStyle['textAlign'],
) =>
    StyleSheet.create({
        text: {
            color: color,
            fontSize: size,
            lineHeight: size + 6,
            textAlign: align,
        },
    });

export default Text;
