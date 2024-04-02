import React, { Component } from 'react';
import {connect} from "react-redux";
import {changeCart} from "../../../../store/actions/cart/cart";

class Product extends Component {
    constructor(props) {
        super(props);
        this.toCart=this.toCart.bind(this);
    }

    toCart(direction){
        let prod = Object.assign({}, this.props.data);
        let newVar = Object.assign({}, prod.vars[0]);
        delete prod.vars;
        delete prod.modifs;
        prod.var= Object.assign({}, newVar);
        prod.modifs=[];
        this.props.changeCart(prod, direction);
    }

    render() {
        return (
            // <div className={this.props.isVisible ? "product d-flex flex-column" : "product d-flex flex-column d-none"}>
            <div className="product d-flex flex-column">
                {
                    this.props.data.stickers.length
                        ? <div className='product-stickers'>{this.props.data.stickers.map(sticker=>{return <div style={{color: sticker.textColor ?? '', backgroundColor: sticker.backColor ?? ''}}>{sticker.image ? <img src={sticker.image}/>: sticker.text}</div>})}</div>
                    : false
                }
                <div className="product-img d-flex align-items-center justify-content-center">
                    <img className="w-100" src={this.props.data.photo} onClick={()=>this.props.modal(this.props.data, true)}/>
                </div>
                <div className="product-info flex-grow-1 d-flex flex-column align-items-start justify-content-between">
                    <h3 className='text-start' onClick={()=>this.props.modal(this.props.data, true)}>{this.props.data.name}</h3>
                    <p onClick={()=>this.props.modal(this.props.data, true)}>{this.props.data.description}</p>
                    <div className="w-100 d-flex align-items-center justify-content-between">
                        {/*<p className="product-oldPrice">{this.props.data.vars[0].varOldPrice} ₽</p>*/}
                        <p className="product-oldPrice"></p>
                        <div className="btn d-flex align-items-center" onClick={()=>{this.props.data.vars.length === 1 ? this.toCart('plus') : this.props.modal(this.props.data, true)}}>
                            <img src="/media/shopbagg.svg"/> {this.props.data.vars.length > 1 ? `от ` : ``}{this.props.data.vars[0].varPrice} ₽
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const   ProductConst = connect(
    state => ({

    }),
    dispatch => ({
        changeCart: (prod, dir) => dispatch(changeCart(prod, dir)),
    })
)(Product);

export default ProductConst;