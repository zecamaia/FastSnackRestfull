import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Registro from "./pages/Registro/Registro.jsx";
import Login from "./pages/Login/Login.jsx";
import Evento from "./pages/Evento/Evento.jsx";
import Layout from "./layout/Layout.jsx";

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cadastrar' element={<Registro />} />
      <Route path='/login' element={<Login />} />

      <Route element={<Layout />}>
        <Route path='/eventos' element={<Evento />} />
      </Route>
    </Routes>


  )
}

export default App
