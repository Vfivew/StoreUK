import React from 'react';
import { useAppSelector } from '../../../hooks/redux-hooks';
import { Link } from 'react-router-dom';

interface NavigationProps {
  propsArray: (string | undefined)[];
}

const NavigationMiniBar: React.FC<NavigationProps> = ({ propsArray }) => {
  const key = useAppSelector((state) => state.goods.filterKey);

  const updatedPropsArray = key !== null ? [...propsArray, key] : propsArray;

  return (
    <div className="navigation-mini-bar">
      {updatedPropsArray.map((prop, index) => (
        <span key={index}>
          {index > 0 && ' > '}
          {index === 0 ? (
            <Link to="/">Головна</Link>
          ) : index === 1 ? (
            <Link to={`/Goods/${prop}`}>{prop}</Link>
          ) : (
            prop
          )}
        </span>
      ))}
    </div>
  );
};

export default NavigationMiniBar;
