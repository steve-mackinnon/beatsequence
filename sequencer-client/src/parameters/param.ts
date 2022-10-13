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
  kind: "continuous";
}

export interface DiscreteParam {
  info: DiscreteParamMetadata;
  value: string;
  kind: "discrete";
}

export interface BoolParam {
  info: BoolParamMetadata;
  value: boolean;
  kind: "bool";
}
