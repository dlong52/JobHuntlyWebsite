import React, { forwardRef, useMemo } from "react";
import { cvModel } from "../../../mocs/cvModel";
import HtmlContent from "../../../ui/HtmlContent";
import { CommonIcon } from "../../../ui";

const CVModel3 = forwardRef(({ values, show = true, isMock = false }, ref) => {
  const data = useMemo(() => {
    if (isMock) {
      return cvModel;
    }
    return values;
  });
  return (
    <div className={`${show ? "" : "absolute left-[-99999999px]"}`}>
      <div
        ref={ref}
        className="w-[794px] min-h-[1122.5px] bg-white grid grid-cols-12 text-cv-1 gap-5 shadow"
      >
        <div className="col-span-4 bg-cv-1-light p-2 px-4">
          <div className="flex flex-col gap-2 items-center">
            <div className="text-cv-1 flex items-center font-semibold text-sm justify-center">
              {data?.position}
            </div>
            <h1 className="font-bold text-xl text-cv-1 uppercase mt-3">
              {data?.profile?.name}
            </h1>
            {data?.profile?.avatar ? (
              <div className="w-3/5 aspect-square rounded-full bg-neutrals-80 overflow-hidden border-4 border-cv-1 flex items-center justify-center">
                <img
                  src={data?.profile?.avatar}
                  className="w-full object-cover"
                  alt=""
                />
              </div>
            ) : (
              <div className="w-3/5 aspect-square rounded-full bg-neutrals-80 border-4 border-cv-1 flex items-center justify-center text-white">
                <CommonIcon.Person fontSize="large" />
              </div>
            )}
          </div>
          <div className="pb-4 border-b-2 border-cv-1">
            <h1 className="font-semibold text-lg text-cv-1 mt-3">
              Thông tin liên hệ
            </h1>
            <div className="flex flex-col gap-3 mt-3">
              <div className="flex items-center h-5 gap-2">
                <div className="text-cv-1">
                  <CommonIcon.Email fontSize="12px" />
                </div>
                <span className="text-sm text-neutrals-100">
                  {data?.profile?.email}
                </span>
              </div>
              <div className="flex items-center h-5 gap-2">
                <div className="text-cv-1">
                  <CommonIcon.Smartphone fontSize="12px" />
                </div>
                <span className="text-sm text-neutrals-100">
                  {data?.profile?.phone_number}
                </span>
              </div>
              <div className="flex items-center h-5 gap-2">
                <div className="text-cv-1">
                  <CommonIcon.CalendarMonth fontSize="12px" />
                </div>
                <span className="text-sm text-neutrals-100">
                  {data?.profile?.birthday}
                </span>
              </div>
              <div className="flex items-center h-5 gap-2">
                <div className="text-cv-1">
                  <CommonIcon.LocationOnRounded fontSize="12px" />
                </div>
                <span className="text-sm text-neutrals-100">
                  {data?.profile?.address}
                </span>
              </div>
              <div className="flex items-center h-5 gap-2">
                <div className="text-cv-1">
                  <CommonIcon.Language fontSize="12px" />
                </div>
                <span className="text-sm text-neutrals-100">
                  {data?.profile?.website}
                </span>
              </div>
            </div>
          </div>
          {/* Kĩ năng */}
          <div className="pb-4 border-b-2 border-cv-1">
            <h1 className="font-semibold text-lg text-cv-1 mt-3">
              Các kĩ năng
            </h1>
            <div className="rounded-md mt-2">
              {data?.skills?.map((item, i) => {
                return (
                  <div className=" text-neutrals-100">
                    <h3 className="font-semibold text-sm">
                      {item?.skill_name}
                    </h3>
                    <p className="text-sm text-neutrals-80 mt-1">
                      {item?.skill_des}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Sở thích */}
          <div className="mt-3">
            <h1 className="font-semibold text-lg text-cv-1">Sở thích</h1>
            <div className="mt-3">
              <p className="text-sm text-neutrals-100">{data?.interests}</p>
            </div>
          </div>
        </div>
        <div className="col-span-8 flex flex-col gap-4 p-2">
          {/* Mục tiêu */}
          <div className="">
            <h1 className="font-semibold text-lg text-cv-1">
              Mục tiêu nghề nghiệp
            </h1>
            <div className="text-sm text-neutrals-100 mt-2 leading-6">
              {data?.objective}
            </div>
          </div>
          {/* Học vấn */}
          <div className="">
            <h1 className="font-semibold text-lg text-cv-1">Học vấn</h1>
            <div className="mt-3 text-neutrals-100">
              {data?.education?.map((item, index) => {
                return (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <h2 className="font-semibold">{item?.school_name}</h2>
                      <span className="text-sm text-neutrals-80">
                        {item?.from_date} - {item?.to_date}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{item?.education_des}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Kinh nghiệm */}
          <div className=" text-neutrals-100">
            <h1 className="font-semibold text-lg text-cv-1">Kinh nghiệm</h1>
            <div className="mt-3">
              {data?.work_experiences?.map((item, index) => {
                return (
                  <div key={index} className="flex flex-col">
                    <div className="flex justify-between">
                      <h2 className="font-semibold">{item?.position}</h2>
                      <span className="text-sm text-neutrals-80">
                        {item?.from_date} - {item?.to_date}
                      </span>
                    </div>
                    <span className="my-1 text-neutrals-80">
                      {item?.company}
                    </span>
                    <div className="text-sm">{item?.experience_des}</div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Dự án */}
          <div className="text-neutrals-100">
            <h1 className="font-semibold text-lg text-cv-1">Dự án</h1>
            <div className="mt-3">
              {data?.projects?.map((item, index) => {
                return (
                  <div key={index} className="flex flex-col">
                    <div className="flex justify-between">
                      <h2 className="font-semibold">{item?.project_name}</h2>
                      <span className="text-sm text-neutrals-80">
                        {item?.from_date} - {item?.to_date}
                      </span>
                    </div>
                    <h3 className="my-1">{item?.position_project}</h3>
                    <div className="text-sm">{item?.technology_des}</div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Danh hiệu */}
          <div className="">
            <h1 className="font-semibold text-lg text-cv-1">Danh hiệu</h1>
            <div className="mt-3">
              {data?.honors_awards?.map((item, index) => {
                return (
                  <div className="flex items-center" key={index}>
                    <div className="w-[150px] text-neutrals-80">
                      {item?.time}
                    </div>
                    <h2 className="font-semibold flex-1 text-neutrals-100">
                      {item?.award_name}
                    </h2>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Chứng chỉ */}
          <div className="">
            <h1 className="font-semibold text-lg text-cv-1">Chứng chỉ</h1>
            <div className="mt-3">
              {data?.certifications?.map((item, index) => {
                return (
                  <div key={index} className="flex">
                    <div className="w-[150px] text-neutrals-80">
                      {item?.time}
                    </div>
                    <h2 className="font-semibold flex-1 text-neutrals-100">
                      {item?.certification_name}
                    </h2>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CVModel3;
