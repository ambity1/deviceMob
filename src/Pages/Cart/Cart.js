import React, { Component } from 'react';
import {connect} from "react-redux";
import {changeCart} from "../../store/actions/cart/cart";
import AdditionalSlider from "../../Components/sliders/AdditionalSlider";
import {Link} from "react-router-dom";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state={prodsCount: 0, prodsTotal: 0, prodsOldTotal: 0, allTotal: 0, noun: 'товара'};
        this.calculate=this.calculate.bind(this);
        this.getNoun=this.getNoun.bind(this);
    }

    calculate() {
        let prodsCount = this.props.cart.cart.map(item => {
            return -(-item.quantity);
        }).reduce((previousValue, currentValue) => previousValue + currentValue, 0);

        let prodsTotal = this.props.cart.cart.map(item => {
            return -(-item.price) * -(-item.quantity);
        }).reduce((previousValue, currentValue) => previousValue + currentValue, 0)

        this.setState({prodsCount: prodsCount, noun: this.getNoun(prodsCount), allTotal: prodsTotal})
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

    componentWillMount() {
        if(this.props.cart.cart && this.props.cart.cart.length) {
            this.calculate();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.cart.cart !== prevProps.cart.cart) {
            this.calculate();
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = 'Корзина | DEVICE';
    }

    render() {
        if(this.props.cart.cart && this.props.cart.cart.length){
            return (
                <>
                    <div className="cart container">
                        <div className="cartHead d-flex align-items-end">
                            <h2>Корзина</h2>
                            <span>{this.state.prodsCount} {this.getNoun(this.state.prodsCount)}</span>
                        </div>
                        <div className="cartBody d-flex flex-column">
                            <div className="cartBody-table d-flex flex-column">
                                {
                                    this.props.cart.cart.map(prodInCart=> {
                                        return <div className="cartBody-tab d-flex flex-column">
                                            <div
                                                className="cartBody-tab--block d-flex align-items-center justify-content-between">
                                                <img src={prodInCart.image[0]}/>
                                                <p>{prodInCart.label}</p>
                                            </div>
                                            <div className="cartBody-tab--block d-flex align-items-center justify-content-between">
                                                <div className="quantityBlock d-flex align-items-center">
                                                    <div className="minus" onClick={()=>{this.props.changeCart(prodInCart, 'remove')}}/>
                                                    <span className="count">{prodInCart.quantity}</span>
                                                    <div className="plus" onClick={()=>{this.props.changeCart(prodInCart, 'add')}}/>
                                                </div>
                                                <div className="prices d-flex flex-column align-items-center">
                                                    {
                                                        prodInCart.old_price
                                                            ? <span className="slide-oldPrice">{prodInCart.old_price} ₽</span>
                                                            : <span className="slide-oldPrice"/>
                                                    }
                                                    <span className="slide-price">{prodInCart.price} ₽</span>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                            <div className="cartBody-info d-flex flex-column">
                                <div className="cartBody-info--card">
                                    <p>Сумма заказа</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>Итого:</span>
                                        <span>{this.props.cart.old_summ && this.props.cart.summ < this.props.cart.old_summ ? `${this.props.cart.old_summ} ₽` : ''}</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p>{this.state.prodsCount} {this.getNoun(this.state.prodsCount)}</p>
                                        <p>{this.props.cart.summ} ₽</p>
                                    </div>
                                </div>
                                <Link to='order' className="btn">Перейти к оформлению</Link>
                            </div>
                        </div>
                    </div>
                    <AdditionalSlider queryPath='/api/popProds'/>
                </>
            );
        }else{
            return (
                <div className="cart container">
                    Корзина пуста
                </div>
            )
        }
    }
}

const CartConst = connect(
    state => ({
        cart: state.cart,
    }),
    dispatch => ({
        changeCart: (prod, direction) => dispatch(changeCart(prod, direction)),
    })
)(Cart);

export default CartConst;