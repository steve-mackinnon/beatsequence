import { KickParams } from "./kick/kick";
import { ClosedHHParams } from "./metals/closedHiHat";
import { OscParams } from "./pluck/pluck";
import { SnareParams } from "./snare/snare";

export * from "./kick/kick";
export * from "./metals/closedHiHat";
export * from "./pluck/pluck";
export * from "./snare/snare";

export type AnyGeneratorParams =
  | KickParams
  | ClosedHHParams
  | OscParams
  | SnareParams;
