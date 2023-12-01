import {Link, useNavigate} from "react-router-dom";
import * as React from 'react';
import {useState} from 'react';
import axios from "../../api/axios";
import {useQuery} from 'react-query'
import {useCookies} from "react-cookie";
import moment from 'moment';
import 'moment/locale/ko';
import bredis_logo_wide from "../../resources/img/bredis_logo_wide.png"
import icon_noti from "../../resources/img/icon_noti.png"
import icon_authed from "../../resources/img/icon_authed.png"
import icon_unauthed from "../../resources/img/icon_unauthed.png"


const AdminHeader = () => {

    const navigate = useNavigate();
    const [isHovering3, setIsHovering3] = useState(false);
    const [isHovering4, setIsHovering4] = useState(false);
    const [isHovering5, setIsHovering5] = useState(false);
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
        navigate("/admin/login");
    }
    
    async function toMain() {
        if(cookies.login){
            await axios.post('logout');
            removeCookie(['login']);
        }
        clickProfileIcon()
        navigate("/");
    }

    async function login() {
        setProfileMenuOn(false)
        navigate("/admin/login");
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
        <div className="Header w-full h-20 flex flex-row items-center justify-between bg-white sticky top-0 z-10">
            <Link className="flex flex-row  items-center" to={"/admin/members/list"}>
                <img className="w-40" src={bredis_logo_wide}  alt="logo"/>
                <div className="text-black lg:text-2xl md:text-xl font-bold">Digital ELISA<br className="lg:hidden md:block" /> 연구분석서비스 관리자</div>
            </Link>

            <div className="flex flex-row items-center lg:gap-8 md:gap-2" >
            
                <Link onClick={toMain} className="flex flex-col items-center w-[6rem] md:w-[5rem]" to={"/"} onMouseOver={() => setIsHovering3(true)} onMouseOut={() => setIsHovering3(false)}>
                    <div className={`${isHovering3 ? 'block' : 'hidden'} w-[6rem] md:w-[5rem] h-[0.2rem]  bg-sky-900`} />
                    <div className={`${isHovering3 ? 'text-sky-900' : 'text-black'}  lg:text-xl md:text-base mt-[0.5rem] font-bold`}>홈</div>
                </Link>

                <Link className="flex flex-col items-center w-[6rem] md:w-[5rem]" to={"/admin/sampleControl"} onMouseOver={() => setIsHovering5(true)} onMouseOut={() => setIsHovering5(false)}>
                    <div className={`${isHovering5 ? 'block' : 'hidden'} w-[6rem] md:w-[5rem] h-[0.2rem]  bg-sky-900`} />
                    <div className={`${isHovering5 ? 'text-sky-900' : 'text-black'}   lg:text-xl md:text-base mt-[0.5rem] font-bold`}>검체 관리</div>
                </Link>

                <Link className="flex flex-col items-center w-[6rem] md:w-[5rem]" to={"/admin/members/list"} onMouseOver={() => setIsHovering4(true)} onMouseOut={() => setIsHovering4(false)}>
                    <div className={`${isHovering4 ? 'block' : 'hidden'} w-[6rem] md:w-[5rem] h-[0.2rem]  bg-sky-900`} />
                    <div className={`${isHovering4 ? 'text-sky-900' : 'text-black'}   lg:text-xl md:text-base mt-[0.5rem] font-bold`}>고객목록</div>
                </Link>
                <div>
                    <button className=" w-[3.25rem] mt-[0.8rem]"
                            onClick={() => clickNotificationIcon()}>
                        <div className="w-full">
                            <div className={`${data && data.data && data.data.list.length > 0 ? 'block' : 'hidden'} Ellipse49 w-3 h-3 ml-4 absolute bg-red-600 rounded-full`} />
                            <img className="object-cover object-center" src={icon_noti} alt=""/>
                        </div>
                    </button>
                    
                    <button className=" w-[3.25rem] "
                            onClick={cookies.login ? () => clickProfileIcon() : () => login()}>
                        <div className="w-full">
                            {
                                cookies.login ? 
                                <img className="object-cover object-center" src={icon_authed} alt="userIcon"/> :
                                <img className="object-cover object-center" src={icon_unauthed} alt="userIcon"/>
                            }
                        </div>
                    </button>
                </div>
                <div className={`${profileMenuOn ? 'block' : 'hidden'} profileModal absolute w-[16rem] flex flex-col items-center right-1 top-20 z-10 bg-white lg:text-lg md:text-base
                            shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)] rounded-[9px] py-[3px]`}>
                    <div className="w-[240px] my-[5px] relative text-black  font-normal text-center">관리자님, 안녕하세요.</div>
                    <div className="w-[234px] h-[0px] relative border border-zinc-500 border-opacity-50"></div>
                    <div className="Line12 w-[234px] h-[0px] relative border border-zinc-500 border-opacity-50"></div>
                    <button onClick={() => logout()}>
                        <div className="text-left mx-[15px] my-[5px] relative text-black font-bold">로그아웃</div>
                    </button>
                </div>

                <div className={`${notificationsOn ? 'block' : 'hidden'} notificationModal absolute w-[300px] max-h-[500px] overflow-y-scroll flex flex-col right-[3.5rem] top-20 z-10 bg-white lg:text-base md:text-sm
                                shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)] rounded-[9px] py-[3px]`}>
                    <div className="flex flex-col w-[100%] justify-center relative">
                        {
                            data && data.data ?
                                (data.data.list.length > 0 ? <>
                                        {
                                            data.data.list.map((notification) => (<>
                                                <Link to={notification.linkTo} state={{resourceId: notification.resourceId}} onClick={(e) => checkRead(e, notification.id)}>
                                                    <button className="text-left">
                                                        <div className="px-[17px] my-[5px] relative text-black ">
                                                            {notification.message}
                                                        </div>
                                                        <div className="px-[17px] my-[5px] relative text-zinc-500 lg:text-[0.75rem]">
                                                            {moment(notification.createdDatetime).fromNow()}
                                                        </div>
                                                    </button>
                                                </Link>
                                                <div className="Line11 w-[265px] h-[0px] left-[16px] my-[5px] relative border border-zinc-500 border-opacity-50"></div>
                                            </>))
                                        }
                                        <div className="flex flex-row justify-between"> 
                                            <Link to={"/notifications"} onClick={() => setNotificationsOn(false)}>
                                                <button className="relative my-[3px] mx-[17px] w-[110px] h-[24px] bg-slate-500 rounded-[9px] flex justify-center items-center">
                                                    <div className="text-white font-bold ">지난 알림 보기</div>
                                                </button>
                                            </Link>
                                            <button className="mx-[17px] my-[5px] relative text-slate-500  font-bold justify-center items-center"
                                                    onClick={() => checkReadAll()}
                                            >모두 읽음 표시
                                            </button>
                                        </div>
                                        
                                        </> : 
                                        <>
                                        <div className="text-center px-[17px] my-[5px] relative text-black font-normal ">새로운 알림이 없습니다.</div>
                                        <Link className = "flex flex-row justify-center" to={"/notifications"} onClick={() => setNotificationsOn(false)}>
                                            <button className="relative my-[3px] mx-[17px] w-[110px] h-[24px] bg-slate-500 rounded-[9px] flex justify-center items-center">
                                                <div className="text-white font-bold ">지난 알림 보기</div>
                                            </button>
                                        </Link>
                                        </>
                                ) : <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHeader;