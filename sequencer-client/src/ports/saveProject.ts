import { Project, ProjectId } from "../entities/project";

export interface SaveProject {
  saveProject: (project: Project) => Promise<boolean>;
  saveProjectAs: (
    project: Project,
    name: string
  ) => Promise<ProjectId | undefined>;
}
