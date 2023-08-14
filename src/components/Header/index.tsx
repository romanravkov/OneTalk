import React, { useMemo } from 'react';
import { View, SafeAreaView } from 'react-native';
import Text from '../Text';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useTheme } from '@react-navigation/native';
import { ThemeType } from '../../styles/theme';
import addAlpha from '../../utils/addAlpha';

export type HeaderProps = {
    left?: JSX.Element | null;
    center?: JSX.Element | null;
    right?: JSX.Element | null;
    title?: string | null;
    children?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({
    left = null,
    center = null,
    title = '',
    right = null,
    children,
}) => {
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.container]}>
                <View style={styles.leftSide}>{left}</View>
                <View style={styles.center}>
                    {center ? (
                        center
                    ) : (
                        <Text
                            size={16}
                            fontWeight="500"
                            color={theme.colors.text}>
                            {title}
                        </Text>
                    )}
                </View>
                <View style={styles.rightSide}>{right}</View>
            </View>
            {children ? (
                <View style={styles.childrenWrapper}>{children}</View>
            ) : null}
        </SafeAreaView>
    );
};

const getStyles = (theme: ThemeType) =>
    EStyleSheet.create({
        safeArea: {
            zIndex: 10,
            backgroundColor: addAlpha(theme.colors.block, 0.99),
            borderBottomWidth: 1,
            borderColor: theme.colors.border,
        },
        container: {
            height: 52,
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        leftSide: {
            flex: 1,
            height: '100%',
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        center: {
            flex: 3,
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
        },
        rightSide: {
            alignItems: 'flex-end',
            justifyContent: 'center',
            flex: 1,
            height: '100%',
        },
        childrenWrapper: {
            paddingBottom: 8,
            paddingHorizontal: 16,
        },
    });

export default Header;
