import React from 'react';
import { useLocation, Link } from 'react-router-dom'; 
import { sidebarAdminRoutes } from '../../../routes/partialRoutes';
import { Logo } from '../../../components';
import { Box } from '@mui/material';

const Sidebar = () => {
  const location = useLocation();
  return (
    <Box className='w-sidebar min-h-screen bg-white fixed left-0 top-0 bottom-0 z-10 font-serif'>
      <Box>
        <Box className="pb-8">
          <Box className="px-6 h-header-hr flex items-center">
            <Logo />
          </Box>
        </Box>
        <Box className="flex flex-col gap-y-3">
          {sidebarAdminRoutes.map((route, index) => {
            const Icon = route.icon;
            return (
              <Box
                key={index}
                className={`relative px-6`}
              >
                <Link
                  to={route.path}
                  className={`flex items-center gap-x-5 px-3 py-3 rounded-lg font-Inter text-base ${location.pathname === route.path ? 'bg-primary-light text-primary font-medium' : 'bg-transparent text-gray-700'
                    }`}
                >
                  <Icon className="w-6 h-6" />
                  {route.name}
                </Link>
              </Box>
            );
          })}
        </Box>
        <Box></Box>
      </Box>
      <Box></Box>
    </Box>
  );
};

export default Sidebar;
