import Header from "./Header";
import Footer from "./Footer";
import React from "react";

const Layout = (props) => {
    return <div>
        <Header/>
        <div className="MenuHeader w-[1667px] h-[115px] left-0 top-[70px] absolute">
            <div className="Rectangle6 w-[1667px] h-[115px] left-0 top-0 absolute bg-sky-900"/>
            <div className=" left-[33px] top-[57px] absolute text-white text-3xl font-bold font-['Inter']">{props.menuName}</div>
            <div className="987204 left-[323px] top-[63px] absolute"><span className="text-white text-2xl font-normal">{props.menuNameAddInfo}</span></div>
        </div>
        <div className="absolute top-[185px] w-[1667px]">
            <div className={`w-full max-w-[1667px] flex flex-col p-px bg-neutral-100`}>
                {props.children}
                <Footer/>
            </div>
        </div>
    </div>
}

export default React.memo(Layout);