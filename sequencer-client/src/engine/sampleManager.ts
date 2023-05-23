export class SampleManager {
  private readonly rawFiles = new Map<string, ArrayBuffer>();
  private readonly samples = new Map<string, AudioBuffer>();

  public addRawFile(id: string, rawFileData: ArrayBuffer): void {
    this.rawFiles.set(id, rawFileData);
  }

  public getRawFile(id: string): ArrayBuffer | undefined {
    return this.rawFiles.get(id);
  }

  public addSample(id: string, sample: AudioBuffer): void {
    this.samples.set(id, sample);
  }

  public getSample(id: string): AudioBuffer | undefined {
    return this.samples.get(id);
  }
}

export const sampleManager = new SampleManager();
