import { RouteBase } from "../constants/routeUrl";
import { ROLE } from "../constants/enum";

const useCheckRoleNavigate = () => {
  const checkRoleNavigate = (role) => {
    if (role === ROLE.CANDIDATE) window.location.href = RouteBase.Home;
    if (role === ROLE.EMPLOYER) window.location.href = RouteBase.HROverview;
    if (role === ROLE.ADMIN) window.location.href = RouteBase.AdminOverview;
  };
  return { checkRoleNavigate };
};

export default useCheckRoleNavigate;
