import React, {useState} from 'react';
import {IMessageForm} from "../../types";
import Grid from '@mui/material/Grid2';
import {Button, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectSendingLoading} from "../../store/Messages/messagesSlice.ts";
import {submitNewMessage} from "../../store/Messages/messagesThunks.ts";

const initialForm: IMessageForm = {
    author: "",
    message: "",
}
const MessageForm = () => {
    const [form, setForm] = useState<IMessageForm>(initialForm);

    const loading = useAppSelector(selectSendingLoading);
    const dispatch = useAppDispatch();

    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.author.trim().length === 0 || form.message.trim().length === 0) {
            alert("Please fill in the fields");
            return;
        }
        await dispatch(submitNewMessage(form));
    };

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const{name, value} = e.target;
        setForm({...form, [name]: value});
    };

    return (
        <form onSubmit={onSubmitForm}>
            <Grid container direction="column">
                <Grid>
                    <TextField
                        label="Enter your name"
                        fullWidth
                        onChange={onChangeInput}
                        name="author"
                        required
                        disabled={loading}
                        value={form.author}
                        variant="outlined"
                        sx={{marginBottom: 2}}
                    />
                </Grid>

                <Grid>
                    <Grid>
                        <TextField
                            fullWidth
                            label="Enter a message"
                            onChange={onChangeInput}
                            value={form.message}
                            required
                            disabled={loading}
                            name="message"
                            variant="outlined"
                            sx={{marginBottom: 2}}
                        />
                    </Grid>
                </Grid>

                <Grid>
                    <Button
                        variant="contained"
                        disabled={loading}
                        type="submit"
                        color="primary"
                    >Send</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default MessageForm;