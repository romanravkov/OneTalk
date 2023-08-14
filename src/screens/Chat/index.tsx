import React, { useEffect, useState } from 'react';
import ChatView from './ChatView';
import { Alert, LayoutAnimation } from 'react-native';
import ChatService from '../../core/services/chat';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootStack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChatType, MessageType } from '../../core/types/chat.types';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../store/reducers/alerts-reducer';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

type NavigationProps = NativeStackScreenProps<RootStackParamList, 'Chat'>;

// @refresh reset
const Chat = ({}) => {
    const navigation = useNavigation<NavigationProps['navigation']>();
    const { params } = useRoute<NavigationProps['route']>();

    const dispatch = useDispatch();
    const { showActionSheetWithOptions } = useActionSheet();
    const [message, setMessage] = useState<string>('');
    const [chatData, setChatData] = useState<ChatType | null>(null);
    const [data, setData] = useState<MessageType[]>([]);

    useEffect(() => {
        const unsubscribeMessagesSocket = ChatService.subscribeMessages(
            params.chatId,
            handleMessagesSocket,
            console.log,
        );
        const unsubscribeChatSocket = ChatService.subscribeChat(
            params.chatId,
            handleChatSocket,
        );

        return () => {
            unsubscribeMessagesSocket();
            unsubscribeChatSocket();
        };
    }, []);

    const finishChat = () => {
        ChatService.finishChat(params.chatId);
        navigation.replace('StartChat');
        dispatch(
            addAlert({
                type: 'success',
                text: 'Your chat session has been closed.\nWe hope you had a great conversation! 😊',
            }),
        );
    };

    const openSettingsActions = () => {
        const options = ['Finish chat', 'Report a problem', 'Cancel'];
        const destructiveButtonIndex = 0;
        const reportIndex = 1;
        const cancelButtonIndex = 2;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
                destructiveButtonIndex,
            },
            selectedIndex => {
                switch (selectedIndex) {
                    case destructiveButtonIndex:
                        Alert.alert(
                            'Leave the chat?',
                            'Are you sure you want to leave the chat?',
                            [
                                {
                                    text: 'Confirm',
                                    onPress: finishChat,
                                    style: 'destructive',
                                },
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                },
                            ],
                            {
                                cancelable: true,
                            },
                        );
                        break;

                    case reportIndex:
                        dispatch(
                            addAlert({
                                type: 'warning',
                                duration: 10000,
                                text: 'Reporting service is pending implementation 😔',
                            }),
                        );
                        break;
                    case cancelButtonIndex:
                    // Canceled
                }
            },
        );
    };

    const openPrivacyPolicy = () => {
        navigation.navigate('PrivacyPolicy');
    };

    const openAttachmentActions = () => {
        const options = ['Open image library', 'Launch a camera', 'Cancel'];
        const openLibraryIndex = 0;
        const launchCameraIndex = 1;
        const cancelButtonIndex = 2;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            selectedIndex => {
                switch (selectedIndex) {
                    case openLibraryIndex:
                        launchImageLibrary(
                            {
                                selectionLimit: 0,
                                mediaType: 'photo',
                                includeBase64: false,
                            },
                            console.log,
                        );
                        break;
                    case launchCameraIndex:
                        launchCamera(
                            {
                                saveToPhotos: true,
                                mediaType: 'photo',
                                includeBase64: false,
                            },
                            console.log,
                        );
                        break;
                    case cancelButtonIndex:
                }
            },
        );
    };

    const onChangeMessage = (value: string) => {
        setMessage(value);
    };

    const handleSendMessage = async () => {
        if (!message) {
            return;
        }
        try {
            await ChatService.sendMessage(params.chatId, message);
            setMessage('');
        } catch (err) {
            console.log('[handleSendMessage ERROR]', err);
            dispatch(
                addAlert({
                    type: 'error',
                    text: "Oops! Something went wrong on our end. We're working to fix it.",
                }),
            );
        }
    };

    const handleMessagesSocket = (newMessage: MessageType) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setData(old =>
            old.every(el => el.id !== newMessage.id)
                ? [newMessage, ...old]
                : old,
        );
    };

    const handleChatSocket = (updatedChat: ChatType | null) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (updatedChat) {
            setChatData(updatedChat);
        } else {
            navigation.replace('StartChat');
            dispatch(
                addAlert({
                    type: 'warning',
                    text: "Your chat partner has ended the conversation. 👋\nFeel free to start a new chat whenever you're ready.",
                }),
            );
        }
    };
    if (!chatData) {
        return null;
    }
    return (
        <ChatView
            data={data}
            chatData={chatData}
            message={message}
            onChangeMessage={onChangeMessage}
            handleSendMessage={handleSendMessage}
            openPrivacyPolicy={openPrivacyPolicy}
            openSettingsActions={openSettingsActions}
            openAttachmentActions={openAttachmentActions}
        />
    );
};

export default Chat;
