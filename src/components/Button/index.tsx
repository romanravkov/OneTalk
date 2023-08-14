import React from 'react';
import {
    ActivityIndicator,
    StyleProp,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useTheme } from '@react-navigation/native';
import { ThemeType } from '../../styles/theme';
import Text from '../Text';

type ButtonPropsType = {
    label?: string;
    onPress: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    loading?: boolean;
    disabled?: boolean;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
};

const Button: React.FC<ButtonPropsType> = ({
    label = '',
    onPress = () => {},
    containerStyle = {},
    loading = false,
    disabled = false,
    leftIcon,
    rightIcon,
}) => {
    const theme = useTheme();
    const styles = getStyles(theme, disabled, loading);

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            disabled={loading || disabled}
            style={[styles.container, containerStyle]}>
            {leftIcon ? (
                <View style={styles.iconWrapper}>{leftIcon}</View>
            ) : null}
            <View style={styles.labelWrapper}>
                <Text
                    size={16}
                    fontWeight="600"
                    color={theme.colors.textOnPrimary}>
                    {label}
                </Text>
            </View>
            {rightIcon ? (
                <View style={styles.iconWrapper}>{rightIcon}</View>
            ) : null}

            {loading ? (
                <View style={styles.loadingWrapper}>
                    <ActivityIndicator color={theme.colors.textOnPrimary} />
                </View>
            ) : null}
        </TouchableOpacity>
    );
};

const getStyles = (theme: ThemeType, disabled: boolean, loading: boolean) =>
    EStyleSheet.create({
        container: {
            backgroundColor: disabled
                ? theme.colors.disabled
                : theme.colors.primary,
            paddingVertical: 16,
            borderRadius: 12,
            flexDirection: 'row',
            justifyContent: 'center',
        },
        loadingWrapper: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
        },
        labelWrapper: {
            opacity: loading ? 0 : 1,
            paddingHorizontal: 8,
        },
        iconWrapper: {
            justifyContent: 'center',
        },
    });

export default Button;
