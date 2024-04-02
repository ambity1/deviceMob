import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {repairRecordModalOpen} from "../../store/actions/modals/repairRecordModalOpen";
import {askQuestionModalOpen} from "../../store/actions/modals/askQuestionModalOpen";
import SearchPopUp from "./SearchPopUp";

export default function Header() {
    const sidenav = useRef();
    const headerRef = useRef();

    const [searchIsOpen, setSearchIsOpen] = useState(false);
    const [searchPaddingTop, setSearchPaddingTop] = useState(0);

    const dispatch = useDispatch();

    const toggleSidenav = (dir) => {
        if(dir){
            sidenav.current.classList.add('active');
            document.body.style.overflow = 'hidden';
        }else{
            sidenav.current.classList.remove('active');
            document.body.style.overflow = null;
        }
    }

    useEffect(()=>{
        searchIsOpen ? setSearchPaddingTop(headerRef.current.offsetHeight) : false
    }, [searchIsOpen])

    return (
        <>
            <header ref={headerRef}>
                <div className="header container d-flex align-items-center justify-content-between">
                    <Link to='/' className="header-logo"><img src="/media/i/logo.svg" alt="DEVICE"/></Link>
                    <div className="burger d-flex d-xxl-none align-items-center justify-content-center" onClick={()=>{toggleSidenav(1); setSearchIsOpen(false)}}>
                        <div/>
                    </div>
                </div>
            </header>
            <div className="sidenav" ref={sidenav}>
                <div className="sidenav-block">
                    <div className="sidenav-block-head">
                        <div className='container d-flex align-items-center justify-content-between '>
                            <Link to='/'>
                                <img src="/media/i/logo_b.svg" onClick={()=>{toggleSidenav(0)}}/>
                            </Link>
                            <div className="close" onClick={()=>{toggleSidenav(0)}}/>
                        </div>
                    </div>
                    <div className="d-flex flex-column container sidenav-block-content">
                        <nav className="nav-menu d-flex flex-column">
                            <div className="d-flex align-items-center" onClick={()=>{toggleSidenav(0);setSearchIsOpen(!searchIsOpen);}}>
                                <img src="/media/i/searchicon_b.svg"/>
                                <p>Поиск</p>
                            </div>
                            <Link to='/catalog' className="d-flex align-items-center"  onClick={()=>{toggleSidenav(0)}}>
                                <img src="/media/i/icon_catalog_b.svg"/>
                                <p>Каталог</p>
                            </Link>
                            <Link to='/service' className="d-flex align-items-center"  onClick={()=>{toggleSidenav(0)}}>
                                <img src="/media/i/icon_service_b.svg"/>
                                <p>Сервис</p>
                            </Link>
                            <Link to='/cart' className="d-flex align-items-center"  onClick={()=>{toggleSidenav(0)}}>
                                <img src="/media/i/cart_b.svg"/>
                                <p>Корзина</p>
                            </Link>
                            <Link to="/promotions" onClick={()=>{toggleSidenav(0)}}>Акции</Link>
                            <Link to="/dostavka-i-oplata" onClick={()=>{toggleSidenav(0)}}>Доставка и оплата</Link>
                            <Link to="/about" onClick={()=>{toggleSidenav(0)}}>О компании</Link>
                            <Link to="/contacts" onClick={()=>{toggleSidenav(0)}}>Контакты</Link>
                            <a href="tel:+79371365555"><p>8 (937) 136‒55‒55</p></a>
                        </nav>
                        <div className='sidenav-block-content-btn d-flex flex-column'>
                            <div className='btn' onClick={()=>{toggleSidenav(0);dispatch(askQuestionModalOpen(true))}}>Задать вопрос</div>
                            <div className='btn btn-w' onClick={()=>{toggleSidenav(0);dispatch(repairRecordModalOpen({isOpen: true}))}}>Записаться на ремонт</div>
                        </div>
                        <div className='sidenav-block-content-soc d-flex flex-column align-items-start'>
                            <p>Соц. сети @deviceufa</p>
                            <div className='d-flex align-items-center justify-content-start'>
                                <a href="https://vk.com/ufa.device" target="_blank"><div className='d-flex align-items-center justify-content-center'><img src="/assets/img/soc/vk.svg" alt="vk"/></div></a>
                                <a href="https://t.me/deviceufa" target="_blank"><div className='d-flex align-items-center justify-content-center'><img src="/assets/img/soc/tg.svg" alt="tg"/></div></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SearchPopUp isOpen={searchIsOpen} toggle={setSearchIsOpen} topPadding={searchPaddingTop}/>
        </>
    );
}

const HeaderTo = connect(
    state => ({
    }),
    dispatch => ({
        repairRecordModalOpen: (val)=>{dispatch(repairRecordModalOpen(val))},
        askQuestionModalOpen: (val)=>{dispatch(askQuestionModalOpen(val))}
    })
)(Header);