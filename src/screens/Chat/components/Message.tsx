import React, { useEffect, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useTheme } from '@react-navigation/native';
import { ThemeType } from '../../../styles/theme';
import Text from '../../../components/Text';
import addAlpha from '../../../utils/addAlpha';
import Icon from '../../../components/Icon';
import { ChatType, MessageType } from '../../../core/types/chat.types';
import AuthService from '../../../core/services/auth';
import moment from 'moment';
import ChatService from '../../../core/services/chat';

interface MessageProps extends MessageType {
    chatId: ChatType['id'];
    onUpdateMessage: (newData: MessageType) => void;
}

const Message: React.FC<MessageProps> = ({
    createdAt,
    liked,
    message,
    senderId,
    id,
    chatId,
    onUpdateMessage,
    isPending,
    error,
}) => {
    const theme = useTheme();

    const type = useMemo(
        () => (senderId === AuthService.getUid() ? 'out' : 'in'),
        [senderId],
    );

    const styles = useMemo(() => getStyles(theme, type), [theme, type]);

    useEffect(() => {
        const unsubscribeMessageSocket = ChatService.subscribeMessage(
            chatId,
            id,
            handleMessageSocket,
        );

        return () => {
            unsubscribeMessageSocket();
        };
    }, [chatId, id]);

    const handleMessageSocket = (updatedMessage: MessageType | null) => {
        if (updatedMessage) {
            onUpdateMessage(updatedMessage);
        }
    };

    const toggleLike = () => {
        ChatService.updateMessage(chatId, id, {
            liked: !liked,
        });
    };

    return (
        <View style={styles.messageWrapper}>
            <View style={styles.message}>
                <Text
                    size={16}
                    fontWeight="400"
                    style={styles.messageText}
                    color={
                        type === 'in'
                            ? theme.colors.text
                            : theme.colors.textOnPrimary
                    }>
                    {message}
                    </Text>

                    <View style={styles.timeWrapper}>
                        <Text
                            size={12}
                            fontWeight="400"
                            color={addAlpha(
                                type === 'in'
                                    ? theme.colors.text
                                    : theme.colors.textOnPrimary,
                                0.5,
                            )}>
                            {moment(createdAt).format('HH:mm')}
                        </Text>
                        {!error && (
                            <TouchableOpacity style={styles.errorButton}>
                                <Icon
                                    name="exclamation-circle"
                                    color={theme.colors.red}
                                    size={16}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
            </View>
            <TouchableOpacity
                hitSlop={15}
                onPress={toggleLike}
                disabled={isPending || type === 'out'}
                style={styles.heartButton}>
                <Icon
                    name={liked ? 'heart-filled' : 'heart'}
                    size={18}
                    color={
                        liked
                            ? theme.colors.red
                            : addAlpha(theme.colors.text, 0.2)
                    }
                />
            </TouchableOpacity>
        </View>
    );
};

const getStyles = (theme: ThemeType, type: 'out' | 'in') =>
    EStyleSheet.create({
        messageWrapper: {
            paddingHorizontal: 10,
            paddingVertical: 8,
            alignItems: 'flex-end',
            flexDirection: type === 'in' ? 'row' : 'row-reverse',
        },
        message: {
            maxWidth: '90%',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 16,
            // flexDirection: 'row',
            alignItems: type === 'in' ? 'flex-end' : 'flex-end',
            borderBottomLeftRadius: type === 'in' ? 0 : 16,
            borderBottomRightRadius: type === 'out' ? 0 : 16,
            backgroundColor:
                type === 'in' ? theme.colors.block : theme.colors.primary,
        },
        messageText: {
            // flexShrink: 1,
        },
        heartButton: {
            marginRight: type === 'in' ? 0 : 8,
            marginLeft: type === 'out' ? 0 : 8,
            marginBottom: 8,
        },
        timeWrapper: {
            flexDirection: 'row',
            // position: 'absolute',
            // bottom: 6,
            // right: 12,
        },
        errorButton: {
            marginLeft: 6,
        },
    });

export default React.memo(Message);
