import React from "react";
import {
  TableHead,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
} from "@mui/material";

const NomalTable = ({ columns, data, tableHeight }) => {
  return (
    <div>
      <TableContainer
        sx={{
          maxHeight: tableHeight,
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    minWidth: column.minWidth,
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={item.hashSA}>
                  {columns.map((column) => {
                    const value = item[column.id];
                    return (
                      <TableCell key={column.id}>
                        {typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default NomalTable;
