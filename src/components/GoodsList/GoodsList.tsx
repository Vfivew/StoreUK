import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import GoodsCard from "./GoodCards/GoodsCard";
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import { setSortType } from "../../store/slice/sortSlice";
import { addBasketItem } from '../../store/slice/basketSlise';
import { setToogleModal } from '../../store/slice/basketSlise';
import {updateBasket} from '../../Service/updateBasket'
import {Link} from "react-router-dom"

const GoodsList = () => {
  const { itemId } = useParams();
  const dispatch = useAppDispatch();
  const allGoods = useAppSelector((state) => state.sort.allGoods);
  const activeButton = useAppSelector((state) => state.sort.activeButton);
  const email = useAppSelector((state) => state.user.email)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    if (activeButton !==null) {
      dispatch(setSortType(activeButton));
    }
  }, [allGoods, dispatch]);

  const handleAddToCart = (good: any) => {
    dispatch(setToogleModal());
    dispatch(addBasketItem({ quantity: 1, item: good, itemId: itemId }));
    if (email) {
      updateBasket({ quantity: 1, item: good, itemId: itemId, email: email })
    }
  };

  return (
    <section className="goods-card-section-list">
      {allGoods ? (
        allGoods.map((good:any) => (
        <Link
          className='goods-card-section'
          key={good.article}
          to={`/goods/${itemId}/${good.article}`} 
          onMouseEnter={() => setHoveredItem(good.article)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <GoodsCard
            name={good.назва}
            img={good.img}
            price={good.ціна}
            />
            <div className={`buy-button-container ${hoveredItem === good.article ? 'is-hover' : ''}`}>
              <button className="buy-button"
              onClick={() => handleAddToCart(good)}
              >Придбати
              </button>
            </div>
        </Link>
        ))
      ) : (
        <p>Немає товарів</p>
      )}
    </section>
  );
};

export default GoodsList;
