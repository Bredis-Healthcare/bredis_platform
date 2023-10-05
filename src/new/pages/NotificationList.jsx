import axios from "../../api/axios";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Layout from "../components/Layout";
import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import moment from 'moment';
import 'moment/locale/ko';

function NotificationList() {

    const navigate = useNavigate()

    const [notifications, setNotifications] = useState(null);

    const [cookies, setCookie, removeCookie] = useCookies(['login']);


    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {

        try {
            const request = await axios.get(`/notifications-all?memberId=${cookies.login && cookies.login['id']}`);
            setNotifications(request.data);
        } catch (error) {
            console.log("error", error)
        }
    };

    return (
        <div>
        {notifications ? (
            <>
                <Layout menuName="알림 목록">
                    <div className="w-full max-w-[972px] left-[0px] top-[0px] self-center flex flex-col mt-[93px] relative">
                        <button className={`w-[120px] h-[35px] relative left-[840px] mx-2 my-[20px]`} onClick={() => navigate(-1)}>
                            <div className="Rectangle7 w-[120px] h-[35px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500"/>
                            <div className=" w-[79px] h-[17px] left-[20px] top-[4px] absolute text-slate-500 text-lg font-bold font-['Inter']">뒤로 가기</div>
                        </button>
                        {notifications.list.length > 0 ? notifications.list.map((notification, index) => (
                            <div>
                                <div className="Line2 flex flex-col w-[1013px] h-[0px] left-[2.83px] border border-black border-opacity-25"></div>
                                <div className="flex max-sm:flex-col max-sm:items-stretch">
                                    <div className="flex flex-col items-stretch leading-[normal] w-[calc(15%_-_10px)] max-sm:w-full my-3">
                                        <div className="text-black text-[14px] font-light font-['Inter'] text-center flex flex-col my-5">
                                            {moment(notification.createdDatetime).fromNow()}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-stretch leading-[normal] w-[calc(85%_-_10px)] ml-[20px] max-sm:w-full my-3">
                                        <div className="text-black text-[15px] font-medium font-['Inter'] flex flex-col my-5">
                                            {notification.message}
                                        </div>
                                    </div>
                                    <Link to={notification.linkTo} state={{resourceId: notification.resourceId}}>
                                        <button className={`w-[120px] h-[35px] ml-[60px] mt-[30px] flex flex-col relative items-stretch max-sm:w-full`}>
                                            <div className="Rectangle7 w-[80px] h-[25px] left-0 top-0 absolute bg-neutral-100 rounded-[9px] border-2 border-slate-500"/>
                                            <div className=" w-[80px] h-[13px] left-[1px] top-[4px] absolute text-slate-500 text-[14px] font-bold font-['Inter']">바로 가기</div>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )) :
                            <div className="absolute text-black not-italic font-normal text-[16px] flex flex-col ml-[54px] mt-[13px] max-md:ml-[10px]">
                                지난 알림이 존재하지 않습니다.
                            </div>
                        }
                    </div>
                </Layout>
            </>
        ) : (
            <p>Loading...</p>
        )}
        </div>
    )
}

export default NotificationList