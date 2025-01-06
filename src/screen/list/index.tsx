import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Layout from '../../layout';
import { ProjectDto } from '../../types';
import { ApiClient } from '../../service/axios';
import { styled } from '@mui/material/styles';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addDays, format } from 'date-fns';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ListComponent = () => {
  const navigate = useNavigate();
  const total = useMemo(() => 20, []);

  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

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
    ApiClient.get(`/projects?page=${page + 1}&limit=${rowsPerPage}`)
      .then((result) => {
        return result.data;
      })
      .then((data) => {
        setProjects(
          data?.map((item: ProjectDto) => ({
            ...item,
          }))
        );
      });
  }, [page, rowsPerPage]);

  return (
    <Layout>
      <div className='w-full px-8 p-1 flex flex-col'>
        <span className='text-lg font-bold pr-2'>Project List Page</span>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell>Project ID</StyledTableCell>
                <StyledTableCell>Project Name</StyledTableCell>
                <StyledTableCell align='right'>Start Date</StyledTableCell>
                <StyledTableCell align='right'>End Date</StyledTableCell>
                <StyledTableCell align='center'>Favorite</StyledTableCell>
                <StyledTableCell>Project Manager</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <StyledTableRow key={project.id}>
                  <StyledTableCell>{project.id}</StyledTableCell>
                  <StyledTableCell>{project.name}</StyledTableCell>
                  <StyledTableCell align='right'>
                    {format(project.startDate, 'yyyy-MM-dd')}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {format(project.endDate, 'yyyy-MM-dd')}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {project.favorite ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </StyledTableCell>
                  <StyledTableCell>{project.projectManager}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant='contained'
                      onClick={(e) => handleEdit(e, project)}
                    >
                      Edit
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className=''>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={total}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  );
};

export default ListComponent;
