import React, { useCallback, useMemo, useState } from 'react';
import { ProjectDto } from '../../types';
import Layout from '../../layout';
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material';
import { format } from 'date-fns';
import { ApiClient } from '../../service/axios';
import { useNavigate } from 'react-router-dom';

interface IProps {
  project: ProjectDto;
}

const EditComponent = (props: IProps) => {
  const navigate = useNavigate();
  const project = useMemo(() => props.project, [props]);

  const [name, setName] = useState<string>(project?.name || '');
  const [description, setDescription] = useState<string>(
    project?.description || ''
  );
  const [startDate, setStartDate] = useState<string>(
    format(project?.startDate, 'yyyy-MM-dd')
  );
  const [endDate, setEndDate] = useState<string>(
    format(project?.endDate, 'yyyy-MM-dd')
  );
  const [favorite, setFavorite] = useState<boolean>(project?.favorite || false);
  const [projectManager, setProjectManager] = useState<string>(
    project?.projectManager || ''
  );
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      navigate('/');
    },
    []
  );

  const handleEdit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      ApiClient.put(`/projects/${project.id}`, {
        name,
        description,
        startDate,
        endDate,
        projectManager,
        favorite,
      })
        .then((result) => {
          if (result.data.id) {
            navigate('/');
          } else {
            setErrorMessage('Failed to update project');
          }
        })
        .catch((error) => {
          setErrorMessage(JSON.stringify(error));
        });
    },
    [name, description, startDate, endDate, projectManager, favorite]
  );

  return (
    <Layout>
      <div className='w-full px-8 p-1 flex flex-col gap-3'>
        <span className='text-lg font-bold pr-2'>Project Edit Page</span>
        {project?.id ? (
          <Box
            component='form'
            sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
            noValidate
            autoComplete='off'
          >
            <div>
              <TextField
                id='outlined-error'
                label='Project ID'
                value={project.id}
                disabled
              />
            </div>
            <div>
              <TextField
                error={name.length === 0}
                id='outlined-error'
                label='Project Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <TextField
                id='outlined-error'
                multiline
                rows={4}
                label='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <TextField
                error={startDate.length === 0}
                id='filled-error'
                label='Start Date'
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <TextField
                error={endDate.length === 0}
                id='filled-error'
                label='End Date'
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div>
              <TextField
                error={projectManager.length === 0}
                id='outlined-error'
                label='Project Manager'
                value={projectManager}
                onChange={(e) => setProjectManager(e.target.value)}
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Switch
                    checked={favorite}
                    onChange={(e) => setFavorite(e.target.checked)}
                  />
                }
                label='Favorite'
              />
            </div>
            {errorMessage && (
              <div className='pt-6 italic text-red-500'>{errorMessage}</div>
            )}
            <div className='flex gap-2 pt-4'>
              <Button
                variant='contained'
                color='error'
                onClick={(e) => handleCancel(e)}
              >
                Cancel
              </Button>
              <Button
                variant='contained'
                color='success'
                onClick={(e) => handleEdit(e)}
              >
                Edit
              </Button>
            </div>
          </Box>
        ) : (
          <span>Invalid project</span>
        )}
      </div>
    </Layout>
  );
};

export default EditComponent;
