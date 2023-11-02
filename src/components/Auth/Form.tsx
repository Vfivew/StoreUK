import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import ResetPasswordForm from './ResetPasswordForm'

interface FormProps {
  title: string;
  isRegistrationPage: boolean;
  handleClick: (email: string, pass: string) => void;
}

const Form: FC<FormProps> = ({ title, isRegistrationPage, handleClick }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [resetPassword, setResetPassword] = useState(false);

  const handleResetPasswordClick = () => {
    setResetPassword(true);
  };

  const handleResetPasswordCancel = () => {
    setResetPassword(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPass(newPassword);
    validatePasswords(newPassword, confirmPass);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const repeatedPassword = e.target.value;
    setConfirmPass(repeatedPassword);
    validatePasswords(pass, repeatedPassword);
  };

  const validatePasswords = (password: string, repeatedPassword: string) => {
    if (isRegistrationPage && password !== repeatedPassword) {
      setError('Passwords do not match');
    } else {
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegistrationPage && pass !== confirmPass) {
      setError('Passwords do not match');
    } else {
      setError(null);
      handleClick(email, pass);
    }
  };

  return (
    <div className='form-wrapper'>
      {resetPassword ? (
        <ResetPasswordForm onResetPassword={handleResetPasswordCancel} />
      ) : (
        <form onSubmit={handleSubmit} className="auth-form">
          <p>Логін</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className=""
            autoComplete="current-email"
          />
          <p>Пароль</p>
          <input
            type="password"
            value={pass}
            onChange={handlePasswordChange}
            placeholder="Password"
            className=""
            autoComplete="current-password"
          />
          {isRegistrationPage && (
            <>
              <input
                type="password"
                value={confirmPass}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm Password"
                className=""
                autoComplete="current-password"
              />
              {error && <p className="">{error}</p>}
            </>
          )}
          <div className='form-button-block'>
            <button
              type="submit"
              disabled={isRegistrationPage && pass !== confirmPass}
              className='gradient-button'
            >
              {title}
            </button>
            <button
              onClick={handleResetPasswordClick}
              className='gradient-button'
            >
              Забули пароль?
              </button>
              <Link to="/">
              <button className='gradient-button'>
                Повернутись на головну
              </button>
              </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export { Form };
