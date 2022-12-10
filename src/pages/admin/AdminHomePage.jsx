import { getAllBorrowers } from "api/book.api";
import { DrawerComponent } from "components/drawers/index";
import HeaderComponent from "components/header/header";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAppSelector } from "redux/store";
import { Container, Box } from "../../../node_modules/@mui/material/index";
import { BarChartComponent } from "components/charts/index";
import { findAllCategory } from "api/category.api";
import { findAllAccount } from "api/user.api";
import { TableComponent } from "components/table/index";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { DialogNoButtonComponent } from "components/dialog/index";

const AdminHomePage = () => {
  const drawerState = useAppSelector((state) => state.drawer.isOpen);
  const adminOption = useAppSelector((state) => state.admin.option);
  const flag = useAppSelector((state) => state.flag.successState);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [staff, setStaff] = useState([]);
  const [reset, setReset] = useState(false);
  const [id, setId] = useState(0)
  const [borrower, setBorrower] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [],
        borderColor: "",
        borderWidth: 0,
      },
    ],
  });
  const [secondChart, setSecondChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [],
        borderColor: "",
        borderWidth: 0,
      },
    ],
  });
  const fetchBorrower = async () => {
    const response = await getAllBorrowers();
    const category = await findAllCategory();
    const data = response.data.filter((item) => {
      return item.account.roleId === 3;
    });
    const labels = [];
    for (let item of data) {
      if (!(labels.indexOf(item.bookName) !== -1)) {
        labels.push(item.bookName);
      }
    }

    const chart = [];
    for (let item of labels) {
      const length = data.filter((data) => data.bookName === item);
      chart.push(length.length);
    }
    setSecondChartData({
      labels: category.data.map((item) => item.name),
      datasets: [
        {
          label: "Number of books by categories",
          data: category.data.map((item) => item.book.length),
          backgroundColor: ["#50AF95", "#f3ba2f"],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Users",
          data: chart,
          backgroundColor: ["#50AF95", "#f3ba2f"],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
    setBorrower(data);
  };
  const fetchOverdueBorrowers = async () => {
    const response = await findAllAccount();
    const data = response.data.filter((item) => item.roleId === 2);
    const libraryUser = response.data.filter((item) => item.roleId === 3);
    setUser(libraryUser);
    setStaff(data);
  };
  const staffColumns = [
    { id: "email", label: "Email", minWidth: 170 },
    { id: "walletAddress", label: "Wallet", minWidth: 170 },
    { id: "createdAt", label: "Created date", minWidth: 170 },
  ];
  const userColumns = [
    { id: "email", label: "Email", minWidth: 170 },
    { id: "walletAddress", label: "Wallet", minWidth: 170 },
    { id: "createdAt", label: "Created date", minWidth: 170 },
    { id: "options", label: "Options", minWidth: 170 },
  ];
  useEffect(() => {
    fetchBorrower();
    fetchOverdueBorrowers();
  }, [adminOption, flag]);

  const onClickAdd = () => {
    setOpen(true);
  };
  const handleClick = async (form, id, buttonName) => {
    setReset(true);   
    setId(id) 
  };
  return (
    <div>
      <div>
        <HeaderComponent />
      </div>
      {drawerState && (
        <div>
          <DrawerComponent />
        </div>
      )}
      {adminOption.toLowerCase() === "dashboard" && (
        <Container>
          <Box>
            <BarChartComponent chartData={chartData} text="Borrower of books" />
          </Box>
          <Box>
            <BarChartComponent
              chartData={secondChart}
              text="Books of categories"
            />
          </Box>
        </Container>
      )}
      {adminOption.toLowerCase() === "staff" && (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <TableComponent
            tableName="staff"
            columns={staffColumns}
            data={staff}
            tableHeight={800}
          />
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <Fab color="secondary" aria-label="add" onClick={onClickAdd}>
              <AddIcon />
            </Fab>
          </Box>
        </Container>
      )}
      {adminOption.toLowerCase() === "user" && (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <TableComponent
            tableName="user"
            columns={userColumns}
            data={user}
            tableHeight={800}
            handleClick={handleClick}
          />
        </Container>
      )}
      { reset && (
        <DialogNoButtonComponent 
          open={reset}
          setOpen={setReset}
          formName="reset"
          selectedId={id}
        />
      )}
      {open && (
        <DialogNoButtonComponent
          open={open}
          setOpen={setOpen}
          formName="addStaff"
        />
      )}
    </div>
  );
};

export default AdminHomePage;
