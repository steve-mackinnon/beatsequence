import { useAppSelector } from "./index";

type ProjectName = string;
export default function useProject(): ProjectName {
  const projectName = useAppSelector((state) =>
    state.song.currentProject != null
      ? state.song.currentProject.name
      : "New project"
  );

  return projectName;
}
