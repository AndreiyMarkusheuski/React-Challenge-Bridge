import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Main from "./pages/main";
import Login from "./pages/login";

import { LOGIN_PAGE, MAIN_PAGE } from "./consts";

import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => (
  <BrowserRouter>
    <Provider store={store} className="App">
      <Routes>
        <Route path={MAIN_PAGE} element={<Main />} />
        <Route path={LOGIN_PAGE} element={<Login />} />
        <Route path="*" element={<Navigate to={MAIN_PAGE} replace />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);

export default App;
