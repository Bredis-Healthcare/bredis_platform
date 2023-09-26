import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {CookiesProvider} from "react-cookie";
import Home from "./new/pages/Home";
import OrderDetail, {loader as OrderDetailLoader} from "./new/pages/OrderDetail";
import ErrorPage from "./error-page";
import OrderList, {loader as OrderListLoader} from './new/pages/OrderList';
import LoginPage from "./components/LoginPage";
import OrderCreate from "./new/pages/OrderCreate";
import ThreadsList from "./new/pages/ThreadsList";
import ThreadsCreate from "./new/pages/ThreadsCreate";
import ThreadsDetail from "./new/pages/ThreadsDetail";
import AdminMembersList from "./new/pages/admin/AdminMembersList";
import AdminLoginPage from "./components/admin_components/AdminLoginPage";
import AdminMembersDetail from "./new/pages/admin/AdminMembersDetail";
import AdminOrderList from "./new/pages/admin/AdminOrderList";
import AdminOrderDetail from "./new/pages/admin/AdminOrderDetail";
import AdminOrderCreate from "./new/pages/admin/AdminOrderCreate";
import AdminThreadsList from "./new/pages/admin/AdminThreadsList";
import AdminThreadsDetail from "./new/pages/admin/AdminThreadsDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/login",
        element: <LoginPage/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/threads/new",
        element: <ThreadsCreate/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/threads/list",
        element: <ThreadsList/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/threads/detail",
        element: <ThreadsDetail/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/orders/create",
        element: <OrderCreate/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/orders/list",
        element: <OrderList/>,
        errorElement: <ErrorPage/>,
        loader: OrderListLoader
    },
    {
        path: "/orders/detail",
        element: <OrderDetail/>,
        errorElement: <ErrorPage/>,
        loader: OrderDetailLoader
    },
    {
        path: "/admin-page/login",
        element: <AdminLoginPage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/admin-page/members/list",
        element: <AdminMembersList/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/admin-page/members/detail",
        element: <AdminMembersDetail/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/admin-page/members/orders",
        element: <AdminOrderList/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/admin-page/members/orders/detail",
        element: <AdminOrderDetail/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/admin-page/members/orders/create",
        element: <AdminOrderCreate/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/admin-page/members/threads",
        element: <AdminThreadsList/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/admin-page/members/threads/detail",
        element: <AdminThreadsDetail/>,
        errorElement: <ErrorPage/>
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <CookiesProvider>
            <RouterProvider router={router}/>
        </CookiesProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
