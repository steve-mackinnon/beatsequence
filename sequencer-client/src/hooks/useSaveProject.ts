import { useAppSelector, useAppDispatch } from "./index";
import { useFirebaseApp } from "reactfire";
import { getAuth } from "firebase/auth";
import {
  doc,
  addDoc,
  setDoc,
  collection,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { projectSavedAs } from "../features/song/song";

export interface SaveProjectInterface {
  name: string;
  saveAs: (name: string) => Promise<void>;
  save: () => Promise<void>;
  canSave: boolean;
}

export default function useSaveProject(): SaveProjectInterface {
  const app = useFirebaseApp();
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const projectName = useAppSelector((state) =>
    state.song.currentProject != null
      ? state.song.currentProject.name
      : "Untitled"
  );

  const saveAs = async (name: string): Promise<void> => {
    if (name.length === 0 || name.trim().length === 0) {
      throw new Error(
        "Invalid project name. Length must be greater than zero and contain non-space charaters."
      );
    }
    const auth = getAuth(app);
    if (auth.currentUser == null) {
      throw new Error(
        "Attempting to save a project without user authentication."
      );
    }
    try {
      const db = getFirestore(app);
      // Save the project to the "projects" collection in firestore
      const projectRef = await addDoc(collection(db, "projects"), {
        name,
        tracks: state.tracks,
        steps: state.steps,
        writers: [auth.currentUser.uid],
        readers: [auth.currentUser.uid],
        song: {
          name,
          params: state.song.params,
        },
      });
      // Give the current user read/write permissions for the new project
      await setDoc(doc(db, "project_permissions", projectRef.id), {
        timestamp: serverTimestamp(),
        name,
        writers: [auth.currentUser.uid],
        readers: [auth.currentUser.uid],
      });
      dispatch(
        projectSavedAs({
          id: projectRef.id,
          name,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const save = async (): Promise<void> => {
    if (
      state.song.currentProject == null ||
      state.song.currentProject.id == null
    ) {
      throw Error("Attempting to save a project without a name...");
    }
    const auth = getAuth(app);
    if (auth.currentUser == null) {
      throw new Error(
        "Attempting to save a project without user authentication."
      );
    }
    try {
      const db = getFirestore(app);
      // Save the project to the "projects" collection in firestore
      const projectRef = doc(db, "projects", state.song.currentProject.id);
      await updateDoc(projectRef, {
        tracks: state.tracks,
        steps: state.steps,
        song: {
          params: state.song.params,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  return {
    name: projectName,
    saveAs,
    save,
    canSave: state.song.currentProject?.id != null,
  };
}
