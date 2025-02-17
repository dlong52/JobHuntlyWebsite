import { useLocation } from "react-router-dom";

const useQueryParams = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const queryParams = {};

  for (let [key, value] of params.entries()) {
    queryParams[key] = value;
  }

  return queryParams;
};

export default useQueryParams;
