import React from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { removeUser } from '../../store/slice/userSlice';

const Auth: React.FC = () => {
    const dispatch = useDispatch();
    const { isAuth, email } = useAuth();

    const handleLogout = () => {
        dispatch(removeUser());
    };

    return isAuth ? (
        <section>
            <button className='button-auth' onClick={handleLogout}>Вийти</button>
        </section>
    ) : (
        <button className='button-auth'>
            Увійти
        </button>
    );
};

export default Auth;
