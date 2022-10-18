import { configureStore } from "@reduxjs/toolkit";
import stepsReducer from "./features/steps/steps";
import { stepsListenerMiddleware } from "./features/steps/stepsMiddleware";

export const store = configureStore({
  reducer: {
    steps: stepsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stepsListenerMiddleware.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
