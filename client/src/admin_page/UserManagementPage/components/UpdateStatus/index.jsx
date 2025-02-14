import React from "react";
import { useGetUser } from "../../../../hooks/modules/user/userGetUser";
import useConvertData from "../../../../hooks/useConvertData";

const UpdateStatus = ({ id }) => {
  const { data, isLoading } = useGetUser(id, { enabled: !!id });
  const { dataConvert } = useConvertData(data);
  return <div>UpdateStatus</div>;
};

export default UpdateStatus;
