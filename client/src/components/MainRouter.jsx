import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from 'react-router'
import Login from "../pages/Login";
import Home from "../pages/Home";
import Profile from './../pages/Profile';
import MainLayout from './MainLayout';
import SignUp from './../pages/SignUp';

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/signUp" element={<SignUp />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default MainRouter;