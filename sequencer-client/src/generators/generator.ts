import { CommonParams } from "./commonParams";

export interface Generator {
  trigger: (
    startTime: number,
    params: CommonParams,
    frequency?: number
  ) => void;
}
