import {
  ContinuousParamInfo,
  DiscreteParamInfo,
  BoolParamInfo,
} from "./ParamInfo";

export type Param = ContinuousParam | DiscreteParam | BoolParam;

export interface ContinuousParam {
  info: ContinuousParamInfo;
  value: number;
}

export interface DiscreteParam {
  info: DiscreteParamInfo;
  value: string;
}

export interface BoolParam {
  info: BoolParamInfo;
  value: boolean;
}
