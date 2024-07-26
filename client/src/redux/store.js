// The code is creating a Redux store using the configureStore function from the "@reduxjs/toolkit" library.
// The store will hold the state of the application and allow components to access and update it.

// The first line imports the configureStore function from @reduxjs/toolkit,
// which allows us to create a Redux store with preconfigured settings and middleware.
import {configureStore} from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import { rootPersistConfig, rootReducer } from "./rootReducer";

//Next, we call the configureStore function with an object as its argument.
// This object contains two properties: reducer and middleware.
// The reducer property specifies how state updates are handled by different reducers in our application.
// In this case, it is set to persistReducer(), which will be explained later on.
// Reducers are functions that take in an action and current state as parameters, and return a new state based on the action type.
// Reducers are responsible for updating specific parts of the application's state.

// The middleware property allows us to customize how actions are handled before they reach the reducers.
// Inside getDefaultMiddleware(), we pass an object with two properties: serializableCheck and immutableCheck set to false.
// This disables some default checks that ensure that all values in our state tree can be serialized or are immutable (cannot be changed).
// We disable these checks because we will be using redux-persist library for storing data locally, so there's no need for these checks.
const store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware ({
            serializableCheck: false,
            immutableCheck: false,
        }),
});

//We then import another function called persistStore() from redux-persist library which takes in our newly created "store" as its argument.
//This enables persistent storage capabilities for our app by saving certain parts of our state tree into local storage or other storage engines specified during configuration.
const persistor = persistStore(store);

export {store, persistor};
