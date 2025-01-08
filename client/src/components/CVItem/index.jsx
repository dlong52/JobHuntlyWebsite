import {
  BorderColorOutlined,
  DriveFileMoveOutlined,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import React from "react";
import { useToggleDialog } from "../../hooks";
import CVModel1 from "../CVModel/CVModel1";
import { Box } from "@mui/material";
import DialogCustom from '../Dialogs'
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
const CVItem = ({ data }) => {
  const navigate = useNavigate()
  const {open, toggle, shouldRender} = useToggleDialog();
  const Content = () => {
    return (
      <Box className="grid grid-cols-12 gap-6 bg-white">
        <Box className="col-span-9 p-5 overflow-auto h-[500px]">
          <CVModel1 />
        </Box>
        <Box className="col-span-3 flex flex-col gap-10 h-fit">
          <h1 className="font-bold text-xl text-primary">
            Mẫu CV chuyên nghiệp
          </h1>
          <Box className="flex flex-col gap-5">
            <Link to={`${RouteBase.CVTemplate}/1`} className="py-2 px-4 w-full bg-primary text-center text-white rounded-sm">
              <BorderColorOutlined /> Dùng mẫu này
            </Link>
            <button
              onClick={toggle}
              className="py-2 w-full border border-neutrals-80 text-neutrals-60 rounded-sm"
            >
              Đóng lại
            </button>
          </Box>
        </Box>
      </Box>
    );
  };
  return (
    <Box>
      <Box className="w-full bg-white rounded-lg border-2 hover:border-primary transition-all duration-300 hover:shadow-xl overflow-hidden">
        <Box
          className="size-[300px] flex flex-col justify-end relative overflow-hidden group bg-contain"
          style={{
            backgroundImage:
              "url(https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/experts.png?v=1.0.6)",
          }}
        >
          <Box className="absolute w-full bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-center gap-4 py-6 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out font-semibold">
            <button
              className="text-white flex items-center gap-2 px-4 py-1 border border-white w-fit rounded-full text-xs hover:bg-white hover:text-neutrals-100 transition-colors duration-300"
              onClick={toggle}
            >
              <RemoveRedEyeOutlined />
              Xem trước
            </button>
            <button onClick={navigate(`${RouteBase.CVTemplate}/1`)} className="text-white flex items-center gap-2 px-4 py-1 bg-primary w-fit rounded-full text-xs hover:bg-primary-dark transition-colors duration-300">
              <DriveFileMoveOutlined />
              Dùng mẫu
            </button>
          </Box>
        </Box>
        <Box className="p-4">
          <h1 className="font-bold">Chuyên nghiệp</h1>
        </Box>
      </Box>
      {shouldRender && (
        <DialogCustom
          open={open}
          toggle={toggle}
          body={Content}
          size={"lg"}
        />
      )}
    </Box>
  );
};

export default CVItem;
