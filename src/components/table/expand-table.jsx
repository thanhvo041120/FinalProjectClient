import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "../../../node_modules/@mui/material/index";
import { getSADetail } from "api/book.api";
import { getBorrowers } from "hooks/smartcontract";
import { getUserByWallet } from "api/user.api";
import { useEffect } from "react";

const Row = (props) => {
  const [owners, setOwners] = React.useState([]);
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const borrowersColumn = [
    { id: "hashSA", label: "Book SA code", minWidth: 170 },
    { id: "borrower", label: "Holders", minWidth: 100 },
  ];
  const getBorrower = async () => {
    const response = await getSADetail(row.id);
    const data = await Promise.all(
      response.data.map(async (item) => {
        const borrower = await getBorrowers(item.address);
        return { hashSA: item.hashSA, borrower: borrower };
      })
    );
    const users = await Promise.all(
      data.map(async (item) => {
        const response = await getUserByWallet(item.borrower);
        if (response.data.roleId === 2 || response.data.roleId === 1) {
          return { hashSA: item.hashSA, borrower: "Library" };
        }
        return {
          hashSA: item.hashSA,
          borrower: response.data?.user?.fullname,
        };
      })
    );
    setOwners(users);
  };
  useEffect(() => {
    getBorrower();
  }, [open]);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell scope="row" align="center">
          {row.name}
        </TableCell>
        <TableCell align="justify">{row.description}</TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            sx={{
              marginTop: "5px",
              marginBottom: "5px",
              width: "100%",
              height: "100%",
            }}
            onClick={(e) => props.solveClick(e, row.id)}
          >
            Update
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Holders
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {borrowersColumn.map((column) => (
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
                  {owners.map((owner) => (
                    <TableRow key={owner.hashSA}>
                      {borrowersColumn.map((column) => {
                        const value = owner[column.id];
                        return (
                          <TableCell key={column.id}>
                            {typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const ExpandTable = ({
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
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: tableHeight,
      }}
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <TableCell />
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
          {data.map((row) => (
            <Row key={row.id} row={row} solveClick={solveClick} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpandTable;
