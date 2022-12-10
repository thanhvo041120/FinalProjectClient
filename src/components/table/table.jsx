import React from "react";
import {
  TableHead,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
} from "@mui/material";
import { Button, Paper } from "../../../node_modules/@mui/material/index";
const TableComponent = ({
  tableName,
  columns,
  data,
  tableHeight,
  handleClick,
}) => {
  const solveClick = (e, id) => {
    const buttonName = e.target.innerText;
    handleClick(tableName, id, buttonName);
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: tableHeight,
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              {columns.map((column) => {
                if (column.id === "options") {
                  return (
                    <TableCell
                      key={column.id}
                      style={{
                        display: "flex",
                        minWidth: column.minWidth,
                        justifyContent: "flex-end",
                        fontSize: 18,
                        fontWeight: 700,
                      }}
                    >
                      {column.label}
                    </TableCell>
                  );
                } else {
                  return (
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
                  );
                }
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => {
              return (
                <TableRow
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                  role="checkbox"
                  tabIndex={-1}
                  key={item.id}
                >
                  {columns.map((column) => {
                    if (column.id === "options") {
                      if (tableName === "book") {
                        return (
                          <TableCell
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              width: "100%",
                              height: "100%",
                            }}
                            key={column.id}
                          >
                            <Button
                              variant="contained"
                              sx={{
                                marginTop: "5px",
                                marginBottom: "5px",
                                width: "100%",
                                height: "100%",
                              }}
                              onClick={(e) => solveClick(e, item.id)}
                            >
                              Update
                            </Button>
                          </TableCell>
                        );
                      }
                      if (tableName === "overdue") {
                        return (
                          <TableCell
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              width: "100%",
                              height: "100%",
                            }}
                            key={column.id}
                          >
                            <Button
                              variant="contained"
                              sx={{
                                marginTop: "5px",
                                marginBottom: "5px",
                                width: "100%",
                                height: "100%",
                              }}
                              onClick={(e) => solveClick(e, item.id)}
                            >
                              Notify
                            </Button>
                          </TableCell>
                        );
                      }
                      if (tableName === "user") {
                        return (
                          <TableCell
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-end",
                            }}
                            key={column.id}
                          >
                            <Button
                              sx={{
                                marginTop: "5px",
                                marginBottom: "5px",
                              }}
                              variant="contained"
                              onClick={(e) => solveClick(e, item.id)}
                            >
                              Reset
                            </Button>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                          }}
                          key={column.id}
                        >
                          <Button
                            sx={{
                              marginTop: "5px",
                              marginBottom: "5px",
                            }}
                            variant="contained"
                            onClick={(e) => solveClick(e, item.id)}
                          >
                            Update
                          </Button>
                          <Button
                            sx={{
                              marginTop: "5px",
                              marginBottom: "5px",
                            }}
                            variant="contained"
                            onClick={(e) => solveClick(e, item.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      );
                    }
                    if (column.id !== "options") {
                      if (tableName === "overdue" && column.id === "email") {
                        const value = item.account[column.id];
                        return (
                          <TableCell key={column.id}>
                            {typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      }
                      const value = item[column.id];
                      return (
                        <TableCell key={column.id}>
                          {typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    }
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

export default TableComponent;
