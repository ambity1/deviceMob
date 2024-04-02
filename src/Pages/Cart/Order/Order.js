import React, {Component, createRef} from 'react';
import {Accordion} from "react-bootstrap";
import InputMask from "react-input-mask";
import {Link, Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {query} from "../../../async/async";

class Order extends Component {
    constructor(props) {
        super(props);
        this.state={prodsCount: 0, orderStatus: 0};

        this.form = createRef();
        this.pvzs = createRef();

        this.calculate=this.calculate.bind(this);
        this.getNoun=this.getNoun.bind(this);

        this.sendOrder = this.sendOrder.bind(this);
    }

    calculate() {
        let prodsCount = this.props.cart.cart.map(item => {
            return -(-item.quantity);
        }).reduce((previousValue, currentValue) => previousValue + currentValue, 0);

        this.setState({prodsCount: prodsCount})
    }

    sendOrder(e) {
        e.preventDefault();
        let fd = new FormData(this.form.current);
        if(fd.get('shop_id')){
            let inputs = [...this.form.current.querySelectorAll('input, button')];
            inputs.forEach(item => item.setAttribute('disabled', 'disabled'));
            this.pvzs.current.style.border = null;
            query('/api/order', fd)
                .then(resp=>resp.json())
                .then(result=>{
                    if(result.status === 'ok'){
                        let data = {
                            zakazLabel: `${this.state.prodsCount} ${this.getNoun(this.state.prodsCount)} на сумму ${this.props.cart.summ} ₽`,
                        }

                        let pvz = this.props.contacts.find(item => item.address === fd.get('shop_id'));

                        data.pvzLabel = `${pvz.address}<br/>(eжедневно с 10:00 до 22:00)`;
                        data.pvzPhone = `<a href="tel:${pvz.phoneLink}">${pvz.phone}</a>`

                        data.order_id = result.order_id;
                        this.setState({orderStatus: data});
                    }
                })
        }else{
            this.pvzs.current.style.border = '1px solid #ff0000';
        }
    }

    getNoun(number) {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) {
            return 'товаров';
        }
        n %= 10;
        if (n === 1) {
            return 'товар';
        }
        if (n >= 2 && n <= 4) {
            return 'товара';
        }
        return 'товаров';
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = 'Оформление заказа | DEVICE';
        this.calculate();
    }

    render() {
        if(this.state.orderStatus){
            return <Navigate replace to="/cart/order/success" state={{ orderInfo: this.state.orderStatus}}/>
        }else{
            if(this.props?.cart?.cart?.length) {
                return (
                    <section className="zakaz">
                        <div className="container">
                            <h2>Оформление заказа</h2>
                            <p>{this.state.prodsCount} {this.getNoun(this.state.prodsCount)} на
                                сумму {this.props.cart.summ} ₽</p>
                            <form className="zakaz-block d-flex flex-column" ref={this.form} onSubmit={(e)=>{this.sendOrder(e)}}>
                                <div className="zakaz-block-line"/>
                                <div className="zakaz-block-info d-flex flex-column">
                                    <div className="zakaz-lvl d-flex align-items-center">
                                        <div>1</div>
                                        <span>Данные покупателя</span>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="d-flex">
                                            <input name="name" placeholder="Имя" type="text" required/>
                                            <InputMask mask="+7 999 999-99-99" name="phone" size="16" placeholder="Телефон"
                                                       required/>
                                            <input name="email" placeholder="email (необязательно)" type="text" inputMode="text"/>
                                        </div>
                                        <input name="comment" id="comment" placeholder="Комментарий к заказу" type="text" inputMode="text"/>
                                    </div>
                                </div>
                                <div className="zakaz-block-get d-flex flex-column">
                                    <div className="zakaz-lvl d-flex align-items-center">
                                        <div>2</div>
                                        <span>Выберите способ получения</span>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="zakaz-block-plate">Самовывоз</div>
                                        <Accordion className='zakaz-block-shops'>
                                            <Accordion.Item eventKey='0'>
                                                <Accordion.Header ref={this.pvzs}>
                                                    <p>Выберите магазин</p>
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    {
                                                        this.props.contacts.map((contact, i) =>{
                                                            return (
                                                                <div key={i}>
                                                                    <input type="radio" name='shop_id' id={`${i}`}
                                                                           value={contact.address}
                                                                           hidden/>
                                                                    <label className="d-flex flex-column" htmlFor={`${i}`} onClick={()=> this.pvzs.current.style.border = null}>
                                                                        <p>{contact.address}</p>
                                                                        <span>Ежедневно с 10:00 до 22:00</span>
                                                                    </label>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                </div>
                                <div className="zakaz-block-pay d-flex flex-column">
                                    <div className="zakaz-lvl d-flex align-items-center">
                                        <div>3</div>
                                        <span>Выберите способ оплаты</span>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="zakaz-block-plate">При получении</div>
                                        <p>В магазине можно оплатить наличными, картой или в кредит</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <button className="btn zakaz-btn">Подтвердить заказ</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                );
            }else{
                return <Navigate replace to="/cart"/>
            }
        }
    }
}

const OrderTo = connect(
    state => ({
        cart: state.cart,
        contacts: state.contacts
    }),
    dispatch => ({
    })
)(Order);

export default OrderTo;