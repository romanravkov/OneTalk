import { useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  StyleProp,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ThemeType } from '../../styles/theme';
import Icon from '../Icon';
import { convertingFont } from '../Text';

type InputPropsType = {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
  inputProps?: TextInputProps;
  secureText?: boolean;
};

const Input: React.FC<InputPropsType> = ({
  placeholder = '',
  value = '',
  onChange = () => {},
  containerStyle = {},
  rightIcon,
  leftIcon,
  secureText,
  inputProps = {},
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [showSecureText, setShowSecureText] = useState(secureText);
  const ref = useRef<TextInput | null>(null);

  const onChangeSecureTextVisible = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowSecureText(old => !old);
  };

  useEffect(() => {
    if (secureText && Platform.OS === 'android') {
      ref?.current?.setNativeProps({
        // For correctly showing font on Android when 'secureTextEntry = true' ** https://github.com/facebook/react-native/issues/30123 **
        style: {
          ...convertingFont('normal', '400'),
        },
      });
    }
  }, [secureText]);

  return (
    <View style={[styles.container, containerStyle]}>
      {leftIcon ? <View style={styles.iconLeftWrapper}>{leftIcon}</View> : null}
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor={theme.colors.gray2}
        onChangeText={onChange}
        value={value}
        secureTextEntry={showSecureText}
        ref={ref}
        {...inputProps}
      />
      {rightIcon ? (
        <View style={styles.iconRightWrapper}>{rightIcon}</View>
      ) : null}
      {secureText ? (
        <TouchableOpacity
          onPress={onChangeSecureTextVisible}
          style={styles.iconRightWrapper}>
          {showSecureText ? (
            <Icon name="eye" size={18} color={theme.colors.gray2} />
          ) : (
            <Icon name="eye-closed" size={18} color={theme.colors.gray2} />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const getStyles = (theme: ThemeType) =>
  EStyleSheet.create({
    container: {
      backgroundColor: theme.colors.background2,
      borderRadius: 16,
      alignItems: 'flex-start',
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    input: {
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: 16,
      flex: 1,
      color: theme.colors.text,
      ...convertingFont('normal', '400'),
    },
    iconLeftWrapper: {
      marginRight: 8,
    },
    iconRightWrapper: {
      marginLeft: 8,
    },
  });

export default Input;
