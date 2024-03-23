import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadSong } from "../reducers/songSlice";
import { loadTracks } from "../reducers/tracksSlice";
import { loadSteps } from "../reducers/stepsSlice";
import { useContext } from "react";
import { PortProviderContext } from "../context/PortProviderContext";
type LoadProject = (name: string) => Promise<boolean>;

export function useLoadProject(): LoadProject {
  const portProvider = useContext(PortProviderContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadProject = async (projectId: string): Promise<boolean> => {
    const project = await portProvider.loadProjectAdapter.loadProject(
      projectId
    );
    if (project == null) {
      return false;
    }
    dispatch(loadSong(project.song));
    dispatch(loadTracks(project.tracks));
    dispatch(loadSteps(project.pattern.steps));
    navigate("/makebeats");
    return true;
  };

  return loadProject;
}
