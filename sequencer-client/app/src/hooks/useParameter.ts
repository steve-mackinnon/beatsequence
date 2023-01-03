import { useAppSelector, useAppDispatch } from ".";
import { setParam as setSongParam } from "../reducers/songSlice";
import { setParam } from "../reducers/stepsSlice";
import { setGeneratorParam } from "../reducers/tracksSlice";
import { CommonParams } from "../entities/commonParams";
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
      // TODO: This hack assumes steps only have a coarse pitch parameter
      const step = state.steps[paramInfo.trackId][paramInfo.stepIndex];
      return step.coarsePitch;
    } else if (paramInfo.trackId != null) {
      const track = state.tracks[paramInfo.trackId];
      return track.generatorParams[paramInfo.name as keyof CommonParams];
    } else {
      return state.song.tempo;
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
