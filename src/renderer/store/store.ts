const { createStore } = require('redux');


interface ReducerState  {
clipboardData: string[],
entrySize:number
}

export const reducerActions = {
    SET_INITIAL_CLIPBOARD:'setInitialState',
    ADD_CLIPBOARD_ENTRY:'addClipboardEntry',
    SET_ENTRY_SIZE:'setEntrySize'

} as const

const initialState:ReducerState = { clipboardData:[],entrySize:2 };

// Reducer function
function reducer(state = initialState, action) {  
  switch (action.type) {
    case reducerActions.SET_INITIAL_CLIPBOARD:
      return { ...state, clipboardData:action.payload };
    case reducerActions.ADD_CLIPBOARD_ENTRY:
      const newData = Array.from(state.clipboardData)
      newData.push(action.payload)

      return { ...state, clipboardData: newData };

      case reducerActions.SET_ENTRY_SIZE:
        return { ...state, entrySize: action.payload };


    default:
      return state;
  }
}

export const store = createStore(reducer);


