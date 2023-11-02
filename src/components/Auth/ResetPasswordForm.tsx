import { FC, useState } from 'react';
import { getAuth, sendPasswordResetEmail, fetchSignInMethodsForEmail } from 'firebase/auth';

interface ResetPasswordFormProps {
  onResetPassword: () => void;
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ onResetPassword }) => {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResetPassword = async () => {
    try {
      const auth = getAuth();
      
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods.length === 0) {
        setError('User with this email was not found.');
        return;
      }

      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setError(null);
    } catch (error) {
      setError('Errors when sending a password update request.');
    }
  };

  return (
    <div>
      {resetSent ? (
        <p>Інструкія по відновленню паролю відправлена Вам на пошту</p>
      ) : (
        <div  className='reset-password-block'>
          <p>Введіть вашу поштовау скриньку</p>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            />
          <div>
            <button className='gradient-button' onClick={handleResetPassword}>Змінити пароль</button>
            <button className='gradient-button' onClick={onResetPassword}>Скасувати</button>
          </div>
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default ResetPasswordForm;