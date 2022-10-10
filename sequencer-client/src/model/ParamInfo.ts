export interface ParamInfo {
  kind: "continuous" | "discrete" | "boolean";
  id: string;
}

export interface ContinuousParamInfo extends ParamInfo {
  min: number;
  max: number;
  default: number;
  kind: "continuous";
}

export interface DiscreteParamInfo extends ParamInfo {
  choices: string[];
  default: string;
  kind: "discrete";
}

export interface BoolParamInfo extends ParamInfo {
  default: boolean;
  kind: "boolean";
}
