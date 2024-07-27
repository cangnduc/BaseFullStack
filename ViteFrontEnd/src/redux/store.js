// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import { googleSlice } from "./features/api/googleSlice";
import { userSlice } from "./features/api/userSlice";
import authReducer from "./features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import themeReducer from "./features/theme/themeSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "theme"], // Only persist auth, theme slice
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [googleSlice.reducerPath]: googleSlice.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
  auth: authReducer,
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([apiSlice.middleware, googleSlice.middleware, userSlice.middleware]),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
