import { Project, ProjectId } from "../entities";
import { createProjectPayload } from "./firestorePersistenceAdapter";
import { Auth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  serverTimestamp,
  Firestore,
} from "firebase/firestore";
import { SaveProject } from "../ports/saveProject";

export class FirestoreSaveProjectAdapter implements SaveProject {
  private readonly _auth: Auth;
  private readonly _db: Firestore;
  constructor(auth: Auth, db: Firestore) {
    this._auth = auth;
    this._db = db;
  }

  async saveProject(project: Project): Promise<boolean> {
    if (this._auth.currentUser == null || project.song.id == null) {
      return false;
    }
    try {
      const projectPayload = createProjectPayload(
        project,
        this._auth.currentUser.uid
      );
      // Save the project to the "projects" collection in firestore
      const projectRef = doc(this._db, "projects", project.song.id);
      await setDoc(projectRef, projectPayload);
    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  }

  async saveProjectAs(
    project: Project,
    name: string
  ): Promise<ProjectId | undefined> {
    if (this._auth.currentUser == null) {
      return undefined;
    }
    try {
      const projectPayload = createProjectPayload(
        project,
        this._auth.currentUser.uid
      );
      projectPayload.name = name;
      // Save the project to the "projects" collection in firestore
      const projectRef = await addDoc(
        collection(this._db, "projects"),
        projectPayload
      );
      // Give the current user read/write permissions for the new project
      await setDoc(doc(this._db, "project_permissions", projectRef.id), {
        timestamp: serverTimestamp(),
        name,
        writers: [this._auth.currentUser.uid],
        readers: [this._auth.currentUser.uid],
      });
      return projectRef.id;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }
}
