import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import CustomAlert from "./Component/CustomAlert/CustomAlert";
const options = {
  timeout: 5000,
  position: positions.TOP_CENTER,
  transition: transitions.SCALE,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AlertProvider template={CustomAlert} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);
