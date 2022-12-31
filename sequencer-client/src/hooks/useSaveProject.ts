import { useAppSelector, useAppDispatch } from "./index";
import { useFirebaseApp } from "reactfire";
import { useAuth } from "./useAuth";
import { useProjectName } from "./useProjectName";
import {
  doc,
  addDoc,
  setDoc,
  collection,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { projectSavedAs } from "../features/song/songSlice";

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
  const projectName = useProjectName();
  const auth = useAuth();

  const saveAs = async (name: string): Promise<void> => {
    if (name.length === 0 || name.trim().length === 0) {
      throw new Error(
        "Invalid project name. Length must be greater than zero and contain non-space charaters."
      );
    }
    if (auth.uid == null) {
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
        writers: [auth.uid],
        readers: [auth.uid],
        song: {
          name,
          params: {
            tempo: state.song.tempo,
          },
        },
      });
      // Give the current user read/write permissions for the new project
      await setDoc(doc(db, "project_permissions", projectRef.id), {
        timestamp: serverTimestamp(),
        name,
        writers: [auth.uid],
        readers: [auth.uid],
      });
      const song = { ...state.song };
      song.id = projectRef.id;
      dispatch(projectSavedAs(song));
    } catch (e) {
      console.log(e);
    }
  };

  const save = async (): Promise<void> => {
    if (state.song.id == null) {
      throw Error("Attempting to save a project without a name...");
    }
    if (auth.uid == null) {
      throw new Error(
        "Attempting to save a project without user authentication."
      );
    }
    try {
      const db = getFirestore(app);
      // Save the project to the "projects" collection in firestore
      const projectRef = doc(db, "projects", state.song.id);
      await updateDoc(projectRef, {
        tracks: state.tracks,
        steps: state.steps,
        song: {
          params: {
            tempo: state.song.tempo,
          },
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
    canSave: state.song.id != null,
  };
}
