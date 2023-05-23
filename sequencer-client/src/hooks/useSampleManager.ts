import { sampleManager } from "../engine/sampleManager";

export interface SampleManagerInterface {
  addSample: (id: string, file: ArrayBuffer) => void;
  getSample: (id: string) => ArrayBuffer | undefined;
}

export function useSampleManager(): SampleManagerInterface {
  return {
    addSample: (id: string, file: ArrayBuffer) =>
      sampleManager.addSample(id, file),
    getSample: (id: string) => sampleManager.getSample(id),
  };
}
