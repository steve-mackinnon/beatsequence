import { useContext } from "react";
import { useAppSelector, useAppDispatch } from "./index";
import { useProjectName } from "./useProjectName";
import { Project } from "../entities/project";
import { PortProviderContext } from "../context/PortProviderContext";
import { projectSavedAs } from "../reducers/songSlice";

export interface SaveProjectInterface {
  name: string;
  saveAs: (name: string) => Promise<boolean>;
  save: () => Promise<boolean>;
  canSave: boolean;
}

function createProjectFromCombinedState(state: any): Project {
  const project: Project = {
    song: state.song,
    pattern: {
      name: "Pattern 1",
      steps: state.steps,
    },
    tracks: state.tracks,
  };
  return project;
}

export default function useSaveProject(): SaveProjectInterface {
  const portProvider = useContext(PortProviderContext);
  const state = useAppSelector((state) => state);
  const projectName = useProjectName();
  const dispatch = useAppDispatch();

  return {
    name: projectName,
    save: async () => {
      const project = createProjectFromCombinedState(state);
      return await portProvider.saveProjectAdapter.saveProject(project);
    },
    saveAs: async (name: string) => {
      const project = createProjectFromCombinedState(state);
      const projectId = await portProvider.saveProjectAdapter.saveProjectAs(
        project,
        name
      );
      if (projectId != null) {
        const song = { ...project.song };
        song.id = projectId;
        song.name = name;
        dispatch(projectSavedAs(song));
        return true;
      }
      return false;
    },
    canSave: state.song.id != null,
  };
}
