import { RouteBase } from "../constants/routeUrl";
import { CommonIcon } from "../ui";

const sidebarHrRoutes = [
  {
    path: RouteBase.HROverview,
    name: "Bảng tin",
    icon: CommonIcon.DashboardOutlined,
  },
  {
    path: RouteBase.HRJobs,
    name: "Tin tuyển dụng",
    icon: CommonIcon.NewspaperOutlined,
  },
  {
    path: "/hr1",
    name: "Báo cáo tuyển dụng",
    icon: CommonIcon.FeedOutlined,
  },
  {
    path: "/hr1",
    name: "Quản lí CV",
    icon: CommonIcon.AccountCircleOutlined,
  },
  {
    path: "/hr1",
    name: "Doanh nghiệp",
    icon: CommonIcon.Business,
  },
  {
    path: RouteBase.HRPackage,
    name: "Mua dịch vụ",
    icon: CommonIcon.Wallet,
  },
  {
    path: RouteBase.HRMyPackage,
    name: "Dịch vụ của tôi",
    icon: CommonIcon.AutoFixHighOutlined,
  },
];
const sidebarAdminRoutes = [
  {
    path: RouteBase.AdminOverview,
    name: "Bảng tin",
    icon: CommonIcon.DashboardOutlined,
  },
  {
    path: RouteBase.AdminPostManagement,
    name: "Tin tuyển dụng",
    icon: CommonIcon.NewspaperOutlined,
  },
  {
    path: RouteBase.AdminPackageManagement,
    name: "Dịch vụ",
    icon: CommonIcon.Wallet,
  },
  {
    path: RouteBase.AdminNotifyManagement,
    name: "Thông báo",
    icon: CommonIcon.Notifications,
  },
  {
    path: RouteBase.AdminUserManagement,
    name: "Quản lí người dùng",
    icon: CommonIcon.People,
  },
  {
    path: RouteBase.AdminRevenueManagement,
    name: "Quản lí doanh thu",
    icon: CommonIcon.Troubleshoot,
  },
];
export { sidebarHrRoutes, sidebarAdminRoutes };
