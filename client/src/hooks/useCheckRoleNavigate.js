import { useNavigate } from "react-router-dom";
import { RouteBase } from "../constants/routeUrl";
import { ROLE } from "../constants/enum";

const useCheckRoleNavigate = () => {
  const navigate = useNavigate();
  const checkRoleNavigate = (role) => {
    console.log(role);
    
    if (role === ROLE.CANDIDATE) navigate(RouteBase.Home);
    if (role === ROLE.EMPLOYER) navigate(RouteBase.HROverview);
    if (role === ROLE.ADMIN) navigate(RouteBase.Home);
  };
  return { checkRoleNavigate };
};

export default useCheckRoleNavigate;