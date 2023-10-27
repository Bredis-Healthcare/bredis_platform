import React from "react";

const Layout = (props) => {
    return <div>
        <div style={{ display: props.menuName==="홈" ? 'none' : 'block' }} className="MenuHeader w-full h-[7rem] bg-sky-900 relative">
            <div className=" w-[40%] left-[33px] top-[57px] absolute text-white lg:text-3xl md:text-2xl font-bold break-keep">{props.menuName}</div>
            <div className="w-[45%] right-[30px] top-[63px] absolute"><span className="text-white lg:text-xl md:text-base font-normal break-keep">{props.menuNameAddInfo}</span></div>
        </div>
        <div className="relative w-full flex flex-col bg-neutral-100 py-10 overflow-x-auto">
                {props.children}
        </div>
    </div>


}

export default React.memo(Layout);