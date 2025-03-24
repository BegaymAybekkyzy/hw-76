export interface IMessageForm {
    message: string;
    author: string;
}

export interface IMessageAPI extends IMessageForm {
    id: string;
    datetime: string;
}