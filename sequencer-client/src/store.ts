import { configureStore } from "@reduxjs/toolkit";
import stepsReducer from "./features/steps/steps";
import tracksReducer from "./features/tracks/tracks";
import songReducer from "./features/song/song";
import { stepsListenerMiddleware } from "./features/steps/stepsMiddleware";
import { tracksListenerMiddleware } from "./features/tracks/tracksMiddleware";
import { songListenerMiddleware } from "./features/song/songMiddleware";
export const store = configureStore({
  reducer: {
    steps: stepsReducer,
    tracks: tracksReducer,
    song: songReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      stepsListenerMiddleware.middleware,
      tracksListenerMiddleware.middleware,
      songListenerMiddleware.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
