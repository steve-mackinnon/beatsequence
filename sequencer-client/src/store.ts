import { configureStore } from "@reduxjs/toolkit";
import stepsReducer from "./features/steps/steps";
import tracksReducer from "./features/tracks/tracks";
import { stepsListenerMiddleware } from "./features/steps/stepsMiddleware";
import { tracksListenerMiddleware } from "./features/tracks/tracksMiddleware";

export const store = configureStore({
  reducer: {
    steps: stepsReducer,
    tracks: tracksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      stepsListenerMiddleware.middleware,
      tracksListenerMiddleware.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
