import CommonIcons from 'components/CommonIcons';
import IconDoc from 'components/CommonIcons/IconMenu/IconDoc';
import { RouteBase } from './routeUrl';
import React from 'react';
import IconDecentralization from 'components/CommonIcons/IconMenu/IconDecentralization';
import IconEditChange from 'components/CommonIcons/IconMenu/IconEditChange';
import IconActivity from 'components/CommonIcons/IconMenu/IconActivity';
import IconCategory from 'components/CommonIcons/IconMenu/IconCategory';
import IconCall from 'components/CommonIcons/IconMenu/IconCall';
import Icon2User from 'components/CommonIcons/IconMenu/Icon2User';
import IconHome from 'components/CommonIcons/IconMenu/IconHome';
import IconChart from 'components/CommonIcons/IconMenu/IconChart';
import IconSquare from 'components/CommonIcons/IconMenu/IconSquare';

export const leftmenu = [
  {
    'Phân quyền dữ liệu': [
      {
        label: 'Danh sách nhân viên',
        icon: IconDoc,
        path: RouteBase.UserList,
      },
      {
        label: 'Phân quyền nhân viên',
        icon: IconDecentralization,
        path: RouteBase.Permission,
      },
    ],
  },
  {
    'Danh mục': [
      {
        label: 'Sửa đổi chi nhánh',
        icon: IconEditChange,
        path: RouteBase.BrandManagement,
      },
      {
        label: 'Sửa đổi dịch vụ',
        icon: IconActivity,
        path: RouteBase.Services,
      },
    ],
  },
  {
    ADS: [
      {
        label: 'Danh sách tài khoản',
        icon: IconCategory,
        path: RouteBase.Accounts,
      },
    ],
  },
  {
    'Tổng đài': [
      {
        label: 'Danh sách line',
        icon: IconCall,
        path: RouteBase.LineList,
      },
    ],
  },
  {
    'Quản lý thương hiệu': [
      {
        label: 'Danh sách thương hiệu',
        icon: IconSquare,
        path: RouteBase.Projects,
      },
    ],
  },
];
export const adminMenu = [
  {
    'Phân quyền dữ liệu': [
      {
        label: 'Danh sách nhân viên',
        icon: IconDoc,
        path: RouteBase.UserList,
      },
      {
        label: 'Phân quyền nhân viên',
        icon: IconDecentralization,
        path: RouteBase.Permission,
      },
    ],
  },
  {
    'Danh mục': [
      {
        label: 'Sửa đổi chi nhánh',
        icon: IconEditChange,
        path: RouteBase.BrandManagement,
      },
      {
        label: 'Sửa đổi dịch vụ',
        icon: IconActivity,
        path: RouteBase.Services,
      },
    ],
  },
  {
    'Tổng đài': [
      {
        label: 'Danh sách line',
        icon: IconCall,
        path: RouteBase.LineList,
      },
    ],
  },
];

export const menuTelesale = [
  {
    'Danh mục': [
      {
        label: 'Trang tổng quan',
        icon: IconHome,
        path: RouteBase.TelesaleDashboard,
      },
      {
        label: 'Danh bạ',
        icon: Icon2User,
        path: RouteBase.Contacts,
      },
      {
        label: 'Báo cáo',
        icon: IconChart,
        path: RouteBase.Report,
      },
      {
        label: 'Kho lưu trữ',
        icon: IconChart,
        path: RouteBase.Archives
      },
    ],
  },
];
export const menuFanpage = [
  {
    'Danh mục': [
      {
        label: 'Trang tổng quan',
        icon: IconHome,
        path: RouteBase.FanpageDashboard,
      },
      {
        label: 'Dữ liệu',
        icon: IconDoc,
        path: RouteBase.Data,
      },
      {
        label: 'Báo cáo',
        icon: IconChart,
        path: RouteBase.Report
      },
    ],
  },
];
export const menuTelesaleLead = [
  {
    'Danh mục': [
      {
        label: 'Trang tổng quan',
        icon: IconHome,
        path: RouteBase.TelesaleDashboard,
      },

      {
        label: 'Danh bạ',
        icon: Icon2User,
        path: RouteBase.Contacts,
      },
      {
        label: 'Quản lý telesale',
        icon: CommonIcons.ManageUser,
        path: RouteBase.TelesaleManage
      },
      {
        label: 'Báo cáo',
        icon: IconChart,
        path: RouteBase.Report,
      },
      {
        label: 'Kho lưu trữ',
        icon: IconChart,
        path: RouteBase.Archives
      },

    ],
  },
];
export const menuAds = [
  {
    'Danh mục': [
      {
        label: 'Báo cáo ngày',
        icon: IconDoc,
        path: RouteBase.DailyReport,
      },
      {
        label: 'Báo cáo tháng',
        icon: CommonIcons.Calendar,
        path: RouteBase.MonthlyReport,
      },
    ],
  },
];
