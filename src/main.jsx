import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import PrivateRoutes from "./components/PrivateRoutes.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import Home from "./components/Home.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import MyBooks from "./pages/MyBooks.jsx";
import MyReadings from "./pages/MyReadings.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import BookForm from "./pages/BookForm.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoutes />,
        children: [
            {
                path: '/dashboard',
                element: <DashboardPage />,
                // errorElement: <NotFoundPage />
            },
            {
                path: '/books',
                element: <MyBooks />,
                // errorElement: <NotFoundPage />
            },
            {
                path: '/book',
                element: <BookForm />,
                // errorElement: <NotFoundPage />
            },
            {
                path: '/readings',
                element: <MyReadings />,
                // errorElement: <NotFoundPage />
            },
            {
                path: '/profile',
                element: <ProfilePage />,
                // errorElement: <NotFoundPage />
            },
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
