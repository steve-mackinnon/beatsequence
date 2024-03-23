import { ProjectInfo } from "../entities/project";

export interface ListProjects {
  listProjects: () => Promise<ProjectInfo[] | undefined>;
}
