import { useAppSelector, useAppDispatch } from ".";
import { SongParams, setParam as setSongParam } from "../features/song/song";
import {
  stepStateForTrackAndStep,
  AnyStepParams,
  setParam,
} from "../features/steps/steps";
import { setGeneratorParam } from "../features/tracks/tracks";
import { AnyGeneratorParams } from "../generators";
export interface ParamInfo {
  trackId: number | undefined;
  stepIndex: number | undefined;
  name: string;
  min: number;
  max: number;
  round?: boolean;
}

export function useParameter(
  paramInfo: ParamInfo
): [number, (newValue: number) => void] {
  const paramValue = useAppSelector((state) => {
    if (paramInfo.stepIndex != null && paramInfo.trackId != null) {
      const step = stepStateForTrackAndStep(
        paramInfo.trackId,
        paramInfo.stepIndex,
        state.steps
      );
      if (paramInfo.name in step.params) {
        return step.params[paramInfo.name as keyof AnyStepParams];
      }
      console.log(
        `Attempting to set ${paramInfo.name} param, which does not exist...`
      );
      return 0;
    } else if (paramInfo.trackId != null) {
      const track = state.tracks[paramInfo.trackId];
      return track.generatorParams[paramInfo.name as keyof AnyGeneratorParams];
    } else {
      return state.song.params[paramInfo.name as keyof SongParams];
    }
  });
  const dispatch = useAppDispatch();

  return [
    paramValue,
    (newValue: number): void => {
      let value = newValue;
      if (value > paramInfo.max) {
        value = paramInfo.max;
      } else if (value < paramInfo.min) {
        value = paramInfo.min;
      }
      if (paramInfo.round ?? false) {
        value = Math.round(value);
      }
      if (paramInfo.trackId == null) {
        dispatch(
          setSongParam({
            paramId: paramInfo.name,
            value,
          })
        );
      } else if (paramInfo.stepIndex != null) {
        dispatch(
          setParam({
            paramId: paramInfo.name,
            trackId: paramInfo.trackId,
            stepIndex: paramInfo.stepIndex,
            value,
          })
        );
      } else {
        dispatch(
          setGeneratorParam({
            paramId: paramInfo.name,
            trackId: paramInfo.trackId,
            paramValue: value,
          })
        );
      }
    },
  ];
}
