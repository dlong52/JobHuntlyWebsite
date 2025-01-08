import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";
import { CommonAccordion } from "../../../../ui";

const JobFilter = () => {
  return (
    <div className="flex flex-col gap-4 font-Epilogue">
      <div className="flex flex-col gap-y-2">
        <CommonAccordion title={"Loại hình việc làm"}>
          <FormGroup className="">
            <FormControlLabel
              sx={{
                "& .MuiFormControlLabel-label": {
                  color: "#7C8493",
                },
              }}
              control={
                <Checkbox
                  sx={{
                    color: "#7C8493",
                    "&.Mui-checked": {
                      color: "#4640DE",
                    },
                    "&:hover": {
                      color: "#4640DE",
                    },
                  }}
                />
              }
              label="Bán thời gian"
            />
            <FormControlLabel
              sx={{
                "& .MuiFormControlLabel-label": {
                  color: "#7C8493",
                },
              }}
              control={
                <Checkbox
                  sx={{
                    color: "#7C8493",
                    "&.Mui-checked": {
                      color: "#4640DE",
                    },
                    "&:hover": {
                      color: "#4640DE",
                    },
                  }}
                />
              }
              label="Thực tập"
            />
            <FormControlLabel
              sx={{
                "& .MuiFormControlLabel-label": {
                  color: "#7C8493",
                },
              }}
              control={
                <Checkbox
                  sx={{
                    color: "#7C8493",
                    "&.Mui-checked": {
                      color: "#4640DE",
                    },
                    "&:hover": {
                      color: "#4640DE",
                    },
                  }}
                />
              }
              label="Từ xa"
            />
          </FormGroup>
        </CommonAccordion>
      </div>
    </div>
  );
};

export default JobFilter;
