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
    path: RouteBase.HRRecruitmentReport,
    name: "Báo cáo tuyển dụng",
    icon: CommonIcon.FeedOutlined,
  },
  {
    path: RouteBase.HRCvManagement,
    name: "Quản lí CV",
    icon: CommonIcon.AccountCircleOutlined,
  },
  {
    path: RouteBase.HRMyCompany,
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
    path: RouteBase.AdminCompanyManagement,
    name: "Quản lí công ty",
    icon: CommonIcon.Business,
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
  {
    path: RouteBase.AdminCategory,
    name: "Quản lí danh mục",
    icon: CommonIcon.Category,
  },
  {
    path: RouteBase.AdminCvTheme,
    name: "Chủ đề CV",
    icon: CommonIcon.ColorLens,
  },
  {
    path: RouteBase.AdminReport,
    name: "Báo cáo",
    icon: CommonIcon.Report,
  },
];
export { sidebarHrRoutes, sidebarAdminRoutes };
