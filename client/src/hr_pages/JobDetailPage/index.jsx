import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotifications } from "../../utils/notifications";
import { useGetPost } from "../../hooks/modules/post/useGetPost";
import { RouteBase } from "../../constants/routeUrl";
import { useToggleDialog } from "../../hooks";
import Applicants from "./components/Applicants";

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showError } = useNotifications();
  const { data, isLoading, error } = useGetPost(id, { enabled: !!id });
  const detailData = data?.data?.data;
  if (error) {
    navigate(RouteBase.Home);
    showError("Bài đăng không tồn tại!");
  }
  const { open, toggle, shouldRender } = useToggleDialog();
  // Render
  return (
    <div>
      <Applicants jobId={id} />
    </div>
  );
};

export default JobDetailPage;
