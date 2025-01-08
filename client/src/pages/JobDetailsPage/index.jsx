import { Button, Container, Divider, Typography } from "@mui/material";
import React from "react";
import { CommonIcon } from "../../ui";
import { cpLogo } from "../../assets/images";
import DialogMUI from "../../components/Dialogs";
import { useToggleDialog } from "../../hooks";
import ApplyJobForm from "./components/ApplyJobForm";

const JobDetailsPage = () => {
  const {open, toggle, shouldRender} = useToggleDialog()
  return (
    <div>
      <Container className="py-10">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-8 flex flex-col gap-y-5">
            <div className="bg-white p-5 rounded-md flex flex-col gap-5">
              <Typography fontSize={"20px"} fontWeight={700}>
                Thực tập sinh Font-End
              </Typography>
              <div className="flex justify-between py-2">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 flex items-center justify-center rounded-full bg-gradient-to-bl from-primary to-primary-200 aspect-square">
                    <CommonIcon.Paid className="text-white" />
                  </div>
                  <div className="">
                    <Typography>Mức lương</Typography>
                    <Typography fontWeight={500}>Tới 3 triệu</Typography>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 flex items-center justify-center rounded-full bg-gradient-to-bl from-primary to-primary-200 aspect-square">
                    <CommonIcon.LocationOnRounded className="text-white" />
                  </div>
                  <div className="">
                    <Typography>Địa điểm</Typography>
                    <Typography fontWeight={500}>Hà Nội</Typography>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 flex items-center justify-center rounded-full bg-gradient-to-bl from-primary to-primary-200 aspect-square">
                    <CommonIcon.HourglassBottom className="text-white" />
                  </div>
                  <div className="">
                    <Typography>Kinh nghiệm</Typography>
                    <Typography fontWeight={500}>2 năm kinh nghiệm</Typography>
                  </div>
                </div>
              </div>
              <Typography
                fontSize={"14px"}
                className="flex items-center gap-2 bg-gray-200 text-gray-500 px-3 py-1 rounded-md size-fit"
              >
                <CommonIcon.AccessTime />
                Hạn nộp hồ sơ: 17/01/2025
              </Typography>
              <div className="flex gap-3">
                <Button
                  size="large"
                  className="flex-1 !bg-primary !text-white"
                  startIcon={<CommonIcon.SendOutlined />}
                  onClick={toggle}
                >
                  Ứng tuyển ngay
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  className="!text-primary !capitalize !border-primary"
                  startIcon={<CommonIcon.FavoriteBorder />}
                >
                  Lưu tin
                </Button>
              </div>
            </div>
            <div className="bg-white p-5 rounded-md flex flex-col gap-y-5">
              <div className="flex gap-3">
                <Divider orientation="vertical" className="bg-primary w-[6px]" flexItem/>
                <Typography fontSize={"20px"} fontWeight={700}>
                  Chi tiết tuyển dụng
                </Typography>
              </div>
              <div className="flex flex-col gap-2">
                <Typography fontWeight={500}>Mô tả công việc</Typography>
                <div className="pl-5">
                  <ul className="">
                    <li>vlkDMS</li>
                    <li>kvmkd</li>
                    <li>vkmds</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <Typography fontWeight={500}>Yêu cầu ứng viên</Typography>
                <div className=""></div>
              </div>
              <div className="flex flex-col gap-5">
                <Typography fontWeight={500}>Quyền lợi</Typography>
                <div className=""></div>
              </div>
              <div className="flex flex-col gap-5">
                <Typography fontWeight={500}>Địa điểm làm việc</Typography>
                <div className=""></div>
              </div>
              <div className="flex flex-col gap-5">
                <Typography fontWeight={500}>Cách thức ứng tuyển</Typography>
                <div className=""></div>
              </div>
            </div>
          </div>
          <div className="col-span-4 flex flex-col gap-y-5">
            <div className="bg-white p-5 rounded-md flex flex-col gap-5">
              <div className="flex gap-5">
                <img src={cpLogo} alt="" className="rounded-md" />
                <Typography fontWeight={500} fontSize={"16px"}>
                  Công ty TNHH Next Level Solution
                </Typography>
              </div>
              <div className="flex flex-col gap-y-3">
                <div className="flex gap-2 items-start">
                  <Typography
                    className="flex items-center gap-1 !text-gray-500 text-nowrap w-24"
                    fontSize={"14px"}
                  >
                    <CommonIcon.PeopleAltOutlined />
                    Quy mô:{" "}
                  </Typography>
                  <Typography
                    className="text-wrap flex-1"
                    fontWeight={500}
                    fontSize={"15px"}
                  >
                    25 - 99 nhân viên
                  </Typography>
                </div>
                <div className="flex gap-2 items-start">
                  <Typography
                    className="flex items-center gap-1 !text-gray-500 text-nowrap w-24"
                    fontSize={"14px"}
                  >
                    <CommonIcon.BusinessCenter />
                    Lĩnh vực:{" "}
                  </Typography>
                  <Typography
                    className="text-wrap flex-1"
                    fontWeight={500}
                    fontSize={"15px"}
                  >
                    Công nghệ thông tin
                  </Typography>
                </div>
                <div className="flex gap-2 items-start">
                  <Typography
                    className="flex items-center gap-1 !text-gray-500 text-nowrap w-24"
                    fontSize={"14px"}
                  >
                    <CommonIcon.Map />
                    Địa điểm:{" "}
                  </Typography>
                  <Typography
                    className="text-wrap flex-1"
                    fontWeight={500}
                    fontSize={"15px"}
                  >
                    Số 29 Galaxy 4, 69 Tố Hữu, Hà Đông, Hà Nội
                  </Typography>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-md flex flex-col gap-5">
              <Typography fontSize={"20px"} fontWeight={700}>
                Thông tin chung
              </Typography>
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 flex items-center justify-center rounded-full bg-primary aspect-square">
                  <CommonIcon.WorkspacePremium className="text-white" />
                </div>
                <div className="">
                  <Typography fontSize={"14px"} className="text-gray-500">
                    Cấp bậc
                  </Typography>
                  <Typography fontWeight={500}>Nhân viên</Typography>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 flex items-center justify-center rounded-full bg-primary aspect-square">
                  <CommonIcon.HourglassBottom className="text-white" />
                </div>
                <div className="">
                  <Typography fontSize={"14px"} className="text-gray-500">
                    Kinh nghiệm
                  </Typography>
                  <Typography fontWeight={500}>1 năm</Typography>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 flex items-center justify-center rounded-full bg-primary aspect-square">
                  <CommonIcon.PeopleAltOutlined className="text-white" />
                </div>
                <div className="">
                  <Typography fontSize={"14px"} className="text-gray-500">
                    Số lượng tuyển
                  </Typography>
                  <Typography fontWeight={500}>5 người</Typography>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 flex items-center justify-center rounded-full bg-primary aspect-square">
                  <CommonIcon.BusinessCenterRounded className="text-white" />
                </div>
                <div className="">
                  <Typography fontSize={"14px"} className="text-gray-500">
                    Hình thức làm việc
                  </Typography>
                  <Typography fontWeight={500}>Toàn thời gian</Typography>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 flex items-center justify-center rounded-full bg-primary aspect-square">
                  <CommonIcon.PersonRounded className="text-white" />
                </div>
                <div className="">
                  <Typography fontSize={"14px"} className="text-gray-500">
                    Giới tính
                  </Typography>
                  <Typography fontWeight={500}>Không yêu cầu</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      {shouldRender && <DialogMUI disableScrollLock={false} isPadding={false} open={open} toggle={toggle} body={<ApplyJobForm/>}/>}
    </div>
  );
};

export default JobDetailsPage;
