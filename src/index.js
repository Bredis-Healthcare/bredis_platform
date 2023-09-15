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
import MakeOrder from "./new/pages/MakeOrder";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "login",
        element: <LoginPage/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/orders/create",
        element: <MakeOrder/>,
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
    }]);

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
