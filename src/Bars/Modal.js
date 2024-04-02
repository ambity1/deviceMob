import React, { Component } from 'react';
import {connect} from "react-redux";
// import {changeCart} from "../store/actions/cart/cart";

// import {query} from "../async/async";

class Modal extends Component {
    constructor(props) {
        super(props);
        this.prodModal=React.createRef();
        this.state={currVar:false, modifs: []}
        this.toCart=this.toCart.bind(this);
        this.changeModifs=this.changeModifs.bind(this);
    }

    toCart(direction){
        let prod = Object.assign({}, this.props.el.prod);
        delete prod.vars;
        delete prod.modifs;
        prod.var= Object.assign({}, this.state.currVar);
        prod.modifs=[...this.state.modifs];
        this.props.changeCart(prod, direction);
    }

    changeModifs(modif, dir){
        let newModifsArr = [...this.state.modifs];
        if(dir){
            newModifsArr.push(modif);
            this.setState({modifs: newModifsArr})
        }else{
            let modifIndex = newModifsArr.findIndex(item=>item.modifValId === modif.modifValId)
            newModifsArr.splice(modifIndex,1);
            this.setState({modifs: newModifsArr})
        }
    }

    componentWillMount() {
        if(this.props.el.prod){
            this.setState({currVar:this.props.el.prod.vars[0]});
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.el.prod && (this.props.el.prod !== prevProps.el.prod)) {
            this.setState({currVar:this.props.el.prod.vars[0], modifs:[]});
        }
    }

    render() {
        return (
            <div className={`prodModal d-flex align-items-center justify-content-center ${this.props.el.isOpen ? 'active' : ''}`} ref={this.prodModal}>
                <div className="prodModal-hide" onClick={()=>this.props.hide(this.props.el.prod, false)}/>
                <div className="prodModal-content d-flex">
                    {this.props.el.prod
                        ? <>
                            <img src={this.props.el.prod.photo}/>
                            <div className="prodModal-content-Right">
                                <h3>{this.props.el.prod.name}</h3>
                                <p>{this.props.el.prod.description}</p>
                                {this.props.el.prod.vars.length > 1
                                    ? <div>
                                        <p>{this.state.currVar.varDesc}</p>
                                        <div className="vars d-grid">
                                            {this.props.el.prod.vars.map(item=>{
                                                return (
                                                    <div onClick={()=>this.setState({currVar: item})} className={this.state.currVar.varId===item.varId ? 'vars-item active' : 'vars-item'}>{item.varName}</div>
                                                )
                                            })}
                                        </div>
                                        {this.props.el.prod.hasOwnProperty('modifs') && this.props.el.prod.modifs.length
                                            ? <div className="modifs">
                                                <p className="modifs-head">Добавить:</p>
                                                <div className="d-grid">
                                                    {this.props.el.prod.modifs.map(item=>{
                                                        return (
                                                            <div onClick={()=>{this.state.modifs.findIndex(modif=>modif.modifValId === item.modifValId)!==(-1) ? this.changeModifs(item, false) : this.changeModifs(item, true)}} className={this.state.modifs.findIndex(modif=>modif.modifValId === item.modifValId)!==(-1) ? 'modifs-item active' : 'modifs-item'}>
                                                                <p className="modifs-item_name">{item.modifName}</p>
                                                                <p className="modifs-item_price">{item.modifPrice} ₽</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            : <></>
                                        }
                                        <div className="d-flex align-items-center justify-content-between">
                                            <span>{this.state.modifs.map(modifier=>{
                                                return modifier.modifPrice;
                                            }).reduce((previousValue, currentValue) => previousValue + currentValue, 0) + this.state.currVar.varPrice} ₽</span>
                                            <div className="btn" onClick={()=>{this.toCart('plus')}}>В корзину</div>
                                        </div>
                                    </div>

                                    : <div>
                                        <p>{this.state.currVar.varDesc}</p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <span>{this.state.currVar.varPrice} ₽</span>
                                            <div className="btn" onClick={()=>{this.toCart('plus')}}>В корзину</div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </>
                        : <div/>
                    }

                </div>
            </div>
        )
    }
}

const ModalConst = connect(
    state => ({

    }),
    dispatch => ({
        changeCart: (prod, dir) => dispatch(changeCart(prod, dir)),
    })
)(Modal);

export default ModalConst;