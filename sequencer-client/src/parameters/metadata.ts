export interface ParamMetadata {
  id: string;
}

export interface ContinuousParamMetadata extends ParamMetadata {
  min: number;
  max: number;
  default: number;
}

export interface DiscreteParamMetadata extends ParamMetadata {
  choices: string[];
  default: string;
}

export interface BoolParamMetadata extends ParamMetadata {
  default: boolean;
}
