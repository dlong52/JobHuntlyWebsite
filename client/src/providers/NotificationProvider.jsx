import { createContext, useContext, useMemo, useCallback } from "react";
import { useGetAllNotifications } from "../hooks/modules/notification/useGetAllNotifications";
import { useSelector } from "react-redux";
import useFilters from "../hooks/useFilters";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  // Optimized selector to only get userId
  const userId = useSelector((state) => state.user?.user_id);

  // Memoized initial filters
  const initialFilters = useMemo(() => ({ page: 1, limit: 5, sort: "desc" }), []);
  const { filters } = useFilters(initialFilters);

  // Fetch notifications data
  const { data, isLoading, refetch: originalRefetch } = useGetAllNotifications(userId, filters);

  // Memoize refetch to prevent unnecessary re-renders
  const refetch = useCallback(() => originalRefetch(), [originalRefetch]);

  // Extract and memoize notification data
  const notifications = useMemo(() => data?.data?.data || [], [data]);
  const unreadCount = useMemo(() => data?.data?.unreadCount || 0, [data]);

  // Memoize context value
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

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};