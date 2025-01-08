import { useState, useEffect } from "react";
import { getAllCategories } from "../../../services/CategorySevices";

const useGetAllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data); // Lưu danh sách categories vào state
      } catch (err) {
        setError(err); // Lưu lỗi nếu có
      } finally {
        setLoading(false); // Dừng loading khi xong
      }
    };

    fetchCategories();
  }, []);

  return { categories, error, loading };
};

export default useGetAllCategories;
