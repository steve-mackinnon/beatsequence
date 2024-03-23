import { useAppSelector } from "./index";

type ProjectName = string;
export function useProjectName(): ProjectName {
  return useAppSelector((state) => {
    if (state.song.name != null) {
      return state.song.name;
    }
    return "Untitled";
  });
}
