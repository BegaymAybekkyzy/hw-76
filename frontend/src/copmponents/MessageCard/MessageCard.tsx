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
    return (
        <Card sx={{ minWidth: 275, border: '1px solid #7B68EE', mb: "20px" }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {message.author}
                </Typography>
                <Typography sx={{mb: 1.5 }}> {message.message}</Typography>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    {dayjs(message.datetime).format('DD.MM.YYYY HH:mm') }
                </Typography>
            </CardContent>
        </Card>
    );
};

export default MessageCard;