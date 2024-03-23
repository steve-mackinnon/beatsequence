import { Project, ProjectId } from "../entities/project";

export interface LoadProject {
  loadProject: (id: ProjectId) => Promise<Project | undefined>;
}
