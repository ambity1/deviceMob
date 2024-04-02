import React from 'react';
import {Link, useLocation} from "react-router-dom";

function BottomMenu (){
    const location = useLocation();

    return (
        <div className="bottomMenu d-flex align-items-center justify-content-between">
            <Link to='/' className={`d-flex align-items-center flex-column ${location.pathname === '/' ? 'active' : ''}`}>
                <img src="/media/i/bm-home.svg" alt=""/>
                <p>Главная</p>
            </Link>
            <Link to='/catalog' className={`d-flex align-items-center flex-column ${location.pathname.split('/').includes('catalog') ? 'active' : ''}`}>
                <img src="/media/i/bm-catalog.svg" alt=""/>
                <p>Каталог</p>
            </Link>
            <Link to='/cart' className={`d-flex align-items-center flex-column ${location.pathname.split('/').includes('cart') ? 'active' : ''}`}>
                <img src="/media/i/bm-cart.svg" alt=""/>
                <p>Корзина</p>
            </Link>
            <Link to='/contacts' className={`d-flex align-items-center flex-column ${location.pathname.split('/').includes('contacts') ? 'active' : ''}`}>
                <img src="/media/i/bm-map.svg" alt=""/>
                <p>Магазины</p>
            </Link>
        </div>
    );
}

export default BottomMenu;