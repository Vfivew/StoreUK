import { useNavigate } from 'react-router-dom';
import { useFetchDocumentDiscountGoodsQuery } from '../../store/slice/fireStoreApi';
import { randomItemId } from '../../utils/randomItemId';

import Slider from '../Slider/Slider';

const Main = () => {
  const navigate = useNavigate();
  const itemId = randomItemId();
  const { data, isLoading, isError } = useFetchDocumentDiscountGoodsQuery(`${itemId}`);

  let discountGoods: any[] = [];
  let discountItemName = null;
  let discountItemImg = null;
  
  if (data) {
    Object.keys(data).forEach((category) => {
      const categoryGoods = data[category];
      Object.keys(categoryGoods).forEach((key) => {
        discountGoods.push(categoryGoods[key]);
      });
    });

    if (discountGoods[0] && discountGoods[0].назва) {
      discountItemName = discountGoods[0].назва;
      discountItemImg = discountGoods[0].img;
    }
  }

  const goToDiscountItem = () => {
     navigate(`/goods/${itemId}/${discountGoods[0].article}`);
  }

  const handleCatalogClick = () => {
    navigate('/goods/Котушки');
  };

  return (
    <main className="main">
      <section className="grid-container">
        <section className="block1">
          <Slider />
          <div className='block-sticker'>
            <h3>Великий вибір вудилищ та приманок</h3>
            <p onClick={handleCatalogClick}>До каталогу</p>
          </div>
        </section>
        <section className="block2" onClick={goToDiscountItem}>
          <img src={discountItemImg} alt="discountItem" />
          <div className='line'>Знижка 15%
          <span>
            {discountItemName}
          </span>
          </div>
        </section>
        <section className="block3" onClick={goToDiscountItem}>
          <img src={discountItemImg} alt="discountItem" />
          <div className='line'>Знижка 15%
          <span>
            {discountItemName}
          </span>
          </div>
        </section>
        </section>
    </main>
  );
};

export default Main;
