// src/index.jsx
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import MainLayOut from './Components/MainLayOut/MainLayOut';
import Home from './Components/Pages/Home/Home';
import { HelmetProvider } from 'react-helmet-async';
import Login from './Components/Pages/Auth/Login';
import Registration from './Components/Pages/Auth/Registration';
import AuthProvider from './Components/Provider/AuthProvider';
import ErrorPage from './Components/Errorpage/ErrorPage';
import ProductDetails from './Components/Pages/ProductDetails/ProductDetails';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import AddProducts from './Components/Dashboard/AddProducts';
import ViewAllProducts from './Components/Dashboard/ViewAllProducts';
import DashboardHome from './Components/Dashboard/DashboardHome';

// Create the router with the updated routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/name/:name',
        element: <Home />
      },
      {
        path: '/product/:id',
        element: <ProductDetails />,
        loader: ({ params }) => fetch(`https://favorite-com-server-side-main.vercel.app/${params.id}`)
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/registration',
        element: <Registration />
      },
      {
        path: '/dashboard',
        element: <AdminDashboard></AdminDashboard>,
        children: [
          {
            index: true,
            element: <DashboardHome />

          },

          {
            path: '/dashboard/addProducts',
            element: <AddProducts></AddProducts>
          },
          {
            path: '/dashboard/viewAllProducts',
            element: <ViewAllProducts></ViewAllProducts>
          }
        ]

      },
    ],
  },
]);
const queryClient = new QueryClient()

// Rendering the root component
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);

