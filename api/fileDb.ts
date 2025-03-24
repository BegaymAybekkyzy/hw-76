import {Imessage, IMessageRequest} from "./types";
import crypto from "node:crypto";
import {promises as fs} from "fs";
import {existsSync} from "node:fs";

const fileName = "./messages.json";
let data: Imessage[] = [];

const fileDb = {
    async init() {
        try {
            if (!existsSync(fileName)) {
                await fs.writeFile(fileName, JSON.stringify([]));
            } else {
                const fileContent = await fs.readFile(fileName);
                data = JSON.parse(fileContent.toString()) as Imessage[];
            }
        } catch (e) {
            data = [];
            console.error(e);
        }
    },

    async getLastThirtyMessages() {
        const lastMessages = data.sort().slice(-30);
        return lastMessages.reverse();
    },

    async getMessagesByDate(datetime: string) {
        const messages = data.filter(message => new Date(message.datetime) > new Date(datetime));
        return messages.reverse();
    },

    async addNewMessage(message: IMessageRequest) {
        const newMessage: Imessage = {
            id: crypto.randomUUID(),
            datetime: new Date().toISOString(),
            ...message
        };
        data.push(newMessage);
        await this.save();
        return newMessage;
    },

    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;