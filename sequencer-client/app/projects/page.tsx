"use client";

import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  getFirestore,
} from "firebase/firestore";
import { List, ListItem, ListItemButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useLoadProject from "../../hooks/useLoadProject";
import { useUser, useFirebaseApp } from "reactfire";

interface ProjectInfo {
  id: string;
  name: string;
}

export default function Projects(): ReactElement {
  const { data: user } = useUser();
  const router = useRouter();
  const app = useFirebaseApp();
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [errorLoading, setErrorLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadProject = useLoadProject();

  const handleLoadProjectClick = (info: ProjectInfo): void => {
    loadProject(info.id);
  };

  useEffect(() => {
    if (user != null) {
      return;
    }
    void router.push("/account/login");
  }, [router, user]);

  useEffect(() => {
    if (user == null) {
      return;
    }
    setErrorLoading(false);
    const db = getFirestore(app);
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
  }, [user, app]);

  if (errorLoading) {
    return <span>Error fetching projects from server...</span>;
  }
  if (loading) {
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
