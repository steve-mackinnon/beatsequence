import {
  ContinuousParamMetadata,
  DiscreteParamMetadata,
} from "../../parameters";

export const DecayTime: ContinuousParamMetadata = {
  kind: "continuous",
  id: "decay_time",
  min: 0.01,
  max: 5.0,
  default: 0.1,
};

export const TransientDecayTime: ContinuousParamMetadata = {
  kind: "continuous",
  id: "transient_decay_time",
  min: 0.01,
  max: 2.0,
  default: 0.05,
};

export const AttackTime: ContinuousParamMetadata = {
  kind: "continuous",
  id: "attack_time",
  min: 0.01,
  max: 2.0,
  default: 0.01,
};

export const LPFCutoff: ContinuousParamMetadata = {
  kind: "continuous",
  id: "lpf_cutoff",
  min: 20.0,
  max: 20000.0,
  default: 20.0,
};

export const HPFCutoff: ContinuousParamMetadata = {
  kind: "continuous",
  id: "hpf_cutoff",
  min: 20.0,
  max: 20000.0,
  default: 20000.0,
};

export const CorasePitch: ContinuousParamMetadata = {
  kind: "continuous",
  id: "coarse_pitch",
  min: 20.0,
  max: 20000.0,
  default: 200.0,
};

export const OscType: DiscreteParamMetadata = {
  kind: "discrete",
  id: "osc_type",
  choices: ["sine", "square", "saw", "triangle"],
  default: "sine",
};
