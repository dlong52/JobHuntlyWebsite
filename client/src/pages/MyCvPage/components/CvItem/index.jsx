import { IconButton, Typography, Skeleton } from "@mui/material";
import React, { useState } from "react";
import { Button, CommonIcon } from "../../../../ui";
import moment from "moment";
import { CVService } from "../../../../services/CvServices";
import { useNotifications } from "../../../../utils/notifications";
import { useToggleDialog } from "../../../../hooks";
import { ConfirmDelete } from "../../../../components";
import DialogMUI from "../../../../components/Dialogs";
import { RouteBase } from "../../../../constants/routeUrl";
import { useNavigate } from "react-router-dom";

const CvItem = ({ data }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { showError, showSuccess } = useNotifications();
  const { open, shouldRender, toggle } = useToggleDialog();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await CVService.deleteCV(data?._id);
      showSuccess("Đã xóa CV thành công");
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center relative">
      {!isImageLoaded && (
        <Skeleton variant="rectangular" width="80%" height={400} />
      )}
      <img
        src={data?.theme?.preview_image}
        className={`w-4/5 ${!isImageLoaded ? "hidden" : ""}`}
        alt=""
        onLoad={() => setIsImageLoaded(true)}
      />
      <div className="absolute text-white flex flex-col justify-end p-4 z-[1] bg-gradient-to-t from-neutrals-80 to-transparent w-full h-full">
        <div className="flex items-center flex-nowrap gap-2">
          <Typography className="text-wrap" fontSize={"25px"} fontWeight={500}>
            {data?.cv_name}
          </Typography>
          <IconButton
            onClick={() => {
              navigate(
                `${RouteBase.CVTemplate}/${data?.theme?._id}/edit/${data?._id}`
              );
            }}
            className="!bg-[#ffffff2e] !size-7"
          >
            <CommonIcon.Edit className="text-white !text-sm" fontSize="small" />
          </IconButton>
        </div>
        <Typography>
          Cập nhật lần cuối:{" "}
          {moment(data?.updated_at).format("DD/MM/YYYY HH:mm")}
        </Typography>
        <div className="flex items-center gap-1">
          <Button
            onClick={() =>
              (window.location.href = `https://www.facebook.com/sharer/sharer.php?u=https://jobhuntlyclient.vercel.app/${RouteBase.ViewCv}/${data?._id}`)
            }
            startIcon={<CommonIcon.Reply />}
            className="!bg-[#ffffff24] !text-white !text-xs !rounded-full flex-1"
          >
            Chia sẻ
          </Button>
          <Button
            startIcon={<CommonIcon.VerticalAlignBottom />}
            className="!bg-[#ffffff24] !text-white !text-xs !rounded-full flex-1"
          >
            Tải xuống
          </Button>
          <IconButton onClick={toggle}>
            <CommonIcon.DeleteForever className="!text-white" />
          </IconButton>
        </div>
      </div>
      {shouldRender && (
        <DialogMUI
          className="w-fit"
          open={open}
          toggle={toggle}
          body={
            <ConfirmDelete
              title="Xóa CV này?"
              subtitle="Bạn có chắc chắn muốn xóa CV này không?"
              alertMessage="Tất cả dữ liệu về CV sẽ bị xóa"
              onDelete={handleDelete}
              onClose={toggle}
              isLoading={isLoading}
            />
          }
        />
      )}
    </div>
  );
};

export default CvItem;
