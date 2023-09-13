import {Route, Routes} from 'react-router-dom';
import OrderList from "./new/pages/OrderList";
import OrderDetail from "./new/pages/OrderDetail";
import React from "react";
import Home from "./new/pages/Home";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/orders/list" element={<OrderList />} />
            <Route path="/orders/detail" element={<OrderDetail />} />
        </Routes>
    );
};

export default App;