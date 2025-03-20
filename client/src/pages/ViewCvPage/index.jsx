import React from "react";
import { useGetCv } from "../../hooks/modules/cv/useGetCv";
import { useParams } from "react-router-dom";
import { bgCv } from "../../assets/images";
import CVTemplate from "../CreateCVPage/components/CvTemplate";
import { useConvertData } from "../../hooks";

const ViewCvPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCv(id, { enabled: !!id });
  const { dataConvert } = useConvertData(data);
  
  return (
    <div
      className="w-full min-h-screen overflow-auto flex justify-center py-20"
      style={{
        background: `url(${bgCv}) no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      <CVTemplate
        // show={false}
        code={dataConvert?.theme?.theme_code}
        values={dataConvert}
        // ref={targetRef}
      />
    </div>
  );
};

export default ViewCvPage;
