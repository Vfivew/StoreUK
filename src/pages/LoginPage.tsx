import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Login } from '../components/Auth/Login';
import { useAppSelector } from '../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const isAuth = useAppSelector((state) => state.user.token);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (isAuth) {
      navigate('/'); 
    }
  }, [isAuth, navigate]);

  return (
    <main className='auth-page'>
      <div className='auth-page-block'>
        <Login />
        <div className='auth-page-reference'>
        <Link
          className='gradient-button'
          to="/register">Реєстрація
        </Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
