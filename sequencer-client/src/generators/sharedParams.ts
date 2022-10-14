import { ContinuousParamMetadata, DiscreteParamMetadata } from "../parameters";

export const DecayTime: ContinuousParamMetadata = {
  id: "decay_time",
  min: 0.01,
  max: 2.0,
  default: 0.1,
};

export const TransientDecayTime: ContinuousParamMetadata = {
  id: "transient_decay_time",
  min: 0.01,
  max: 2.0,
  default: 0.05,
};

export const AttackTime: ContinuousParamMetadata = {
  id: "attack_time",
  min: 0.01,
  max: 2.0,
  default: 0.01,
};

export const LPFCutoff: ContinuousParamMetadata = {
  id: "lpf_cutoff",
  min: 20.0,
  max: 20000.0,
  default: 20.0,
};

export const HPFCutoff: ContinuousParamMetadata = {
  id: "hpf_cutoff",
  min: 20.0,
  max: 20000.0,
  default: 20000.0,
};

export const CorasePitch: ContinuousParamMetadata = {
  id: "coarse_pitch",
  min: 20.0,
  max: 20000.0,
  default: 200.0,
};

export const OscType: DiscreteParamMetadata = {
  id: "osc_type",
  choices: ["sine", "square", "saw", "triangle"],
  default: "sine",
};
