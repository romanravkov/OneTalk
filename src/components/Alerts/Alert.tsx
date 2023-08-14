import React, { useEffect, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../styles/colors';
import { IAlert, deleteAlert } from '../../store/reducers/alerts-reducer';
import Icon, { IconNameType } from '../Icon';
import Text from '../Text';
import { useTheme } from '@react-navigation/native';
import { ThemeType } from '../../styles/theme';
import addAlpha from '../../utils/addAlpha';

interface AlertPropsType extends IAlert {
    last: boolean;
}

const Alert = ({
    child,
    text = '',
    type,
    id,
    last,
    duration = 5000,
}: AlertPropsType) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme, last), [last, theme]);
    console.log('duration', duration);
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(deleteAlert({ id }));
        }, duration);
        return () => clearTimeout(timer);
    }, []);

    const handlePress = () => {
        dispatch(deleteAlert({ id }));
    };

    const typeConfig = {
        error: {
            color: theme.colors.red,
            iconName: 'alert-error',
        },
        warning: {
            color: theme.colors.yellow,
            iconName: 'alert-warning',
        },
        success: {
            color: theme.colors.green,
            iconName: 'alert-success',
        },
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.container}>
            <View
                style={[
                    styles.leftLine,
                    { backgroundColor: typeConfig[type].color },
                ]}
            />
            <View style={styles.icon}>
                <Icon
                    name={typeConfig[type].iconName as IconNameType}
                    size={28}
                    color={typeConfig[type].color}
                />
            </View>
            {child ? (
                child
            ) : text ? (
                <Text
                    color={colors.white}
                    style={styles.textWrapFix}
                    fontWeight="500"
                    size={16}>
                    {text}
                </Text>
            ) : null}
        </TouchableOpacity>
    );
};

const getStyles = (theme: ThemeType, last: boolean) =>
    EStyleSheet.create({
        icon: {
            marginRight: 16,
        },
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: addAlpha(theme.colors.primaryBlack, 0.95),
            paddingVertical: 16,
            paddingHorizontal: 16,
            overflow: 'hidden',
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            marginBottom: last ? 0 : 8,
            width: '100%',
        },
        leftLine: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 4,
        },
        textWrapFix: {
            flex: 1,
            flexWrap: 'wrap',
        },
    });

export default Alert;
