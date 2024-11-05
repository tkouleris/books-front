import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import PrivateRoutes from "./components/PrivateRoutes.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import Home from "./components/Home.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoutes />,
        children: [

        ],
    },
    {
        path: '/login',
        element: <LoginPage />,
        // errorElement: <NotFoundPage />
    },
    {
        path: '/register',
        element: <RegistrationPage />,
        // errorElement: <NotFoundPage />
    },
    {
        path: '/home',
        element: <Home />,
        // errorElement: <NotFoundPage />
    },
    // {
    //     path: '/dashboard',
    //     element: <DashboardPage />,
    //     // errorElement: <NotFoundPage />
    // },
    // {
    //     path: '/gameboard',
    //     element: <GameBoardPage />,
    //     // errorElement: <NotFoundPage />
    // },
    // {
    //     path: '/results',
    //     element: <RoundResultPage />,
    //     // errorElement: <NotFoundPage />
    // },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
