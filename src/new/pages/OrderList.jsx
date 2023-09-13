import React, {useEffect, useState} from 'react';
import {MyInfoContainer} from '../../components/MyPageStyle.js';
import {Link, Outlet, useLoaderData, useLocation, useNavigate,} from "react-router-dom";
import axios from "../../api/axios";
import {useCookies} from 'react-cookie';
import Footer from "../components/Footer";
import Header from "../components/Header";

export async function loader({ params }) {
    const userId = params.userId
    return { userId };
  }


function OrderList() {

	const [cookies, setCookie, removeCookie] = useCookies(['login']);
    const [userInfo, setUserInfo] = useState(null); // or your fetching logic
    const [statusList, setStatusList] = useState([]);

    let location = useLocation();


    useEffect(() => {
        console.log("cookie", cookies)
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const statusRequest = await axios.get(`/protocols`);
            const request = await axios.post(`/my-info`, { "memberId": cookies.login && cookies.login['id'] });

            console.log('request', request.data);
            console.log('statusRequest', statusRequest.data.threadCategoryList);
            setUserInfo(request.data);
            setStatusList(statusRequest.data.threadCategoryList)

        } catch (error) {
            console.log("My Page fetch Error : ", error)
        }
    };


    return (
        <div>
            {userInfo ? (
                <>
                    <Header />
                    <div className="MenuHeader w-[1667px] h-[115px] left-0 top-[70px] absolute">
                        <div className="Rectangle6 w-[1667px] h-[115px] left-0 top-0 absolute bg-sky-900" />
                        <div className=" left-[33px] top-[57px] absolute text-white text-3xl font-bold font-['Inter']">주문 내역</div>
                    </div>
                    <div className="absolute top-[185px] w-[1667px]">
                        <div className={`w-full max-w-[1667px] flex flex-col p-px bg-neutral-100`}>
                            <div className="Contents shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)] w-full max-w-[1222px] self-center flex flex-col ml-[0.5px] mt-[46px] px-[20px]">
                                {
                                    userInfo.orderHistory.map((order, index) => (
                                        <div key={order.id}>
                                            {index === 0 ? (<div />) : (
                                                <div>
                                                    <div className="h-5"></div>
                                                    <div className={`w-[1114px] h-[0px] left-[37px] top-[0px]] relative border border-zinc-500`} />
                                                    <div className="h-5"></div>
                                                </div>
                                                )}
                                            <div className={`w-[1077px] h-[200px] left-[76px] top-[${34 + index * 200}px] relative`}>
                                                <div className="SimoaPtau181AdvantageV214 left-0 top-[30px] absolute text-black text-2xl font-bold font-['Inter']">{order.items}</div>
                                                <div className="Ab40Ab42GfapNflPtau181 left-0 top-[121px] absolute text-black text-2xl font-normal font-['Inter']">{order.request}</div>
                                                <div className="987204 left-0 top-0 absolute text-zinc-500 text-lg font-normal font-['Inter']">주문번호: {order.orderNumber}</div>
                                                <div className=" left-[726px] top-[1px] absolute text-zinc-500 text-lg font-normal font-['Inter']">주문일시</div>
                                                <div className="0503 left-[650px] top-[31px] absolute text-black text-2xl font-light font-['Inter']">{order.createdDatetime}</div>
                                                <div className=" left-[970px] top-[1px] absolute text-zinc-500 text-lg font-normal font-['Inter']">상태</div>
                                                <div className=" left-[950px] top-[31px] absolute text-lime-500 text-2xl font-bold font-['Inter']">{order.status}</div>
                                                <div className=" left-0 top-[88px] absolute text-zinc-500 text-lg font-normal font-['Inter']">의뢰내용</div>
                                                <div className=" left-[745px] top-[88px] absolute text-zinc-500 text-lg font-normal font-['Inter']">금액</div>
                                                <div className="38262070 left-[700px] top-[121px] absolute text-black text-2xl font-medium font-['Inter']">₩{order.price}</div>
                                                <Link to="/orders/detail" state={{orderNumber: order.orderNumber}}>
                                                    <button className=" w-[120px] h-[35px] left-[935px] top-[110px] absolute">
                                                        <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500" />
                                                        <div className=" w-[90px] h-[17px] left-[19px] top-[6px] absolute text-slate-500 text-lg font-bold font-['Inter']">주문 상세 ></div>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <Footer/>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default OrderList;
