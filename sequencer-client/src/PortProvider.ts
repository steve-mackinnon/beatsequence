import {
  FirestoreLoadProjectAdapter,
  FirestoreSaveProjectAdapter,
  FirebaseCreateUserAdapter,
  FirebaseSignOutAdapter,
  FirebaseResetPasswordAdapter,
  FirebaseSignInAdapter,
  FirestoreListProjectAdapter,
} from "./adapters";
import {
  SaveProject,
  LoadProject,
  CreateUser,
  SignOut,
  ResetPassword,
  SignIn,
} from "./ports";
import { db, auth } from "./firebase";
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

  private readonly _signOutAdapter: SignOut = new FirebaseSignOutAdapter(auth);

  private readonly _resetPasswordAdapter: ResetPassword =
    new FirebaseResetPasswordAdapter(auth);

  private readonly _signInAdapter: SignIn = new FirebaseSignInAdapter(auth);

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

  get signOutAdapter(): SignOut {
    return this._signOutAdapter;
  }

  get resetPasswordAdapter(): ResetPassword {
    return this._resetPasswordAdapter;
  }

  get signInAdapter(): SignIn {
    return this._signInAdapter;
  }
}
