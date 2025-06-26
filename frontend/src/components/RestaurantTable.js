import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography,
  TableSortLabel, TablePagination, TextField
} from '@mui/material';

const RestaurantTable = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [orderBy, setOrderBy] = useState('rating');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/restaurants')
      .then(res => setRestaurants(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[orderBy];
    const bVal = b[orderBy];
    if (typeof aVal === 'string') return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    return order === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const paginated = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>Restaurant Listings</Typography>

      <TextField
        label="Search by name"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {['name', 'rating', 'cuisine'].map((col) => (
                <TableCell key={col}>
                  <TableSortLabel
                    active={orderBy === col}
                    direction={orderBy === col ? order : 'asc'}
                    onClick={() => handleSort(col)}
                  >
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((r, idx) => (
              <TableRow key={idx}>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.rating}</TableCell>
                <TableCell>{r.cuisine}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sorted.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default RestaurantTable;
