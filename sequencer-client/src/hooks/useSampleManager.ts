import { sampleManager } from "../engine/sampleManager";

export interface SampleManagerInterface {
  addSample: (id: string, file: ArrayBuffer) => void;
  getSample: (id: string) => ArrayBuffer | undefined;
}

export function useSampleManager(): SampleManagerInterface {
  return {
    addSample: (id: string, file: ArrayBuffer) =>
      sampleManager.addRawFile(id, file),
    getSample: (id: string) => sampleManager.getRawFile(id),
  };
}
