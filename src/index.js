import React from "react";
import ReactDOM from "react-dom";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import jokeReducer from "./components/store/jokeSlice";

import "antd/dist/antd.css";
import "./index.css";
import App from "./App";

const store = configureStore({
  reducer: jokeReducer,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
