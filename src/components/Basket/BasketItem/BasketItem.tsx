import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { updateQuantity, removeBasketItem } from '../../../store/slice/basketSlise';
import { BasketItemProps } from '../../../models/goodsSliceModels';
import { deleteBasketItem } from '../../../Service/updateBasket';

const BasketItem: React.FC<BasketItemProps> = ({ item, quantity, itemId, handleModalClick }) => {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state)=>state.user.email)
  const [localQuantity, setLocalQuantity] = useState(quantity);

  const handleRemoveItem = () => {
    dispatch(removeBasketItem(item.article)); 
    if (email) {
      deleteBasketItem({article:item.article, email})
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(event.target.value);
    if (newQuantity >= 0) {
      setLocalQuantity(newQuantity); 
      dispatch(updateQuantity({ itemForUpdate: item.article, newQuantity: newQuantity }));
    }
  };

  return (
    <div className='basket-item-pay-info'>
      <Link
        className='basket-item-pay-link'
        to={`/goods/${itemId}/${item.article}`}
        onClick={() => {
          if (handleModalClick) {
            handleModalClick();
          }
        }}
      >
        <img className='basket-item-pay-info-image' src={item.img} alt={item.name} />
      </Link>
      <div className='basket-item-pay-info-name'>{item.name}</div>
      <div className='basket-item-pay-info-quantity'>
        <p>Кількість</p> 
        <input
          className='basket-item-pay-info-quantity-input'
          type='number'
          value={localQuantity} 
          onChange={handleQuantityChange}
          min='0'
        />
      </div>
      <div className='basket-item-pay-info-price'>Ціна: {item.price} $</div>
      <button onClick={handleRemoveItem}>Видалити</button>
    </div>
  );
};

export default BasketItem;
