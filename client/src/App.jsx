import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Registro from "./pages/Registro/Registro.jsx";
import Login from "./pages/Login/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cadastrar' element={<Registro/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/eventos' element={<Dashboard/>}/>
    </Routes>
  )
}

export default App
