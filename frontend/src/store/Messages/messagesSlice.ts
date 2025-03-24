import {IMessageAPI} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchAllMessages, fetchMessagesByDate, submitNewMessage} from "./messagesThunks.ts";

interface messagesState {
    messages: IMessageAPI[];
    loading: boolean;
}

const initialState: messagesState = {
    messages: [],
    loading: false,
}

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllMessages.pending, state => {
                state.loading = true;
            })
            .addCase(fetchAllMessages.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.messages = payload;
            })
            .addCase(fetchAllMessages.rejected, state => {
                state.loading = false;
            })

            .addCase(fetchMessagesByDate.pending, state => {
                state.loading = true;
            })
            .addCase(fetchMessagesByDate.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.messages = payload;
            })
            .addCase(fetchMessagesByDate.rejected, state => {
                state.loading = false;
            })

            .addCase(submitNewMessage.pending, state => {
                state.loading = true;
            })
            .addCase(submitNewMessage.fulfilled, state => {
                state.loading = false;
            })
            .addCase(submitNewMessage.rejected, state => {
                state.loading = false;
            });
    }
});

export const messagesReducer = messagesSlice.reducer;