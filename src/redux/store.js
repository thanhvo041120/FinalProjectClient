import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root.reducer";
import { useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ['auth', 'viewData']
};

export const persist = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persist,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk:true,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
