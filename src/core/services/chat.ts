import firestore from '@react-native-firebase/firestore';
import AuthService from './auth';
import { ChatType, ServerMessageType } from '../types/chat.types';

const delay = (delayInms: number) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};

class _ChatService {
    collection;
    constructor() {
        this.collection = firestore().collection('chats');
    }

    /**
     * Create a new chat.
     *
     * @param {string} uid - The user ID of the chat creator.
     * @returns {Promise<ChatType>} A promise that resolves to the newly created chat data.
     */
    async createNewChat(uid: string): Promise<ChatType> {
        const docRef = this.collection.doc();
        /**
         * The data of the chat to be created.
         * @type {ChatType}
         */
        const data: ChatType = {
            id: docRef.id,
            creatorId: uid,
            interlocutorId: null,
            createdAt: new Date().toISOString(),
        };
        await docRef.set(data);

        return data;
    }

    /**
     * Find an existing free chat that has no interlocutor assigned.
     *
     * @returns {Promise<ChatType | null>} A promise that resolves to the found chat or null if not found.
     */
    async findExistingFreeChat(): Promise<ChatType | null> {
        const docsSnapshots = await this.collection
            .where('interlocutorId', '==', null)
            .limit(1)
            .get();

        if (docsSnapshots.empty) {
            return null;
        }
        const chatSnapshot = docsSnapshots.docs[0];
        const data = chatSnapshot.data() as ChatType;

        return data;
    }

    /**
     * Assign an existing chat to a user by updating the interlocutor ID.
     *
     * @param {string} chatId - The ID of the chat to be assigned.
     * @param {string} uid - The user ID to assign as the interlocutor.
     * @returns {Promise<void>} A promise that resolves once the chat is successfully assigned.
     */
    async takeExistingChat(chatId: ChatType['id'], uid: string): Promise<void> {
        await this.collection.doc(chatId).update({
            interlocutorId: uid,
        });
    }

    /**
     * Finish a chat by deleting it.
     *
     * @param {string} chatId - The ID of the chat to be finished.
     * @returns {Promise<void>} A promise that resolves once the chat is successfully finished.
     */
    async finishChat(chatId: ChatType['id']): Promise<void> {
        await this.collection.doc(chatId).delete();
    }

    /**
     * Sends a message to a chat.
     *
     * @param {string} chatId - The ID of the chat where the message will be sent.
     * @param {string} message - The message content.
     * @param {Function} getPredictedData - Optional. A callback function to handle predicted data.
     * @returns {Promise<ServerMessageType>} A promise that resolves to the sent message data.
     */
    async sendMessage(
        chatId: ChatType['id'],
        message: ServerMessageType['message'],
        getPredictedData?: (docData: ServerMessageType) => void,
    ): Promise<ServerMessageType> {
        const docRef = this.collection.doc(chatId).collection('messages').doc();

        /**
         * The data of the message to be sent.
         * @type {ServerMessageType}
         */
        const docData: ServerMessageType = {
            message,
            senderId: AuthService.getUid(),
            createdAt: new Date().toISOString(),
            liked: false,
            id: docRef.id,
        };

        if (getPredictedData) {
            getPredictedData(docData);
        }
        await delay(5000);

        await docRef.set(docData);

        return docData;
    }

    /**
     * Update a message in a chat.
     *
     * @param {string} chatId - The ID of the chat containing the message.
     * @param {string} messageId - The ID of the message to be updated.
     * @param {Partial<MessageType>} newData - The partial data to update the message with.
     * @returns {Promise<MessageType>} A promise that resolves to the updated message data or undefined if not found.
     */
    async updateMessage(
        chatId: ChatType['id'],
        messageId: ServerMessageType['id'],
        newData: Partial<ServerMessageType>,
    ): Promise<ServerMessageType> {
        const docRef = this.collection
            .doc(chatId)
            .collection('messages')
            .doc(messageId);

        await docRef.update(newData);

        const docSnapshot = await docRef.get();
        const data = docSnapshot.data() as ServerMessageType;

        return data;
    }

    /**
     * Subscribe to new messages in a chat.
     *
     * @param {string} chatId - The ID of the chat to subscribe to.
     * @param {(data: MessageType) => void} handleNewMessage - Callback function to handle new messages.
     * @param {() => void} handleError - Callback function to handle errors.
     * @returns {() => void} A function to unsubscribe from the message subscription.
     */
    subscribeMessages(
        chatId: ChatType['id'],
        handleNewMessage: (data: ServerMessageType) => void,
        handleError: () => void,
    ): () => void {
        return this.collection
            .doc(chatId)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .limit(1)
            .onSnapshot(documentsSnapshots => {
                if (documentsSnapshots.empty) {
                    return;
                }
                const document = documentsSnapshots.docs[0];
                const data = document.data() as ServerMessageType;

                if (data) {
                    if (data.senderId !== AuthService.getUid()) {
                        handleNewMessage(data);
                    }
                } else {
                    handleError();
                }
            });
    }

    /**
     * Subscribe to updates for a specific message in a chat.
     *
     * @param {string} chatId - The ID of the chat containing the message.
     * @param {string} messageId - The ID of the message to subscribe to.
     * @param {(data: ServerMessageType | null) => void} handleMessageUpdate - Callback function to handle message updates.
     * @returns {() => void} A function to unsubscribe from the message subscription.
     */
    subscribeMessage(
        chatId: ChatType['id'],
        messageId: ServerMessageType['id'],
        handleMessageUpdate: (data: ServerMessageType | null) => void,
    ): () => void {
        return this.collection
            .doc(chatId)
            .collection('messages')
            .doc(messageId)
            .onSnapshot(docSnapshot => {
                const data = docSnapshot.data() as ServerMessageType;

                // If data is null, it indicates that the message was deleted
                // Otherwise, the callback receives the updated message data
                if (data) {
                    handleMessageUpdate(data);
                } else {
                    handleMessageUpdate(null);
                }
            });
    }

    /**
     * Subscribe to updates for a specific chat.
     *
     * @param {string} chatId - The ID of the chat to subscribe to.
     * @param {(data: ChatType | null) => void} handleChatUpdate - Callback function to handle chat updates.
     * @returns {() => void} A function to unsubscribe from the chat subscription.
     */
    subscribeChat(
        chatId: ChatType['id'],
        handleChatUpdate: (data: ChatType | null) => void,
    ): () => void {
        return this.collection.doc(chatId).onSnapshot(docSnapshot => {
            const data = docSnapshot.data() as ChatType;

            // If data is null, it indicates that the chat was ended by the interlocutor
            // Otherwise, the callback receives the updated chat data
            if (data) {
                handleChatUpdate(data);
            } else {
                handleChatUpdate(null);
            }
        });
    }
}

const ChatService = new _ChatService();

export default ChatService;
