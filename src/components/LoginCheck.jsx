import React from 'react';
import { useCookies } from 'react-cookie';
import LoginModal from './modals/LoginModal.jsx';

const withLoginCheck = (WrappedComponent) => {
    return (props) => {
        const [cookies, setCookie] = useCookies(['login']);
        const [isLoginModalOpen, setLoginModalOpen] = React.useState(!cookies.login);

        const handleLoginSuccess = (userData) => {
            setCookie('login', userData, { path: '/' });
            setLoginModalOpen(false);
        };

        return (
            <>
                {!cookies.login && isLoginModalOpen && 
                    <LoginModal onSuccess={handleLoginSuccess} />
                }
                <WrappedComponent {...props} />
            </>
        );
    };
}

export default withLoginCheck;