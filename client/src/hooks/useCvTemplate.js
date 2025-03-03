import { useMemo } from "react";
import { cvThemes } from "../constants/cvTheme";

const useCvTemplate = (id) => {
  return useMemo(() => {
    const theme = cvThemes.find((theme) => theme.id === id);
    return theme ? theme.template : <div>Không tìm thấy mẫu CV</div>;
  }, [id]);
};

export default useCvTemplate;
