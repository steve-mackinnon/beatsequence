import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export * from "./useAuth";
export * from "./useCreateUserWithEmailAndPassword";
export * from "./useLoadProject";
export * from "./useParameter";
export * from "./useProjectName";
export * from "./useSaveProject";
export * from "./useSendPasswordResetEmail";
export * from "./useSignInWithEmailAndPassword";
export * from "./useSignOut";
