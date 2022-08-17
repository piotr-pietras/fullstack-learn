import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { theme } from "./services/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider as ReduxProvider } from "react-redux";
import { createStore } from "./services/store";

const store = createStore();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ReduxProvider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </ReduxProvider>
);
