import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../store/slice/userSlice';
import { Form } from './Form';

const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        user.getIdToken().then((token) => {
          localStorage.setItem('userToken', token);
          dispatch(
            setUser({
              email: user.email || '',
              id: user.uid,
              token: token,
            })
          );
          navigate('/');
        });
      })
      .catch((error) => {
        if (
          error.code === 'auth/wrong-password' ||
          error.code === 'auth/user-not-found'
        ) {
          setError('Invalid login or password.');
        } else {
          setError('Login error try later.');
        }
      });
  };

  return (
    <div>
      <Form title="Sign in" handleClick={handleLogin} isRegistrationPage={false}/>
      {error && <p>{error}</p>}
    </div>
  );
};

export { Login };