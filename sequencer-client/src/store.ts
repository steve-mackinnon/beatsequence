import { configureStore, combineReducers } from "@reduxjs/toolkit";
import stepsReducer from "./features/steps/steps";
import tracksReducer from "./features/tracks/tracks";
import songReducer from "./features/song/songSlice";
import { stepsListenerMiddleware } from "./features/steps/stepsMiddleware";
import { tracksListenerMiddleware } from "./features/tracks/tracksMiddleware";
import { songListenerMiddleware } from "./features/song/songMiddleware";
import { persistenceMiddleware } from "./features/persistence/persistenceMiddleware";

const reducers = combineReducers({
  steps: stepsReducer,
  tracks: tracksReducer,
  song: songReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      stepsListenerMiddleware.middleware,
      tracksListenerMiddleware.middleware,
      songListenerMiddleware.middleware,
      persistenceMiddleware.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
