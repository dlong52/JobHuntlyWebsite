import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const useScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPath = useRef(pathname); // Lưu pathname trước đó

  useEffect(() => {
    if (prevPath.current !== pathname) {
      window.scrollTo(0, 0);
      prevPath.current = pathname; // Cập nhật pathname cũ
    }
  }, [pathname]); // Chỉ lắng nghe thay đổi của pathname, bỏ qua query

};

export default useScrollToTop;
