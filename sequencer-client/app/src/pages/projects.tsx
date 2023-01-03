import React, { ReactElement, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { List, ListItem, ListItemButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAuth, useLoadProject, useProjects, ProjectInfo } from "../hooks";

export default function Projects(): ReactElement {
  const navigate = useNavigate();
  const { uid } = useAuth();
  const { projects, error } = useProjects();
  const loadProject = useLoadProject();

  const handleLoadProjectClick = async (info: ProjectInfo): Promise<void> => {
    await loadProject(info.id);
  };

  useEffect(() => {
    if (uid != null) {
      return;
    }
    navigate("/account/login");
  }, [navigate, uid]);

  if (error != null) {
    return <span>{error}</span>;
  }
  if (projects == null) {
    return <span>Loading...</span>;
  }
  const projectList = projects.map((project) => (
    <ListItem key={project.id}>
      <ListItemButton
        onClick={() => {
          void (async () => {
            await handleLoadProjectClick(project);
          })();
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
