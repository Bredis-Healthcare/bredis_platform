import {Link, useNavigate, useLocation } from "react-router-dom";
import * as React from 'react';
import {useEffect, useState} from 'react';
import axios from "../../api/axios";
import {useQuery} from 'react-query'
import {useCookies} from "react-cookie";
import moment from 'moment';
import 'moment/locale/ko';
import bredis_logo_wide from "../../resources/img/bredis_logo_wide.png"
import icon_noti from "../../resources/img/icon_noti.png"
import icon_authed from "../../resources/img/icon_authed.png"
import icon_unauthed from "../../resources/img/icon_unauthed.png"
import { useLoginModal } from "./modals/LoginModalContext";

const Header = () => {

    const navigate = useNavigate();
    const { ismodalopen, setIsModalOpen } = useLoginModal();
    const location = useLocation();
    const [isHovering1, setIsHovering1] = useState(false);
    const [isHovering2, setIsHovering2] = useState(false);
    const [isHovering3, setIsHovering3] = useState(false);
    const [isHovering4, setIsHovering4] = useState(false);
    const [profileMenuOn, setProfileMenuOn] = useState(false);
    const [notificationsOn, setNotificationsOn] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    const [cookies, setCookie, removeCookie] = useCookies(['login']);

    const {isLoading, error, data, refetch} = useQuery('notifications',
        () => cookies.login ? axios.get(`/notifications?memberId=${cookies.login && cookies.login['id']}`): null,
        {
            refetchInterval: 10000,
            enabled:!!cookies.login,
        });
        
    useEffect(()=>{
        async function loadUserInfo() {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000)); 
                if(cookies.login)
                {
                    const request = await axios.get(`/members/${cookies.login && cookies.login['id']}/info`,);
                    setUserInfo(request.data);
                }
    
            } catch (error) {
                console.error("Error while load user info in:", error);
                setIsModalOpen(false);
            }
        }
        // console.log("cookies.login", cookies.login, !!cookies.login);
          
        if(!!cookies.login)
        {
            loadUserInfo()
            refetch()
        }
    },[cookies.login])

    useEffect(() => {
        setProfileMenuOn(false);
        setNotificationsOn(false); // 경로가 바뀌면 팝업 창을 닫습니다.
    }, [location]);



    function clickProfileIcon() {
        setNotificationsOn(false)
        setProfileMenuOn(profileMenuOn => !profileMenuOn)
    }
    async function logout() {
        const request = await axios.post('logout')
        await removeCookie(['login']);
        setIsModalOpen(false);
        clickProfileIcon()
        if(request.status === 200){
            alert("성공적으로 로그아웃 되었습니다.");
        }
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
            <div className="Header w-full h-20 bg-white flex flex-row items-center justify-between sticky top-0 z-10">
                <Link className="flex flex-row  items-center"to={"/"}>
                    <img className="w-40" src={bredis_logo_wide}  alt="logo"/>
                    <div className="text-black lg:text-2xl md:text-xl font-bold">Digital ELISA<br className="lg:hidden md:block" /> 연구분석서비스</div>
                </Link>

                <div className="flex flex-row items-center lg:gap-8 md:gap-2" >
                    <Link reloadDocument className="flex flex-col items-center lg:w-[6rem] md:w-[6rem]" to={"/"} onMouseOver={() => setIsHovering1(true)} onMouseOut={() => setIsHovering1(false)}>
                        <div className={`${isHovering1 ? 'block' : 'hidden'} w-[6rem] md:w-[6rem] h-[0.2rem]  bg-sky-900`} />
                        <div className={`${isHovering1 ? 'text-sky-900' : 'text-black'}  text-black lg:text-xl md:text-base mt-[0.5rem] font-bold`}>서비스 소개</div>
                    </Link>
                    <Link reloadDocument className="flex flex-col items-center lg:w-[6rem] md:w-[5rem]" to={"/threads/list"} onMouseOver={() => setIsHovering2(true)} onMouseOut={() => setIsHovering2(false)}>
                        <div className={`${isHovering2 ? 'block' : 'hidden'} w-[6rem] md:w-[5rem] h-[0.2rem]  bg-sky-900`} />
                        <div className={`${isHovering2 ? 'text-sky-900' : 'text-black'}  text-black lg:text-xl md:text-base mt-[0.5rem] font-bold`}>문의하기</div>
                    </Link>

                    <Link reloadDocument className="flex flex-col items-center w-[6rem] md:w-[5rem]" to={"/orders/create"} onMouseOver={() => setIsHovering3(true)} onMouseOut={() => setIsHovering3(false)}>
                        <div className={`${isHovering3 ? 'block' : 'hidden'} w-[6rem] md:w-[5rem] h-[0.2rem]  bg-sky-900`} />
                        <div className={`${isHovering3 ? 'text-sky-900' : 'text-black'}  lg:text-xl md:text-base mt-[0.5rem] font-bold`}>주문하기</div>
                    </Link>

                    <Link reloadDocument className="flex flex-col items-center w-[6rem] md:w-[5rem]" to={"/orders/list"} onMouseOver={() => setIsHovering4(true)} onMouseOut={() => setIsHovering4(false)}>
                        <div className={`${isHovering4 ? 'block' : 'hidden'} w-[6rem] md:w-[5rem] h-[0.2rem]  bg-sky-900`} />
                        <div className={`${isHovering4 ? 'text-sky-900' : 'text-black'}   lg:text-xl md:text-base mt-[0.5rem] font-bold`}>주문내역</div>
                    </Link>
                    <div>
                        <button className=" w-[3.25rem] mt-[0.8rem]"
                                onClick={() => clickNotificationIcon()}>
                            <div className="w-full">
                                <div className={`${data && data.data && data.data.list.length > 0 ? 'block' : 'hidden'} Ellipse49 w-3 h-3 ml-4 absolute bg-red-600 rounded-full`} />
                                <img className="object-cover object-center" src={icon_noti} alt="noti"/>
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
                        <div className="w-[240px] my-[5px] relative text-black  font-normal text-center">{userInfo.name} {userInfo.position}님, 안녕하세요</div>
                        <div className="w-[234px] h-[0px] relative border border-zinc-500 border-opacity-50"></div>
                        <Link to="/members/modify">
                            <button onClick={() => setProfileMenuOn(false)}>
                                <div className="mx-[15px] my-[5px] text-black  font-bold">프로필 정보 변경</div>
                            </button>
                        </Link>
                        <div className="Line12 w-[234px] h-[0px] relative border border-zinc-500 border-opacity-50"></div>
                        <button onClick={() => logout()}>
                            <div className="text-left mx-[15px] my-[5px] relative text-black font-bold">로그아웃</div>
                        </button>
                    </div>

                    <div className={`${notificationsOn&&cookies.login ? 'block' : 'hidden'} notificationModal absolute max-h-[500px] overflow-y-scroll w-[300px] flex flex-col right-[3.5rem] top-20 z-10 bg-white lg:text-base md:text-sm
                                    shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)] rounded-[9px] py-[3px]`}>
                        <div className="flex flex-col w-[100%] justify-center relative">
                            {
                                data && data.data ?
                                    (data.data.list.length > 0 ? <>
                                            {
                                                data.data.list.map((notification) => (<>
                                                    <Link reloadDocument to={notification.linkTo} state={{resourceId: notification.resourceId}} onClick={(e) => checkRead(e, notification.id)}>
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

export default Header;