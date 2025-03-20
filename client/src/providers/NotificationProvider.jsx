import { createContext, useContext, useMemo } from "react";
import { useGetAllNotifications } from "../hooks/modules/notification/useGetAllNotifications";
import { useSelector } from "react-redux";
import useFilters from "../hooks/useFilters";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  // Chỉ lấy user_id để tránh re-render không cần thiết
  const userId = useSelector((state) => state.user?.user_id);

  // Memo hóa filters để không tạo object mới trên mỗi render
  const initialFilters = useMemo(() => ({ page: 1, limit: 5, sort: "desc" }), []);
  const { filters } = useFilters(initialFilters);

  // Fetch dữ liệu thông báo
  const { data, isLoading, refetch } = useGetAllNotifications(userId, filters);

  // Memo hóa danh sách thông báo
  const notifications = useMemo(() => data?.data?.data || [], [data]);
  const unreadCount = data?.data?.unreadCount;

  // Memo hóa giá trị context để tránh re-render không cần thiết
  const contextValue = useMemo(
    () => ({ notifications, isLoading, refetch, unreadCount }),
    [notifications, isLoading, refetch, unreadCount]
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
