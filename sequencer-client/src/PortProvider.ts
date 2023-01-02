import { FirestoreLoadProjectAdapter } from "./adapters/firestoreLoadProjectAdapter";
import { FirestoreSaveProjectAdapter } from "./adapters/firestoreSaveProjectAdapter";
import { SaveProject } from "./ports/saveProject";
import { LoadProject } from "./ports/loadProject";
import { db, auth } from "./firebase";
import { FirestoreListProjectAdapter } from "./adapters/firestoreListProjectsAdapter";
import { ListProjects } from "./ports/listProjects";

export class PortProvider {
  private readonly _saveProjectAdapter: SaveProject =
    new FirestoreSaveProjectAdapter(auth, db);

  private readonly _loadProjectAdapter: LoadProject =
    new FirestoreLoadProjectAdapter(auth, db);

  private readonly _listProjectsAdapter: ListProjects =
    new FirestoreListProjectAdapter(auth, db);

  get saveProjectAdapter(): SaveProject {
    return this._saveProjectAdapter;
  }

  get loadProjectAdapter(): LoadProject {
    return this._loadProjectAdapter;
  }

  get listProjectsAdapter(): ListProjects {
    return this._listProjectsAdapter;
  }
}
