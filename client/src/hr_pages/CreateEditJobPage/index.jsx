import React from "react";
import CreateEditJobPost from "./components/CreateEditPost";
import { useQueryParams } from "../../hooks";

const CreateEditJobPage = () => {
  const query = useQueryParams();
  return (
    <div>
      <CreateEditJobPost id={query.id} />
    </div>
  );
};

export default CreateEditJobPage;
