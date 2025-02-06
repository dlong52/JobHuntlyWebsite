import { Pagination } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const PaginationMui = ({ page, totalPages, handleChangePage }) => {
  const useStyles = makeStyles((theme) => ({
    Pagination: {
      padding: 15,
      display: "flex",
      justifyContent: "center",
      width: "fit-content",
      "& ul": {
        "& li": {
          "& .MuiPaginationItem-root": {},
          "& .Mui-selected": {
            backgroundColor: "var(--primary)",
            color: "#fff",
            "&:hover": {
              backgroundColor: "var(--primary-light)",
            },
          },
        },
      },
    },
  }));
  const classes = useStyles();

  return (
    <Pagination
      className={classes.Pagination}
      color="secondary"
      count={totalPages}
      onChange={handleChangePage}
      page={page}
    />
  );
};

export default PaginationMui;
