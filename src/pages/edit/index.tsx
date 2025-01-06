import React, { useEffect, useState } from 'react';
import EditComponent from '../../screen/edit';
import { ProjectDto } from '../../types';
import { useParams } from 'react-router-dom';
import { ApiClient } from '../../service/axios';

const EditPage = () => {
  let { id } = useParams();

  const [project, setProject] = useState<ProjectDto>();

  useEffect(() => {
    ApiClient.get(`/projects/${id}`)
      .then((result) => {
        return result.data;
      })
      .then((data) => {
        setProject(data);
      });
  }, []);

  return project && <EditComponent project={project} />;
};

export default EditPage;
