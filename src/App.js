import {Route, Routes} from 'react-router-dom';
import OrderList from "./components-new/OrderList";
import OrderDetail from "./components-new/OrderDetail";
import React from "react";
import Home from "./components-new/Home";

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