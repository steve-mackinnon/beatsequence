import { useAppSelector, useAppDispatch } from ".";
import {
  stepStateForTrackAndStep,
  AnyStepParams,
  setParam,
} from "../features/steps/steps";
import { setGeneratorParam } from "../features/tracks/tracks";
import { AnyGeneratorParams } from "../generators";
export interface ParamInfo {
  trackId: number;
  stepIndex: number | undefined;
  name: string;
  min: number;
  max: number;
}

export function useParameter(
  paramInfo: ParamInfo
): [number, (newValue: number) => void] {
  const paramValue = useAppSelector((state) => {
    if (paramInfo.stepIndex != null) {
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
    }
    const track = state.tracks[paramInfo.trackId];
    return track.generatorParams[paramInfo.name as keyof AnyGeneratorParams];
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
      if (paramInfo.stepIndex != null) {
        dispatch(
          setParam({
            paramId: paramInfo.name,
            trackId: paramInfo.trackId,
            stepIndex: paramInfo.stepIndex,
            value,
          })
        );
        return;
      }
      dispatch(
        setGeneratorParam({
          trackId: paramInfo.trackId,
          paramId: paramInfo.name,
          paramValue: value,
        })
      );
    },
  ];
}
