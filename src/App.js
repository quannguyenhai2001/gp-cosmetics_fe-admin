import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import 'react-quill/dist/quill.snow.css';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { RouterWrapper } from "routes/RouterWrapper";
import './App.css';
import { themeMainOptions } from "themes/themes";
import { fetchAsyncGetUser } from "redux/slices/UserSlice";


const theme = createTheme(themeMainOptions);
function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      dispatch(fetchAsyncGetUser())
    }
  }, [dispatch])
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <RouterWrapper />
        <ToastContainer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
