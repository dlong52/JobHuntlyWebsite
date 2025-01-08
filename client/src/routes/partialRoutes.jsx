import { RouteBase } from "../constants/routeUrl";
import { CommonIcon } from "../ui";

const sidebarAdminRoutes = [
    {
        path: RouteBase.HROverview,
        name: 'Bảng tin',
        icon: CommonIcon.DashboardOutlined,
    },
    {
        path: RouteBase.HRJobs,
        name: 'Tin tuyển dụng',
        icon: CommonIcon.NewspaperOutlined,
    },
    {
        path: "/hr1",
        name: 'Báo cáo tuyển dụng',
        icon: CommonIcon.FeedOutlined,
    },
    {
        path: "/hr1",
        name: 'Quản lí CV',
        icon: CommonIcon.AccountCircleOutlined,
    },
    {
        path: "/hr1",
        name: 'Doanh nghiệp',
        icon: CommonIcon.Business,
    },
    {
        path: RouteBase.HRPackage,
        name: 'Mua dịch vụ',
        icon: CommonIcon.Wallet,
    },
    {
        path: RouteBase.HRMyPackage,
        name: 'Dịch vụ của tôi',
        icon: CommonIcon.AutoFixHighOutlined,
    },
];

export {
    sidebarAdminRoutes
}