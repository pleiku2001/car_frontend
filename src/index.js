import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter,HashRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter>
        <App />
      </HashRouter>
      </PersistGate>
    </Provider>
   </React.StrictMode>,
  document.getElementById("root")
);
