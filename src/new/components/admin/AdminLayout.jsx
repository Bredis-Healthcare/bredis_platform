import React from "react";
import AdminHeader from "./AdminHeader";

const AdminLayout = (props) => {
    return <div>
        <AdminHeader/>
        <div className="MenuHeader w-[1667px] h-[115px] left-0 top-[70px] absolute">
            <div className="Rectangle6 w-[1667px] h-[115px] left-0 top-0 absolute bg-sky-900"/>
            <div className=" left-[33px] top-[57px] absolute text-white text-3xl font-bold font-['Inter']">{props.menuName}</div>
            <div className="987204 right-[180px] top-[63px] absolute"><span className="text-white text-xl font-normal">{props.menuNameAddInfo}</span></div>
        </div>
        <div className="absolute top-[185px] w-[1667px]">
            <div className={`w-full max-w-[1667px] flex flex-col p-px bg-neutral-100`}>
                {props.children}
            </div>
        </div>
    </div>
}

export default React.memo(AdminLayout);