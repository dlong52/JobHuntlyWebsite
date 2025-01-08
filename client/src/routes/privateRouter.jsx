import {
    AdminCategoryPage,
    AdminCompanyPage,
    AdminHomePage,
    AdminPostPage,
    AdminProfilePage,
    AdminRevenuePage,
    AdminUserPage
} from "../admin_pages"
import { AdminLayout } from "../layouts"

const privateRoutes = [
    {
        path: "/admin",
        component: AdminHomePage,
        layout: AdminLayout
    },
    {
        path: '/admin/post',
        component: AdminPostPage,
        layout: AdminLayout
    },
    {
        path: '/admin/category',
        component: AdminCategoryPage,
        layout: AdminLayout
    },
    {
        path: '/admin/company',
        component: AdminCompanyPage,
        layout: AdminLayout
    },
    {
        path: '/admin/revenue',
        component: AdminRevenuePage,
        layout: AdminLayout
    },
    {
        path: '/admin/user',
        component: AdminUserPage,
        layout: AdminLayout
    },
    {
        path: '/admin/profile',
        component: AdminProfilePage,
        layout: AdminLayout
    },
]
export default privateRoutes