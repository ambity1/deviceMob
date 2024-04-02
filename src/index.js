import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter  } from "react-router-dom";
import {createBrowserHistory} from 'history';

import {applyMiddleware, createStore} from "redux";
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import reducer from "./store/redusers/reducers";

import App from './App';
import {presetGpnDefault, Theme} from "@consta/uikit/Theme";

const history = createBrowserHistory();
const store = createStore(reducer,applyMiddleware(thunk));

// store.subscribe(() => {
//     console.log('Изменение', store.getState());
// });

ReactDOM.render(
    <Theme preset={presetGpnDefault}>
        <Provider store={store}>
            <BrowserRouter history={history}>
                <App />
            </BrowserRouter >
        </Provider>
    </Theme>
  ,
  document.getElementById('app')
);