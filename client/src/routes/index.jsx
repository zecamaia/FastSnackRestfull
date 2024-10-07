import { Routes, Route } from 'react-router-dom';

export default function Rotas() {


    return (

        <Routes> {/* Use o componente Routes para definir suas rotas */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/registro" element={<Registro />} />

            <Route path="/dashboard" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="/dashboard/pomodoro" element={<Pomodoro />} />
                <Route path="/dashboard/perfil" element={<Profile />} />
                <Route path="/dashboard/postagens" element={<PostsArea />} />
                <Route path="/dashboard/postagens/:nomeMateria" element={<Subject />} />
                <Route path="/dashboard/postagens/:nomeMateria/:nomeAtiv" element={<AtividadeWrapper />} />
                <Route path="/dashboard/agenda" element={<Schedule />} />
            </Route>

            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/notas/grade" element={<AdminSchool />} />
            <Route path="/admin/notas" element={<AdminSchoolGrade />} />

        </Routes>


    );
}