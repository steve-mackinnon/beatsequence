import { useFirebaseApp } from "reactfire";
import { useAuth } from "./useAuth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStepStates, StepState } from "../features/steps/steps";
import { setTrackStates, TrackState } from "../features/tracks/tracks";
import { loadProject as loadProjectAction } from "../features/song/song";

type LoadProject = (name: string) => Promise<void>;
export default function useLoadProject(): LoadProject {
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
        const trackStates = projectState.tracks;
        if (trackStates == null) {
          throw new Error("tracks object was missing from project.");
        }
        dispatch(setTrackStates(trackStates as TrackState[]));

        const stepStates = projectState.steps;
        if (stepStates == null) {
          throw new Error("steps object was missing from project.");
        }
        dispatch(setStepStates(stepStates as StepState[]));

        const songState = projectState.song;
        if (songState == null) {
          throw new Error("song object was missing from project.");
        }
        dispatch(
          loadProjectAction({
            project: {
              name: songState.name,
              id: projectId,
            },
            params: songState.params,
          })
        );

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
