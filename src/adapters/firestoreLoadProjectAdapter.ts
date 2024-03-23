import { Project, ProjectId } from "../entities";
import { LoadProject } from "../ports/loadProject";
import { Auth } from "firebase/auth";
import { doc, getDoc, Firestore } from "firebase/firestore";
import {
  extractProjectFromPayload,
  ProjectPayload,
} from "./firestorePersistenceAdapter";

export class FirestoreLoadProjectAdapter implements LoadProject {
  private readonly _auth: Auth;
  private readonly _db: Firestore;
  constructor(auth: Auth, db: Firestore) {
    this._auth = auth;
    this._db = db;
  }

  async loadProject(projectId: ProjectId): Promise<Project | undefined> {
    if (this._auth.currentUser == null) {
      return undefined;
    }
    try {
      const projectRef = doc(this._db, "projects", projectId);
      const projectSnap = await getDoc(projectRef);
      if (projectSnap.exists()) {
        const projectState = projectSnap.data();
        const project = extractProjectFromPayload(
          projectState as ProjectPayload
        );
        project.song.id = projectId;
        return project;
      } else {
        // doc.data() will be undefined in this case
        console.log("Project does not exist!");
        return undefined;
      }
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }
}
