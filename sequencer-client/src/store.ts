import { configureStore, combineReducers } from "@reduxjs/toolkit";
import stepsReducer, {
  initialState as stepsInitialState,
} from "./features/steps/steps";
import tracksReducer, {
  initialState as tracksInitialState,
} from "./features/tracks/tracks";
import songReducer, {
  initialState as songInitialState,
} from "./features/song/song";
import { stepsListenerMiddleware } from "./features/steps/stepsMiddleware";
import { tracksListenerMiddleware } from "./features/tracks/tracksMiddleware";
import { songListenerMiddleware } from "./features/song/songMiddleware";
import { persistenceMiddleware } from "./features/persistence/persistenceMiddleware";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
import persistReducer from "redux-persist/es/persistReducer";

const reducers = combineReducers({
  steps: stepsReducer,
  tracks: tracksReducer,
  song: songReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  stateReconciler: autoMergeLevel1,
  migrate: async (state: any) => {
    // Merge the initial state with the user's persisted state to ensure
    // that any new properties are migrated over and not set to undefined
    // during rehydration.
    const initialState = {
      steps: stepsInitialState,
      tracks: tracksInitialState,
      song: songInitialState,
    };
    return await Promise.resolve({ ...initialState, ...state });
  },
};
const persistedReducer = persistReducer<ReturnType<typeof reducers>>(
  persistConfig,
  reducers
);

const rootReducer = (
  state: any,
  action: any
): ReturnType<typeof persistedReducer> => {
  if (action.type === "song/resetState") {
    localStorage.clear();
    return persistedReducer(undefined, action);
  }
  return persistedReducer(state, action);
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

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
