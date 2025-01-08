import React from "react";
import { CommonTable } from "../../ui";

const CompanyPage = () => {
  const columns = [
    { id: "name", label: "Name", numeric: false, sortable: true },
    { id: "calories", label: "Calories", numeric: true, sortable: true },
    { id: "fat", label: "Fat (g)", numeric: true, sortable: true },
  ];

  const rows = [
    { id: 1, name: "Cupcake", calories: 305, fat: 3.7 },
    { id: 2, name: "Donut", calories: 452, fat: 25.0 },
    { id: 3, name: "Eclair", calories: 262, fat: 16.0 },
  ];
  const handleDelete = (selectedIds) => {
    console.log("Delete rows with IDs:", selectedIds);
  };

  const handleRowClick = (event, row) => {
    console.log("Row clicked:", row);
  };

  return (
    <div>
      <CommonTable
        columns={columns}
        data={rows}
        title="Sample Table"
        onDelete={handleDelete}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default CompanyPage;
