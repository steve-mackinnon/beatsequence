import { useFirebaseApp } from "reactfire";
import { useAuth } from "./useAuth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadSong } from "../features/song/songSlice";
import {
  extractProjectFromPayload,
  ProjectPayload,
} from "../adapters/firestorePersistenceAdapter";
import { loadTracks } from "../features/tracks/tracks";
import { loadSteps } from "../features/steps/steps";
type LoadProject = (name: string) => Promise<void>;

export function useLoadProject(): LoadProject {
  const app = useFirebaseApp();
  const dispatch = useDispatch();
  const auth = useAuth();
  const navigate = useNavigate();

  const loadProject = async (projectId: string): Promise<void> => {
    if (auth.uid == null) {
      throw new Error(
        "Attempting to load a project without user authentication."
      );
    }
    try {
      const db = getFirestore(app);
      const projectRef = doc(db, "projects", projectId);
      const projectSnap = await getDoc(projectRef);
      if (projectSnap.exists()) {
        const projectState = projectSnap.data();
        const project = extractProjectFromPayload(
          projectState as ProjectPayload
        );
        project.song.id = projectId;
        dispatch(loadSong(project.song));
        dispatch(loadTracks(project.tracks));
        dispatch(loadSteps(project.pattern.steps));
        navigate("/makebeats");
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return loadProject;
}
