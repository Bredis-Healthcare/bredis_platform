import {Route, Routes} from 'react-router-dom';
import OrderList from "./components-new/OrderList";
import OrderDetail from "./components-new/OrderDetail";
import React from "react";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<OrderList />} />
            <Route path="/orderDetail" element={<OrderDetail />} />
        </Routes>
    );
};

export default App;