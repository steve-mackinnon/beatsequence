import { FirestoreSaveProjectAdapter } from "./adapters/firestoreSaveProjectAdapter";
import { SaveProject } from "./ports/saveProject";

export class PortProvider {
  private readonly _saveProjectAdapter: SaveProject =
    new FirestoreSaveProjectAdapter();

  get saveProjectAdapter(): SaveProject {
    return this._saveProjectAdapter;
  }
}
