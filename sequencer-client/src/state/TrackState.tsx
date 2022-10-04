import { atom, RecoilState } from "recoil";
import { sequencerEngine } from "./AudioEngineState";
import { TrackParams } from "../model/TrackParams";

export function MakeTrackParamsAtom(
  trackIndex: number
): RecoilState<TrackParams> {
  return atom<TrackParams>({
    key: `T${trackIndex}`,
    default: {
      muted: false,
    },
    effects: [
      ({ onSet, setSelf, trigger }) => {
        if (trigger === "get") {
          // Initialize the atom by fetching the correct TrackParams from
          // sequencerEngine to intiailize.
          setSelf(sequencerEngine.getTrackParams(trackIndex));
        }
        // Forward TrackParams changes over to the sequencerEngine
        onSet((trackParams: TrackParams) => {
          sequencerEngine.setTrackParams(trackIndex, trackParams);
        });
      },
    ],
  });
}
