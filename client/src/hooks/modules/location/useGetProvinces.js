import { useState, useEffect } from "react";
import address from "../../../api/locationApi";

const useGetAllProvinces = () => {
  const [provinces, setProvinces] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await address.fetchProvincesData();
        setProvinces(data); 
      } catch (err) {
        setError(err); 
      } finally {
        setLoading(false); 
      }
    };

    fetchProvinces();
  }, []);

  return { provinces, error, loading };
};

export default useGetAllProvinces;
