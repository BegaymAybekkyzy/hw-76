import MessageForm from "./copmponents/MessageForm/MessageForm.tsx";
import Layout from "./copmponents/Layout/Layout.tsx";
import {Box} from "@mui/material";
import {useAppDispatch, useAppSelector} from "./app/hooks.ts";
import {
    selectFetchingLoading,
    selectMessages,
    selectMessagesByDate
} from "./store/Messages/messagesSlice.ts";
import Loader from "./copmponents/UI/Loader/Loader.tsx";
import {useEffect, useState} from "react";
import {fetchAllMessages, fetchMessagesByDate} from "./store/Messages/messagesThunks.ts";
import {IMessageAPI} from "./types";
import MessageCard from "./copmponents/MessageCard/MessageCard.tsx";

const App = () => {
    const [messages, setMessages] = useState<IMessageAPI[]>([]);
    const [lastMessageDate, setLastMessageDate] = useState<string | null>();
    const dispatch = useAppDispatch();

    const allMessages = useAppSelector(selectMessages);
    const lastMessagesByDate = useAppSelector(selectMessagesByDate);
    const loading = useAppSelector(selectFetchingLoading);

    useEffect(() => {
        dispatch(fetchAllMessages());
    }, [dispatch]);

    useEffect(() => {
        if (allMessages.length > 0) {
            setMessages(allMessages);
            setLastMessageDate(allMessages[0].datetime);
        }
    }, [allMessages]);

    useEffect(() => {
        if (!lastMessageDate) return;

        const interval = setInterval(() => {
            dispatch(fetchMessagesByDate(lastMessageDate));
        }, 3000);

        return () => clearInterval(interval);
    }, [lastMessageDate, dispatch]);

    useEffect(() => {
        if (lastMessagesByDate.length > 0) {
            setMessages((prevState) => [...lastMessagesByDate, ...prevState,]);
            setLastMessageDate(lastMessagesByDate[0].datetime);
        }
    }, [lastMessagesByDate]);

    return (
        <Layout>
            <Box sx={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
                <Box sx={{flex: 1}}>
                    {loading
                        ? <Box sx={{height: "80vh", display: "flex", alignItems: "center", justifyContent: "center"}}><Loader /></Box>
                        : messages.map((message) => (
                        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <MessageCard key={message.id} message={message} />
                        </Box>
                    ))}
                </Box>

                <Box sx={{
                    position: "sticky", bottom: 0, width: "110%", background: "white", zIndex: 1000
                }}>
                    <hr/>
                    <Box sx={{width: "70%", ml: "auto", mr: "auto"}}>
                        <MessageForm/>
                    </Box>
                </Box>
            </Box>
        </Layout>
    )
};

export default App
