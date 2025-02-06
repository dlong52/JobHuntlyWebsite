import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Logo } from "@/components";
import { Badge, Box, Container } from "@mui/material";
import { CommonAvatar, CommonIcon, CommonPopover } from "../../../ui";
import { RouteBase } from "../../../constants/routeUrl";
import NotifyPopover from "./components/NotifyPopover";
import AccountPopover from "./components/AccountPopover";
import { ROLE } from "../../../constants/enum";

const Header = () => {
  const user = useSelector((state) => state.user);
  const [isScrolled, setIsScrolled] = useState(false);
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

  return (
    <Fragment>
      <Box
        className={`flex items-center justify-between fixed top-0 left-0 right-0 h-header z-[99] ${
          isScrolled ? "bg-white shadow-sm" : "bg-transparent"
        }`}
      >
        <Container className="flex items-center justify-between">
          <Box className=" flex items-center gap-12">
            <Logo />
            <Box className="flex items-center gap-6 font-medium text-neutrals-100">
              <Link to={RouteBase.Job}>Việc làm</Link>
              <Link to={RouteBase.Company}>Doanh nghiệp</Link>
              <Link to={RouteBase.CVTemplate}>Tạo CV</Link>
            </Box>
          </Box>
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
                  body={<NotifyPopover />}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  zIndex={1300}
                  onClick={() => console.log("Popover clicked!")}
                >
                  <Badge color="error" badgeContent={1000} max={99}>
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
                  body={<AccountPopover user={user} />}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  zIndex={1300}
                  onClick={() => console.log("Popover clicked!")}
                >
                  <Box className="cursor-pointer" variant="contained">
                    <CommonAvatar />
                  </Box>
                </CommonPopover>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
};

export default Header;
