import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {changeCart} from "../../../../store/actions/cart/cart";
import {askQuestionModalOpen} from "../../../../store/actions/modals/askQuestionModalOpen";

class Product extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let inCart = this.props.cart.findIndex(item=>item.alias === this.props.product.alias);
        return (
            <div className="prod-category--grid-el d-flex align-items-center">
                <div className='flex-grow-1 d-flex flex-column h-100 justify-content-start'>
                    <Link to={`/product/${this.props.product.alias}`}>
                        <img src={`/${this.props?.product?.image?.[0]}`} className='w-100'/>
                    </Link>
                        <div className="prod-category--grid-el-desc d-flex flex-column flex-grow-1 h-100 justify-content-between" style={{rowGap: 10}}>
                            <Link to={`/product/${this.props.product.alias}`} className='d-flex flex-grow-1'>
                                <p>{this.props.product.label}</p>
                            </Link>
                            <div className="d-flex align-items-center justify-content-between">
                                {
                                    Number(this.props.product?.price) !==0
                                        ? <Link to={`/product/${this.props.product.alias}`} className='d-flex flex-grow-1'>
                                            <div className="prices d-flex flex-column">
                                                <span className="prod-price">{this.props.product.price} ₽</span>
                                                {
                                                    this.props.product?.old_price
                                                        ? <span className="prod-Oldprice">{this.props.product.old_price}</span>
                                                        : false
                                                }
                                            </div>
                                        </Link>
                                        : <></>
                                }

                                {
                                    Number(this.props.product?.price) !==0
                                        ?inCart !==-1
                                            ? <>
                                                <div className="quantityBlock d-flex align-items-center justify-content-end">
                                                    <div className="minus" onClick={()=>{this.props.changeCart(this.props.product, 'remove')}}/>
                                                    <span className="count">{this.props.cart[inCart].quantity}</span>
                                                    <div className="plus" onClick={()=>{this.props.changeCart(this.props.product, 'add')}}/>
                                                </div>
                                            </>
                                            : <div className="slide-btn" onClick={()=>{this.props.changeCart(this.props.product, 'add')}}><img src="/media/i/cart.svg"/></div>
                                        : <div className="btn w-100" onClick={()=>this.props.askQuestionModalOpen(true)}>Узнать стоимость</div>
                                }
                            </div>
                            {
                                this.props.posCreditIsInit && Number(this.props.product?.price) !==0
                                    ? <div className="btn btn-w w-100" onClick={()=>{this.props.creditBuy(this.props.product)}}>Купить в кредит</div>
                                    : false
                            }
                        </div>
                </div>
            </div>
        );
    }
}

const ProductTo = connect(
    state => ({
        cart: state.cart.cart
    }),
    dispatch => ({
        changeCart: (prod, dir) => dispatch(changeCart(prod, dir)),
        askQuestionModalOpen: (val)=>{dispatch(askQuestionModalOpen(val))}
    })
)(Product);

export default ProductTo;