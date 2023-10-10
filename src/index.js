import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {CookiesProvider} from "react-cookie";
import Home, { loader, adminloader  } from "./new/pages/Home";
import OrderDetail, {loader as OrderDetailLoader} from "./new/pages/OrderDetail";
import ErrorPage from "./error-page";
import OrderList, {loader as OrderListLoader} from './new/pages/OrderList';
import LoginPage from "./new/pages/LoginPage";
import OrderCreate from "./new/pages/OrderCreate";
import ThreadsList from "./new/pages/ThreadsList";
import ThreadsCreate from "./new/pages/ThreadsCreate";
import ThreadsDetail from "./new/pages/ThreadsDetail";
import AdminMembersList from "./new/pages/admin/AdminMembersList";
import AdminLoginPage from "./new/pages/admin/AdminLoginPage";
import AdminMembersDetail from "./new/pages/admin/AdminMembersDetail";
import AdminOrderList from "./new/pages/admin/AdminOrderList";
import AdminOrderDetail from "./new/pages/admin/AdminOrderDetail";
import AdminOrderCreate from "./new/pages/admin/AdminOrderCreate";
import AdminThreadsList from "./new/pages/admin/AdminThreadsList";
import AdminThreadsDetail from "./new/pages/admin/AdminThreadsDetail";
import AdminHome from './new/pages/admin/AdminHome';
import "./fonts/pretendard.css"
import {QueryClient, QueryClientProvider} from "react-query";
import NotificationList from "./new/pages/NotificationList";
import MemberCreate from "./new/pages/MemberCreate";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        errorElement: <ErrorPage/>,
        loader : loader,
        children: [
          {
              path: "/login",
              element: <LoginPage/>,
              errorElement: <ErrorPage />,
              loader : loader,
          },
          {
              path: "/notifications",
              element: <NotificationList/>,
              errorElement: <ErrorPage />,
              loader : loader,
          },
            {
                path: "/signup",
                element: <MemberCreate/>,
                errorElement: <ErrorPage />,
                loader : loader,
            },
          {
              path: "/threads/new",
              element: <ThreadsCreate/>,
              errorElement: <ErrorPage />,
              loader : loader,
          },
          {
              path: "/threads/list",
              element: <ThreadsList/>,
              errorElement: <ErrorPage />,
              loader : loader,
          },
          {
              path: "/threads/detail",
              element: <ThreadsDetail/>,
              errorElement: <ErrorPage />,
              loader : loader,
          },
          {
              path: "/orders/create",
              element: <OrderCreate/>,
              errorElement: <ErrorPage/>,
              loader : loader,
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
          

        ]
    },
    {
        path: "/admin",
        element: <AdminHome/>,
        errorElement: <ErrorPage/>,
        loader : adminloader,
        children: [
            {
                path: "login",
                element: <AdminLoginPage/>,
                errorElement: <ErrorPage/>,
                loader : adminloader,
            },
            {
                path: "notifications",
                element: <NotificationList/>,
                errorElement: <ErrorPage />,
                loader : adminloader,
            },
            {
                path: "members/list",
                element: <AdminMembersList/>,
                errorElement: <ErrorPage/>,
                loader : adminloader,
            },
            {
                path: "members/detail",
                element: <AdminMembersDetail/>,
                errorElement: <ErrorPage/>,
                loader : adminloader,
            },
            {
                path: "members/orders",
                element: <AdminOrderList/>,
                errorElement: <ErrorPage/>,
                loader : adminloader,
            },
            {
                path: "members/orders/detail",
                element: <AdminOrderDetail/>,
                errorElement: <ErrorPage/>,
                loader : adminloader,
            },
            {
                path: "members/orders/create",
                element: <AdminOrderCreate/>,
                errorElement: <ErrorPage/>,
                loader : adminloader,
            },
            {
                path: "members/threads",
                element: <AdminThreadsList/>,
                errorElement: <ErrorPage/>,
                loader : adminloader,
            },
            {
                path: "members/threads/detail",
                element: <AdminThreadsDetail/>,
                errorElement: <ErrorPage/>,
                loader : adminloader,
            },
        ]
    }
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <CookiesProvider>
              <div className='flex relative'>
                <RouterProvider router={router}/>
              </div>
            </CookiesProvider>
        </QueryClientProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
