import { FirestoreLoadProjectAdapter } from "./adapters/firestoreLoadProjectAdapter";
import { FirestoreSaveProjectAdapter } from "./adapters/firestoreSaveProjectAdapter";
import { FirebaseCreateUserAdapter } from "./adapters/firebaseCreateUserAdapter";
import { SaveProject } from "./ports/saveProject";
import { LoadProject } from "./ports/loadProject";
import { CreateUser } from "./ports/createUser";
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

  private readonly _createUserAdapter: CreateUser =
    new FirebaseCreateUserAdapter(auth);

  get saveProjectAdapter(): SaveProject {
    return this._saveProjectAdapter;
  }

  get loadProjectAdapter(): LoadProject {
    return this._loadProjectAdapter;
  }

  get listProjectsAdapter(): ListProjects {
    return this._listProjectsAdapter;
  }

  get createUserAdapter(): CreateUser {
    return this._createUserAdapter;
  }
}
