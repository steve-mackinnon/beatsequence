export default class AudioEngine {
  private readonly _context: AudioContext;
  private readonly _masterInNode: GainNode;
  private readonly _oscillatorNode: OscillatorNode;

  private _playing = false;

  constructor() {
    this._context = new AudioContext();
    this._masterInNode = this._context.createGain();
    this._oscillatorNode = new OscillatorNode(this._context, {
      frequency: 320,
      type: "sawtooth",
    });
    this._oscillatorNode.start();

    this._oscillatorNode.connect(this._masterInNode);
    this._masterInNode.connect(this._context.destination);
  }

  get playing(): boolean {
    return this._playing;
  }

  set playing(playing: boolean) {
    if (this._playing === playing) {
      return;
    }
    if (playing) {
      this._context
        .resume()
        .then(() => {
          this._playing = true;
        })
        .catch((e: any) => {
          console.log(e);
        });
    } else {
      this._context
        .suspend()
        .then(() => {
          this._playing = false;
        })
        .catch((e: any) => {
          console.log(e);
        });
    }
  }
}
