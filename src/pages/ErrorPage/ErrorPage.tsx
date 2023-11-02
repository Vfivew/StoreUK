import React from 'react';

const ErrorPage: React.FC = () => {
  return (
    <div className='error-block flex flex-col text-center p-8 bg-fourth-color'>
      <h2 className='text-red-500 text-5xl'>Помилка 404</h2>
      <p className='text-secondary-size'>
        Пробачте, проте сторінка яку ви шукайте не існує...
      </p>
      <p>
        Перевірьте URL або поверніться на{' '}
        <a className='font-bold hover:text-primary-color focus:text-primary-color' href='/'>
          Головну
        </a>
        .
      </p>
    </div>
  );
};

export default ErrorPage;