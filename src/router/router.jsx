import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Management from "../pages/management/Management";
import NotFound from "../pages/NotFound/NotFound";
import MainLayout from "../layout/MainLayout";
import Courses from "../pages/management/Courses/Courses";
import Rooms from "../pages/management/Rooms/Rooms";
import Staff from "../pages/management/Staff/Staff";
import Teachers from "../pages/Teachers/Teachers";
import Students from "../pages/Students/Students";
import Groups from "../pages/Groups/Groups";
import Gifts from "../pages/Gifts/Gifts";
import Default from "../pages/management/default/Default";
import Dashboard from '../pages/dashboard/Dashboard';


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
                element: <Dashboard />,
            },

            {
                path: '/dashboard/teachers',
                element: <Teachers />
            },
            {
                path: '/dashboard/students',
                element: <Students />
            },
            {
                path: '/dashboard/groups',
                element: <Groups />
            },

            {
                path: '/dashboard/gifts',
                element: <Gifts />
            },

            {
                path: '/management',
                element: <Management />,
                children: [
                    {
                        path: 'courses',
                        element: <Courses />
                    },
                    {
                        path: 'rooms',
                        element: <Rooms />
                    },
                    {
                        path: 'staff',
                        element: <Staff />
                    },
                    {
                        path: '',
                        element: <Default />
                    },
                ]
            },
            // Siz bu yerga boshqa sahifalarni ham qo'shishingiz mumkin
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])