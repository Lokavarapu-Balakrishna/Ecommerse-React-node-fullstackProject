import React from 'react';
import { Box, Pagination, Typography } from '@mui/material';

const CustomPagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  itemsPerPage,
  totalItems,
  onItemsPerPageChange
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      mt: 2,
      p: 2,
      bgcolor: 'background.paper',
      borderRadius: 1,
      boxShadow: 1
    }}>
      <Typography variant="body2" color="text.secondary">
        Showing {startItem} to {endItem} of {totalItems} items
      </Typography>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default CustomPagination; 