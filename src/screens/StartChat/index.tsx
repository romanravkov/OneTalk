import React, { useEffect, useState } from 'react';
import StartChatView from './StartChatView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootStack';
import { useNavigation } from '@react-navigation/native';
import ChatService from '../../core/services/chat';
import AuthService from '../../core/services/auth';
import { ChatType } from '../../core/types/chat.types';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../store/reducers/alerts-reducer';

type NavigationProps = NativeStackScreenProps<RootStackParamList>;

let unsubscribe: null | Function = null;

const StartChat = () => {
    const navigation = useNavigation<NavigationProps['navigation']>();
    const dispatch = useDispatch();

    const [isSearching, setIsSearching] = useState<boolean>(false);

    useEffect(() => {
        authUser();
    }, []);

    const authUser = async () => {
        const uid = AuthService.getUid();
        if (uid) {
            return;
        }
        try {
            await AuthService.signInAnonymously();
        } catch {
            authUser();
        }
    };

    const handleInterlocutorFounded = (chatData: ChatType | null) => {
        if (chatData?.interlocutorId) {
            unsubscribe && unsubscribe();
            navigation.replace('Chat', { chatId: chatData.id });
            setIsSearching(false);
        }
    };

    const onStartSearch = async (emited: boolean = false) => {
        setIsSearching(true);

        // Emit flow to test
        const uid = emited ? '123' : AuthService.getUid();

        if (!uid) {
            setIsSearching(false);
            return;
        }
        try {
            const chatData = await ChatService.findExistingFreeChat();
            if (chatData) {
                await ChatService.takeExistingChat(chatData.id, uid);
                handleInterlocutorFounded(chatData);
            } else {
                const createdChatData = await ChatService.createNewChat(uid);
                unsubscribe = ChatService.subscribeChat(
                    createdChatData.id,
                    handleInterlocutorFounded,
                );
            }
        } catch (err) {
            console.log(err);
            dispatch(
                addAlert({
                    type: 'error',
                    text: '[onStartSearch] Something went wrong',
                }),
            );
        }
    };

    const emitAnotherUser = () => {
        onStartSearch(true);
    };

    return (
        <StartChatView
            emitAnotherUser={emitAnotherUser}
            isSearching={isSearching}
            onStartSearch={onStartSearch}
        />
    );
};

export default StartChat;
