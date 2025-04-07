import React from "react";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { RouteBase } from "../../constants/routeUrl";
import { CommonIcon } from "../../ui";
import UploadAvatar from "./components/UploadAvatar";
import ChangePassword from "./components/ChangePassword";

const AdminChangePasswordPage = () => {
    const breadcrumbs = [
        <Link
            key="1"
            color="inherit"
            to={RouteBase.AdminOverview}
            className="text-primary"
        >
            <CommonIcon.Home fontSize="small" />
        </Link>,
        <Typography
            key="3"
            sx={{ fontWeight: 500, fontSize: "14px", color: "text.primary" }}
        >
            Đổi mật khẩu
        </Typography>,
    ];
    return (
        <div>
            <BreadcrumbMui title={"Đổi mật khẩu"} breadcrumbs={breadcrumbs} />
            <Box className="mt-5 bg-white rounded-sm shadow">
                <Typography
                    sx={{
                        fontSize: "20px",
                        fontWeight: 500,
                        color: "var(--neutrals-100)",
                    }}
                    className="p-5 border-b"
                >
                    Tài khoản
                </Typography>
                <Box className="mt-4 grid grid-cols-12 gap-4 px-5 pb-5">
                    <Box className="col-span-3 p-5 border bg-white rounded-md h-fit">
                        <UploadAvatar />
                    </Box>
                    <Box className="col-span-9 p-5 border bg-white rounded-md">
                        <ChangePassword />
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default AdminChangePasswordPage