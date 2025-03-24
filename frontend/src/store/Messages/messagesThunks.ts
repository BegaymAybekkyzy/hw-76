import {createAsyncThunk} from "@reduxjs/toolkit";
import {IMessageAPI, IMessageForm} from "../../types";
import axiosAPI from "../../axiosAPI.ts";

export const fetchAllMessages = createAsyncThunk<IMessageAPI[], void>(
    "messages/fetchAllMessages",
    async () => {
        const response = await axiosAPI("messages");
        return response.data;
    }
);

export const fetchMessagesByDate = createAsyncThunk<IMessageAPI[], string>(
    "messages/fetchMessagesByDate",
    async (datetime) => {

        const response = await axiosAPI(`messages?datetime=${datetime}`);
        return response.data;
    }
);

export const submitNewMessage = createAsyncThunk<void, IMessageForm>(
    "messages/submitNewMessage",
    async (newMessage) => {
        await axiosAPI.post("messages", newMessage);
    }
);