import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import React from 'react';
import { Link } from 'react-router-dom';

const CompanyItem = ({ data }) => {
  return (
    <div className="flex gap-4 p-4 items-center bg-white rounded-md border">
      <img
        className="w-16 h-16 object-cover rounded-md"
        src={data?.logo}
        alt={data?.name}
      />
      <div className="flex flex-col">
        <div className="flex items-center gap-6 mb-2">
          <Link to={'/admin/company'} className="text-sm font-semibold text-gray-900">{data?.name}</Link>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <span className="size-2 rounded-full bg-neutrals-100 "></span>
            <span>Đang tuyển {data?.jobQuantity} vị trí</span>
          </div>
        </div>

        <span className="text-sm text-gray-600 flex items-center gap-1">
          <PlaceOutlinedIcon className='w-4' />
          {data?.location}
        </span>
      </div>
    </div>
  );
};

export default CompanyItem;
