import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from './routers/router';
import { Provider } from "react-redux";
import './Global.css';
import './utils/TraducoesYup'




import Light from "./themes/Ligth";
import store from "./store/reducers/store";
import { Loading, Notify, Alert, ProgressBar } from "./components";
import { useEffect, useState } from "react";



function App() {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (

    <Provider store={store}>
      {isLoading ? (
        <ProgressBar />
      ) : (
        <ThemeProvider theme={Light}>

        
          <Loading />
          <Notify />
          <Alert />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ThemeProvider>
      )}
    </Provider>

  )
}
export default App;