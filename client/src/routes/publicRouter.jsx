import { Fragment } from "react";
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
  ProfileSettingPage
} from "@/pages";
import { RouteBase } from "../constants/routeUrl";

const publicRoutes = [
  {
    path: RouteBase.Home,
    component: HomePage,
  },
  {
    path: RouteBase.SignIn,
    component: SignInPage,
    layout: null,
  },
  {
    path: RouteBase.SignUp,
    component: SignUpPage,
    layout: null,
  },
  {
    path: RouteBase.SignUpHr,
    component: SignUpHrPage,
    layout: null,
  },
  {
    path: RouteBase.Job,
    component: FindJobPage,
  },
  {
    path: RouteBase.CVTemplate,
    component: CvManagementPage,
  },
  {
    path: `${RouteBase.CVTemplate}/:id`,
    component: CreateCVPage,
  },
  {
    path: RouteBase.Company,
    component: CompanyPage,
  },
  {
    path: RouteBase.Profile,
    component: ProfileSettingPage,
  },
  {
    path: "*",
    component: NotFoundPage,
    layout: null,
  },
];
export default publicRoutes;
