import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css"
import LoginPage from './components/LoginPage';
import AdminLoginPage from './components/admin_components/AdminLoginPage';
import MainPage from './components/MainPage';
import SignUpPage from './components/SignUpPage';
import UserListPage from './components/admin_components/UserListPage';
import ErrorPage from './error-page';
import AdminUserDetailPage,{
  loader as userDetailLoader,
} 
from './components/admin_components/AdminUserDetailPage';
import ThreadPage, {
  adminloader as adminthreadLoader,
  loader as threadLoader,
} 
from './components/ThreadPage';
import MyPage, {
  loader as UserPageLoader,
}  from './components/MyPage';
import DetailedInformationPage, {
  loader as detailedInformationLodaer,
  adminloader as admindetailedInformationLodaer,
}  from './components/DetailedInformationPage';

import { CookiesProvider } from 'react-cookie';
import NewMainPage from "./components-new/home-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NewMainPage/>,
    errorElement: <ErrorPage />,
    children :
    [
      {
        path:"admin",
        children :
        [
          {
            path: "login",
            element: <AdminLoginPage/>,
            errorElement: <ErrorPage />,
          },
          {
            path: "userlist",
            element: <UserListPage/>,
            errorElement: <ErrorPage />,
          },
          {
            path: "userdetail/:userId",
            element: <AdminUserDetailPage />,
            loader: userDetailLoader,
          },
          {
            path: "orders/:orderId/detail",
            element: <DetailedInformationPage/>,
            errorElement: <ErrorPage />,
            loader: admindetailedInformationLodaer,
          },
          {
            path: "thread/:threadId/:userId",
            element: <ThreadPage />,
            loader: adminthreadLoader,
          },
        ]
      },
      
      {
        path: "login",
        element: <LoginPage/>,
        errorElement: <ErrorPage />,
      },
      {
        path: "signup",
        element: <SignUpPage/>,
        errorElement: <ErrorPage />,
      },
      {
        path: "Mypage",
        element: <MyPage/>,
        errorElement: <ErrorPage />,
        loader: UserPageLoader,
        children :
        [
          {
            path: "orders/:orderId/detail",
            element: <DetailedInformationPage/>,
            errorElement: <ErrorPage />,
            loader: detailedInformationLodaer,
          },
          {
            path: "thread",
            element: <ThreadPage />,
            loader: threadLoader,
          },
        ],
      },
    ]
  },
  
],
{
  // basename : "/bredis_platform/"
});


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
