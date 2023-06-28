"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = exports.reducerActions = void 0;
const { createStore } = require('redux');
exports.reducerActions = {
    SET_INITIAL_CLIPBOARD: 'setInitialState',
    ADD_CLIPBOARD_ENTRY: 'addClipboardEntry'
};
const initialState = { clipboardData: [] };
// Reducer function
function reducer(state = initialState, action) {
    switch (action.type) {
        case exports.reducerActions.SET_INITIAL_CLIPBOARD:
            return { ...state, clipboardData: action.payload };
        case exports.reducerActions.ADD_CLIPBOARD_ENTRY:
            const newData = Array.from(state.clipboardData);
            newData.push(action.payload);
            return { ...state, clipboardData: newData };
        default:
            return state;
    }
}
// Create Redux store
exports.store = createStore(reducer);
