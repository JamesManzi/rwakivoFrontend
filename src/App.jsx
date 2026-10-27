import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from "./LoginRoutes/Register";
import Login from "./LoginRoutes/Login";
import Dashboard from "./DashboardRoutes/Dashboard";
import AdminDashboard from "./DashboardRoutes/AdminDashboard";
function Home(){
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/adminDashboard" element={<AdminDashboard/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default Home;