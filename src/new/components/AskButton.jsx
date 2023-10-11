import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
function AskButton () {
    const [isHidden, setIsHidden] = useState(window.innerWidth < 1280);

    useEffect(() => {
        const handleResize = () => {
            setIsHidden(window.innerWidth < 1280);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return (
        <Link to={"/threads/list"}>
            <div style={{ display: isHidden ? 'none' : 'block' }} className=" w-[106px] h-[106px] fixed right-[5%] bottom-[5%] md:scale-[0.75]">

                <div className=" w-[100%] h-[100%] left-0 top-0 absolute bg-neutral-100 rounded-full shadow"/>
                <div className=" w-[95%] h-[95%] left-[2.5%] top-[2.5%] absolute bg-yellow-300 rounded-full"/>
                <div className=" w-[100%] top-[35%] absolute text-zinc-700 text-[22px] font-bold text-center align-middle transition-all hover:scale-[1.1] ">문의하기</div>
            </div>
        </Link>
    )
}

export default AskButton
