import React, { forwardRef } from "react";
import { cvTheme } from "../../../../constants/enum";
import CVModel1 from "../../../../components/CVModel/CVModel1";
import CVModel2 from "../../../../components/CVModel/CVModel2";
import CVModel3 from "../../../../components/CVModel/CVModel3";

const CVTemplate = forwardRef(({ code, values, isMock, show }, ref) => {  
  return (
    <div>
      {code === cvTheme["MODERN-THEME"] && (
        <CVModel1 isMock={isMock} show={show} values={values} ref={ref} />
      )}
      {code === cvTheme["POLITE-THEME"] && (
        <CVModel2 isMock={isMock} show={show} values={values} ref={ref} />
      )}
      {code === cvTheme["DELICATE-THEME"] && (
        <CVModel3 isMock={isMock} show={show} values={values} ref={ref} />
      )}
    </div>
  );
});

export default CVTemplate;
