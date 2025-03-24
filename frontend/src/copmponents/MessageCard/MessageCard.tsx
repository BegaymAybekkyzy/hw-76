import React from 'react';
import {Typography} from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {IMessageAPI} from "../../types";
import dayjs from "dayjs";

interface Props {
    message: IMessageAPI;
}

const MessageCard: React.FC<Props> = ({message}) => {
    const messageDate = dayjs(message.datetime);
    const now = dayjs();

    const nowDay = now.date();
    const nowMonth = now.month();
    const nowYear = now.year();

    const messageDay = messageDate.date();
    const messageMonth = messageDate.month();
    const messageYear = messageDate.year();

    let date: string = '';

    if (nowYear === messageYear && nowMonth === messageMonth && nowDay === messageDay) {
        date = messageDate.format('HH:mm');
    } else if (nowYear === messageYear && nowMonth === messageMonth && nowDay - 1 === messageDay) {
        date = 'Yesterday';
    } else {
        if (nowYear !== messageYear) {
            date = messageDate.format('DD.MM.YYYY');
        } else {
            date = messageDate.format('DD.MM');
        }
    }

    return (
        <Card sx={{minWidth: 275, border: '1px solid #7B68EE', mb: "20px"}}>
            <CardContent>
                <Typography component="div" sx={{mb: "20", fontSize: "19px"}}>
                    <span style={{fontWeight: "semibold", marginRight: "10px"}}>
                        {message.author}:
                    </span>
                    {message.message}
                </Typography>

                <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
                    {date}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default MessageCard;