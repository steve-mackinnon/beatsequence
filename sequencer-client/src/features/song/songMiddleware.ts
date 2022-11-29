import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  togglePlayback,
  setParam,
  shutDownAudioEngine,
  SongParams,
  trySaveAs,
  tryLoadProject,
  setProjectInfo,
  loadProject,
} from "./song";
import { setTrackStates, TrackState } from "../tracks/tracks";
import { setStepStates, StepState } from "../steps/steps";
import { RootState, store } from "../../store";
import { audioEngine, sequencerEngine } from "../../engine";
import { db, auth } from "../../firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import Router from "next/router";
export const songListenerMiddleware = createListenerMiddleware();

interface SongStorage {
  name: string;
  params: SongParams;
}

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
  actionCreator: trySaveAs,
  effect: async (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const projectToSave = state.song.projectToSave;
    if (
      projectToSave == null ||
      projectToSave.name.length === 0 ||
      projectToSave.name.trim().length === 0
    ) {
      throw new Error(
        "Invalid project name. Length must be greater than zero and contain non-space charaters."
      );
    }
    if (auth.currentUser == null) {
      throw new Error(
        "Attempting to save a project without user authentication."
      );
    }
    try {
      // Save the project to the "projects" collection in firestore
      const projectRef = await addDoc(collection(db, "projects"), {
        name: projectToSave.name,
        tracks: state.tracks,
        steps: state.steps,
        writers: [auth.currentUser.uid],
        readers: [auth.currentUser.uid],
        song: {
          name: state.song.projectToSave?.name,
          params: state.song.params,
        },
      });
      // Give the current user read/write permissions for the new project
      await setDoc(doc(db, "project_permissions", projectRef.id), {
        timestamp: serverTimestamp(),
        name: projectToSave.name,
        writers: [auth.currentUser.uid],
        readers: [auth.currentUser.uid],
      });
      store.dispatch(
        setProjectInfo({
          name: projectToSave.name,
          id: projectRef.id,
        })
      );
    } catch (e) {
      console.log(e);
    }
  },
});

songListenerMiddleware.startListening({
  actionCreator: tryLoadProject,
  effect: async (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    if (state.song.projectToLoad == null) {
      throw new Error(
        "projectToLoad must be specified in order to load project."
      );
    }
    if (auth.currentUser == null) {
      throw new Error(
        "Attempting to load a project without user authentication."
      );
    }
    try {
      const projectRef = doc(db, "projects", state.song.projectToLoad.id);
      const projectSnap = await getDoc(projectRef);

      if (projectSnap.exists()) {
        const projectState = projectSnap.data();
        const trackStates = projectState.tracks;
        if (trackStates == null) {
          throw new Error("tracks object was missing from project.");
        }
        store.dispatch(setTrackStates(trackStates as TrackState[]));

        const stepStates = projectState.steps;
        if (stepStates == null) {
          throw new Error("steps object was missing from project.");
        }
        store.dispatch(setStepStates(stepStates as StepState[]));

        const songState = projectState.song as SongStorage | undefined;
        if (songState == null) {
          throw new Error("song object was missing from project.");
        }
        store.dispatch(
          loadProject({
            project: {
              name: songState.name,
              id: state.song.projectToLoad.id,
            },
            params: songState.params,
          })
        );

        if (Router.pathname !== "/makebeats") {
          await Router.push("/makebeats");
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (e) {
      console.log(e);
    }
  },
});
