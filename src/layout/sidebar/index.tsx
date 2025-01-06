import React, { useCallback, useEffect, useState } from 'react';
import { ProjectDto } from '../../types';
import { ApiClient } from '../../service/axios';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const navigate = useNavigate();
  
  const [favoriteProjects, setFavoriteProjects] = useState<ProjectDto[]>([]);

  const handleEdit = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      project: ProjectDto
    ) => {
      e.preventDefault();
      navigate(`/edit/${project.id}`);
    },
    []
  );

  useEffect(() => {
    ApiClient.get('/projects?page=1&limit=10')
      .then((result) => result.data)
      .then((data: ProjectDto[]) => {
        console.log('data', data);
        setFavoriteProjects(data?.filter((item) => item?.favorite));
      });
  }, []);

  return (
    <div
      className='lg:flex-col w-[300px] p-1 hidden lg:flex'
      style={{ borderRight: '1px solid gray' }}
    >
      <span className='text-lg font-bold'>Favorite Projects</span>
      <div>
        <List>
          {favoriteProjects?.map((project) => (
            <ListItem key={project.id} disablePadding>
              <ListItemButton onClick={(e) => handleEdit(e, project)}>
                <ListItemText primary={project.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};
