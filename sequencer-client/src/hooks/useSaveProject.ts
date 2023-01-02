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
} from "firebase/firestore";
import { projectSavedAs } from "../features/song/songSlice";
import {
  createProjectPayload,
  ProjectPayload,
} from "../adapters/firestorePersistenceAdapter";
import { Project } from "../entities/project";

export interface SaveProjectInterface {
  name: string;
  saveAs: (name: string) => Promise<void>;
  save: () => Promise<void>;
  canSave: boolean;
}

function createProjectPayloadFromCombinedState(
  state: any,
  uid: string
): ProjectPayload {
  const project: Project = {
    song: state.song,
    pattern: {
      name: "Pattern 1",
      steps: state.steps,
    },
    tracks: state.tracks,
  };
  return createProjectPayload(project, uid);
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
      const projectPayload = createProjectPayloadFromCombinedState(
        state,
        auth.uid
      );
      projectPayload.name = name;
      // Save the project to the "projects" collection in firestore
      const db = getFirestore(app);
      const projectRef = await addDoc(
        collection(db, "projects"),
        projectPayload
      );
      // Give the current user read/write permissions for the new project
      await setDoc(doc(db, "project_permissions", projectRef.id), {
        timestamp: serverTimestamp(),
        name,
        writers: [auth.uid],
        readers: [auth.uid],
      });
      const song = { ...state.song };
      song.name = name;
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
      const projectPayload = createProjectPayloadFromCombinedState(
        state,
        auth.uid
      );
      const db = getFirestore(app);
      // Save the project to the "projects" collection in firestore
      const projectRef = doc(db, "projects", state.song.id);
      await setDoc(projectRef, projectPayload);
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
