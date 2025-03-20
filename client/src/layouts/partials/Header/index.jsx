import React, { useState, useEffect, Fragment, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Logo } from "@/components";
import { Badge, Box, Container } from "@mui/material";
import { CommonAvatar, CommonIcon, CommonPopover } from "../../../ui";
import { RouteBase } from "../../../constants/routeUrl";
import NotifyPopover from "./components/NotifyPopover";
import AccountPopover from "./components/AccountPopover";
import { ROLE } from "../../../constants/enum";
import useFilters from "../../../hooks/useFilters";
import { useGetAllNotifications } from "../../../hooks/modules/notification/useGetAllNotifications";
import { useLoadingUser } from "../../../providers/LoadingUserProvider";
import LoadingAccount from "./components/LoadingAccount";
import { useNotification } from "../../../providers/NotificationProvider";

const Header = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const { isLoading: loadingUser } = useLoadingUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const { notifications, isLoading, refetch, unreadCount } = useNotification();
  // const { filters } = useFilters({
  //   page: 1,
  //   limit: 5,
  //   sort: "desc",
  // });
  // const { data, isLoading, refetch } = useGetAllNotifications(
  //   user?.user_id,
  //   filters
  // );
  // const notifications = useMemo(() => {
  //   if (data) {
  //     return data?.data?.data;
  //   }
  //   return [];
  // }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to check if current route matches
  const isActive = (path) => location.pathname.includes(path);
  const onClose = ()=>{}
  return (
    <Fragment>
      <Box
        className={`flex items-center justify-between fixed top-0 left-0 right-0 h-header z-[99] ${
          isScrolled ? "bg-white shadow-sm" : "bg-transparent"
        }`}
      >
        <Container className="flex items-center justify-between">
          <Box className="flex items-center gap-12">
            <Logo />
            {/* Navbar */}
            <Box className="flex items-center gap-6 font-medium text-neutrals-100">
              <Link
                to={RouteBase.Job}
                className={
                  isActive(RouteBase.Job) ? "text-primary font-medium" : ""
                }
              >
                Việc làm
              </Link>
              <Link
                to={RouteBase.Company}
                className={
                  isActive(RouteBase.Company) ? "text-primary font-medium" : ""
                }
              >
                Doanh nghiệp
              </Link>
              <Link
                to={RouteBase.CVTemplate}
                className={
                  isActive(RouteBase.CVTemplate)
                    ? "text-primary font-medium"
                    : ""
                }
              >
                Tạo CV
              </Link>
            </Box>
          </Box>
          {!loadingUser ? (
            <Box className="flex items-center gap-8">
              {(user.role === ROLE.EMPLOYER ||
                user.role === ROLE.ALL ||
                user.role === ROLE.ADMIN ||
                !user.role) && (
                <Fragment>
                  <Link
                    to={"/sign-in"}
                    className="text-primary font-semibold text-base"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to={"/sign-up"}
                    className="bg-primary text-white px-4 py-2 rounded font-semibold text-base"
                  >
                    Đăng ký
                  </Link>
                </Fragment>
              )}
              {user.role === ROLE.CANDIDATE && (
                <Box className="flex items-center gap-6">
                  <CommonPopover
                    body={
                      <NotifyPopover
                        refetch={refetch}
                        isLoading={isLoading}
                        notifications={notifications}
                      />
                    }
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    zIndex={1300}
                  >
                    <Badge
                      color="error"
                      badgeContent={unreadCount}
                      max={99}
                    >
                      <Box className="rounded-full size-[40px] text-primary bg-[#2121d120] flex justify-center items-center cursor-pointer">
                        <CommonIcon.Notifications />
                      </Box>
                    </Badge>
                  </CommonPopover>

                  <Badge color="secondary">
                    <Link
                      to={RouteBase.Connect}
                      className="rounded-full size-[40px] text-primary bg-[#2121d120] flex justify-center items-center"
                    >
                      <CommonIcon.QuestionAnswer />
                    </Link>
                  </Badge>
                  <CommonPopover
                    body={<AccountPopover user={user} onClose={() => onClose?.()} />}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    zIndex={1300}
                    onClose={onClose}
                  >
                    <Box className="cursor-pointer" variant="contained">
                      <CommonAvatar src={user?.avatar_url} />
                    </Box>
                  </CommonPopover>
                </Box>
              )}
            </Box>
          ) : (
            <LoadingAccount />
          )}
        </Container>
      </Box>
    </Fragment>
  );
};

export default Header;
