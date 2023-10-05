import React, {useEffect, useState} from 'react';
import {Link, useLocation,} from "react-router-dom";
import axios from "../../../api/axios";
import AdminLayout from "../../components/admin/AdminLayout";

export async function loader({ params }) {
    const userId = params.userId
    return { userId };
  }


function AdminOrderList() {

    const [data, setData] = useState(null); // or your fetching logic

    let location = useLocation();

    const [ pageInfo, setPageInfo ] = useState({});
    useEffect(() => {
        if(location.state != null)
        {
            window.sessionStorage.setItem("pageInfo", JSON.stringify(location.state));
            setPageInfo((pageInfo) => location.state)
        }
        else {
            setPageInfo((pageInfo) => JSON.parse(window.sessionStorage.getItem("pageInfo")))
        }
    }, [])

    useEffect(()=>{
        if(Object.keys(pageInfo).length !== 0)
        {
            fetchData();
        }
    }, [pageInfo])

    const fetchData = async () => {

        try {
            const request = await axios.get(`/orders?memberId=${pageInfo.resourceId}`);
            setData(request.data);

        } catch (error) {
            console.log("error", error)
        }
    };

    return (
        <div>
            {data ? (
                <>
                    <AdminLayout menuName="고객 목록 > 고객 상세 > 주문 내역">
                        <div className="Contents shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)] w-full max-w-[1222px] self-center flex flex-col ml-[0.5px] mt-[46px] px-[20px] pt-[40px]">
                            {
                                data.orderItems.map((order, index) => (
                                    <div key={order.id}>
                                        {index === 0 ? (<div />) : (
                                            <div>
                                                <div className="h-5"></div>
                                                <div className={`w-[1114px] h-[0px] left-[37px] top-[0px]] relative border border-zinc-500`} />
                                                <div className="h-5"></div>
                                            </div>
                                        )}
                                        <div className={`w-[1077px] h-[200px] left-[76px] top-[${34 + index * 200}px] relative`}>
                                            <div className="SimoaPtau181AdvantageV214 left-0 top-[30px] absolute text-black text-2xl font-bold font-['Inter']">{order.title}</div>
                                            <div className="Ab40Ab42GfapNflPtau181 left-0 top-[121px] absolute text-black text-2xl font-normal font-['Inter']">{order.requestDetail}</div>
                                            <div className="987204 left-0 top-0 absolute text-zinc-500 text-lg font-normal font-['Inter']">주문번호: {order.orderNumber}</div>
                                            <div className=" left-[726px] top-[1px] absolute text-zinc-500 text-lg font-normal font-['Inter']">주문일시</div>
                                            <div className="0503 left-[650px] top-[31px] absolute text-black text-2xl font-light font-['Inter']">{order.createdDatetime}</div>
                                            <div className=" left-[970px] top-[1px] absolute text-zinc-500 text-lg font-normal font-['Inter']">상태</div>
                                            <div className=" left-[950px] top-[31px] absolute text-lime-500 text-2xl font-bold font-['Inter']">{order.status}</div>
                                            <div className=" left-0 top-[88px] absolute text-zinc-500 text-lg font-normal font-['Inter']">의뢰내용</div>
                                            <div className=" left-[745px] top-[88px] absolute text-zinc-500 text-lg font-normal font-['Inter']">금액</div>
                                            <div className="38262070 left-[700px] top-[121px] absolute text-black text-2xl font-medium font-['Inter']">₩{order.price}</div>
                                            {
                                                order.unreadCustomerMessages > 0 ? (
                                                    <div className="UnreadNoti">
                                                        <div className="Ellipse49 w-3 h-3 left-[1030px] top-[175px] absolute bg-red-600 rounded-full" />
                                                        <div className="1 left-[800px] top-[180px] absolute text-zinc-500 text-lg font-normal font-['Inter']">읽지 않은 메시지가 {order.unreadCustomerMessages}건 있습니다.</div>
                                                    </div>
                                                ) : (<div />)
                                            }
                                            <Link to="/admin/members/orders/detail" state={{resourceId: order.orderNumber}}>
                                                <button className=" w-[120px] h-[35px] left-[935px] top-[110px] absolute">
                                                    <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500" />
                                                    <div className=" w-[90px] h-[17px] left-[19px] top-[6px] absolute text-slate-500 text-lg font-bold font-['Inter']">주문 상세 ></div>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </AdminLayout>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default AdminOrderList;
