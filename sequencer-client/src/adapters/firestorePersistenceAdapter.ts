import { Step } from "../entities/step";
import { Track } from "../entities/track";
import { Project } from "../entities/project";
import { Pattern } from "../entities/pattern";

export interface ProjectPayload {
  readers: string[];
  writers: string[];
  name: string;
  tracks: Track[];
  steps: Step[];
  song: {
    params: {
      tempo: number;
    };
  };
}

export const createProjectPayload = (
  project: Project,
  uid: string
): ProjectPayload => {
  // Flatten steps into a 1d array
  const steps = project.pattern.steps.flatMap((steps: Step[]) => steps);
  return {
    readers: [uid],
    writers: [uid],
    name: project.song.name,
    tracks: project.tracks,
    steps,
    song: {
      params: {
        tempo: project.song.tempo,
      },
    },
  };
};

interface StepV1 {
  enabled: boolean;
  params: {
    coarsePitch: number;
  };
  stepIndex: number;
  trackId: number;
}
function maybeMigrateStepsFromv1(steps: any[]): Step[] {
  // Bail early if steps are not in the v1 format
  if ("params" in steps[0] && steps[0].params != null) {
    return steps.map((step: StepV1) => {
      return {
        enabled: step.enabled,
        coarsePitch: step.params.coarsePitch,
      };
    });
  }
  return steps;
}

function maybeMigrateTracksFromV1(tracks: any[]): Track[] {
  // Bail early if tracks are not in the v1 format
  if (
    (tracks[0] as Track).generatorParams != null &&
    (tracks[0] as Track).generatorParams.triggerProbability != null
  ) {
    return tracks;
  }
  return tracks.map((track: any) => {
    const newTrack = { ...track };
    newTrack.generatorParams.triggerProbability = 100;
    return newTrack;
  });
}
export const extractProjectFromPayload = (payload: ProjectPayload): Project => {
  let { name, tracks, steps, song } = payload;
  steps = maybeMigrateStepsFromv1(steps);
  tracks = maybeMigrateTracksFromV1(tracks);

  const stepsForEachTrack = new Array<Step[]>();
  const numStepsPerTrack = steps.length / tracks.length;
  // Transform steps from flat array into a 2d steps-per-track array
  for (let trackIndex = 0; trackIndex < tracks.length; ++trackIndex) {
    stepsForEachTrack.push(new Array<Step>());
    for (let stepIndex = 0; stepIndex < numStepsPerTrack; ++stepIndex) {
      stepsForEachTrack[trackIndex].push(
        steps[trackIndex * numStepsPerTrack + stepIndex]
      );
    }
  }
  const pattern: Pattern = {
    name: "Pattern 1",
    steps: stepsForEachTrack,
  };
  return {
    song: {
      name,
      tempo: song.params.tempo,
      playing: false,
    },
    pattern,
    tracks,
  };
};