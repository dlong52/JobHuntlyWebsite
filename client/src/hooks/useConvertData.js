import { useMemo } from "react";

const useConvertData = (data) => {
  const dataConvert = useMemo(() => {
    if (data) {
      return data?.data?.data;
    }
    return undefined;
  }, [data]);

  return {
    dataConvert,
  };
};

export default useConvertData;
