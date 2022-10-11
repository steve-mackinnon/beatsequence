export interface ParamMetadata {
  kind: "continuous" | "discrete" | "boolean";
  id: string;
}

export interface ContinuousParamMetadata extends ParamMetadata {
  min: number;
  max: number;
  default: number;
  kind: "continuous";
}

export interface DiscreteParamMetadata extends ParamMetadata {
  choices: string[];
  default: string;
  kind: "discrete";
}

export interface BoolParamMetadata extends ParamMetadata {
  default: boolean;
  kind: "boolean";
}
