import React, { useContext, useState, useEffect, Fragment } from "react";
import "./Homepage.css";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import logo from "../moonhive.png";

import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";


const navigation = [
  { name: "Task", href: "#", current: true, color: false },
  { name: "History", href: "#", current: false, color: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}




function HomePage() {


  let { user, logoutUser } = useContext(AuthContext);

  const history = useNavigate();
  const [task, setTask] = useState([]);
  const [slot, setSlot] = useState([]);
  const [filter, setFilter] = useState([]);

  const [time, setTime] = useState([]);
  const [today, setToday] = useState([]);

  const [weekly, setWeekly] = useState([]);
  const [Monthly, setMonthly] = useState([]);


  //current date

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  useEffect(() => {
    user ? true && history("/") : history("/login");
  }, []);

  useEffect(
    (e) => {
      axios
        .get(`http://127.0.0.1:8000/todayTask/${user.user_id}`)
        .then((res) => setToday(res.data), setSlot("taskPage"));
    },
    [task]
  );

  const newTask = (e) => {
    axios.post("http://127.0.0.1:8000/taskAdd/", {
      task: task,
      time: time,
      user: user.username,
    });
  };


  //weekly task

  const weeklyTask = (e) => {
    axios
      .get(`http://127.0.0.1:8000/weeklyTask/${user.user_id}`)
      .then((res) => setWeekly(res.data), setFilter("Weekly"));
  };


  //monthly task

  const MonthlyTask = (mnth) => {
    axios
      .get(`http://127.0.0.1:8000/monthlyTask/${mnth}/${user.user_id}`, {
        user: user.username,
      })
      .then((res) => setMonthly(res.data), setFilter("Monthly"));
  };


  //page selection

  const selectPage = (page) => {
    if (page == "Task") {
      setSlot("taskPage");
    } else if (page == "History") {
      setSlot("HistoryPage");
      setFilter("Monthly");
    }
  };


  return (
    <>
      <Disclosure as="nav" className="bg-white-800 shadow-lg ">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-20">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="hidden lg:block h-12 w-auto"
                      src={logo}
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white hover:text-gray-700"
                              : "text-gray-700  hover:text-gray-300",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                          onClick={() => {
                            selectPage(item.name);
                          }}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}

                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {user != null && (
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </a>
                            )}
                          </Menu.Item>
                        )}

                        {user != null && (
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Settings
                              </a>
                            )}
                          </Menu.Item>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {user ? (
                                <button
                                  className='class="bg-transparent hover:bg-red-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"'
                                  onClick={logoutUser}
                                >
                                  Logout
                                </button>
                              ) : (
                                <button
                                  className="btn2"
                                  onClick={() => {
                                    history("/login");
                                  }}
                                >
                                  Login
                                </button>
                              )}
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>


      {/* Task page start here  */}

      {slot == "taskPage" && (
        <>
          <Stack component="form" noValidate className="mt-5 mx-5">
            <TextField
              id="date"
              label="Today"
              disabled
              type="text"
              defaultValue={date}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>

          <Box component="form" className="flex">
            <TextField
              margin="normal"
              className="mx-5"
              required
              style={{ width: 700, margin: 25 }}
              name="Task"
              label="Task"
              placeholder="Enter your Task.."
              type="text"
              id="Task"
              onChange={(e) => setTask(e.target.value)}
            />

            <Stack
              component="form"
              className="mt-4 mx-4 "
              noValidate
              spacing={3}
            >
              <TextField
                id="timeTaken"
                name="timeTaken"
                label="Time Taken - hr/min"
                type="time"
                defaultValue="00:00"
                onChange={(e) => setTime(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                sx={{ width: 150 }}
              />
            </Stack>
            <div>
              <button
                onClick={() => {
                  newTask();
                }}
                type="submit"
                class="mt-4 pb-3 pt-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center"
              >
                <svg
                  class="fill-current w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <span>SUBMIT</span>
              </button>
            </div>
          </Box>

          <div className="tablediv">
            <h1 className="mb-3 text-lg text-base text-gray-600 ">
              Todays Task{" "}
            </h1>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Task</th>
                  <th scope="col">Time Taken</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {today.map((value) => (
                  <tr>
                    <th scope="row">{value.task}</th>
                    <th scope="row">{value.time}</th>
                    <th scope="row">{value.Date}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* task page ends here  */}


 {/* History page start here */}

      {slot == "HistoryPage" && (
        <>
          <div className="flex navdiv">
            <h1 className="mt-5 text-xl font-bold pl-5">History Of Tasks</h1>
            <div id="myBtnContainer " className="mt-4 mx-5 flex">
              <div>
                <button
                  className="btn "
                  onClick={() => {
                    weeklyTask();
                  }}
                >
                  {" "}
                  Weekly
                </button>
              </div>

              <div>
                <select
                  className="mt-2 mx-4"
                  id="selectBox"
                  onChange={(e) => {
                    MonthlyTask(e.target.value);
                  }}
                >
                  <option value="0">Monthly</option>

                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
            </div>
          </div>


          {/* monthly filtering start here */}

          {filter == "Monthly" && (
            <>
              <div className="tablediv">
                <h1 className=" mt-4 text-xl">Monthly Tasks</h1>

                <table className="table table-bordered mt-5">
                  <thead>
                    <tr>
                      <th scope="col">Task</th>
                      <th scope="col">Time Taken</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Monthly.map((value) => (
                      <tr>
                        <th scope="row">{value.task}</th>
                        <th scope="row">{value.time}</th>
                        <th scope="row">{value.Date}</th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}


      {/* weekly filtering start here */}

      {filter == "Weekly" && (
        <>
          <div className="tablediv">
            <h1 className=" mt-4 text-xl">Task History In This Week</h1>
            <table className="table table-bordered mt-5">
              <thead>
                <tr>
                  <th scope="col">Task</th>
                  <th scope="col">Time Taken</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {weekly.map((value) => (
                  <tr>
                    <th scope="row">{value.task}</th>
                    <th scope="row">{value.time}</th>
                    <th scope="row">{value.Date}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

export default HomePage;
