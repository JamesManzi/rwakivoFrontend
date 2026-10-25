import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from "./LoginRoutes/Register";
import Login from "./LoginRoutes/Login";
function Home(){
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default Home;