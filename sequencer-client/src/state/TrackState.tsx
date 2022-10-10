import { atom, RecoilState } from "recoil";
import { sequencerEngine } from "./AudioEngineState";
import { GeneratorType, TrackState } from "../model/TrackState";
import { Param } from "../model/Param";

export function MakeTrackStateAtom(
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
