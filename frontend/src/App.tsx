import MessageForm from "./copmponents/MessageForm/MessageForm.tsx";
import Layout from "./copmponents/Layout/Layout.tsx";
import {Box} from "@mui/material";

const App = () => {


  return (
    <Layout>


        <Box sx={{position: "fixed", right: "auto", left: "auto", top: "70vh", width: "98vw"}}>
            <hr/>
            <Box sx={{width: "70%", ml: "auto", mr: "auto"}}>
                <MessageForm/>
            </Box>
        </Box>
    </Layout>
  )
};

export default App
