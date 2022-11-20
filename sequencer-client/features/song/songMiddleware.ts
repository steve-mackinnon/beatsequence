import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  togglePlayback,
  setParam,
  shutDownAudioEngine,
  SongParams,
  saveAs,
} from "./song";
import { RootState } from "../../store";
import { audioEngine, sequencerEngine } from "../../engine";
import { db, auth } from "../../firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

export const songListenerMiddleware = createListenerMiddleware();

songListenerMiddleware.startListening({
  actionCreator: togglePlayback,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    audioEngine.playing = state.song.playing;
  },
});

songListenerMiddleware.startListening({
  actionCreator: shutDownAudioEngine,
  effect: (action, listenerApi) => {
    audioEngine.playing = false;
    void audioEngine.shutDown();
  },
});

songListenerMiddleware.startListening({
  actionCreator: setParam,
  effect: (action, listenerApi) => {
    sequencerEngine.params[action.payload.paramId as keyof SongParams] =
      action.payload.value;
  },
});

songListenerMiddleware.startListening({
  actionCreator: saveAs,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const projectName = state.song.name;
    if (projectName.length === 0 || projectName.trim().length === 0) {
      throw new Error(
        "Invalid project name. Length must be greater than zero and contain non-space charaters."
      );
    }
    if (auth.currentUser == null) {
      throw new Error(
        "Attempting to save a project without user authentication."
      );
    }
    // Save the project to the "projects" collection in firestore
    const projectRef = await addDoc(collection(db, "projects"), {
      name: projectName,
      song: state.song,
      tracks: state.tracks,
      steps: state.steps,
    });
    // Give the current user read/write permissions for the new project
    await setDoc(doc(db, "project_permissions", projectRef.id), {
      writers: [auth.currentUser.uid],
      readers: [auth.currentUser.uid],
    });
  },
});
