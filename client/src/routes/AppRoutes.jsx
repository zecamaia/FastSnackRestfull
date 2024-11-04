import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Registro from "../pages/Registro/Registro";
import Login from "../pages/Login/Login";
import Layout from "../layout/Layout";
import ProtectedRoute from "./ProtectedRoute";
import Evento from "../pages/Guest/Evento";
import EventCategory from "../pages/Guest/CategoriaEvento";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/cadastrar" element={<Registro />} />
            <Route path="/login" element={<Login />} />

            {/* Rotas protegidas */}
            <Route element={<Layout />}>
                <Route path="/eventos" element={<ProtectedRoute element={<Evento />} />} />
                <Route path="/eventos/categoria/:id" element={<ProtectedRoute element={<EventCategory />} />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes;