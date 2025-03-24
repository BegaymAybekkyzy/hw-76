import express from "express";
import {IMessageRequest} from "../types";
import fileDb from "../fileDb";

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
    const queryDate = req.query.datetime as string;

    if (!queryDate) {
        const lastMessages = await fileDb.getLastThirtyMessages();
        res.send(lastMessages);
        return;
    }

    const date = new Date(queryDate);

    if (isNaN(date.getDate())) {
        res.status(400).send({
            error: 'Invalid date',
        })
        return;
    }

    const messagesByDate = await fileDb.getMessagesByDate(queryDate);
    res.send(messagesByDate);
});

messagesRouter.post('/', async (req, res) => {
    if (!req.body.message || !req.body.author) {
        res.status(400).send({
            error: "Author and message must be present in the request"
        });
        return;
    }

    if (req.body.message.trim().length === 0 || req.body.author.trim().length === 0) {
        res.status(400).send({
            error: "Author and message should not be blank"
        });
        return;
    }

    const newMessage: IMessageRequest = {
        message: req.body.message,
        author: req.body.author
    };

    const message = await fileDb.addNewMessage(newMessage);
    res.send(message);
});

export default messagesRouter;