import { useState, useEffect } from "react";
import { levelService } from "../../../services/LevelServices";

const useGetAllLevels = () => {
  const [levels, setLevels] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const data = await levelService.getAllLevels();
        setLevels(data); // Lưu danh sách Levels vào state
      } catch (err) {
        setError(err); // Lưu lỗi nếu có
      } finally {
        setLoading(false); // Dừng loading khi xong
      }
    };

    fetchLevels();
  }, []);

  return { levels, error, loading };
};

export default useGetAllLevels;
