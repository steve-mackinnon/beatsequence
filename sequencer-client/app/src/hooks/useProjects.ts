import { useState, useEffect, useContext } from "react";
import { PortProviderContext } from "../context/PortProviderContext";

export interface ProjectInfo {
  id: string;
  name: string;
}

export type ProjectList = ProjectInfo[];

export interface ProjectsHook {
  projects?: ProjectList;
  error?: string;
}
export function useProjects(): ProjectsHook {
  const portProvider = useContext(PortProviderContext);
  const [projects, setProjects] = useState<ProjectList | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  // Asynchronously fetch data when the user signs in
  useEffect(() => {
    // Bail out if we already have data
    if (projects != null) {
      return;
    }
    portProvider.listProjectsAdapter
      .listProjects()
      .then((projectList) => {
        if (projectList == null) {
          setError("Failed to fetch projects");
          return;
        }
        setProjects(projectList);
      })
      .catch((error) => {
        setError(error.message);
      });
  });

  return {
    projects,
    error,
  };
}
