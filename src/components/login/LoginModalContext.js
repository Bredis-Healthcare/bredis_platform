import React, {createContext, useContext, useState} from 'react';

const LoginModalContext = createContext();

export const useLoginModal = () => {
    return useContext(LoginModalContext);
};

export const LoginModalProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <LoginModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
            {children}
        </LoginModalContext.Provider>
    );
};
