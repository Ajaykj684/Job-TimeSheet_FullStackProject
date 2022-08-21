import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Page";
import Login from "./Pages/Login";
import Adminhome from "./Pages/Adminhome";
import Adminlogin from "./Pages/Adminlogin";
import AddUser from "./Pages/AddUser";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/admin" element={<Adminhome />} />

            <Route path="/adminlogin" element={<Adminlogin />} />

            <Route path="/addUser" element={<AddUser />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
