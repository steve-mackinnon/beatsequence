import { configureStore, combineReducers } from "@reduxjs/toolkit";
import stepsReducer from "./reducers/stepsSlice";
import tracksReducer from "./reducers/tracksSlice";
import songReducer from "./reducers/songSlice";
import { stepsListenerMiddleware } from "./middleware/stepsMiddleware";
import { tracksListenerMiddleware } from "./middleware/tracksMiddleware";
import { songListenerMiddleware } from "./middleware/songMiddleware";
import { persistenceMiddleware } from "./middleware/persistenceMiddleware";

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
