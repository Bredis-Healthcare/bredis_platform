import React from "react";
import {Link} from "react-router-dom";

function AskButton () {
    return (
        <Link to={"/threads/list"}>
            <div className=" w-[106px] h-[106px] left-[1450px] top-[1360px] absolute">
                <div className=" w-[106px] h-[106px] left-0 top-0 absolute bg-neutral-100 rounded-full shadow"/>
                <div className=" w-[100px] h-[100px] left-[3px] top-[3px] absolute bg-yellow-300 rounded-full"/>
                <div className=" left-[12px] top-[39px] absolute text-zinc-700 text-[22px] font-bold font-['Inter']">문의하기</div>
            </div>
        </Link>
    )
}

export default AskButton