import {IMessageAPI} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchAllMessages, fetchMessagesByDate, submitNewMessage} from "./messagesThunks.ts";
import {RootState} from "../../app/store.ts";

interface messagesState {
    messages: IMessageAPI[];
    messagesByDate: IMessageAPI[];
    sendingLoading: boolean;
    fetchingLoading: boolean;
}

const initialState: messagesState = {
    messages: [],
    messagesByDate: [],
    sendingLoading: false,
    fetchingLoading: false,
};

export const selectMessages = (state: RootState) => state.messages.messages;
export const selectMessagesByDate = (state: RootState) => state.messages.messagesByDate;
export const selectSendingLoading = (state: RootState) => state.messages.sendingLoading;
export const selectFetchingLoading = (state: RootState) => state.messages.fetchingLoading;

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllMessages.pending, state => {
                state.fetchingLoading = true;
            })
            .addCase(fetchAllMessages.fulfilled, (state, {payload}) => {
                state.fetchingLoading = false;
                state.messages = payload;
            })
            .addCase(fetchAllMessages.rejected, state => {
                state.fetchingLoading = false;
            })


            .addCase(fetchMessagesByDate.fulfilled, (state, {payload}) => {
                state.messagesByDate = payload;
            })

            .addCase(submitNewMessage.pending, state => {
                state.sendingLoading = true;
            })
            .addCase(submitNewMessage.fulfilled, state => {
                state.sendingLoading = false;
            })
            .addCase(submitNewMessage.rejected, state => {
                state.sendingLoading = false;
            });
    }
});

export const messagesReducer = messagesSlice.reducer;