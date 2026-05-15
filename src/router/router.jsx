import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Management from "../pages/management/Management";
import NotFound from "../pages/NotFound/NotFound";
import MainLayout from "../layout/MainLayout";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" replace />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        element: <MainLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/management',
                element: <Dashboard />
            },
            {
                path: '/management/content',
                element: <Management />
            },
            // Siz bu yerga boshqa sahifalarni ham qo'shishingiz mumkin
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])