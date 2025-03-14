import React, { forwardRef, useMemo } from "react";
import { cvModel } from "../../../mocs/cvModel";
import HtmlContent from "../../../ui/HtmlContent";
import { CommonIcon } from "../../../ui";

const CVModel2 = forwardRef(({ values, show = true, isMock = false }, ref) => {
  const data = useMemo(() => {
    if (isMock) {
      return cvModel;
    }
    return values;
  });
  
  return (
    <div ref={ref} className={`w-fit ${show ? "" : "absolute left-[-99999999px]"}`}>
      <div className="w-[794px] shadow p-5">
        {/* Thông tin ứng viên */}
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <div className="">
            {data?.profile?.avatar ? (
              <div className="">
                <img
                  src={data?.profile?.avatar}
                  className="w-[120px] h-[150px] object-cover object-center"
                  alt=""
                />
              </div>
            ) : (
              <div className="w-[120px] h-[150px] bg-black text-white flex items-center justify-center">
                <CommonIcon.Person className="text-2xl" />
              </div>
            )}
          </div>
          {/* Information */}
          <div className="flex flex-col gap-2 flex-1">
            <h1 className="text-2xl font-bold">{data?.profile?.name}</h1>
            <span>{data?.position}</span>
            <div className="flex items-center">
              <span className="text-sm font-semibold min-w-[150px]">
                Ngày sinh:{" "}
              </span>
              <span className="text-sm">{data?.profile?.birthday}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-semibold min-w-[150px]">
                Email:{" "}
              </span>
              <span className="text-sm">{data?.profile?.email}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-semibold min-w-[150px]">
                Số điện thoại:{" "}
              </span>
              <span className="text-sm">{data?.profile?.phone_number}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-semibold min-w-[150px]">
                Địa chỉ:{" "}
              </span>
              <span className="text-sm">{data?.profile?.address}</span>
            </div>
          </div>
        </div>
        {/* Mục tiêu */}
        <div className="mt-8">
          <h1 className="font-bold text-[16px] border-b-2 border-black pb-2">
            MỤC TIÊU NGHỀ NGHIỆP
          </h1>
          <p className="mt-5">{data?.objective}</p>
        </div>
        {/* Học vấn */}
        <div className="mt-8">
          <h1 className="font-bold text-[16px] border-b-2 border-black pb-2">
            HỌC VẤN
          </h1>
          {data?.education?.map((item, index) => {
            return (
              <div key={index} className="mt-5">
                <div className="flex">
                  <div className="w-[150px]">
                    {item?.from_date} - {item?.to_date}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold">{item?.school_name}</h2>
                    <p>{item?.education_des}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="page-break"></div>
        {/* Kinh nghiệm làm việc */}
        <div className="mt-8">
          <h1 className="font-bold text-[16px] border-b-2 border-black pb-2">
            KINH NGHIỆM LÀM VIỆC
          </h1>
          {data?.work_experiences?.map((item, index) => {
            return (
              <div key={index} className="mt-5">
                <div className="flex">
                  <div className="w-[150px]">
                    {item?.from_date} - {item?.to_date}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold">{item?.company}</h2>
                    <h3>{item?.position}</h3>
                    <div className="mt-2">{item?.experience_des}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="page-break"></div>
        {/* Dự án cá nhân */}
        <div className="mt-8">
          <h1 className="font-bold text-[16px] border-b-2 border-black pb-2">
            DỰ ÁN
          </h1>
          {data?.projects?.map((item, index) => {
            return (
              <div key={index} className="mt-5">
                <div className="flex">
                  <div className="w-[150px]">
                    {item?.from_date} - {item?.to_date}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold">{item?.project_name}</h2>
                    <h3>{item?.position_project}</h3>
                    <div className="mt-2">{item?.technology_des}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="page-break"></div>
        {/* Kĩ năng */}
        <div className="mt-8">
          <h1 className="font-bold text-[16px] border-b-2 border-black pb-2">
            KĨ NĂNG
          </h1>
          {data?.skills?.map((item, index) => {
            return (
              <div className="mt-5" key={index}>
                <div className="">
                  <h2 className="font-semibold">{item?.skill_name}</h2>
                  <div className="mt-1">{item?.skill_des}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="page-break"></div>
        {/* Danh hiệu */}
        <div className="mt-8">
          <h1 className="font-bold text-[16px] border-b-2 border-black pb-2">
            DANH HIỆU
          </h1>
          {data?.honors_awards?.map((item, index) => {
            return (
              <div key={index} className="mt-5">
                <div className="flex">
                  <div className="w-[150px]">{item?.time}</div>
                  <h2 className="font-semibold flex-1">{item?.award_name}</h2>
                </div>
              </div>
            );
          })}
        </div>
        <div className="page-break"></div>
        {/* Chứng chỉ */}
        <div className="mt-8">
          <h1 className="font-bold text-[16px] border-b-2 border-black pb-2">
            CHỨNG CHỈ
          </h1>
          {data?.certifications?.map((item, index) => {
            return (
              <div className="mt-5" key={index}>
                <div className="flex">
                  <div className="w-[150px]">{item?.time}</div>
                  <h2 className="font-semibold flex-1">
                    {item?.certification_name}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
        <div className="page-break"></div>
        {/* Sở thích */}
        <div className="mt-8">
          <h1 className="font-bold text-[16px] border-b-2 border-black pb-2">
            SỞ THÍCH
          </h1>
          <div className="mt-5">
            <p>{data?.interests}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CVModel2;
