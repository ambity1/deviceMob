import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";

export default function OrderSuccess(props) {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = 'Заказ оформлен | DEVICE';
        dispatch({type: 'SET_CART', cart: {summ: 0, old_summ: 0, cart: []}})
    }, [])

    return (
        <section className="success">
            <div className="container d-flex flex-column align-items-center">
                <img src="/media/success.svg"/>
                <h2>Спасибо, ваш заказ успешно оформлен!</h2>
                <div className="success-block d-flex flex-column">
                    <div className="success-block-item d-flex">
                        <p>Заказ:</p>
                        <span dangerouslySetInnerHTML={{__html:location.state.orderInfo.zakazLabel}}/>
                    </div>
                    <div className="success-block-item d-flex">
                        <p>Пункт выдачи:</p>
                        <span dangerouslySetInnerHTML={{__html:location.state.orderInfo.pvzLabel}}/>
                    </div>
                    <div className="success-block-item d-flex">
                        <p>Телефон:</p>
                        <span dangerouslySetInnerHTML={{__html:location.state.orderInfo.pvzPhone}}/>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <div className="success-msg">
                        Пожалуйста, запишите эти данные или сделайте скриншот, чтобы не потерять данные
                    </div>
                </div>
            </div>
        </section>
    );
}