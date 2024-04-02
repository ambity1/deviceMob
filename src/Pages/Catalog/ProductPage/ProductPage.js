import React, { Component } from 'react';
import { connect } from "react-redux";
import {query} from "../../../async/async";
import {Link, useParams} from "react-router-dom";
import Breadcrumbs from "../../../Components/Breadcrumbs/Breadcrumbs";
import {Tab, Tabs} from "react-bootstrap";
import ProductSlider from "../CategoryPage/Product/ProductSlider";
import {SkeletonBrick, SkeletonText} from "@consta/uikit/Skeleton";
import {changeCart} from "../../../store/actions/cart/cart";
import {askQuestionModalOpen} from "../../../store/actions/modals/askQuestionModalOpen";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state={error: false, isLoaded: false, product:false, properties:false, availability:false, union:false};
        this.getProduct=this.getProduct.bind(this);
        this.load=this.load.bind(this);
        this.posCreditRun=this.posCreditRun.bind(this);
    }

    getProduct(){
        this.setState({error: false, isLoaded: false, product:false, properties:false, availability:false, union:false});
        let pr = new FormData();
        query(`/api/product/${this.props.params.alias}`, pr).then(response=>response.json())
            .then(res=>{
                if(res){
                    this.setState({error:false, isLoaded: true, product: res.data, properties: res?.properties, availability: res?.availability, union: res?.union});
                }else{
                    this.setState({error:true, isLoaded: true, product: false, properties: false, availability:false, union:false});
                }
            })
    }

    load(url) {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script')
            script.type = 'text/javascript';
            script.async = true;
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        })
    }

    posCreditRun(){
        let accessID = '251200';
        let tradeID = '200911';
        let productsList = [];
        productsList[0] = { id: this.state.product.alias, name: this.state.product.label, category: '', price: Number(this.state.product.price).toFixed(2), count: 1, liquidityRatio: null};

        window.poscreditServices('creditProcess', accessID, { order: '1', products: productsList, phone: '', tradeID: tradeID}, function(result){
            if(result.success === false){
                alert('Произошла ошибка при попытке оформить кредит. Попробуйте позднее...');
            }
        });
    }

    componentDidMount() {
        window.scrollTo(0,0);
        if(window?.poscreditServices){
            this.setState({posCreditIsInit: true})
        }else{
            this.load('//api.b2pos.ru/shop/v2/connect.js')
                .then(() => {
                    this.setState({posCreditIsInit: true})
                })
                .catch((err) => {
                    this.setState({posCreditIsInit: false})
                })
        }
    }

    componentWillMount() {
        this.getProduct();
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.alias!==prevProps.params.alias) {
            window.scrollTo(0,0);
            this.getProduct();
            if(window?.poscreditServices){
                this.setState({posCreditIsInit: true})
            }else{
                this.load('//api.b2pos.ru/shop/v2/connect.js')
                    .then(() => {
                        this.setState({posCreditIsInit: true})
                    })
                    .catch((err) => {
                        this.setState({posCreditIsInit: false})
                    })
            }
        }
    }

    render() {
        if(!this.state.error) {
            if (this.state.isLoaded) {
                let inCart = this.props.cart.findIndex(item=>item.alias === this.state.product.alias);
                return (
                    <>
                        <Breadcrumbs url={window.location.pathname.slice(1)} type='breadcrumbs/product/'/>
                        <div className="container">
                            <div className="product">
                                <h1 className='d-block d-xl-none product-name'>{this.state.product.label}</h1>
                                <div className="product-content d-flex flex-column flex-xl-row justify-content-between">
                                    <div className="d-flex flex-column productPhoto-container">
                                        <ProductSlider photos={this.state.product.image}/>
                                    </div>
                                    <div className="product-content--info d-flex flex-column">
                                        <h1 className='d-none d-xl-block'>{this.state.product.label}</h1>
                                        {this.state.product?.stickers?.length
                                            ? <div className="btns d-flex">
                                                {
                                                    this.state.product.stickers.map(sticker=>{
                                                        return <a className="sticker" style={sticker.type ? {borderColor: sticker.color, backgroundColor: sticker.color, color: '#fff'} : {borderColor: sticker.color, backgroundColor:'transparent', color: sticker.color}}>{sticker.label}</a>
                                                    })
                                                }
                                            </div>
                                            : false
                                        }
                                        {
                                            this.state.product?.price != 0
                                                ? <div className="prices d-flex align-items-center">
                                                    <span className="prod-price">{this.state.product.price} ₽</span>
                                                    {
                                                        this.state.product?.old_price
                                                            ? <span className="prod-Oldprice">
                                                                {this.state.product.old_price} ₽
                                                            </span>
                                                            : false
                                                    }
                                                </div>
                                                : <></>
                                        }

                                        <div className="cart d-flex align-items-center">
                                            {
                                                this.state.product?.price != 0
                                                    ? <div className='d-flex flex-column flex-lg-row' style={{gap: 15}}>
                                                        { inCart !== -1
                                                            ? <div className="quantityBlock d-flex align-items-center">
                                                                <div className="minus" onClick={() => {
                                                                    this.props.changeCart(this.state.product, 'remove')
                                                                }}/>
                                                                <span
                                                                    className="count">{this.props.cart[inCart].quantity}</span>
                                                                <div className="plus" onClick={() => {
                                                                    this.props.changeCart(this.state.product, 'add')
                                                                }}/>
                                                            </div>
                                                            : <div className="btn" onClick={() => {this.props.changeCart(this.state.product, 'add')}}>Добавить в корзину</div>
                                                        }
                                                        {
                                                            this.state.posCreditIsInit && (this.state.product.price >= 3000 && this.state.product.price <= 300000)
                                                                ? <div className='btn btn-w' onClick={()=>{this.posCreditRun()}}>Купить в кредит</div>
                                                                : <></>
                                                        }
                                                    </div>
                                                    : <div className="btn" onClick={()=>this.props.askQuestionModalOpen(true)}>Узнать стоимость</div>
                                            }
                                        </div>
                                        {
                                            this.state.union?.length && this.state.union?.[0]?.data?.length
                                                ? this.state.union.map(union=>{
                                                    return <div>
                                                        <p>{union.property}</p>
                                                        <div className="union d-flex">
                                                            {
                                                                union.data.map(item=>{
                                                                    return item.select
                                                                        ? <div className='active'>{item.value}</div>
                                                                        : <Link to={`/product/${item.alias}`}><div>{item.value}</div></Link>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                })
                                                : false
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='product-tabs'>
                            <Tabs defaultActiveKey="opisaniye" transition={false}>
                                <Tab eventKey="opisaniye" title="Описание">
                                    <div className='container'>
                                        <h4>Описание</h4>
                                        <p>{this.state.product.description}</p>
                                    </div>
                                </Tab>
                                <Tab eventKey="tehhar" title="Технические характеристики">
                                    <div className='container'>
                                        <h4>Технические характеристики</h4>
                                        {
                                            this.state.properties?.length
                                                ? <div className="tabl d-flex flex-column flex-md-row flex-wrap justify-content-md-between justify-content-start">
                                                    {this.state.properties.map(mainProperty => {
                                                        return (
                                                            mainProperty?.properties?.length
                                                                ? <div className="d-flex flex-column">
                                                                    <h5>{mainProperty.label}</h5>
                                                                    {
                                                                        mainProperty.properties.map(childProperty => {
                                                                            return (
                                                                                <div className="d-flex justify-content-between">
                                                                                    <p>{childProperty.property}</p>
                                                                                    <span>{childProperty.value}</span>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                                : false
                                                        )
                                                    })}
                                                </div>
                                                : false
                                        }
                                    </div>
                                </Tab>
                                <Tab eventKey="nalichie" title="Наличие">
                                    <div className='container'>
                                        <h4>Наличие</h4>
                                        <div className="tabl d-flex flex-column flex-md-row flex-wrap justify-content-md-between justify-content-start">
                                            <div>
                                                {
                                                    this.state.availability?.length
                                                        ? this.state.availability.map(item=>{
                                                            return<div className="d-flex justify-content-between">
                                                                <p>{item.label}</p>
                                                                <span>{item.value}</span>
                                                            </div>
                                                        })
                                                        : <>
                                                            <div className="d-flex justify-content-between">
                                                                <p>ул. Первомайская, 30</p>
                                                                <span>В наличии</span>
                                                            </div>
                                                            <div className="d-flex justify-content-between">
                                                                <p>ул. 50-летия Октября, 3</p>
                                                                <span>В наличии</span>
                                                            </div>
                                                            <div className="d-flex justify-content-between">
                                                                <p>ул. Чернышевского, 84</p>
                                                                <span>В наличии</span>
                                                            </div>
                                                            <div className="d-flex justify-content-between">
                                                                <p>ул. Проспект Октября, 13</p>
                                                                <span>В наличии</span>
                                                            </div>
                                                            <div className="d-flex justify-content-between">
                                                                <p>ул. Айская, 75</p>
                                                                <span>В наличии</span>
                                                            </div>
                                                            <div className="d-flex justify-content-between">
                                                                <p>ул. 50-летия Октября, 7</p>
                                                                <span>В наличии</span>
                                                            </div>
                                                            <div className="d-flex justify-content-between">
                                                                <p>ул. Дагестанская, 15/1</p>
                                                                <span>В наличии</span>
                                                            </div>
                                                        </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </>
                )
            } else {
                return (
                    <>
                        <SkeletonText rows={1}/>
                        <div className="container">
                            <div className="product">
                                <h1 className='d-block d-xl-none product-name'>{this.state.product.label}</h1>
                                <div className="product-content d-flex flex-column flex-xl-row justify-content-between">
                                    <div className="d-flex flex-column productPhoto-container">
                                        <SkeletonBrick height={500}/>
                                        <div className='d-flex align-items-center'>
                                            <SkeletonBrick height={80}/>
                                            <SkeletonBrick height={80}/>
                                        </div>
                                    </div>
                                    <div className="product-content--info d-flex flex-column">
                                        <SkeletonText rows={1}/>
                                        <div className="btns d-flex">
                                            <SkeletonBrick height={35}/>
                                            <SkeletonBrick height={35}/>
                                        </div>
                                        <div>
                                            <SkeletonText rows={1}/>
                                            <div className="color d-flex">
                                                <SkeletonBrick height={60}/>
                                                <SkeletonBrick height={60}/>
                                                <SkeletonBrick height={60}/>
                                                <SkeletonBrick height={60}/>
                                            </div>
                                        </div>
                                        <div>
                                            <SkeletonText rows={1}/>
                                            <div className="color d-flex">
                                                <SkeletonBrick height={60}/>
                                                <SkeletonBrick height={60}/>
                                                <SkeletonBrick height={60}/>
                                                <SkeletonBrick height={60}/>
                                            </div>
                                        </div>
                                        <div>
                                            <SkeletonText rows={1}/>
                                            <div className="color d-flex">
                                                <SkeletonBrick height={60}/>
                                                <SkeletonBrick height={60}/>
                                                <SkeletonBrick height={60}/>
                                                <SkeletonBrick height={60}/>
                                            </div>
                                        </div>
                                        <div className="prices d-flex align-items-center">
                                            <SkeletonText rows={1}/>
                                        </div>
                                        <div className="cart d-flex align-items-center">
                                            <SkeletonBrick height={60}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='container product-tabs'>
                            <SkeletonBrick height={200}/>
                        </div>
                    </>
                )
            }
        }else{
            return <>Произошла ошибка</>
        }
    }
}

const ProductsTo = connect(
    state => ({
        cart: state.cart.cart
    }),
    dispatch => ({
        changeCart: (prod, dir) => dispatch(changeCart(prod, dir)),
        askQuestionModalOpen: (val)=>{dispatch(askQuestionModalOpen(val))}
    })
)(Products);

function withRouter(Component) {
    return props => <Component {...props} params={useParams()}/>
}

const ProductsToWrapped = withRouter(ProductsTo);
export default ProductsToWrapped;
