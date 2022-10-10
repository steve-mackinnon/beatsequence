import { atom, RecoilState } from "recoil";
import { sequencerEngine } from "../audioEngine";
import { Param } from "../../model/Param";

export class TrackState {
  muted: boolean = false;
  generatorType: GeneratorType;
  generatorParams: Map<string, Param> = new Map<string, Param>();

  constructor(generatorType: GeneratorType) {
    this.generatorType = generatorType;
  }
}

export enum GeneratorType {
  Kick,
  Snare,
  ClosedHH,
  SineBleep,
  SquareBleep,
}

export default function MakeTrackStateAtom(
  trackIndex: number
): RecoilState<TrackState> {
  return atom<TrackState>({
    key: `T${trackIndex}`,
    default: {
      muted: false,
      generatorType: GeneratorType.SineBleep,
      generatorParams: new Map<string, Param>(),
    },
    effects: [
      ({ onSet, setSelf, trigger }) => {
        if (trigger === "get") {
          // Initialize the atom by fetching the correct TrackParams from
          // sequencerEngine to intiailize.
          setSelf(sequencerEngine.getTrackState(trackIndex));
        }
        // Forward TrackState changes over to the sequencerEngine
        onSet((trackState: TrackState) => {
          sequencerEngine.setTrackState(trackIndex, trackState);
        });
      },
    ],
  });
}
