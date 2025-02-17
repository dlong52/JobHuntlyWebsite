import React from "react";
import { companyLogoDefault } from "../../../../assets/images";
import { Box, Typography } from "@mui/material";
import { Button, CommonIcon } from "../../../../ui";
import helpers from "../../../../utils/helpers";
import { Link, useNavigate } from "react-router-dom";
import { RouteBase } from "../../../../constants/routeUrl";
import { useToggleDialog } from "../../../../hooks";
import ApplyJobForm from "../../../JobDetailsPage/components/ApplyJobForm";
import DialogMUI from "../../../../components/Dialogs";
import useStatusWishlist from "../../../../hooks/modules/wishlist/useStatusWishlist";
import { WishListService } from "../../../../services/WishListServices";
import { useNotifications } from "../../../../utils/notifications";
import { useSelector } from "react-redux";
import ChipMui from "../../../../ui/Chip";
const JobListItem = ({
  id,
  logo = companyLogoDefault,
  title,
  salary,
  posted_by,
  employment_type,
  company,
}) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { open, shouldRender, toggle } = useToggleDialog();
  const { showError, showSuccess } = useNotifications();

  const { status } = useStatusWishlist(id);

  const handleAddToWishlist = async () => {
    try {
      const payload = { userId: user?.user_id, jobId: id };
      await WishListService.addToWishList(payload);
      showSuccess("Lưu tin thành công!");
    } catch (error) {
      showError("Đã xảy ra lỗi khi lưu tin");
    }
  };
  const handleRemoveToWishlist = async () => {
    try {
      await WishListService.removeFromWishList(user?.user_id, id);
      showSuccess("Bỏ lưu tin thành công!");
    } catch (error) {
      showError("Đã xảy ra lỗi khi bỏ lưu tin");
    }
  };
  return (
    <Box className="border p-6 rounded-lg shadow">
      <Box className="flex items-start gap-3 w-full">
        <Box
          className="size-[98px] overflow-hidden rounded-md"
          onClick={() => {
            navigate(`${RouteBase.Job}/${id}`);
          }}
        >
          <img
            className="size-[98px] hover:scale-105 transition-all duration-300 object-cover object-center"
            src={logo}
            alt=""
          />
        </Box>
        <Box className="flex flex-col gap-5 w-full">
          <Box className="flex justify-between">
            <div className="flex flex-col gap-2">
              <div className="">
                <Link
                  to={`${RouteBase.Job}/${id}`}
                  className="hover:underline font-semibold text-lg flex items-center gap-2"
                >
                  {title}{" "}
                </Link>
                <Link
                  className="hover:text-primary"
                  to={`${RouteBase.Company}/${company?._id}`}
                >
                  {company?.name}
                </Link>
              </div>
              <ChipMui
                variant={"filled"}
                className="!w-fit"
                label={helpers.convertEpmT(employment_type)}
              />
            </div>
            <Typography className="!text-primary" fontWeight={500}>
              {helpers.convertSalary(salary?.min, salary?.max)}
            </Typography>
          </Box>
          <Box className="w-full flex justify-end gap-2">
            <Button
              onClick={toggle}
              className="!bg-primary !text-white !capitalize !text-xs !font-normal"
            >
              Ứng tuyển
            </Button>
            {status ? (
              <Button
                onClick={() => {
                  handleRemoveToWishlist();
                }}
                className="!bg-primary-light !text-primary"
              >
                <CommonIcon.Favorite />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  handleAddToWishlist();
                }}
                className="!bg-primary-light !text-primary"
              >
                <CommonIcon.FavoriteBorder />
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      {shouldRender && (
        <DialogMUI
          disableScrollLock={false}
          isPadding={false}
          open={open}
          title={
            <Typography fontSize={"22px"} fontWeight={600}>
              Ứng tuyển <span className="text-primary">{title}</span>
            </Typography>
          }
          toggle={toggle}
          body={
            <ApplyJobForm
              onClose={toggle}
              name={title}
              jobId={id}
              posted_by={posted_by}
            />
          }
        />
      )}
    </Box>
  );
};

export default JobListItem;
