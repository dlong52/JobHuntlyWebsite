import { useState, useEffect } from "react";
import address from "../../../api/locationApi";

const useGetAllDistricts = (id) => {
  const [districts, setDistricts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const data = await address.fetchDistrictData(id);
        setDistricts(data); 
      } catch (err) {
        setError(err); 
      } finally {
        setLoading(false); 
      }
    };

    fetchDistricts();
  }, []);

  return { districts, error, loading };
};

export default useGetAllDistricts;
