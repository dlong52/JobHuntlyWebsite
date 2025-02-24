import React from 'react';
import { Box, Container, Typography, Skeleton, Divider } from '@mui/material';

const JobDetailLoading = () => {
  return (
    <Box className="w-full mt-header">
      <Container className="py-10">
        <Box className="grid grid-cols-12 gap-5">
          <Box className="col-span-8 flex flex-col gap-y-5">
            <Box className="bg-white p-5 rounded-md flex flex-col gap-5">
              <Skeleton variant="text" width="60%" height={40} />
              <Box className="flex justify-between py-2">
                {[1, 2, 3].map((item) => (
                  <Box key={item} className="flex items-center gap-3 flex-1">
                    <Skeleton variant="circular" width={40} height={40} />
                    <Box>
                      <Skeleton variant="text" width="80px" height={20} />
                      <Skeleton variant="text" width="60%" height={20} />
                    </Box>
                  </Box>
                ))}
              </Box>
              <Skeleton variant="text" width="40%" height={20} />
              <Box className="flex gap-3">
                <Skeleton variant="rectangular" width="80%" height={40} />
                <Skeleton variant="rectangular" width="20%" height={40} />
              </Box>
            </Box>
            <Box className="bg-white p-5 rounded-md flex flex-col gap-y-5">
              <Box className="flex gap-3">
                <Divider orientation="vertical" className="bg-primary w-[6px]" flexItem />
                <Skeleton variant="text" width="30%" height={40} />
              </Box>
              {[1, 2, 3, 4].map((item) => (
                <Box key={item} className="flex flex-col gap-2">
                  <Skeleton variant="text" width="20%" height={20} />
                  <Skeleton variant="rectangular" width="100%" height={100} />
                </Box>
              ))}
              <Box className="flex flex-col gap-5">
                <Skeleton variant="text" width="20%" height={20} />
                <Skeleton variant="rectangular" width="100%" height={100} />
              </Box>
            </Box>
          </Box>
          <Box className="col-span-4 flex flex-col gap-y-5">
            <Box className="bg-white p-5 rounded-md flex flex-col gap-5">
              <Box className="flex gap-5">
                <Skeleton variant="rectangular" width={80} height={80} />
                <Skeleton variant="text" width="50%" height={40} />
              </Box>
              <Box className="flex flex-col gap-y-3">
                {[1, 2, 3].map((item) => (
                  <Box key={item} className="flex gap-2 items-start">
                    <Skeleton variant="text" width="20%" height={20} />
                    <Skeleton variant="text" width="60%" height={20} />
                  </Box>
                ))}
              </Box>
            </Box>
            <Box className="bg-white p-5 rounded-md flex flex-col gap-5">
              <Skeleton variant="text" width="30%" height={40} />
              {[1, 2, 3, 4, 5].map((item) => (
                <Box key={item} className="flex items-center gap-3 flex-1">
                  <Skeleton variant="circular" width={40} height={40} />
                  <Box>
                    <Skeleton variant="text" width="80px" height={20} />
                    <Skeleton variant="text" width="60%" height={20} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default JobDetailLoading;