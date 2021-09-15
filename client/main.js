/* eslint-disable no-unused-vars */
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./style/global";
import store from "./redux/store";
import { theme } from "./style/theme";
import Main from "./components/interface/Main/Main";

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Main />
    </ThemeProvider>
  </Provider>,
  document.getElementById("main")
);
