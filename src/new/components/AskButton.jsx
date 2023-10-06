import React from "react";
import {Link} from "react-router-dom";

function AskButton () {
    return (
        <Link to={"/threads/list"}>
            <div className=" w-[106px] h-[106px] fixed right-[20%] bottom-[10%]">
                <div className=" w-[100%] h-[100%] left-0 top-0 absolute bg-neutral-100 rounded-full shadow"/>
                <div className=" w-[95%] h-[95%] left-[2.5%] top-[2.5%] absolute bg-yellow-300 rounded-full"/>
                <div className=" w-[100%] top-[35%] absolute text-zinc-700 text-[22px] font-bold text-center align-middle">문의하기</div>
            </div>
        </Link>
    )
}

export default AskButton