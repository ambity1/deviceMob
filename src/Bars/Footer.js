import React, {createRef} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {SkeletonText} from "@consta/uikit/Skeleton";

class Footer extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <footer className="d-flex flex-column">
                <div className="footerTop container d-flex flex-column justify-content-between align-items-start">
                    <div className="footerTop-logo">
                        <a href="/" className="d-flex flex-row align-items-center">
                            <img src="/media/i/logo.svg" alt=""/>
                        </a>
                        <p>DEVICE - интернет-магазин мобильной техники и аксессуаров в Уфе</p>
                    </div>
                    <div className="footerTop-links">
                        <nav className="d-flex flex-column">
                            <Link to="/catalog"><p>Каталог</p></Link>
                            {
                                this.props?.catalog?.length
                                    ? this.props.catalog.map(item=>{
                                        return(<Link to={`/catalog/${item.alias}`}>{item.label}</Link>);
                                    })
                                    : <><SkeletonText rows={1}/><SkeletonText rows={1}/><SkeletonText rows={1}/><SkeletonText rows={1}/><SkeletonText rows={1}/></>
                            }
                        </nav>
                    </div>
                    <div className="footerTop-links">
                        <nav className="d-flex flex-column">
                            <a><p>Информация</p></a>
                            <Link to="/about">О компании</Link>
                            <Link to="/contacts">Контакты</Link>
                            <Link to="/payment">Условия оплаты</Link>
                            <Link to="/delivery">Условия доставки</Link>
                            <Link to="/guarantee">Гарантия на товар</Link>
                        </nav>
                    </div>
                    <div className="footerTop-links">
                        <nav className="d-flex flex-column">
                            <Link to='/service'><p>Сервис</p></Link>
                            {
                                this.props?.service?.length
                                    ? this.props.service.map(item=>{
                                        return(<Link to={`/service/${item.alias}`}>{item.label}</Link>);
                                    })
                                    : <><SkeletonText rows={1}/><SkeletonText rows={1}/><SkeletonText rows={1}/><SkeletonText rows={1}/><SkeletonText rows={1}/></>
                            }
                        </nav>
                        <div className="d-none">
                            <div className="footerTop-contacts">
                                <div className="footerTop-contacts--item">
                                    <p>Соц сети</p>
                                </div>
                                <div className="footerTop-contacts--item">
                                    <p>@deviceufa</p>
                                </div>
                            </div>
                            <div className="footerTop-contacts--social">
                                <div className="social-icons d-flex flex-row justify-content-start">
                                    <a href="https://vk.com/ufa.device" id="vk" target='_blank'>
                                        <img src="/assets/img/footer/vk.svg" alt="vk"/>
                                    </a>
                                    <a href="https://vk.com/ufa.device" id="tg" target='_blank'>
                                        <img src="/assets/img/footer/tg.svg" alt="tg"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="footerTop-contacts">
                            <p>Контактные данные</p>
                            <div className="footerTop-contacts--item">
                                <a href="tel:+79371365555"><p>8 (937) 136‒55‒55</p></a>
                            </div>
                        </div>
                        <div className="footerTop-contacts">
                            <p>Соц сети</p>
                            <div className="footerTop-contacts--item">
                                <p>@deviceufa</p>
                            </div>
                        </div>
                        <div className="footerTop-contacts--social">
                            <div className="social-icons d-flex flex-row justify-content-start">
                                <a href="https://vk.com/ufa.device" id="vk" target='_blank'>
                                    <img src="/assets/img/footer/vk.svg" alt="vk"/>
                                </a>
                                <a href="https://vk.com/ufa.device" id="tg" target='_blank'>
                                    <img src="/assets/img/footer/tg.svg" alt="tg"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footerBottom container d-flex flex-column justify-content-between">
                    <Link to="/policy"><p className="policy">Политика конфиденциальности</p></Link>
                    <a href="https://ambity.ru" target="_blank">Разработка сайта - <span>Амбити</span></a>
                </div>
            </footer>
        );
    }
}

const FooterConst = connect(
    state => ({
        catalog: state.catalog,
        service: state.service,
    }),
    dispatch => ({
    })
)(Footer);

export default FooterConst;