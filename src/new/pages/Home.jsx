import {useNavigate} from "react-router-dom";
import * as React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {

    const navigate = useNavigate();
    return (
        <div className="1 w-[1667px] h-[1072px] relative bg-neutral-100">
            <div className="MenuHeader w-[1667px] h-[115px] left-0 top-[70px] absolute">
                <div className="Rectangle6 w-[1667px] h-[115px] left-0 top-0 absolute bg-sky-900" />
                <div className=" left-[33px] top-[57px] absolute text-white text-3xl font-bold">홈</div>
            </div>
            <Header />
            <div>홈 화면 입니다.</div>
            <Footer />
        </div>
    );
}

export default Home;