import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  Typography,
  Button,
  Pagination,
  Box,
  Skeleton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { empty } from "../../assets/images";
import { twMerge } from "tailwind-merge";

const TableMui = ({
  columns,
  rows,
  total,
  page,
  onPageChange,
  toolbarTitle,
  toolbarActions,
  loading,
  isHeader = true,
  classNameTitle,
  isButton = true,
}) => {
  const useStyles = makeStyles(() => ({
    Pagination: {
      padding: 15,
      display: "flex",
      justifyContent: "center",
      width: "fit-content",
      "& ul": {
        "& li": {
          "& .Mui-selected": {
            backgroundColor: "var(--primary-light)",
            borderColor: "var(--primary)",
            color: "var(--primary)",
            "&:hover": {
              backgroundColor: "var(--primary-light)",
            },
          },
        },
      },
    },
  }));
  const classes = useStyles();

  // Determine if a column is the last visible column
  const isLastColumn = (index) => {
    return index === columns.length - 1;
  };

  const renderTableContent = () => {
    if (loading) {
      return (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell 
                    key={column.field}
                    align={isLastColumn(index) ? "right" : (column.align || "left")}
                  >
                    <Skeleton />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array(5)
                .fill(null)
                .map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column, colIndex) => (
                      <TableCell 
                        key={column.field}
                        align={isLastColumn(colIndex) ? "right" : (column.align || "left")}
                      >
                        <Skeleton />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

    if (rows?.length === 0) {
      return (
        <Box className="flex justify-center" padding={3}>
          <img src={empty} className="w-[200px]" alt="No data available" />
        </Box>
      );
    }

    return (
      <TableContainer className="!text-neutrals-100">
        <Table>
          {isHeader && (
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    className={twMerge(
                      "text-nowrap text-neutrals-100",
                      column?.classNameHeader
                    )}
                    key={column.field}
                    // Apply right alignment to the last column header
                    align={isLastColumn(index) ? "right" : (column.align || "left")}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={row.id || rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell 
                    key={column.field} 
                    // Apply right alignment to the last column cells
                    align={isLastColumn(colIndex) ? "right" : (column.align || "left")}
                    // Add additional class for the last column if needed
                    className={isLastColumn(colIndex) ? "justify-end" : ""}
                  >
                    {column.renderCell ? column.renderCell(row) : JSON.stringify(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Paper sx={{ boxShadow: "none" }}>
      <Toolbar className="border-b" style={{ padding: "20px 16px" }}>
        <Typography
          variant="h6"
          className={twMerge("!text-neutrals-100", classNameTitle)}
          component="div"
          style={{ flexGrow: 1 }}
        >
          {toolbarTitle || "Tiêu đề"}
        </Typography>
        {toolbarActions &&
          toolbarActions.map((action, index) => (
            <Button
              key={index}
              className={action.className}
              onClick={action.onClick}
              variant={action.variant || "contained"}
              color={action.color || "primary"}
              style={action.style || {}}
            >
              {action.label}
            </Button>
          ))}
      </Toolbar>

      {renderTableContent()}

      {!loading && rows?.length > 0 && (
        <Box className="w-full flex justify-end px-4">
          <Pagination
            className={classes.Pagination}
            color="secondary"
            count={total}
            onChange={onPageChange}
            page={page}
          />
        </Box>
      )}
    </Paper>
  );
};

export default TableMui;