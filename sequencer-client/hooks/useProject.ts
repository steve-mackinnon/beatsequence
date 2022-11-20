import { saveAs } from "../features/song/song";
import { useAppDispatch, useAppSelector } from "./index";

type ProjectName = string;
type SaveProjectAs = (name: string) => void;
export default function useProject(): [ProjectName, SaveProjectAs] {
  const dispatch = useAppDispatch();
  const projectName = useAppSelector((state) => state.song.name);

  const saveProjectAs = (name: string): void => {
    dispatch(
      saveAs({
        name,
      })
    );
  };

  return [projectName, saveProjectAs];
}
