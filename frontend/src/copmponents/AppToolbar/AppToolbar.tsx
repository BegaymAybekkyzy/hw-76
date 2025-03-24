import {AppBar, Toolbar, Typography} from '@mui/material';


const AppToolbar = () => {
    return (
        <AppBar position="sticky" sx={{mb: 5}}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Chat
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;