import {
  ContinuousParamMetadata,
  DiscreteParamMetadata,
  BoolParamMetadata,
} from "./metadata";

export type Param = string | number | boolean;

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
  params: any
): number {
  const param = params[paramInfo.id];
  if (param == null) {
    return paramInfo.default;
  }
  if (typeof param === "number") {
    return param;
  }
  return paramInfo.default;
}

export function getDiscreteParamValue(
  paramInfo: DiscreteParamMetadata,
  params: any
): string {
  const param = params[paramInfo.id];
  if (param == null) {
    return paramInfo.default;
  }
  if (typeof param === "string") {
    return param;
  }
  return paramInfo.default;
}
