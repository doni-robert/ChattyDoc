import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as appDispatch, useSelector as appSelector } from "react-redux";
import { persistStore, persisteReducer } from "redux-persist";

const store = configureStore({
    reducer: persisteReducer(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    })

})

const persistor = persistStore(store);

const {dispatch} = store;

const useSelector = appSelector;

const useDispatch = () => appDispatch();

export {store, persistor, dispatch, useDispatch, useSelector}