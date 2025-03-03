import { useEffect } from "react";

const useCripsUser = (user) => {
  useEffect(() => {
    const loadCrips = () => {
      if (window.Crips && user?.email) {
        window.Crips.setUser({ email: user.email });
      }
    };

    if (window.Crips) {
      loadCrips();
    } else {
      window.addEventListener("crisp:ready", loadCrips);
    }

    return () => {
      window.removeEventListener("crisp:ready", loadCrips);
    };
  }, [user]);
};

export default useCripsUser;
