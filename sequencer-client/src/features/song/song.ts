import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SongParams {
  tempo: number;
}

export interface ProjectInfo {
  name: string;
  id?: string;
}

export interface SongState {
  playing: boolean;
  params: SongParams;
  currentProject: ProjectInfo | undefined;
}

export const initialState: SongState = {
  playing: false,
  params: {
    tempo: 127.0,
  },
  currentProject: undefined,
};

export interface SongParamPayload {
  paramId: string;
  value: number;
}
export interface SaveAsPayload {
  name: string;
}
export interface LoadProjectPayload {
  project: ProjectInfo;
  params: SongParams;
}

export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    togglePlayback: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload == null) {
        state.playing = !state.playing;
        return;
      }
      state.playing = action.payload;
    },
    shutDownAudioEngine: (state, _) => {
      state.playing = false;
    },
    setParam: (state, action: PayloadAction<SongParamPayload>) => {
      if (state.params[action.payload.paramId as keyof SongParams] == null) {
        console.log(
          `Attempting to set song param ${action.payload.paramId} which does not exist`
        );
        return;
      }
      state.params[action.payload.paramId as keyof SongParams] =
        action.payload.value;
    },
    loadProject: (state, action: PayloadAction<LoadProjectPayload>) => {
      state.currentProject = action.payload.project;
      state.params = action.payload.params;
    },
    projectSavedAs: (state, action: PayloadAction<ProjectInfo>) => {
      state.currentProject = action.payload;
    },
    newProject: (state, _) => {
      state.currentProject = {
        name: "New project",
      };
    },
  },
});

export const {
  togglePlayback,
  shutDownAudioEngine,
  setParam,
  loadProject,
  newProject,
  projectSavedAs,
} = songSlice.actions;
export default songSlice.reducer;
