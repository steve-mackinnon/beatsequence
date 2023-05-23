export class SampleManager {
  private readonly samples = new Map<string, ArrayBuffer>();

  public addSample(id: string, audioData: ArrayBuffer): void {
    this.samples.set(id, audioData);
  }

  public getSample(id: string): ArrayBuffer | undefined {
    return this.samples.get(id);
  }
}

export const sampleManager = new SampleManager();
