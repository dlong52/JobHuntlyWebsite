import React from "react";
import { useParams } from "react-router-dom";
import { useGetUser } from "../../hooks/modules/user/userGetUser";
import useConvertData from "../../hooks/useConvertData";

const UserDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUser(id, { enabled: !!id });
  const { dataConvert } = useConvertData(data);
  console.log(dataConvert);

  return <div>UserDetailPage</div>;
};

export default UserDetailPage;
