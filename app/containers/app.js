/**
 * Created by Elf on 11.06.2016.
 */
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import rootReducer from './../reducers/index'
import NavRoot from './NavRoot';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <NavRoot />
            </Provider>
        );
    }
}