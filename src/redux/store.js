import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./boardsSlice";
import themeSlice from "./themeSlice";
import { saveState, loadState } from '../utility/localStorage'

//const preloadedState = loadState();

const store = configureStore({
    reducer: {
        boards: boardsSlice.reducer,
        theme: themeSlice.reducer
    }
})

// Save state to local storage whenever it changes
store.subscribe(() => {
    saveState(store.getState());
});
export default store
