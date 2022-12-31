import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  getFirestore,
} from "firebase/firestore";
import { getApp } from "firebase/app";
import { useAuth } from "./useAuth";

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
  const { uid } = useAuth();
  const app = getApp();
  const db = getFirestore(app);
  const [projects, setProjects] = useState<ProjectList | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  // Asynchronously fetch data when the user signs in
  useEffect(() => {
    async function fetchData(): Promise<void> {
      console.log("Fetch projects");
      if (uid == null) {
        setError("Unable to fetch projects: user is not signed in.");
        return;
      }
      try {
        const projectPermissions = collection(db, "project_permissions");
        const projectsQuery = query(
          projectPermissions,
          where("readers", "array-contains", uid),
          orderBy("timestamp", "desc")
        );
        console.log("Fetch projects");
        const projectDocs = await getDocs(projectsQuery);
        const projects: ProjectInfo[] = [];
        projectDocs.forEach((doc) => {
          const data = doc.data();
          let name = "unknown";
          if (data.name != null) {
            name = data.name as string;
          } else {
            console.log(
              `name field not found for project with ID ${doc.id} from project_permissions`
            );
          }
          projects.push({
            id: doc.id,
            name,
          });
        });
        setProjects(projects);
        setError(undefined);
      } catch (e) {
        console.log(e);
        setError(
          "An error occurred while fetching projects from the server. Please try again later."
        );
      }
    }
    fetchData().catch((e) => {
      console.log(e);
      setError(
        "An error occurred while fetching projects from the server. Please try again later."
      );
    });
  }, [uid, db]);

  return {
    projects,
    error,
  };
}
