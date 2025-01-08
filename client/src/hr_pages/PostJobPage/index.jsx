import React from "react";
import { Button, CommonIcon, CommonTable } from "../../ui";
import ChipMui from "../../ui/Chip";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import useToggleDialog from "../../hooks/useToggleDialog";
import DialogMUI from "../../components/Dialogs";
import CreateEditPost from "./components/CreateEditPost";
import useGetAllPosts from "../../hooks/modules/post/useGetAllPosts";
import useGetAllCategories from "../../hooks/modules/category/useGetAllCategories";

const PostJobPage = () => {
  const { open, toggle, shouldRender } = useToggleDialog();
  const columns = [
    { id: "position", label: "Vị trí", numeric: false, sortable: true },
    { id: "status", label: "Trạng thái", numeric: false, sortable: true },
    { id: "postDate", label: "Ngày đăng", numeric: false, sortable: true },
    { id: "dueDate", label: "Ngày hết hạn", numeric: false, sortable: true },
    { id: "jobType", label: "Loại công việc", numeric: false, sortable: true },
    { id: "applicants", label: "Số ứng viên", numeric: false, sortable: true },
    { id: "action", label: "Hành động", numeric: true, sortable: false },
  ];

  const rows = [
    {
      id: 1,
      position: "FE developer",
      status: (
        <ChipMui label={"Đang tuyển"} variant={"outlined"} color={"warning"} />
      ),
      postDate: "10/06/2024",
      dueDate: "10/10/2024",
      jobType: (
        <ChipMui label={"Toàn thời gian"} variant={"outlined"} color={"info"} />
      ),
      applicants: 12,
      action: (
        <Box>
          <Button
            className="!rounded-full !aspect-square"
            sx={{ height: "fit-content" }}
            size="small"
          >
            <CommonIcon.DriveFileRenameOutlineTwoTone />
          </Button>
          <Button
            className="!rounded-full !aspect-square"
            sx={{ height: "fit-content" }}
            size="small"
          >
            <CommonIcon.DeleteTwoTone color="error" />
          </Button>
        </Box>
      ),
    },
    {
      id: 2,
      position: "FE developer",
      status: (
        <ChipMui label={"Đang tuyển"} variant={"outlined"} color={"warning"} />
      ),
      postDate: "10/06/2024",
      dueDate: "10/10/2024",
      jobType: (
        <ChipMui label={"Toàn thời gian"} variant={"outlined"} color={"info"} />
      ),
      applicants: 12,
      action: (
        <Box>
          <Button
            className="!rounded-full !aspect-square"
            sx={{ height: "fit-content" }}
            size="small"
          >
            <CommonIcon.DriveFileRenameOutlineTwoTone />
          </Button>
          <Button
            className="!rounded-full !aspect-square"
            sx={{ height: "fit-content" }}
            size="small"
          >
            <CommonIcon.DeleteTwoTone color="error" />
          </Button>
        </Box>
      ),
    },
    {
      id: 3,
      position: "FE developer",
      status: (
        <ChipMui label={"Đang tuyển"} variant={"outlined"} color={"warning"} />
      ),
      postDate: "10/06/2024",
      dueDate: "10/10/2024",
      jobType: (
        <ChipMui label={"Toàn thời gian"} variant={"outlined"} color={"info"} />
      ),
      applicants: 12,
      action: (
        <Box>
          <Button
            className="!rounded-full !aspect-square"
            sx={{ height: "fit-content" }}
            size="small"
          >
            <CommonIcon.DriveFileRenameOutlineTwoTone />
          </Button>
          <Button
            className="!rounded-full !aspect-square"
            sx={{ height: "fit-content" }}
            size="small"
          >
            <CommonIcon.DeleteTwoTone color="error" />
          </Button>
        </Box>
      ),
    },
    {
      id: 4,
      position: "FE developer",
      status: (
        <ChipMui label={"Đang tuyển"} variant={"outlined"} color={"warning"} />
      ),
      postDate: "10/06/2024",
      dueDate: "10/10/2024",
      jobType: (
        <ChipMui label={"Toàn thời gian"} variant={"outlined"} color={"info"} />
      ),
      applicants: 12,
      action: (
        <Box>
          <Button
            className="!rounded-full !aspect-square"
            sx={{ height: "fit-content" }}
            size="small"
          >
            <CommonIcon.DriveFileRenameOutlineTwoTone />
          </Button>
          <Button
            className="!rounded-full !aspect-square"
            sx={{ height: "fit-content" }}
            size="small"
          >
            <CommonIcon.DeleteTwoTone color="error" />
          </Button>
        </Box>
      ),
    },
    {
      id: 5,
      position: "FE developer",
      status: (
        <ChipMui label={"Đang tuyển"} variant={"outlined"} color={"warning"} />
      ),
      postDate: "10/06/2024",
      dueDate: "10/10/2024",
      jobType: (
        <ChipMui label={"Toàn thời gian"} variant={"outlined"} color={"info"} />
      ),
      applicants: 12,
      action: (
        <Box>
          <Button
            className="!rounded-full !aspect-square"
            sx={{ height: "fit-content" }}
            size="small"
          >
            <CommonIcon.DriveFileRenameOutlineTwoTone />
          </Button>
          <Button
            className="!rounded-full !aspect-square"
            sx={{ height: "fit-content" }}
            size="small"
          >
            <CommonIcon.DeleteTwoTone color="error" />
          </Button>
        </Box>
      ),
    },
    {
      id: 6,
      position: "FE developer",
      status: (
        <ChipMui label={"Đang tuyển"} variant={"outlined"} color={"warning"} />
      ),
      postDate: "10/06/2024",
      dueDate: "10/10/2024",
      jobType: (
        <ChipMui label={"Toàn thời gian"} variant={"outlined"} color={"info"} />
      ),
      applicants: 12,
      action: (
        <Box>
          <Button
            className="!rounded-full !aspect-square"
            sx={{ height: "fit-content" }}
            size="small"
          >
            <CommonIcon.DriveFileRenameOutlineTwoTone />
          </Button>
          <Button
            className="!rounded-full !aspect-square"
            sx={{ height: "fit-content" }}
            size="small"
          >
            <CommonIcon.DeleteTwoTone color="error" />
          </Button>
        </Box>
      ),
    },
    {
      id: 7,
      position: "FE developer",
      status: (
        <ChipMui label={"Đang tuyển"} variant={"outlined"} color={"warning"} />
      ),
      postDate: "10/06/2024",
      dueDate: "10/10/2024",
      jobType: (
        <ChipMui label={"Toàn thời gian"} variant={"outlined"} color={"info"} />
      ),
      applicants: 12,
      action: (
        <Box>
          <Button
            className="!rounded-full !aspect-square"
            sx={{ height: "fit-content" }}
            size="small"
          >
            <CommonIcon.DriveFileRenameOutlineTwoTone />
          </Button>
          <Button
            className="!rounded-full !aspect-square"
            sx={{ height: "fit-content" }}
            size="small"
          >
            <CommonIcon.DeleteTwoTone color="error" />
          </Button>
        </Box>
      ),
    },
    {
      id: 8,
      position: "FE developer",
      status: (
        <ChipMui label={"Đang tuyển"} variant={"outlined"} color={"warning"} />
      ),
      postDate: "10/06/2024",
      dueDate: "10/10/2024",
      jobType: (
        <ChipMui label={"Toàn thời gian"} variant={"outlined"} color={"info"} />
      ),
      applicants: 12,
      action: (
        <Box>
          <Button
            className="!rounded-full !aspect-square"
            sx={{ height: "fit-content" }}
            size="small"
          >
            <CommonIcon.DriveFileRenameOutlineTwoTone />
          </Button>
          <Button
            className="!rounded-full !aspect-square"
            sx={{ height: "fit-content" }}
            size="small"
          >
            <CommonIcon.DeleteTwoTone color="error" />
          </Button>
        </Box>
      ),
    },
    {
      id: 9,
      position: "FE developer",
      status: (
        <ChipMui label={"Đang tuyển"} variant={"outlined"} color={"warning"} />
      ),
      postDate: "05/06/2024",
      dueDate: "10/10/2024",
      jobType: (
        <ChipMui label={"Toàn thời gian"} variant={"outlined"} color={"info"} />
      ),
      applicants: 12,
      action: (
        <Box>
          <Button
            className="!rounded-full !aspect-square"
            sx={{ height: "fit-content" }}
            size="small"
          >
            <CommonIcon.DriveFileRenameOutlineTwoTone />
          </Button>
          <Button
            className="!rounded-full !aspect-square"
            sx={{ height: "fit-content" }}
            size="small"
          >
            <CommonIcon.DeleteTwoTone color="error" />
          </Button>
        </Box>
      ),
    },
    {
      id: 10,
      position: "FE developer",
      status: (
        <ChipMui label={"Đang tuyển"} variant={"outlined"} color={"warning"} />
      ),
      postDate: "10/06/2024",
      dueDate: "10/10/2024",
      jobType: (
        <ChipMui label={"Toàn thời gian"} variant={"outlined"} color={"info"} />
      ),
      applicants: 12,
      action: (
        <Box>
          <Button
            className="!rounded-full !aspect-square"
            sx={{ height: "fit-content" }}
            size="small"
          >
            <CommonIcon.DriveFileRenameOutlineTwoTone />
          </Button>
          <Button
            className="!rounded-full !aspect-square"
            sx={{ height: "fit-content" }}
            size="small"
          >
            <CommonIcon.DeleteTwoTone color="error" />
          </Button>
        </Box>
      ),
    },
    {
      id: 11,
      position: "FE developer",
      status: (
        <ChipMui label={"Đang tuyển"} variant={"outlined"} color={"warning"} />
      ),
      postDate: "10/06/2024",
      dueDate: "10/10/2024",
      jobType: (
        <ChipMui label={"Toàn thời gian"} variant={"outlined"} color={"info"} />
      ),
      applicants: 12,
      action: (
        <Box>
          <Button
            className="!rounded-full !aspect-square"
            sx={{ height: "fit-content" }}
            size="small"
          >
            <CommonIcon.DriveFileRenameOutlineTwoTone />
          </Button>
          <Button
            className="!rounded-full !aspect-square"
            sx={{ height: "fit-content" }}
            size="small"
          >
            <CommonIcon.DeleteTwoTone color="error" />
          </Button>
        </Box>
      ),
    },
  ];
  const handleDelete = (selectedIds) => {
    console.log("Delete rows with IDs:", selectedIds);
  };

  const handleRowClick = (event, row) => {
    console.log("Row clicked:", row);
  };
  // const { posts, error, loading } = useGetAllPosts();
  const { categories, error, loading } = useGetAllCategories();
  console.log(categories);

  return (
    <Box className="flex flex-col gap-y-5">
      <div className="flex justify-between p-5 bg-white rounded-md">
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 500,
            color: "var(--neutrals-100)",
          }}
        >
          Tuyển dụng
        </Typography>
        <Breadcrumbs
          separator={<CommonIcon.NavigateNext />}
          aria-label="breadcrumb"
          className="flex items-center"
        >
          <Link
            underline="hover"
            key="1"
            color="inherit"
            to={RouteBase.Home}
            className="text-primary"
          >
            <CommonIcon.Home fontSize="small" />
          </Link>
          <Typography
            key="3"
            sx={{ fontWeight: 500, fontSize: "14px", color: "text.primary" }}
          >
            Tuyển dụng
          </Typography>
        </Breadcrumbs>
      </div>
      <Box className="px-2 bg-white rounded-md">
        <CommonTable
          showCheckbox={false}
          toolbarRight={
            <Button
              onClick={toggle}
              className=" !text-primary"
              sx={{ backgroundColor: "var(--primary-light)" }}
            >
              <CommonIcon.Add />
            </Button>
          }
          columns={columns}
          data={rows}
          title="Danh sách việc làm"
          onDelete={handleDelete}
          onRowClick={handleRowClick}
        />
      </Box>
      {shouldRender && (
        <DialogMUI
          isPadding={false}
          disableScrollLock={true}
          className="w-fit"
          open={open}
          toggle={toggle}
          body={
            <CreateEditPost
              toggle={() => {
                toggle();
              }}
            />
          }
        />
      )}
    </Box>
  );
};

export default PostJobPage;
