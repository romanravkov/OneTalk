import React, { useMemo } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    View,
    FlatList,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useTheme } from '@react-navigation/native';
import { ThemeType } from '../../styles/theme';
import Input from '../../components/Input';
import Text from '../../components/Text';
import Icon from '../../components/Icon';
import { globalStyles } from '../../styles/globalStyles';
import Message from './components/Message';
import Header from '../../components/Header';
import { ChatType, MessageType } from '../../core/types/chat.types';
import BackgroundPattern from '../../components/BackgroundPattern';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import useKeyboard from '@rnhooks/keyboard';

type ChatViewPropsType = {
    data: MessageType[];
    chatData: ChatType;
    message: string;
    onChangeMessage: (value: string) => void;
    handleSendMessage: () => void;
    openPrivacyPolicy: () => void;
    openSettingsActions: () => void;
    openAttachmentActions: () => void;
};

const ChatView: React.FC<ChatViewPropsType> = props => {
    const theme = useTheme();
    const { bottom } = useSafeAreaInsets();
    const [keyboardShown] = useKeyboard({
        useWillShow: true,
        useWillHide: true,
    });
    const styles = useMemo(
        () => getStyles(theme, bottom, keyboardShown),
        [theme, bottom, keyboardShown],
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}>
            <Header
                title="OneTalk"
                center={
                    <Text size={18} fontWeight="600" color={theme.colors.text}>
                        OneTalk
                    </Text>
                }
                right={
                    <TouchableOpacity onPress={props.openSettingsActions}>
                        <Icon
                            name="settings"
                            size={22}
                            color={theme.colors.text}
                        />
                    </TouchableOpacity>
                }
                left={
                    <TouchableOpacity onPress={props.openPrivacyPolicy}>
                        <Icon
                            name="exclamation-circle"
                            size={22}
                            color={theme.colors.icon}
                        />
                    </TouchableOpacity>
                }
            />

            <View style={styles.chatWrapper}>
                <BackgroundPattern />
                <FlatList
                    data={props.data}
                    inverted
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContainer}
                    ListEmptyComponent={
                        <View style={styles.emptyWrapper}>
                            <Text
                                size={15}
                                color={theme.colors.gray2}
                                align="center">
                                No messages yet
                            </Text>
                        </View>
                    }
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Message {...item} chatId={props.chatData.id} />
                    )}
                />
            </View>
            <View style={styles.controllerWrapper}>
                <TouchableOpacity
                    style={styles.attachButton}
                    onPress={props.openAttachmentActions}>
                    <Icon
                        color={theme.colors.gray2}
                        name="attachment"
                        size={20}
                    />
                </TouchableOpacity>
                <Input
                    onChange={props.onChangeMessage}
                    value={props.message}
                    placeholder="Message"
                    containerStyle={globalStyles.flex1}
                />
                <TouchableOpacity
                    onPress={props.handleSendMessage}
                    style={styles.sendButton}>
                    <Icon
                        color={theme.colors.textOnPrimary}
                        name="send"
                        size={20}
                    />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const getStyles = (
    theme: ThemeType,
    bottom: EdgeInsets['bottom'],
    keyboardShown: boolean,
) =>
    EStyleSheet.create({
        container: {
            flex: 1,
        },

        chatWrapper: {
            flex: 1,
            width: '100%',
        },
        flatListContainer: {
            paddingTop: 8,
            paddingBottom: 150,
        },
        controllerWrapper: {
            paddingTop: 10,
            paddingBottom: keyboardShown ? 10 : 10 + bottom,
            paddingHorizontal: 10,
            backgroundColor: theme.colors.block,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        sendButton: {
            backgroundColor: theme.colors.primary,
            padding: 10,
            borderRadius: 8,
            marginLeft: 6,
        },
        attachButton: {
            backgroundColor: theme.colors.background2,
            padding: 10,
            borderRadius: 8,
            marginRight: 6,
        },
        emptyWrapper: {
            paddingHorizontal: 48,
            paddingVertical: 24,
        },
    });

export default ChatView;
