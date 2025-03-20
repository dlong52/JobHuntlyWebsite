import { Skeleton, Box, Typography, Container } from "@mui/material";

const CompanyLoadingSkeleton = () => {
  return (
    <Container className="py-5">
      <Box className="rounded-md overflow-hidden relative">
        {/* Cover Image */}
        <Skeleton variant="rectangular" width="100%" height={225} />

        <Box className="relative">
          {/* Company Logo */}
          <Skeleton
            variant="circular"
            width={180}
            height={180}
            className="absolute -top-[90px] left-5"
          />
        </Box>

        {/* Company Name */}
        <Box className="bg-gradient-to-r from-primary-dark to-primary flex pl-[250px] pr-10 py-10">
          <Skeleton variant="text" width={200} height={30} />
        </Box>
      </Box>

      <Box className="grid grid-cols-12 mt-5 gap-5">
        {/* Left Column */}
        <Box className="col-span-8 flex flex-col gap-5">
          {/* Giới thiệu công ty */}
          <Box className="rounded-md overflow-hidden shadow">
            <Box className="bg-gradient-to-r from-primary-dark to-primary px-6 py-2">
              <Skeleton variant="text" width={180} height={25} />
            </Box>
            <Box className="p-5">
              <Skeleton variant="text" width="90%" height={20} />
              <Skeleton variant="text" width="80%" height={20} />
              <Skeleton variant="text" width="85%" height={20} />
            </Box>
          </Box>

          {/* Tuyển dụng */}
          <Box className="rounded-md overflow-hidden shadow">
            <Box className="bg-gradient-to-r from-primary-dark to-primary px-6 py-2">
              <Skeleton variant="text" width={120} height={25} />
            </Box>
            <div className="p-5 flex flex-col gap-6">
              {[...Array(3)].map((_, index) => (
                <Box key={index} className="flex items-center gap-4">
                  <Skeleton variant="circular" width={50} height={50} />
                  <Box className="flex-1">
                    <Skeleton variant="text" width="80%" height={20} />
                    <Skeleton variant="text" width="60%" height={15} />
                  </Box>
                </Box>
              ))}
            </div>
          </Box>
        </Box>

        {/* Right Column */}
        <Box className="col-span-4 flex flex-col gap-5">
          {/* Thông tin liên hệ */}
          <Box className="rounded-md overflow-hidden shadow">
            <Box className="bg-gradient-to-r from-primary-dark to-primary px-6 py-2">
              <Skeleton variant="text" width={180} height={25} />
            </Box>
            <div className="p-4">
              <Skeleton variant="text" width="60%" height={20} />
              <Skeleton variant="text" width="80%" height={20} />
            </div>
          </Box>

          {/* Chia sẻ công ty */}
          <Box className="rounded-md overflow-hidden shadow">
            <Box className="bg-gradient-to-r from-primary-dark to-primary px-6 py-2">
              <Skeleton variant="text" width={200} height={25} />
            </Box>
            <div className="p-5 flex flex-col gap-5">
              <Skeleton variant="rectangular" width="100%" height={40} />
              <Box className="flex gap-2">
                {[...Array(3)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="circular"
                    width={48}
                    height={48}
                  />
                ))}
              </Box>
            </div>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default CompanyLoadingSkeleton;
