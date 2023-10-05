import {Link, useNavigate} from "react-router-dom";
import * as React from 'react';
import {useEffect, useState} from 'react';
import axios from "../../api/axios";
import {useQuery} from 'react-query'
import {useCookies} from "react-cookie";
import moment from 'moment';
import 'moment/locale/ko';

const Header = () => {

    const navigate = useNavigate();
    const [isHovering1, setIsHovering1] = useState(false);
    const [isHovering2, setIsHovering2] = useState(false);
    const [isHovering3, setIsHovering3] = useState(false);
    const [isHovering4, setIsHovering4] = useState(false);
    const [profileMenuOn, setProfileMenuOn] = useState(false);
    const [notificationsOn, setNotificationsOn] = useState(false);

    const [cookies, setCookie, removeCookie] = useCookies(['login']);

    const {isLoading, error, data, refetch} = useQuery('notifications',
        () => cookies.login ? axios.get(`/notifications?memberId=${cookies.login && cookies.login['id']}`) : null,
        {refetchInterval: 10000});

    if (isLoading || error) return 'Loading...';

    function clickProfileIcon() {
        setNotificationsOn(false)
        setProfileMenuOn(profileMenuOn => !profileMenuOn)
    }
    async function logout() {
        const request = await axios.post('logout')
        removeCookie(['login']);
        clickProfileIcon()
        navigate("/");
    }

    async function login() {
        setProfileMenuOn(false)
        navigate("/login");
    }

    function clickNotificationIcon() {
        setProfileMenuOn(false)
        setNotificationsOn(notificationsOn => !notificationsOn)
    }

    async function checkRead(e, id) {
        await axios.post(`/notifications/read?notificationsIds=${id}`);
        setNotificationsOn(false)
        await refetch();
    }

    async function checkReadAll() {
        await axios.post(`/notifications/read?notificationsIds=${data.data.list.map(noti => noti.id).join(',')}`);
        setNotificationsOn(false)
        await refetch();
    }

    return (
            <div className="Header w-[1667px] h-[76px] relative ">
                <div className=" w-[1667px] h-[76px] left-0 top-0 absolute bg-white" />
                <Link to={"/"}>
                    <div className="DigitalElisa left-[189px] top-[21px] absolute text-black text-[26px] font-bold">Digital ELISA 연구분석서비스</div>
                    <img className=" w-[189px] h-[76px] left-0 top-0 absolute" src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F6ef4e97d4d2943759576eb7807cff8ac?&width=800" />
                </Link>


                <Link to={"/"} onMouseOver={() => setIsHovering1(true)} onMouseOut={() => setIsHovering1(false)}>
                    <div className={`${isHovering1 ? 'block' : 'hidden'} w-[94px] h-[3px] left-[1099px] top-[16px] absolute bg-sky-900`} />
                    <div className={`${isHovering1 ? 'text-sky-900' : 'text-black'} left-[1099px] top-[32px] absolute text-black text-xl font-bold`}>서비스 소개</div>
                </Link>
                <Link to={"/threads/list"} onMouseOver={() => setIsHovering2(true)} onMouseOut={() => setIsHovering2(false)}>
                    <div className={`${isHovering2 ? 'block' : 'hidden'} w-[82px] h-[3px] left-[1217px] top-[16px] absolute bg-sky-900`} />
                    <div className={`${isHovering2 ? 'text-sky-900' : 'text-black'} left-[1223px] top-[32px] absolute text-black text-xl font-bold`}>문의하기</div>
                </Link>

                <Link to={"/orders/create"} onMouseOver={() => setIsHovering3(true)} onMouseOut={() => setIsHovering3(false)}>
                    <div className={`${isHovering3 ? 'block' : 'hidden'} w-[82px] h-[3px] left-[1320px] top-[16px] absolute bg-sky-900`} />
                    <div className={`${isHovering3 ? 'text-sky-900' : 'text-black'} left-[1326px] top-[32px] absolute text-xl font-bold`}>주문하기</div>
                </Link>

                <Link to={"/orders/list"} onMouseOver={() => setIsHovering4(true)} onMouseOut={() => setIsHovering4(false)}>
                    <div className={`${isHovering4 ? 'block' : 'hidden'} w-[82px] h-[3px] left-[1415px] top-[16px] absolute bg-sky-900`} />
                    <div className={`${isHovering4 ? 'text-sky-900' : 'text-black'} left-[1421px] top-[32px] absolute  text-xl font-bold`}>주문내역</div>
                </Link>
                <button className=" w-[50px] h-[30px] left-[1521px] top-[29px] absolute"
                        onClick={() => clickNotificationIcon()}>
                    <div className="Bell w-[55px] h-[30px] left-0 top-0 absolute">
                        <img className="object-cover object-center" src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fec38e501943d468fa0df8b6f1a34a36f?&width=200" alt=""/>
                    </div>
                </button>
                <div className={`${data && data.data && data.data.list.length > 0 ? 'block' : 'hidden'} Ellipse49 w-3 h-3 left-[1538px] top-[29px] absolute bg-red-600 rounded-full`} />
                
                <button className=" w-[49px] h-[30px] left-[1581px] top-[29px] absolute"
                        onClick={cookies.login ? () => clickProfileIcon() : () => login()}>
                    <div className="UserCicrleLight w-[55px] h-[30px] left-0 top-0 absolute">
                        <img className="object-cover object-center" src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F620ec0bc269049aa87c29d8e1cbbc3be?&width=200" alt=""/>
                    </div>
                </button>
                
                <button className={`${profileMenuOn ? 'block' : 'hidden'} absolute w-auto left-[1515px] top-[58px] z-10`}
                        onClick={() => logout()}>
                    <img className="object-cover object-center" src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc18ab58-4f37-43ec-8a4c-32e441c85efb?&width=800" />
                </button>

                <div className={`${notificationsOn ? 'block' : 'hidden'} notificationModal absolute w-[300px] flex flex-col left-[1320px] top-[72px] z-10 bg-white 
                                shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)] rounded-[9px] py-[3px]`}>
                    <div className="left-0 top-0 w-[100%] relative">
                        {
                            data && data.data ?
                                (data.data.list.length > 0 ? <>
                                        {
                                            data.data.list.map((notification) => (<>
                                                <Link to={notification.linkTo} state={{resourceId: notification.resourceId}} onClick={(e) => checkRead(e, notification.id)}>
                                                    <button className="text-left">
                                                        <div className="px-[17px] my-[5px] relative text-black text-[14px] font-normal font-['Inter']">
                                                            {notification.message}
                                                        </div>
                                                        <div className="px-[17px] my-[5px] relative text-zinc-500 text-[12px] font-normal font-['Inter']">
                                                            {moment(notification.createdDatetime).fromNow()}
                                                        </div>
                                                    </button>
                                                </Link>
                                                <div className="Line11 w-[265px] h-[0px] left-[16px] my-[5px] relative border border-zinc-500 border-opacity-50"></div>
                                            </>))
                                        }
                                        <button className="mx-[17px] my-[5px] float-right relative text-slate-500 text-[14px] font-bold font-['Inter']"
                                                onClick={() => checkReadAll()}
                                        >모두 읽음 표시
                                        </button>
                                        <Link to={"/notifications"} onClick={() => setNotificationsOn(false)}>
                                            <button className="relative my-[3px] mx-[17px] float-left">
                                                <div className="Rectangle7 w-[110px] h-[24px] left-0 top-0 absolute bg-slate-500 rounded-[9px]"></div>
                                                <div className=" w-[90px] h-[15px] left-[11px] top-[3px] absolute text-white text-[14px] font-bold font-['Inter']">지난 알림 보기</div>
                                            </button>
                                        </Link>
                                    </> : <>
                                        <div className="text-center px-[17px] my-[5px] relative text-black text-[14px] font-normal font-['Inter']">새로운 알림이 없습니다.</div>
                                        <Link to={"/notifications"} onClick={() => setNotificationsOn(false)}>
                                            <button className="relative my-[3px] mx-[17px] top-[-20px] left-[75px]">
                                                <div className="Rectangle7 w-[110px] h-[24px] left-0 top-0 absolute bg-slate-500 rounded-[9px]"></div>
                                                <div className=" w-[90px] h-[15px] left-[11px] top-[3px] absolute text-white text-[14px] font-bold font-['Inter']">지난 알림 보기</div>
                                            </button>
                                        </Link>
                                    </>
                                ) : <></>
                        }
                    </div>
                </div>
            </div>
    );
}

export default Header;