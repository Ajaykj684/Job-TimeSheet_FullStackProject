import React, { useEffect, useState, useContext } from "react";

import { LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

import Axios from "axios";
import "./Adminhome.css";
import { useNavigate } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
 
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function Adminhome() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);


  //for the drawer

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const [datas, setDatas] = useState([]);
  const [state, setState] = useState(false);
  const [slot, setSlot] = useState([]);
  const [chart, setChart] = useState([]);

  const history = useNavigate();
  let { user, logoutAdmin } = useContext(AuthContext);

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/").then((res) => setDatas(res.data));
    setSlot("Dashboard");
  }, [state]);

  useEffect(() => {
    user ? user.is_admin === true && history("/admin") : history("/adminlogin");
  }, []);


  //delete user

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            Axios.post(`http://127.0.0.1:8000/delete/${id}`)
              .then(() => {
                const newData = datas.filter((value) => {
                  return value.id !== id;
                });
                setDatas(newData);
              })
              .catch(() => {
                alert("Something went wrong");
              }),
        },
        {
          label: "No",
        },
      ],
    });
  };


  //select the page

  const Selection = (text) => {
    if (text == "Dashboard") {
      setSlot("Dashboard");
    } else if (text == "Users") {
      setSlot("Users");
    } else if (text == "Logout") {
      logoutAdmin();
      setSlot(null);
    }
  };


  //chart

  const renderLineChart = (id) => {
    axios
      .get(`http://127.0.0.1:8000/dailyChart/${id}`)
      .then((res) => setChart(res.data), setSlot("chartPage"));
  };

 const labelValue=[chart.map((value)=>(value.task))]


  const data = {
           labels:labelValue
      
    ,
    datasets:[
    {
    label:'Chart',
    data:[chart.map((value)=>(parseInt(value.time)))]
   
  }
    ]
  }
  console.log(data,"lll")



  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Welcome Admin
          </Typography>
          <div className="logOut">
            {user && <p onClick={logoutAdmin}>Logout</p>}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>

          {["Dashboard", "Users", "Logout"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  onClick={() => {
                    Selection(text);
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}

        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />



      {/* dashboard page */}


        {slot == "Dashboard" && (
          <Typography paragraph>
            <>
              <div className="tablediv">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">TimeSheet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datas.map((value) => (
                      <tr>
                        <th scope="row">{value.username}</th>
                        <th scope="row">{value.email}</th>
                        <th scope="row">{value.phone}</th>
                        <th scope="row">
                          <button
                            className="btn3bg-blue-500 bg-red-700 text-white font-bold  m-3 py-1 px-4 rounded"
                            onClick={(e) => renderLineChart(value.id)}
                          >
                            view Timesheet
                          </button>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          </Typography>
        )}

        {/* dashboard page end here */}



        {/* user list Page start */}

        {slot == "Users" && (
          <>
            <button
              className="btn3bg-blue-500 bg-blue-700 m-3 text-white font-bold py-2 px-4 rounded"
              onClick={() => history("/addUser")}
            >
              ADD USER
            </button>
            <div className="tablediv">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>

                    {/* <th scope="col">Active</th> */}
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {datas.map((value) => (
                    <tr>
                      <th scope="row">{value.username}</th>
                      <th scope="row">{value.email}</th>
                      <th scope="row">{value.phone}</th>

                      <th scope="row">
                        <button
                          className="btn3bg-blue-500 bg-red-700 text-white font-bold  m-3 py-1 px-4 rounded"
                          onClick={() => {
                            handleDelete(value.id);
                          }}
                        >
                          Delete
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* userlist page end here */}


        {/* chart page */}

        {slot == "chartPage" && (
          <>
         <LineChart
            width={600}
            height={300}
            data={chart}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="id" stroke="#8884d8" fill="#84d85" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="task" />
            <YAxis />
          </LineChart>




          <div className="chart">
          <Line data = {data} />
          </div>
          </>
        )}

        {/* chartpage end here */}

      </Main>
    </Box>
  );
}

export default Adminhome;
