import React, { ReactElement, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { db } from "../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { List, ListItem, ListItemButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAppDispatch } from "../hooks";
import { tryLoadProject } from "../features/song/song";

interface ProjectInfo {
  id: string;
  name: string;
}

export default function Projects(): ReactElement {
  const auth = useContext(AuthContext);
  const [user, loading] = useAuthState(auth);
  const userLoggedIn = !(user == null && !loading);
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleLoadProjectClick = (info: ProjectInfo): void => {
    dispatch(
      tryLoadProject({
        name: info.name,
        id: info.id,
      })
    );
  };

  useEffect(() => {
    if (userLoggedIn) {
      return;
    }
    void router.push("/account/login");
  }, [router, user, loading, userLoggedIn]);

  useEffect(() => {
    if (user == null) {
      return;
    }
    setErrorLoading(false);
    const projectPermissions = collection(db, "project_permissions");
    const projectsQuery = query(
      projectPermissions,
      where("readers", "array-contains", user.uid),
      orderBy("timestamp", "desc")
    );
    const fetchProjects = async (): Promise<ProjectInfo[]> => {
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
      return projects;
    };
    fetchProjects()
      .then((projects) => {
        setProjects(projects);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setErrorLoading(true);
      });
  }, [user]);

  if (errorLoading) {
    return <span>Error fetching projects from server...</span>;
  }
  if (isLoading) {
    return <span>Loading...</span>;
  }
  const projectList = projects.map((project) => (
    <ListItem key={project.id}>
      <ListItemButton
        onClick={() => {
          handleLoadProjectClick(project);
        }}
      >
        {project.name}
      </ListItemButton>
    </ListItem>
  ));
  return (
    <Box padding="2rem" flexDirection="column" alignItems="flex-start">
      <Typography variant="h2">Projects</Typography>
      <List>{projectList}</List>
    </Box>
  );
}
