import { configureStore } from "@reduxjs/toolkit";
import stepsReducer from "./features/steps/steps";
import tracksReducer from "./features/tracks/tracks";
import songReducer from "./features/song/song";
import { stepsListenerMiddleware } from "./features/steps/stepsMiddleware";
import { tracksListenerMiddleware } from "./features/tracks/tracksMiddleware";
import { songListenerMiddleware } from "./features/song/songMiddleware";
import { persistenceMiddleware } from "./features/persistence/persistenceMiddleware";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const appReducer = persistCombineReducers(persistConfig, {
  steps: stepsReducer,
  tracks: tracksReducer,
  song: songReducer,
});

// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const rootReducer = (state, action) => {
  if (action.type === "song/resetState") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // "If using Redux-Persist, you should specifically ignore all the action types it dispatches"
        // https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      stepsListenerMiddleware.middleware,
      tracksListenerMiddleware.middleware,
      songListenerMiddleware.middleware,
      persistenceMiddleware.middleware
    ),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
