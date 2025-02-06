import React from 'react';
import { Skeleton, Box, Grid } from '@mui/material';

const LoadingForm = () => {
  return (
    <Box className="min-w-[500px]" padding={2}>
      <Grid container spacing={2}>
        {/* Skeleton for form title */}
        <Grid item xs={6}>
          <Skeleton variant="text" width="40%" height={30} />
          <Skeleton variant="rectangular" width="100%" height={50} style={{ marginTop: 8 }} />
        </Grid>

        {/* Skeleton for input fields */}
        <Grid item xs={6}>
          <Skeleton variant="text" width="40%" height={30} />
          <Skeleton variant="rectangular" width="100%" height={50} style={{ marginTop: 8 }} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="text" width="100%" height={30} />
          <Skeleton variant="rectangular" width="100%" height={50} style={{ marginTop: 8 }} />
        </Grid>

        {/* Skeleton for buttons */}
        <Grid item xs={12}>
          <Skeleton variant="rectangular" width="100%" height={50} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoadingForm;
