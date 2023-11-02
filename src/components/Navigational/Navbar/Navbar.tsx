import shopCatalogIcon from '../../../img/icon/shopCatalogIcon.svg';
import logo from '../../../img/logo.png'
import close from '../../../img/icon/close.svg';
import phone from '../../../img/icon/phone.svg';
import Catalog from "../Catalog";
import { useAppSelector, useAppDispatch } from '../../../hooks/redux-hooks'; 
import { NavLink } from "react-router-dom";
import { setNavBurgerActive } from "../../../store/slice/mediaSlice";

const Navbar = () => {
    const dispatch = useAppDispatch()
    const Goods = useAppSelector((state) => state.documents);
    const burgerActive = useAppSelector((state) => state.media.navBurgerActive);
    
    Catalog();

    const toggleBurgerMenu = () => {
        dispatch(setNavBurgerActive(!burgerActive))
    };

    return (
        <section className="nav">
            <section className="nav-wrapper">
                <img className="nav-img" src={logo} alt="Logo"/>
                <button className="nav-button" onClick={toggleBurgerMenu}>
                    <img src={shopCatalogIcon} alt="Shop Catalog Icon" />
                </button>
                <nav
                    className={`nav-menu ${burgerActive ? 'active' : ''}`}
                    onClick={toggleBurgerMenu}
                >
                    <button className="nav-button-close" onClick={toggleBurgerMenu}>
                        <img src={close} alt="close" />
                    </button>
                    <ul className="nav-list">
                        {Goods?.map((item) => (
                        <NavLink to={`/goods/${item.id}`} key={item.id}>
                            <li className="nav-menu-item" key={item.id}>
                            {item.id}
                            </li>
                        </NavLink>
                        ))}
                    </ul>
                </nav>
                <span className="nav-span">
                    <img className="nav-phone-icon" src={phone} alt="Phone" />
                    <a className='nav-number' href="tel:380999999999">
                        099 999-99-99
                    </a>
                </span>         
            </section>
        </section>
    );
};

export default Navbar;
