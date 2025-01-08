import { useState, useEffect } from "react";
import { getAllPosts } from "../../../services/PostServices";

const useGetAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data); // Lưu danh sách Posts vào state
      } catch (err) {
        setError(err); // Lưu lỗi nếu có
      } finally {
        setLoading(false); // Dừng loading khi xong
      }
    };

    fetchPosts();
  }, []);

  return { posts, error, loading };
};

export default useGetAllPosts;
