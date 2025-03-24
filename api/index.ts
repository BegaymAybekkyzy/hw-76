import express from "express";
import cors from "cors";
import fileDb from "./fileDb";
import messagesRouter from "./routers/messages";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use("/messages", messagesRouter)

const run = async () => {
    await fileDb.init()
    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
}

run().catch(console.error);