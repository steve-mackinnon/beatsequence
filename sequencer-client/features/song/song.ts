import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SongParams {
  tempo: number;
}

export interface ProjectInfo {
  name: string;
  id: string;
}

export interface SongState {
  playing: boolean;
  params: SongParams;
  currentProject: ProjectInfo | undefined;
  projectToLoad: ProjectInfo | undefined;
  projectToSave: ProjectInfo | undefined;
}

export const initialState: SongState = {
  playing: false,
  params: {
    tempo: 127.0,
  },
  currentProject: undefined,
  projectToLoad: undefined,
  projectToSave: undefined,
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
    togglePlayback: (state, _) => {
      state.playing = !state.playing;
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
    resetState: (state, action) => {},
    trySaveAs: (state, action: PayloadAction<SaveAsPayload>) => {
      if (
        action.payload.name.length === 0 ||
        action.payload.name.trim().length === 0
      ) {
        console.log(
          "Invalid project name. Length must be greater than zero and contain non-space charaters."
        );
        return;
      }
      state.projectToSave = {
        name: action.payload.name,
        id: "",
      };
    },
    setProjectInfo: (state, action: PayloadAction<ProjectInfo>) => {
      state.currentProject = action.payload;
    },
    tryLoadProject: (state, action: PayloadAction<ProjectInfo>) => {
      state.projectToLoad = action.payload;
    },
    loadProject: (state, action: PayloadAction<LoadProjectPayload>) => {
      state.currentProject = action.payload.project;
      state.params = action.payload.params;
      state.projectToLoad = undefined;
    },
  },
});

export const {
  togglePlayback,
  shutDownAudioEngine,
  resetState,
  setParam,
  trySaveAs,
  tryLoadProject,
  loadProject,
  setProjectInfo,
} = songSlice.actions;
export default songSlice.reducer;
