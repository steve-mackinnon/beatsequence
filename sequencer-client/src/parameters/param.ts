import {
  ContinuousParamMetadata,
  DiscreteParamMetadata,
  BoolParamMetadata,
} from "./metadata";

type Param = ContinuousParam | DiscreteParam | BoolParam;
export default Param;

export interface ContinuousParam {
  info: ContinuousParamMetadata;
  value: number;
}

export interface DiscreteParam {
  info: DiscreteParamMetadata;
  value: string;
}

export interface BoolParam {
  info: BoolParamMetadata;
  value: boolean;
}
