import { RouteBase } from "../constants/routeUrl";
import { CommonIcon } from "../ui";

const sidebarHrRoutes = [
  {
    path: RouteBase.HROverview,
    name: "Bảng tin",
    icon: CommonIcon.DashboardCustomizeTwoTone,
  },
  {
    path: RouteBase.HRJobs,
    name: "Tin tuyển dụng",
    icon: CommonIcon.NewspaperTwoTone,
  },
  {
    path: RouteBase.HRRecruitmentReport,
    name: "Báo cáo tuyển dụng",
    icon: CommonIcon.FeedTwoTone,
  },
  {
    path: RouteBase.HRCvManagement,
    name: "Quản lí CV",
    icon: CommonIcon.AccountCircleTwoTone,
  },
  {
    path: RouteBase.HRMyCompany,
    name: "Doanh nghiệp",
    icon: CommonIcon.BusinessTwoTone,
  },
  {
    path: RouteBase.HRPackage,
    name: "Mua dịch vụ",
    icon: CommonIcon.WalletTwoTone,
  },
  {
    path: RouteBase.HRMyPackage,
    name: "Dịch vụ của tôi",
    icon: CommonIcon.CardTravelTwoTone,
  },
];
const sidebarAdminRoutes = [
  {
    path: RouteBase.AdminOverview,
    name: "Bảng tin",
    icon: CommonIcon.DashboardCustomizeTwoTone,
  },
  {
    path: RouteBase.AdminPostManagement,
    name: "Tin tuyển dụng",
    icon: CommonIcon.NewspaperTwoTone,
  },
  {
    path: RouteBase.AdminPackageManagement,
    name: "Dịch vụ",
    icon: CommonIcon.WalletTwoTone,
  },
  {
    path: RouteBase.AdminNotifyManagement,
    name: "Thông báo",
    icon: CommonIcon.NotificationsTwoTone,
  },
  {
    path: RouteBase.AdminCompanyManagement,
    name: "Quản lí công ty",
    icon: CommonIcon.BusinessTwoTone,
  },
  {
    path: RouteBase.AdminUserManagement,
    name: "Quản lí người dùng",
    icon: CommonIcon.PeopleTwoTone,
  },
  {
    path: RouteBase.AdminRevenueManagement,
    name: "Quản lí doanh thu",
    icon: CommonIcon.TroubleshootTwoTone,
  },
  {
    path: RouteBase.AdminCategory,
    name: "Quản lí danh mục",
    icon: CommonIcon.CategoryTwoTone,
  },
  {
    path: RouteBase.AdminCvTheme,
    name: "Chủ đề CV",
    icon: CommonIcon.ColorLensTwoTone,
  },
  {
    path: RouteBase.AdminReport,
    name: "Báo cáo",
    icon: CommonIcon.ReportTwoTone,
  },
];
export { sidebarHrRoutes, sidebarAdminRoutes };
