import {useState} from 'react';
import { useAppSelector, useAppDispatch } from '../../../../../hooks/redux-hooks';
import Reviews from '../Reviews/Reviews';
import DelivieryPayment from '../DelivieryPayment/DelivieryPayment'
import ItemRaiting from '../ItemRaiting/ItemRaiting';
import Characteristics from '../Characteristics/Characteristics';
import { setToogleModal, addBasketItem } from '../../../../../store/slice/basketSlise';
import Basket from '../../../../Basket/Basket';
import { useParams } from 'react-router-dom';
import { updateBasket } from '../../../../../Service/updateBasket';

const AllDetails = () => {
  const { itemId, article } = useParams();
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => state.item.selectedItem);
  const email = useAppSelector((state)=> state.user.email)
  const [quantity, setQuantity] = useState(0);
  const isBasketOpen = useAppSelector((state) => state.basket.isBasketOpen);
  
  if (!item) {
    return <div>Завантаження</div>;
  }

  const handleIncrease = () => {
    if (quantity < 100001) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (event: any) => {
      let newQuantity = parseInt(event.target.value, 10);

      if (newQuantity < 0) {
        newQuantity = 0;
      } else if (newQuantity > 100) {
        newQuantity = 100;
      }

      setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      console.log(item);
      dispatch(addBasketItem({ quantity , item, itemId}));
      dispatch(setToogleModal());
      if (email) {
        updateBasket({ quantity: quantity, item: item, itemId: itemId, email: email })
      }
    }
  };
    
  return (
    <section className="all-details">
      <section className="all-details-left-block">
        <section className='all-details-image-block'>
          <img src={item.img} alt="Item photo" />
        </section>
          <Characteristics/>
      </section>
      <section className="all-details-right-block">
        <section className='all-detail-right-wrapper'>
            <h3>{item.name}</h3>
            <ItemRaiting rating={item.рейтинг} />
            <p>{item.ціна} гривень</p>
            <div className="all-details-quantily-block">
                <button className="all-details-combined-button" onClick={handleDecrease}>
                -
                </button>
                <input
                className="all-details-quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                />
                <button className="all-details-combined-button" onClick={handleIncrease}>
                +
                </button>
                <button className='button'
                  onClick={handleAddToCart}
                  >
                  <div className="wave"></div>
                  <span className='span'>Придбати</span>
                </button>
            </div>
        </section>
        <DelivieryPayment/>
        <Reviews/>
      </section>
      {isBasketOpen && <Basket/>}
    </section>
  );
};

export default AllDetails;
