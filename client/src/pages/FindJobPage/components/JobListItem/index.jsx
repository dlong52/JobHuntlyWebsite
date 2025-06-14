import React, { memo, useState, useCallback } from "react";
import { companyLogoDefault, hotjob } from "../../../../assets/images";
import { Box, Typography } from "@mui/material";
import { Button, CommonIcon } from "../../../../ui";
import helpers from "../../../../utils/helpers";
import { Link, useNavigate } from "react-router-dom";
import { RouteBase } from "../../../../constants/routeUrl";
import { useToggleDialog } from "../../../../hooks";
import ApplyJobForm from "../../../JobDetailsPage/components/ApplyJobForm";
import DialogMUI from "../../../../components/Dialogs";
import { WishListService } from "../../../../services/WishListServices";
import { useNotifications } from "../../../../utils/notifications";
import { useSelector } from "react-redux";
import ChipMui from "../../../../ui/Chip";
import { ROLE } from "../../../../constants/enum";
import TooltipMui from "../../../../ui/TooltipMui";

const JobListItem = ({
  id,
  logo = companyLogoDefault,
  title,
  salary,
  posted_by,
  employment_type,
  company,
  end_date,
  status,
  isApplied,
  isHot,
}) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { open, shouldRender, toggle } = useToggleDialog();
  const { showError, showSuccess, showInfo } = useNotifications();

  const [isLoading, setIsLoading] = useState(false);

  const handleAddToWishlist = useCallback(async () => {
    if (!user?.user_id || user.role !== ROLE.CANDIDATE) {
      showInfo("Bạn cần đăng nhập để thực hiện hành động này!", null, {
        vertical: "top",
        horizontal: "center",
      });
      return;
    }
    setIsLoading(true);
    try {
      const payload = { userId: user?.user_id, jobId: id };
      await WishListService.addToWishList(payload);
      showSuccess("Lưu tin thành công!");
    } catch (error) {
      showError("Đã xảy ra lỗi khi lưu tin");
    } finally {
      setIsLoading(false);
    }
  }, [id, user, showInfo, showError, showSuccess]);

  const handleRemoveToWishlist = useCallback(async () => {
    if (!user?.user_id || user.role !== ROLE.CANDIDATE) {
      showInfo("Bạn cần đăng nhập để thực hiện hành động này!", null, {
        vertical: "top",
        horizontal: "center",
      });
      return;
    }
    setIsLoading(true);
    try {
      await WishListService.removeFromWishList(user?.user_id, id);
      showSuccess("Bỏ lưu tin thành công!");
    } catch (error) {
      showError("Đã xảy ra lỗi khi bỏ lưu tin");
    } finally {
      setIsLoading(false);
    }
  }, [id, user, showInfo, showError, showSuccess]);

  return (
    <Box className="border relative p-6 rounded-lg shadow transition-all duration-500 hover:shadow-lg hover:shadow-primary-light">
      {isHot && (
        <TooltipMui
          sx={{
            "& .MuiTooltip-tooltip": {
              backgroundColor: "red", // Đổi màu nền
              color: "white", // Đổi màu chữ
              fontSize: "14px",
            },
            "& .MuiTooltip-arrow": {
              color: "black", // Đổi màu mũi tên theo màu nền
            },
          }}
          content={"Việc làm tốt nhất"}
        >
          <img
            src={hotjob}
            className="absolute top-[-30px] left-[-20px] size-14"
            alt=""
          />
        </TooltipMui>
      )}
      <Box className="flex items-start gap-3 w-full">
        <Box
          className="w-[98px] aspect-square shadow overflow-hidden rounded-md"
          onClick={() => {
            navigate(`${RouteBase.Job}/${id}`);
          }}
        >
          <img
            className="size-full hover:scale-105 transition-all duration-300 object-cover object-center"
            src={logo}
            alt="Logo"
          />
        </Box>
        <Box className="flex flex-col w-full">
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
            <Typography className="!text-primary text-nowrap" fontWeight={500}>
              {helpers.convertSalary(salary?.min, salary?.max)}
            </Typography>
          </Box>
          <Box className="w-full flex justify-end gap-2">
            {helpers.isExpired(end_date) ? (
              <Button
                disabled
                className="!bg-gray-600 !text-white !normal-case !text-xs !font-normal"
              >
                Đã hết hạn
              </Button>
            ) : (
              <Button
                onClick={() => {
                  if (!user?.is_verified) {
                    showInfo(
                      "Tài khoản chưa xác thực không thể dùng tính năng này!",
                      null,
                      {
                        vertical: "top",
                        horizontal: "center",
                      }
                    );
                  }
                  toggle();
                }}
                className="!bg-primary !text-white !normal-case !text-xs !font-normal"
              >
                {isApplied ? "Ứng tuyển lại" : "Ứng tuyển"}
              </Button>
            )}
            {status ? (
              <Button
                key={id}
                isLoading={isLoading}
                onClick={handleRemoveToWishlist}
                className="!bg-primary-light !text-primary"
                disabled={isLoading}
              >
                {isLoading ? "Đang xử lý..." : <CommonIcon.Favorite />}
              </Button>
            ) : (
              <Button
                key={id}
                isLoading={isLoading}
                onClick={handleAddToWishlist}
                className="!bg-primary-light !text-primary"
                disabled={isLoading}
              >
                {isLoading ? "Đang xử lý..." : <CommonIcon.FavoriteBorder />}
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
            <Typography
              className="!text-wrap !max-w-[600px]"
              fontSize={"22px"}
              fontWeight={600}
            >
              Ứng tuyển <span className="text-primary">{title}</span>
            </Typography>
          }
          toggle={toggle}
          body={
            <ApplyJobForm
              onClose={toggle}
              name={title}
              jobId={id}
              companyId={company?._id}
              posted_by={posted_by}
            />
          }
        />
      )}
    </Box>
  );
};

export default memo(JobListItem);
