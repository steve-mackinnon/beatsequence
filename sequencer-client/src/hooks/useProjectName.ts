import { useAppSelector } from "./index";

type ProjectName = string;
export function useProjectName(): ProjectName {
  return useAppSelector((state) => {
    if (state.song.currentProject != null) {
      return state.song.currentProject.name ?? "Unknown";
    }
    return "New Project";
  });
}
