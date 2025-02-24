import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn về đầu trang
  }, [location]);

  return null; // Không render gì ra UI
};

export default ScrollToTop;
