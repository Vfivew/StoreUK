import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../../../hooks/redux-hooks'; 
import { NavLink } from "react-router-dom";
import { setHeaderBurgerActive } from "../../../store/slice/mediaSlice";
import { setToogleModal } from "../../../store/slice/basketSlise";
import { setBasketItem } from "../../../store/slice/basketSlise";
import { useFetchBasketQuery } from "../../../store/slice/fireStoreApi";
import basket from '../../../img/icon/basket.svg'

import Basket from "../../Basket/Basket";
import Auth from "../../Auth/Auth";
import burgermenu from '../../../img/icon/burgermenu.svg';

const Header = () => {
    const dispatch = useAppDispatch()
    const burgerActive = useAppSelector((state) => state.media.headerBurgerActive);
    const isBasketOpen = useAppSelector((state) => state.basket.isBasketOpen)
    const basketItems = useAppSelector(state => state.basket.basket);
    const email = useAppSelector(state=> state.user.email)
    const { data:basketData, isLoading:basketLoading, isError:basketError } = useFetchBasketQuery(email);
    const countItem = basketItems.length;

    const transformedBasketData = basketData ? Object.values(basketData) : [];
    const arrayBasketData = Object.keys(transformedBasketData).map((key: any) => transformedBasketData[key]);

    const toggleBurgerMenu = () => {
        dispatch(setHeaderBurgerActive(!burgerActive))
    };

    const openBasket =() => {
        dispatch(setToogleModal());
    }

    useEffect(() => {
    if (!basketLoading && !basketError) {
        dispatch(setBasketItem(arrayBasketData))
    } 
    }, [basketData, basketLoading, basketError, dispatch]);

    return (
        <header className="header">
            <section className="header-nav">
            <button className="header-button" onClick={toggleBurgerMenu}>
                <img src={burgermenu} alt="burgermenu" />
            </button>
                <div className={`header-list-container ${burgerActive ? 'active' : ''}`}>
                    <ul className="header-list">
                        <NavLink to="/">
                            <li className="header-list-item">Про нас</li>
                        </NavLink>
                        <NavLink to="/info/0">
                            <li className="header-list-item">Оплата і доставка</li>
                        </NavLink>
                        <NavLink to="/info/1">
                            <li className="header-list-item">Обмін та повернення</li>
                        </NavLink>
                        <NavLink to="/info/2">
                            <li className="header-list-item">Контактна інформація</li>
                        </NavLink>
                    </ul>
                    <ul className="header-list">
                        {email? <NavLink to="/admin">
                            <li className="header-list-item">Адмін панель</li>
                        </NavLink>:null}
                        <button className="header-list-item">EN</button>
                        <button className="header-list-item">UK</button>
                        <NavLink to="/">
                            <li className="header-list-item">Бажання</li>
                        </NavLink>
                        <NavLink className='basket-link 'to="#" onClick={openBasket}>
                            <img src={basket} alt="basket" className="basket-image" />
                                {countItem > 0 && (
                                <div className='basket-item-count'>
                                    {countItem}
                                </div>
                            )}
                        </NavLink>
                        <NavLink to="/register" className='header-login-button'>
                            <Auth/>
                        </NavLink>
                    </ul>
                </div>
            </section>
            {isBasketOpen && <Basket/>}
        </header>
    );
};

export default Header;