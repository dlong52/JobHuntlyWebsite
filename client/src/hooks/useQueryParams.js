import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const useQueryParams = () => {
  const { search } = useLocation();
  const [queryParams, setQueryParams] = useState({});
  
  useEffect(() => {
    const params = new URLSearchParams(search);
    const newParams = {};
    
    for (let [key, value] of params.entries()) {
      newParams[key] = value;
    }
    
    setQueryParams(newParams);
  }, [search]);

  return queryParams;
};

export default useQueryParams;