import { RouteBase } from "../constants/routeUrl";
import {
  CompanyPage,
  CreateCVPage,
  CvManagementPage,
  FindJobPage,
  HomePage,
  SignInPage,
  SignUpPage,
  SignUpHrPage,
  NotFoundPage,
  ProfileSettingPage,
} from "@/pages";
import {
  ChatPage,
  MyPackagePage,
  OverViewPage,
  PackageDetailPage,
  PackagePage,
  PostJobPage,
  ProfileHrPage,
} from "../hr_pages";
import { HRLayout } from "../layouts";
import { roles } from "../constants";
import { JobDetailsPage } from "../pages";
const Routes = [
  {
    path: RouteBase.Home,
    component: HomePage,
    permissionAllow: [roles.ALL], 
  },
  {
    path: RouteBase.SignIn,
    component: SignInPage,
    permissionAllow: [roles.ALL], 
    layout: null,
  },
  {
    path: RouteBase.SignUp,
    component: SignUpPage,
    permissionAllow: [roles.ALL], 
    layout: null,
  },
  {
    path: RouteBase.SignUpHr,
    component: SignUpHrPage,
    permissionAllow: [roles.ALL], 
    layout: null,
  },
  {
    path: RouteBase.Job,
    component: FindJobPage,
    permissionAllow: [roles.ALL], 
  },
  {
    path: RouteBase.JobDetail,
    component: JobDetailsPage,
    permissionAllow: [roles.ALL], 
  },
  {
    path: RouteBase.CVTemplate,
    component: CvManagementPage,
    permissionAllow: [roles.ALL], 
  },
  {
    path: `${RouteBase.CVTemplate}/:id`,
    component: CreateCVPage,
    permissionAllow: [roles.ALL], 
  },
  {
    path: RouteBase.Company,
    component: CompanyPage,
    permissionAllow: [roles.ALL], 
  },
  {
    path: RouteBase.Profile,
    component: ProfileSettingPage,
    permissionAllow: [roles.ALL], 
  },
  {
    path: "*",
    component: NotFoundPage,
    permissionAllow: [roles.ALL], 
    layout: null,
  },

  {
    path: RouteBase.HROverview,
    component: OverViewPage,
    permissionAllow: [roles.ALL], 
    layout: HRLayout,
  },
  {
    path: RouteBase.HRJobs,
    component: PostJobPage,
    permissionAllow: [roles.ALL], 
    layout: HRLayout,
  },
  {
    path: RouteBase.HRProfile,
    component: ProfileHrPage,
    permissionAllow: [roles.ALL], 
    layout: HRLayout,
  },
  {
    path: RouteBase.HRChat,
    component: ChatPage,
    permissionAllow: [roles.ALL], 
    layout: HRLayout,
  },
  {
    path: RouteBase.HRPackage,
    component: PackagePage,
    permissionAllow: [roles.ALL], 
    layout: HRLayout,
  },
  {
    path: `${RouteBase.HRPackage}/:id`,
    component: PackageDetailPage,
    permissionAllow: [roles.ALL], 
    layout: HRLayout,
  },
  {
    path: RouteBase.HRMyPackage,
    component: MyPackagePage,
    permissionAllow: [roles.ALL], 
    layout: HRLayout,
  },
];

export default Routes;
