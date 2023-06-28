const { createStore } = require('redux');


interface ReducerState  {
clipboardData: string[]
}

export const reducerActions = {
    SET_INITIAL_CLIPBOARD:'setInitialState',
    ADD_CLIPBOARD_ENTRY:'addClipboardEntry'

} as const

const initialState:ReducerState = { clipboardData:[] };

// Reducer function
function reducer(state = initialState, action) {  
  switch (action.type) {
    case reducerActions.SET_INITIAL_CLIPBOARD:
      return { ...state, clipboardData:action.payload };
    case reducerActions.ADD_CLIPBOARD_ENTRY:
      const newData = Array.from(state.clipboardData)
      newData.push(action.payload)

      return { ...state, clipboardData: newData };
    default:
      return state;
  }
}

// Create Redux store
export const store = createStore(reducer);


