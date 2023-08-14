import firestore from '@react-native-firebase/firestore';
import AuthService from './auth';
import { ChatType, MessageType } from '../types/chat.types';

class _ChatService {
    collection;
    constructor() {
        this.collection = firestore().collection('chats');
    }

    async createNewChat(uid: string) {
        const docRef = await this.collection.add({
            creatorId: uid,
            interlocutorId: null,
            createdAt: new Date().toISOString(),
        });
        const docSnapshot = await docRef.get();
        const data = docSnapshot.data() as ChatType;

        return {
            ...data,
            id: docSnapshot.id,
        };
    }

    async findExistingFreeChat() {
        const docsSnapshots = await this.collection
            .where('interlocutorId', '==', null)
            .limit(1)
            .get();

        if (docsSnapshots.empty) {
            return null;
        }
        const chatSnapshot = docsSnapshots.docs[0];
        const data = chatSnapshot.data() as ChatType;

        return {
            ...data,
            id: chatSnapshot.id,
        };
    }

    async takeExistingChat(chatId: ChatType['id'], uid: string) {
        await this.collection.doc(chatId).update({
            interlocutorId: uid,
        });

        return 'OK';
    }

    async finishChat(chatId: ChatType['id']) {
        await this.collection.doc(chatId).delete();

        return 'OK';
    }

    async sendMessage(chatId: ChatType['id'], message: MessageType['message']) {
        const docRef = await this.collection
            .doc(chatId)
            .collection('messages')
            .add({
                message,
                senderId: AuthService.getUid(),
                createdAt: new Date().toISOString(),
                liked: false,
            });
        const docSnapshot = await docRef.get();
        const data = docSnapshot.data();

        return {
            ...data,
            id: docRef.id,
        };
    }

    async updateMessage(
        chatId: ChatType['id'],
        messageId: MessageType['id'],
        updateData: Partial<MessageType>,
    ) {
        const docRef = this.collection
            .doc(chatId)
            .collection('messages')
            .doc(messageId);

        await docRef.update(updateData);

        const docSnapshot = await docRef.get();
        const data = docSnapshot.data();

        return {
            ...data,
            id: docRef.id,
        };
    }

    subscribeMessages(
        chatId: ChatType['id'],
        cb: (data: MessageType) => void,
        errorCb: () => void,
    ) {
        return this.collection
            .doc(chatId)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot(documentsSnapshots => {
                if (documentsSnapshots.empty) {
                    return;
                }
                const document = documentsSnapshots.docs[0];
                const data = document.data() as MessageType;

                if (data) {
                    cb({ ...data, id: document.id });
                } else {
                    errorCb();
                }
            });
    }

    subscribeMessage(
        chatId: ChatType['id'],
        messageId: MessageType['id'],
        cb: (data: MessageType | null) => void,
    ) {
        return this.collection
            .doc(chatId)
            .collection('messages')
            .doc(messageId)
            .onSnapshot(docSnapshot => {
                const data = docSnapshot.data() as MessageType;

                if (data) {
                    cb({ ...data, id: docSnapshot.id });
                } else {
                    cb(null);
                }
            });
    }

    subscribeChat(chatId: ChatType['id'], cb: (data: ChatType | null) => void) {
        return this.collection.doc(chatId).onSnapshot(docSnapshot => {
            const data = docSnapshot.data() as ChatType;
            if (data) {
                cb({ ...data, id: docSnapshot.id });
            } else {
                cb(null);
            }
        });
    }
}

const ChatService = new _ChatService();

export default ChatService;
