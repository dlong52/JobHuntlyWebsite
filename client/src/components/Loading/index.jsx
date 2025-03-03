import React, { useEffect } from "react";
import { Atom, FourSquare } from "react-loading-indicators";

const Loading = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Ngăn scroll
    return () => {
      document.body.style.overflow = "auto"; // Khôi phục khi component unmount
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#acacac8a] flex items-center justify-center">
      <Atom color="#4527a0" size="medium" text="" textColor="" />
      {/* <FourSquare color="#4527a0" size="medium" text="" textColor="" /> */}
    </div>
  );
};

export default Loading;
