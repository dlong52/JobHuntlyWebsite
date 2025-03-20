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
    <div ref={ref} className={`${show ? "" : "absolute left-[-99999999px]"}`}>
      <div className="w-[794px] bg-white min-h-[1122.5px] grid grid-cols-12 text-cv-3 gap-5 p-5 shadow">
        <div className="col-span-4">
          {/* Avatar */}
          {values?.profile?.avatar ? (
            <img src={values?.profile?.avatar} className="w-4/5 aspect-square rounded-md object-cover" alt="" />
          ) : (
            <div className="w-4/5 aspect-square rounded-md bg-cv-3"></div>
          )}
          <div className="flex gap-2 mt-2">
            <div className="p-1 rounded-full aspect-square size-fit bg-cv-3 text-white">
              <CommonIcon.KeyboardArrowRightRounded className="" />
            </div>
            <div className="bg-cv-3-light px-4 rounded-full text-cv-3 flex items-center font-semibold text-sm justify-center">
              {data?.position}
            </div>
          </div>
          <h1 className="font-bold text-xl text-cv-3 uppercase mt-4">
            {data?.profile?.name}
          </h1>
          <div className="">
            <h1 className="font-semibold text-lg text-cv-3 mt-4">
              // Thông tin liên hệ
            </h1>
            <div className="flex flex-col gap-3 mt-4">
              <div className="flex gap-2">
                <div className="p-1 rounded aspect-square size-[25px] bg-cv-3 text-white flex items-center justify-center">
                  <CommonIcon.Email fontSize="12px" />
                </div>
                <span className="text-sm text-">{data?.profile?.email}</span>
              </div>
              <div className="flex gap-2">
                <div className="p-1 rounded aspect-square size-[25px] bg-cv-3 text-white flex items-center justify-center">
                  <CommonIcon.Smartphone fontSize="12px" />
                </div>
                <span className="text-sm text-">
                  {data?.profile?.phone_number}
                </span>
              </div>
              <div className="flex gap-2">
                <div className="p-1 rounded aspect-square size-[25px] bg-cv-3 text-white flex items-center justify-center">
                  <CommonIcon.CalendarMonth fontSize="12px" />
                </div>
                <span className="text-sm text-">{data?.profile?.birthday}</span>
              </div>
              <div className="flex gap-2">
                <div className="p-1 rounded aspect-square size-[25px] bg-cv-3 text-white flex items-center justify-center">
                  <CommonIcon.LocationOnRounded fontSize="12px" />
                </div>
                <span className="text-sm text-">{data?.profile?.address}</span>
              </div>
              <div className="flex gap-2">
                <div className="p-1 rounded aspect-square size-[25px] bg-cv-3 text-white flex items-center justify-center">
                  <CommonIcon.Language fontSize="12px" />
                </div>
                <span className="text-sm text-">{data?.profile?.website}</span>
              </div>
            </div>
          </div>
          {/* Kĩ năng */}
          <div className="">
            <h1 className="font-semibold text-lg text-cv-3 mt-4">
              // Các kĩ năng
            </h1>
            <div className="bg-cv-3-100 p-4 rounded-md mt-4">
              {data?.skills?.map((item, index) => {
                return (
                  <div className="" key={index}>
                    <h3 className="font-semibold text-sm">
                      {item?.skill_name}
                    </h3>
                    <HtmlContent string={item?.skill_des} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-span-8 flex flex-col gap-4">
          {/* Mục tiêu */}
          <div className="">
            <h1 className="font-semibold text-lg text-cv-3">
              // Mục tiêu nghề nghiệp
            </h1>
            <div className="bg-cv-3-100 p-4 rounded-md mt-4 text-sm leading-5">
              {data?.objective}
            </div>
          </div>
          {/* Học vấn */}
          <div className="">
            <h1 className="font-semibold text-lg text-cv-3">// Học vấn</h1>
            <div className="bg-cv-3-100 p-4 rounded-md mt-4">
              {data?.education?.map((item, index) => {
                return (
                  <div className="flex" key={index}>
                    <div className="w-[150px]">
                      {item?.from_date} - {item?.to_date}
                    </div>
                    <div className="flex-1">
                      <h2 className="font-semibold">{item?.school_name}</h2>
                      <HtmlContent string={item?.education_des} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Kinh nghiệm */}
          <div className="">
            <h1 className="font-semibold text-lg text-cv-3">// Kinh nghiệm</h1>
            <div className="bg-cv-3-100 p-5 rounded-md mt-4">
              {data?.work_experiences?.map((item, index) => {
                return (
                  <div className="flex" key={index}>
                    <div className="w-[150px]">
                      {item?.from_date} - {item?.to_date}
                    </div>
                    <div className="flex-1">
                      <h2 className="font-semibold">{item?.company}</h2>
                      <h3>{item?.position}</h3>
                      <div className="mt-2 text-sm">
                        <HtmlContent string={item?.experience_des} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Dự án */}
          <div className="">
            <h1 className="font-semibold text-lg text-cv-3">// Dự án</h1>
            <div className="bg-cv-3-100 p-5 rounded-md mt-4">
              {data?.projects?.map((item, index) => {
                return (
                  <div className="flex" key={index}>
                    <div className="w-[150px]">
                      {item?.from_date} - {item?.to_date}
                    </div>
                    <div className="flex-1">
                      <h2 className="font-semibold">{item?.project_name}</h2>
                      <h3>{item?.position_project}</h3>
                      <div className="mt-2 text-sm">
                        <HtmlContent string={item?.technology_des} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Danh hiệu */}
          <div className="">
            <h1 className="font-semibold text-lg text-cv-3">// Danh hiệu</h1>
            <div className="bg-cv-3-100 p-5 rounded-md mt-4">
              {data?.honors_awards?.map((item, index) => {
                return (
                  <div className="flex" key={index}>
                    <div className="w-[150px]">{item?.time}</div>
                    <h2 className="font-semibold flex-1">{item?.award_name}</h2>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Chứng chỉ */}
          <div className="">
            <h1 className="font-semibold text-lg text-cv-3">// Chứng chỉ</h1>
            <div className="bg-cv-3-100 p-5 rounded-md mt-4">
              {data?.certifications?.map((item, index) => {
                return (
                  <div className="flex" key={index}>
                    <div className="w-[150px]">{item?.time}</div>
                    <h2 className="font-semibold flex-1">
                      {item?.certification_name}
                    </h2>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Sở thích */}
          <div className="">
            <h1 className="font-semibold text-lg text-cv-3">// Sở thích</h1>
            <div className="bg-cv-3-100 p-5 rounded-md mt-4">
              <p className="text-sm">{data?.interests}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CVModel3;
