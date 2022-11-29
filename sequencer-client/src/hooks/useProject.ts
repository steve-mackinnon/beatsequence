import { trySaveAs } from "../features/song/song";
import { useAppDispatch, useAppSelector } from "./index";

type ProjectName = string;
type SaveProjectAs = (name: string) => void;
export default function useProject(): [ProjectName, SaveProjectAs] {
  const dispatch = useAppDispatch();
  const projectName = useAppSelector((state) =>
    state.song.currentProject != null
      ? state.song.currentProject.name
      : "New project"
  );

  const saveProjectAs = (name: string): void => {
    dispatch(
      trySaveAs({
        name,
      })
    );
  };

  return [projectName, saveProjectAs];
}
