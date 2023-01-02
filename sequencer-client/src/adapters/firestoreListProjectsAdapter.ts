import { ListProjects } from "../ports/listProjects";
import { ProjectInfo } from "../entities/project";
import {
  Firestore,
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { Auth } from "firebase/auth";

export class FirestoreListProjectAdapter implements ListProjects {
  private readonly _db: Firestore;
  private readonly _auth: Auth;

  constructor(auth: Auth, db: Firestore) {
    this._db = db;
    this._auth = auth;
  }

  async listProjects(): Promise<ProjectInfo[] | undefined> {
    if (this._auth.currentUser == null) {
      return undefined;
    }
    try {
      const projectPermissions = collection(this._db, "project_permissions");
      const projectsQuery = query(
        projectPermissions,
        where("readers", "array-contains", this._auth.currentUser?.uid),
        orderBy("timestamp", "desc")
      );
      const projectDocs = await getDocs(projectsQuery);
      const projectInfos: ProjectInfo[] = [];
      projectDocs.forEach((doc) => {
        const data = doc.data();
        let name = "unknown";
        if (data.name != null) {
          name = data.name as string;
        } else {
          console.log(
            `name field not found for project with ID ${doc.id} from project_permissions`
          );
        }
        projectInfos.push({
          id: doc.id,
          name,
        });
      });
      return projectInfos;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }
}
