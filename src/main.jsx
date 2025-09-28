import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import './Components/styles/global.css'
import App from "./App";
import store from "./Components/store";
import { BrowserRouter } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);