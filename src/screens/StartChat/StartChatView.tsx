import React, { useMemo } from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useTheme } from '@react-navigation/native';
import { ThemeType } from '../../styles/theme';
import Text from '../../components/Text';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import Onboarding from './components/Onboarding';
import BackgroundPattern from '../../components/BackgroundPattern';

type StartChatViewPropsType = {
    isSearching: boolean;
    onStartSearch: () => void;
    emitAnotherUser: () => void;
};

const StartChatView: React.FC<StartChatViewPropsType> = props => {
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);

    return (
        <SafeAreaView style={styles.container}>
            <BackgroundPattern />
            <View style={styles.logoWrapper}>
                <Text
                    size={36}
                    fontWeight="900"
                    color={theme.colors.textOnPrimary}>
                    OneTalk
                </Text>
            </View>

            <Onboarding />

            <View style={styles.buttonWrapper}>
                <Button
                    onPress={() => props.onStartSearch()}
                    label="Start a search"
                    loading={props.isSearching}
                    containerStyle={styles.button}
                />
                <Button
                    onPress={props.emitAnotherUser}
                    label="Emit another user"
                    containerStyle={styles.button}
                />
            </View>
        </SafeAreaView>
    );
};

const getStyles = (theme: ThemeType) =>
    EStyleSheet.create({
        container: {
            backgroundColor: theme.colors.background,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 24,
        },
        logoWrapper: {
            backgroundColor: theme.colors.primary,
            padding: 16,
            borderRadius: 24,
            borderBottomRightRadius: 4,
        },
        buttonWrapper: {
            paddingTop: 32,
            paddingHorizontal: 24,
            width: '100%',
        },
        button: {
            paddingHorizontal: 24,
            marginBottom: 16,
        },
    });

export default StartChatView;
