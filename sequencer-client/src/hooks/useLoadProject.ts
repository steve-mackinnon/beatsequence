import { useFirebaseApp } from "reactfire";
import { useAuth } from "./useAuth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadProject as loadProjectAction } from "../features/song/songSlice";
import { Track } from "../entities/track";
import { Step } from "../entities/step";

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
        const trackStates = projectState.tracks;
        if (trackStates == null) {
          throw new Error("tracks object was missing from project.");
        }
        const stepStates = projectState.steps;
        if (stepStates == null) {
          throw new Error("steps object was missing from project.");
        }

        const tracks = trackStates as Track[];
        const steps = stepStates as Step[];
        const stepsForEachTrack = new Array<Step[]>();
        const numStepsPerTrack = steps.length / tracks.length;
        // Transform steps from flat array into a 2d steps-per-track array
        for (
          let trackIndex = 0;
          trackIndex < trackStates.length;
          ++trackIndex
        ) {
          stepsForEachTrack.push(new Array<Step>());
          for (let stepIndex = 0; stepIndex < numStepsPerTrack; ++stepIndex) {
            stepsForEachTrack[trackIndex].push(steps[trackIndex * stepIndex]);
          }
        }
        const songState = projectState.song;
        if (songState == null) {
          throw new Error("song object was missing from project.");
        }
        dispatch(
          loadProjectAction({
            project: {
              name: projectState.name,
              id: projectId,
              tempo: songState.params,
              playing: false,
              tracks,
              pattern: {
                name: "Pattern 1",
                steps: stepsForEachTrack,
              },
            },
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
