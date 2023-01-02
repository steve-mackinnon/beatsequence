import { Project } from "../entities/project";

export type ProjectId = string;
export interface SaveProject {
  saveProject: (project: Project) => Promise<boolean>;
  saveProjectAs: (
    project: Project,
    name: string
  ) => Promise<ProjectId | undefined>;
}
