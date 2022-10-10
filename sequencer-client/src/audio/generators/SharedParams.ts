import { ContinuousParamInfo, DiscreteParamInfo } from "../../model/ParamInfo";

export const DecayTime: ContinuousParamInfo = {
  kind: "continuous",
  id: "decay_time",
  min: 0.01,
  max: 5.0,
  default: 0.1,
};

export const TransientDecayTime: ContinuousParamInfo = {
  kind: "continuous",
  id: "transient_decay_time",
  min: 0.01,
  max: 2.0,
  default: 0.05,
};

export const AttackTime: ContinuousParamInfo = {
  kind: "continuous",
  id: "attack_time",
  min: 0.01,
  max: 2.0,
  default: 0.01,
};

export const LPFCutoff: ContinuousParamInfo = {
  kind: "continuous",
  id: "lpf_cutoff",
  min: 20.0,
  max: 20000.0,
  default: 20.0,
};

export const HPFCutoff: ContinuousParamInfo = {
  kind: "continuous",
  id: "hpf_cutoff",
  min: 20.0,
  max: 20000.0,
  default: 20000.0,
};

export const CorasePitch: ContinuousParamInfo = {
  kind: "continuous",
  id: "coarse_pitch",
  min: 20.0,
  max: 20000.0,
  default: 200.0,
};

export const OscType: DiscreteParamInfo = {
  kind: "discrete",
  id: "osc_type",
  choices: ["sine", "square", "saw", "triangle"],
  default: "sine",
};
