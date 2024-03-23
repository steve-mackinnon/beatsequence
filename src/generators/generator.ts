import { CommonParams } from "../entities/commonParams";

export interface Generator {
  trigger: (
    startTime: number,
    params: CommonParams,
    frequency?: number
  ) => void;
}
