import { Skeleton, Box, Typography, Divider, Button } from "@mui/material";

const PaymentLoading = () => {
  return (
    <Box className="text-neutrals-100 relative">
      {/* Layout chính */}
      <Box className="grid grid-cols-12 gap-5">
        {/* Left Section */}
        <Box className="col-span-8 space-y-5">
          {/* User Info Skeleton */}
          <Box className="p-6 flex flex-col gap-2 bg-white rounded-lg shadow">
            <Skeleton variant="text" width={180} height={30} />
            <Box className="grid grid-cols-3 gap-4">
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="100%" height={20} />
            </Box>
            <Skeleton variant="rectangular" width="100%" height={50} className="mt-4" />
          </Box>

          {/* Payment Detail Skeleton */}
          <Box className="p-6 bg-white rounded-lg shadow-lg border">
            <Skeleton variant="text" width={180} height={30} />
            <Box className="flex gap-4 items-center my-4 p-4 rounded shadow">
              <Skeleton variant="rectangular" width={80} height={80} />
              <Box className="flex flex-col gap-2">
                <Skeleton variant="text" width={150} height={20} />
                <Skeleton variant="text" width={100} height={20} />
              </Box>
            </Box>
            <Box className="space-y-3 border rounded p-5 mt-4">
              <Skeleton variant="text" width="70%" height={30} />
              <Skeleton variant="text" width="90%" height={20} />
              <Skeleton variant="text" width="80%" height={20} />
              <Skeleton variant="rectangular" width="100%" height={50} className="mt-3" />
              <Box>
                <Skeleton variant="text" width={100} height={20} />
                <Box className="flex flex-col gap-2 mt-2">
                  <Skeleton variant="text" width="80%" height={20} />
                  <Skeleton variant="text" width="75%" height={20} />
                  <Skeleton variant="text" width="90%" height={20} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right Section */}
        <Box className="col-span-4 p-6 sticky top-0 bg-white rounded-lg shadow flex flex-col gap-4 h-fit">
          <Skeleton variant="text" width={150} height={30} />
          <Divider className="my-4" />
          <Box className="flex flex-col gap-2">
            <Box className="flex justify-between items-center">
              <Skeleton variant="text" width="40%" height={20} />
              <Skeleton variant="text" width="20%" height={20} />
            </Box>
            <Box className="flex justify-between items-center">
              <Skeleton variant="text" width="40%" height={20} />
              <Skeleton variant="text" width="20%" height={20} />
            </Box>
            <Box className="flex justify-between items-center">
              <Skeleton variant="text" width="40%" height={20} />
              <Skeleton variant="text" width="20%" height={20} />
            </Box>
          </Box>
          <Divider className="my-4" />
          <Box className="flex justify-between">
            <Skeleton variant="text" width="30%" height={25} />
            <Skeleton variant="text" width="30%" height={25} />
          </Box>

          <Skeleton variant="rectangular" width="100%" height={50} className="mt-5" />
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentLoading;
