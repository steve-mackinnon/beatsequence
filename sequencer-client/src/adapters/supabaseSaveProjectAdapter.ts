import { supabase } from "../supabase";
import { Project, ProjectId } from "../entities/project";
import { SaveProject } from "../ports/saveProject";

export class SupabaseSaveProjectAdapter implements SaveProject {
  async saveProjectAs: (project: Project, name: string) => Promise<string | undefined> {
    
  }
}
