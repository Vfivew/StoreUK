import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { setDeliveryMethod, setIsOrderPlaced } from '../../store/slice/formReducer'
import BasketItem from '../Basket/BasketItem/BasketItem';

const SalesForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control, formState: { errors, isValid } } = useForm({ mode: 'onBlur' });
  const { deliveryMethod, isOrderPlaced } = useAppSelector(state => state.form); 
  const basket = useAppSelector(state => state.basket.basket);
  
  const onSubmit = (data: any) => {

    dispatch(setIsOrderPlaced(true));
  };

  const closeModal = () => {
    dispatch(setIsOrderPlaced(false));
    navigate('/');
    localStorage.removeItem('isOrderPlaced');
    localStorage.removeItem('cartItems');
    window.location.reload();
  };

  return (
    <main className='form-wrapper'>
      <div className='form'>
      <div className='form-basket-items'>
        <ul className='form-basket-items-list'>
          {basket.length === 0 ? (
            <p className='basket-items-no-items'>Ви не обрали жодного товару...</p>
          ) : (
            <ul className='basket-items-list'>
              {basket.map(([quantity, item, itemId], index) => (
                <li key={item.article}>
                  <BasketItem item={item} quantity={quantity} itemId={itemId} />
                </li>
              ))}
            </ul>
          )}
      </ul>
      </div>
      <div className='form-block'>
        <h2>Завершити замовлення</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Ім'я</label>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: 'This field is required',
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: 'Enter a valid first name'
                }
              }}
              defaultValue="" 
              render={({ field }) => <input className='inputs' {...field} />}
            />
            {errors.firstName && <p className="error-message">{errors.firstName.message as React.ReactNode}</p>}
          </div>
          <div>
            <label>Фамілія</label>
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: 'This field is required',
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: 'Enter a valid last name'
                }
              }}
              defaultValue="" 
              render={({ field }) => <input className='inputs'{...field} />}
            />
            {errors.lastName && <p className="error-message">{errors.lastName.message as React.ReactNode}</p>}
          </div>
          <div>
            <label>Номер телефону</label>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: 'This field is required',
                pattern: {
                  value: /^\+380\d{9}$/,
                  message: 'Enter a valid phone number. (Format: "+380998765432")'
                }
              }}
              defaultValue="" 
              render={({ field }) => <input className='inputs' {...field} />}
            />
            {errors.phoneNumber && <p className="error-message">{errors.phoneNumber.message as React.ReactNode}</p>}
          </div>
          <div>
            <label>Місто</label>
            <Controller
              name="city"
              control={control}
              rules={{
              required: 'This field is required',
                pattern: {
                value: /^[A-Za-z]+$/,
                message: 'Enter a valid city name'
                }
              }}
              defaultValue="" 
              render={({ field }) => <input className='inputs' {...field} />}
            />
            {errors.city && <p className="error-message">{errors.city.message as React.ReactNode}</p>}
          </div>
          <div>
            <label>Доставка</label>
            <Controller
              name="delivery"
              control={control}
              render={({ field }) => (
                <select className='select' {...field} onChange={(e) => setDeliveryMethod(e.target.value)}>
                  <option  value="pickup">Самовивіз</option>
                  <option  value="novaPoshta">Пошта</option>
                  <option  value="courier">Кур'єром по місту</option>
                </select>
              )}
            />
            {errors.delivery && <p className="error-message">{errors.delivery.message as React.ReactNode}</p>}
          </div>
          {deliveryMethod === 'novaPoshta' && (
            <div>
              <label>Оберіть пункт видачі</label>
              <Controller
                name="novaPoshtaPoint"
                control={control}
                rules={{ required: 'This field is required' }}
                render={({ field }) => <input {...field} />}
                defaultValue="" 
              />
              {errors.novaPoshtaPoint && <p className="error-message">{errors.novaPoshtaPoint.message as React.ReactNode}</p>}
            </div>
          )}
          {deliveryMethod === 'courier' && (
            <div>
              <label>Адрес доставки</label>
              <Controller
                name="deliveryAddress"
                control={control}
                rules={{ required: 'This field is required' }}
                render={({ field }) => <input {...field} />}
                defaultValue="" 
              />
              {errors.deliveryAddress && <p className="error-message">{errors.deliveryAddress.message as React.ReactNode}</p>}
            </div>
          )}
          <div>
              <button className='button basket-button' disabled={!isValid || basket.length === 0}>
                <div className="wave"></div>
                <span className='span'>Відправити</span>
              </button>
          </div>
        </form>
      </div>
      {isOrderPlaced && (
          <div className="modal">
            <div className="modal-content">
              <h3>Thank you for your order</h3>
              <p>Наш оператор скоро зв'яжеться з вами</p>
              <button className='button basket-button' onClick={closeModal}>
                <div className="wave"></div>
                <span className='span'>На головну</span>
              </button>
            </div>
          </div>
        )}
        </div>
    </main>
  );
};

export default SalesForm;
