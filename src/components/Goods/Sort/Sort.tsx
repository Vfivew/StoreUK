import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { setSortType, setActiveButton } from '../../../store/slice/sortSlice'
import { setSortMenuActive } from '../../../store/slice/mediaSlice';

const Sort = () => {
  const dispatch = useAppDispatch();
  const sortMenuActive = useAppSelector((state) => state.media.sortMenuActive);
  const activeButton = useAppSelector((state) => state.sort.activeButton);
  const [buttonText, setButtonText] = useState<string | null>(null);
  
  const toggleSortMenu = () => {
    dispatch(setSortMenuActive(!sortMenuActive))
  };
    
  const handleFilterClick = (buttonText: string) => {
    setButtonText(buttonText);
    dispatch(setActiveButton(buttonText))
    dispatch(setSortType(buttonText));
    dispatch(setSortMenuActive(!sortMenuActive))
  };

  return (
    <section className='sort-section'>
    <h3>Сортувати</h3>
      <button className="sort-button" onClick={toggleSortMenu}>
          {buttonText ? buttonText : 'Choose sorting'}
      </button>
      <ul className={`sort-menu ${sortMenuActive ? 'active' : ''}`}>
        <button
          className={activeButton === 'PriceUp' ? 'active' : ''}
          onClick={() => handleFilterClick('PriceUp')}
        >
          Від дешевих до дорожчих
        </button>
        <button
          className={activeButton === 'Pricedown' ? 'active' : ''}
          onClick={() => handleFilterClick('Pricedown')}
        >
          Від дорожчих до дешевих
        </button>
        <button
          className={activeButton === 'Rating' ? 'active' : ''}
          onClick={() => handleFilterClick('Rating')}
        >
          По рейтингу
        </button>
      </ul>
    </section>
  );
};

export default Sort;
