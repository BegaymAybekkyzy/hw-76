export interface IMessageRequest {
    message: string;
    author: string;
}

export interface Imessage extends IMessageRequest {
    id: string;
    datetime: string;
}
