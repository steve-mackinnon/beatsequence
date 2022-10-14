import {
  ContinuousParamMetadata,
  DiscreteParamMetadata,
  BoolParamMetadata,
} from "./metadata";

export type Param = ContinuousParam | DiscreteParam | BoolParam;

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

export function getContinuousParamValue(
  paramInfo: ContinuousParamMetadata,
  params: Map<string, Param>
): number {
  const param = params.get(paramInfo.id);
  if (param === undefined) {
    return paramInfo.default;
  }
  if (param.kind === "continuous") {
    return param.value;
  }
  return paramInfo.default;
}

export function getDiscreteParamValue(
  paramInfo: DiscreteParamMetadata,
  params: Map<string, Param>
): string {
  const param = params.get(paramInfo.id);
  if (param === undefined) {
    return paramInfo.default;
  }
  if (param.kind === "discrete") {
    return param.value;
  }
  return paramInfo.default;
}
