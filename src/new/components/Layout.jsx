import React from "react";

const Layout = (props) => {
    return <div>
        <div className="MenuHeader w-[1667px] h-[115px]  bg-sky-900 relative">
            <div className=" left-[33px] top-[57px] absolute text-white text-3xl font-bold font-['Inter']">{props.menuName}</div>
            <div className="987204 right-[180px] top-[63px] absolute"><span className="text-white text-xl font-normal">{props.menuNameAddInfo}</span></div>
        </div>
        <div className="relative w-[1667px] flex flex-col p-px bg-neutral-100 py-10">
                {props.children}
        </div>
    </div>


}

export default React.memo(Layout);
