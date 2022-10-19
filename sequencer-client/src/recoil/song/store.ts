import { RecoilState } from "recoil";
import { sequencerEngine } from "../audioEngine";
import { TrackState } from "../../recoil/track";

class SongStore {
  private readonly _trackStates: Array<RecoilState<TrackState>>;

  constructor() {
    this._trackStates = new Array<RecoilState<TrackState>>(
      sequencerEngine.numTracks
    );
  }

  getTrackStateAtom(trackIndex: number): RecoilState<TrackState> {
    return this._trackStates[trackIndex];
  }
}

const songStore = new SongStore();
export default songStore;
