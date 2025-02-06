import React from "react";
import { companyLogoDefault, cpLogo } from "../../../../assets/images";
import { Box, Typography } from "@mui/material";
import { Button, CommonIcon } from "../../../../ui";
import helpers from "../../../../utils/helpers";
import { Link } from "react-router-dom";
import { RouteBase } from "../../../../constants/routeUrl";
import { useToggleDialog } from "../../../../hooks";
import ApplyJobForm from "../../../JobDetailsPage/components/ApplyJobForm";
import DialogMUI from "../../../../components/Dialogs";
const JobListItem = ({
  id,
  logo = companyLogoDefault,
  title,
  salary,
  posted_by,
  employment_type,
  company,
}) => {
  const { open, shouldRender, toggle } = useToggleDialog();
  return (
    <Box className="border p-6 rounded-lg shadow">
      <Box className="flex items-start gap-3 w-full">
        <Link
          className="size-[98px] overflow-hidden block rounded-md"
          to={`${RouteBase.Job}/${id}`}
        >
          <img
            className="size-[98px] hover:scale-105 transition-all duration-300 border rounded-md object-cover object-center"
            src={logo}
            alt=""
          />
        </Link>
        <Box className="flex flex-col gap-5 w-full">
          <Box className="flex justify-between">
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
            <Button className="!bg-primary-light !text-primary">
              <CommonIcon.FavoriteBorder />
            </Button>
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
