import * as React from "react";
import DataTable from "react-data-table-component";
import { History } from "../components/Columns";

export default function DataGridTable({ pageState, handlePageChange, filtered }) {
  return (
    <div
      style={{
        flexGrow: 1,
        height: "500px",
        width: "100%",
        position: "relative",
      }}
    >
      <DataTable
        columns={History}
        data={filtered?pageState:pageState.data}
        pagination
        paginationServer
        paginationTotalRows={pageState.total}
        onChangePage={handlePageChange}
      />
    </div>
  );
}
