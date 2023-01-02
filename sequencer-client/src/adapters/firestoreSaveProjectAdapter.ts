import { Project } from "../entities";
import { createProjectPayload } from "./firestorePersistenceAdapter";
import { db, app } from "../firebase";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ProjectId, SaveProject } from "../ports/saveProject";

export class FirestoreSaveProjectAdapter implements SaveProject {
  async saveProject(project: Project): Promise<boolean> {
    const auth = getAuth(app);
    if (auth.currentUser == null || project.song.id == null) {
      return false;
    }
    try {
      const projectPayload = createProjectPayload(
        project,
        auth.currentUser.uid
      );
      // Save the project to the "projects" collection in firestore
      const projectRef = doc(db, "projects", project.song.id);
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
    const auth = getAuth(app);
    if (auth.currentUser == null) {
      return undefined;
    }
    try {
      const projectPayload = createProjectPayload(
        project,
        auth.currentUser.uid
      );
      projectPayload.name = name;
      // Save the project to the "projects" collection in firestore
      const projectRef = await addDoc(
        collection(db, "projects"),
        projectPayload
      );
      // Give the current user read/write permissions for the new project
      await setDoc(doc(db, "project_permissions", projectRef.id), {
        timestamp: serverTimestamp(),
        name,
        writers: [auth.currentUser.uid],
        readers: [auth.currentUser.uid],
      });
      return projectRef.id;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }
}
