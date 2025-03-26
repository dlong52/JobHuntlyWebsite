import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetPayment } from "../../hooks/modules/payment/useGetPayment";
import { useConvertData, useQueryParams } from "../../hooks";
import Invoice from "../../components/Invoice";
import { Box, Typography } from "@mui/material";
import { RouteBase } from "../../constants/routeUrl";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { CommonIcon } from "../../ui";
import { AntTab, AntTabs } from "../../hr_pages/ProfileHrPage";
import OrderDetail from "./components/OrderDetail";

const PaymentDetailPage = () => {
  const { id } = useParams();
  const query = useQueryParams();
  const navigate = useNavigate();
  // Fetch payment details using the id
  const { data, isLoading } = useGetPayment(id, { enabled: !!id });
  const { dataConvert } = useConvertData(data);
  const type = parseInt(query.type) || 0;
  const handleChange = (_, newValue) => {
    navigate(`?type=${newValue}`);
  };
  const breadcrumbs = [
    <Link
      key={1}
      to={RouteBase.AdminOverview}
      className="hover:underline text-sm font-[500]"
    >
      Trang chủ
    </Link>,
    <Typography key={2} fontWeight={500} className="text-neutrals-100 !text-sm">
      Thông tin đơn hàng
    </Typography>,
  ];

  return (
    <Box className="flex flex-col gap-y-5">
      <BreadcrumbMui breadcrumbs={breadcrumbs} title={"Thông tin đơn hàng"} />
      <Box className="p-5 bg-white rounded-md transition-all duration-500">
        <AntTabs value={type} onChange={handleChange} aria-label="ant example">
          <AntTab
            label={
              <Box className="flex items-center gap-1">
                <CommonIcon.DescriptionTwoTone />
                Chi tiết
              </Box>
            }
          />
          <AntTab
            label={
              <Box className="flex items-center gap-1">
                <CommonIcon.ReceiptTwoTone />
                Hóa đơn
              </Box>
            }
          />
        </AntTabs>
        <Box className="mt-5">
          {type === 0 && (
            <OrderDetail loading={isLoading} payment={dataConvert} />
          )}
          {type === 1 && <Invoice loading={isLoading} payment={dataConvert} />}
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentDetailPage;
