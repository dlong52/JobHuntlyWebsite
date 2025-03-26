import {
  BorderColorOutlined,
  DriveFileMoveOutlined,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useToggleDialog } from "../../../../hooks";
import { Box, Skeleton } from "@mui/material";
import DialogCustom from "../../../../components/Dialogs";
import { useNavigate } from "react-router-dom";
import { RouteBase } from "../../../../constants/routeUrl";
import { Button } from "../../../../ui";
import CVTemplate from "../../../CreateCVPage/components/CvTemplate";
import { useSelector } from "react-redux";
import { useNotifications } from "../../../../utils/notifications";
import { ROLE } from "../../../../constants/enum";

const CVItem = ({ data }) => {
  const { is_verified, role } = useSelector((state) => state.user);
  const { showInfo } = useNotifications();
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { open, toggle, shouldRender } = useToggleDialog();

  const toggleDialog = () => {
    toggle();
    if (!open) {
      setIsHovered(true);
    } else {
      setTimeout(() => {
        setIsHovered(false);
      }, 300);
    }
  };

  const Content = () => {
    return (
      <Box className="grid grid-cols-12 gap-6 bg-white">
        <Box className="col-span-9 p-5 overflow-auto h-[500px]">
          <CVTemplate isMock code={data?.theme_code} />
        </Box>
        <Box className="col-span-3 flex flex-col gap-10 h-fit">
          <h1 className="font-bold text-xl text-primary">
            Mẫu CV {data?.name}
          </h1>
          <Box className="flex flex-col gap-5">
            <Button
              onClick={() => {
                if (role !== ROLE.CANDIDATE) {
                  showInfo("Bạn cần đăng nhập để thực hiện chức năng này!");
                  return;
                }
                if (!is_verified) {
                  navigate(RouteBase.VerifyAccount);
                  return;
                }
                navigate(`${RouteBase.CVTemplate}/${data?._id}`);
              }}
              startIcon={<BorderColorOutlined />}
              className="!py-2 !px-4 w-full !bg-primary text-center !text-white"
            >
              Dùng mẫu này
            </Button>
            <Button
              onClick={toggleDialog}
              variant="outlined"
              className="!py-1 w-full border !border-primary !text-primary rounded-sm"
            >
              Đóng lại
            </Button>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Box
        className="w-full bg-white rounded-lg border hover:border-primary transition-all duration-300 hover:shadow-xl overflow-hidden p-5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => !open && setIsHovered(false)}
      >
        <Box className="w-full flex flex-col justify-end relative overflow-hidden">
          {loading && (
            <Skeleton variant="rectangular" height="460px" width="100%" />
          )}
          <img
            src={data?.preview_image}
            alt=""
            className={`w-full shadow-md ${loading ? "hidden" : "block"}`}
            onLoad={() => setLoading(false)}
          />
          <Box
            className={`absolute w-full bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-center gap-4 py-6 transition-all duration-500 ease-in-out font-semibold ${
              isHovered ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <button
              className="text-white flex items-center gap-2 px-4 py-1 border border-white w-fit rounded-full text-xs hover:bg-white hover:text-neutrals-100 transition-colors duration-300"
              onClick={toggleDialog}
            >
              <RemoveRedEyeOutlined />
              Xem trước
            </button>
            <button
              onClick={() => {
                if (role !== ROLE.CANDIDATE) {
                  showInfo("Bạn cần đăng nhập để thực hiện chức năng này!");
                  return;
                }
                if (!is_verified) {
                  navigate(RouteBase.VerifyAccount);
                  return;
                }
                navigate(`${RouteBase.CVTemplate}/${data?._id}`);
              }}
              className="text-white flex items-center gap-2 px-4 py-1 bg-primary w-fit rounded-full text-xs hover:bg-primary-dark transition-colors duration-300"
            >
              <DriveFileMoveOutlined />
              Dùng mẫu
            </button>
          </Box>
        </Box>
        <Box className="p-4">
          <h1 className="font-bold">{data?.name}</h1>
        </Box>
      </Box>
      {shouldRender && (
        <DialogCustom
          open={open}
          toggle={toggleDialog}
          body={Content}
          size="lg"
        />
      )}
    </>
  );
};

export default CVItem;
