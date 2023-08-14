export type MessageType = {
    readonly createdAt: string;
    liked: boolean;
    message: string;
    senderId: string;
    readonly id: string;
};

export type ChatType = {
    createdAt: string;
    creatorId: string;
    interlocutorId: string | null;
    id: string;
};
