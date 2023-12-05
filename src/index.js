import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {CookiesProvider} from "react-cookie";
import Home, {adminloader, loader} from "./pages/Home";
import OrderDetail, {loader as OrderDetailLoader} from "./pages/order/OrderDetail";
import ErrorPage from "./error-page";
import OrderList, {loader as OrderListLoader} from './pages/order/OrderList';
import LoginPage from "./pages/login/LoginPage";
import QuotationCreate from "./pages/quotation/QuotationCreate";
import ThreadsList from "./pages/threads/ThreadsList";
import ThreadsCreate from "./pages/threads/ThreadsCreate";
import ThreadsDetail from "./pages/threads/ThreadsDetail";
import AdminMembersList from "./pages/member/AdminMembersList";
import AdminLoginPage from "./pages/login/AdminLoginPage";
import AdminMembersDetail from "./pages/member/AdminMembersDetail";
import AdminOrderList from "./pages/order/AdminOrderList";
import AdminOrderDetail from "./pages/order/AdminOrderDetail";
import AdminQuotationCreate from "./pages/quotation/AdminQuotationCreate";
import AdminThreadsList from "./pages/threads/AdminThreadsList";
import AdminThreadsDetail from "./pages/threads/AdminThreadsDetail";
import AdminHome from './pages/AdminHome';
import "./resources/fonts/pretendard.css"
import {QueryClient, QueryClientProvider} from "react-query";
import NotificationList from "./pages/NotificationList";
import MemberCreate from "./pages/member/MemberCreate";
import MemberModify from "./pages/member/MemberModify";
import ServiceTerms from "./pages/terms/ServiceTerms";
import PrivacyTerms from "./pages/terms/PrivacyTerms";
import SampleControlPage from "./pages/dataControl/SampleControl";
import AdminMenuSelect from "./pages/AdminMenuSelect";

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
                path: "/terms/service",
                element: <ServiceTerms/>,
                errorElement: <ErrorPage />,
                loader : loader,
            },
            {
                path: "/terms/privacy",
                element: <PrivacyTerms/>,
                errorElement: <ErrorPage />,
                loader : loader,
            },
            {
                path: "/members/modify",
                element: <MemberModify/>,
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
              element: <QuotationCreate/>,
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
                path: "menuSelect",
                element: <AdminMenuSelect/>,
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
                path: "sampleControl",
                element: <SampleControlPage/>,
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
                element: <AdminQuotationCreate/>,
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
              <div className='flex w-full max-w-[1667px] min-w-[800px] justify-center relative m-auto'>
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
