export type ServerMessageType = {
    readonly createdAt: string;
    liked: boolean;
    message: string;
    senderId: string;
    readonly id: string;
};
export interface MessageType extends ServerMessageType {
    isPending?: boolean;
    error?: boolean;
}

export type ChatType = {
    createdAt: string;
    creatorId: string;
    interlocutorId: string | null;
    id: string;
};
