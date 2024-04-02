import React, { Component } from 'react';
import { connect } from "react-redux";
import {query} from "../../../async/async";
import Product from "./Product/Product";
import {Link, useParams} from "react-router-dom";
import {CheckBoxes, RangeInput} from "../../../Components/catalog/Category/Filters";
import Breadcrumbs from "../../../Components/Breadcrumbs/Breadcrumbs";
import {SkeletonBrick} from "@consta/uikit/Skeleton";
import {Select} from "@consta/uikit/Select";

class CategoryPage extends Component {
    constructor(props) {
        super(props);
        this.state={error: false, filters:false, isLoadedCats: false, isLoadedProds: false, currCat:false, products:false, sortValue: {label: 'По популярности', id: 3,}, checkFilters: {}, priceFilter:false, pagination: false, links: false};

        this.getWithFilters=this.getWithFilters.bind(this);
        this.getChildCategories=this.getChildCategories.bind(this);
        this.getFilters=this.getFilters.bind(this);

        this.toggleFilterNav=this.toggleFilterNav.bind(this);
        this.setFilters=this.setFilters.bind(this);

        this.load = this.load.bind(this);
        this.creditBuy = this.creditBuy.bind(this);
    }

    getFilters(){
        this.setState({error: false, filters: false})
        let pr = new FormData();
        let url = this.props.params['*'].split('/');
        query(`/api/categoryFilter/${url[url.length-1]}`, pr).then(response=>response.json())
            .then(res=>{
                if(res.status == 'ok'){
                    this.setState({error:false, filters: res.data});
                }else{
                    this.setState({error:true, filters: false});
                }
            })
    }

    toggleFilterNav(val){
        this.setState({isFilterOpen: val})
    }

    setFilters(filterType, value, dir, alias){
        if(dir){
            switch (filterType) {
                case 'check': {
                    let newCheckFilters = Object.assign({}, this.state.checkFilters);
                    newCheckFilters[alias] = [...value];
                    this.setState({checkFilters: newCheckFilters});
                }break;
                case 'price': {
                    let newPriceFilter = [...value];
                    this.setState({priceFilter: newPriceFilter});
                }break;
            }
        }else{
            switch (filterType) {
                case 'check': {
                    let newCheckFilters = Object.assign({}, this.state.checkFilters);
                    delete(newCheckFilters[alias]);
                    this.setState({checkFilters: newCheckFilters});
                }break;
                case 'price': {
                    this.setState({priceFilter: false});
                }break;
            }
        }
    }

    changeSort(value){
        this.setState({sortValue: value}, ()=>{
            this.getWithFilters();
        })
    }

    getWithFilters(toUrl = '', loadMore = false){
        if(loadMore){
            this.setState({error: false, pagination: false, links: false})
        }else{
            window.scrollTo(0, 0);
            this.setState({error: false, isLoadedProds: false, products: false, pagination: false, links: false})
        }
        let pr = new FormData();
        if(this.state.checkFilters){
            let filters = [];
            for (const [key, value] of Object.entries(this.state.checkFilters)) {
                if(value?.length){
                    filters.push(value);
                }
            }
            if(filters.length){
                pr.append('filter', JSON.stringify(filters));
            }
        }
        if(this.state.sortValue){
            switch (this.state.sortValue.id) {
                case 1:{
                    pr.append('sort', JSON.stringify({type:'price', dir: 1}))
                }break;
                case 2:{
                    pr.append('sort', JSON.stringify({type:'price', dir: 0}))
                }break;
                case 3:{
                    pr.append('sort', JSON.stringify({type:'sort', dir: 0}))
                }break;
            }
        }
        if(this.state.priceFilter?.length){
            pr.append('price', JSON.stringify(this.state.priceFilter));
        }
        let url = this.props.params['*'].split('/');
        query(toUrl ? toUrl : `/api/productsFilter/${url[url.length-1]}`, pr).then(response=>response.json())
            .then(res=>{
                if(res?.data){
                    if(loadMore){
                        this.setState({error:false, products: [...this.state.products, ...res.data], pagination: res?.meta, links: res?.links});
                    }else{
                        window.scrollTo(0, 0);
                        this.setState({error:false, isLoadedProds: true, products: res.data, pagination: res?.meta, links: res?.links});
                    }
                }else{
                    this.setState({error:true, isLoadedProds: true, products: false, pagination: false, links: false});
                }
            })
    }

    getChildCategories(){
        this.setState({error: false, isLoadedCats: false, categories: false, currCat:false})
        let pc = new FormData();
        let url = this.props.params['*'].split('/');
        query(`/api/category/${url[url.length-1]}`, pc).then(response=>response.json())
            .then(res=>{
                if(res.status == 'ok'){
                    this.setState({error:false, isLoadedCats: true, currCat: res.data}, ()=>{
                        document.title = `${this.state?.currCat?.label ? `${this.state.currCat.label}` : 'Каталог'} | DEVICE`
                    });
                }else{
                    this.setState({error:true, isLoadedCats: true, currCat: false}, ()=>{
                        document.title = 'Каталог | DEVICE';
                    });
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

    creditBuy(product){
        let accessID = '251223';
        let tradeID = '200911';
        let productsList = [];
        productsList[0] = { id: product.alias, name: product.label, category: '', price: Number(product.price).toFixed(2), count: 1, liquidityRatio: null};

        window.poscreditServices('creditProcess', accessID, { order: '1', products: productsList, phone: '', tradeID: tradeID}, function(result){
            if(result.success === false){
                alert('Произошла ошибка при попытке оформить кредит. Попробуйте позднее...');
            }
        });
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = 'Каталог | DEVICE';

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
        this.getWithFilters();
        this.getChildCategories();
        this.getFilters();
    }

    componentDidUpdate(prevProps) {
        if (this.props.params['*']!==prevProps.params['*']) {
            this.getWithFilters();
            this.getChildCategories();
            this.getFilters();
            window.scrollTo(0, 0);
        }
    }

    render() {
        if(!this.state.error) {
            return (
                <>
                    <div className={`filter-nav ${this.state.isFilterOpen ? 'active' : false}`}>
                        <div className="filter-nav-block d-flex flex-column">
                            <div className="container d-flex align-items-center justify-content-between">
                                <h3>Фильтры</h3>
                                <div className="close" onClick={()=>{this.toggleFilterNav(false)}}/>
                            </div>
                            <div className="filter container d-flex flex-column">
                                {
                                    this.state.filters
                                        ? this.state.filters.map(filter=>{
                                            switch (filter.type){
                                                case 'check':{
                                                    return(<CheckBoxes filter={filter} setFilters={this.setFilters} values={this.state.checkFilters}/>)
                                                }
                                                case 'range':{
                                                    return(<RangeInput filter={filter} setFilters={this.setFilters} values={this.state.priceFilter}/>)
                                                }
                                            }
                                        })
                                        : <SkeletonBrick height={500}/>
                                }
                                <div className="control d-flex flex-column align-items-center">
                                    <div className="btn filter-submit" onClick={()=>{this.toggleFilterNav(false);this.getWithFilters()}}>Применить</div>
                                    <div className="clearAll" onClick={()=>{this.setState({checkFilters: {}, priceFilter:false})}}>Сбросить все</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.isLoadedCats
                            ? <div className="category-head">
                                <Breadcrumbs url={window.location.pathname.slice(1)} type='breadcrumbs/category/'/>
                                <div className="container">
                                    <div className="category d-flex justify-content-between align-items-center">
                                        <h2 className="category-name text-start">{this.state.currCat.label}</h2>
                                    </div>
                                </div>
                            </div>
                            : <div className="container">
                                <div className="category-head">
                                    <SkeletonBrick height={60}/>
                                </div>
                            </div>
                    }
                    {
                        this.state.isLoadedProds
                            ? <section className="products">
                                <div className="prod d-flex justify-content-between">
                                    <div className="prod-category flex-grow-1 w-100">
                                        <div className="inner-sorter d-flex justify-content-between container">
                                            <div>
                                                <div className="filter_btn d-flex align-items-center" onClick={() => {
                                                    this.toggleFilterNav(true)
                                                }}>
                                                    <img src="/media/i/filter.svg"/>
                                                    <p>Фильтр</p>
                                                </div>
                                            </div>
                                            <div className='flex-grow-1 d-flex align-items-center' style={{maxWidth: 200}}>
                                                <Select view='clear'
                                                        size='s'
                                                        value={this.state.sortValue}
                                                        onChange={({value}) => {
                                                            this.changeSort(value)
                                                        }}
                                                        items={[
                                                            {
                                                                label: 'По популярности',
                                                                id: 3,
                                                            },
                                                            {
                                                                label: 'По цене ↓',
                                                                id: 1,
                                                            },
                                                            {
                                                                label: 'По цене ↑',
                                                                id: 2,
                                                            },
                                                        ]}/>
                                            </div>
                                        </div>
                                        {
                                            this.state.isLoadedCats
                                                ? this.state.currCat?.categories?.length
                                                ? <div className="prod-cats d-flex align-items-center">
                                                    {this.state.currCat.categories.map(category => {
                                                        return (
                                                            <Link to={`${window.location.pathname}/${category.alias}`}>
                                                                <div className="d-flex align-items-center h-100">
                                                                    <img src={`/${category.photo}`}/>
                                                                    <p>{category.label}</p>
                                                                </div>
                                                            </Link>
                                                        )
                                                    })}
                                                </div>
                                                : false
                                                : <div className="prod-cats">
                                                    <SkeletonBrick height={60}/>
                                                    <SkeletonBrick height={60}/>
                                                    <SkeletonBrick height={60}/>
                                                    <SkeletonBrick height={60}/>
                                                </div>
                                        }
                                        {
                                            this.state.products?.length
                                                ? <div className="prod-category--grid container">
                                                    {this.state.products.map(product => {
                                                        return (
                                                            <Product product={product} posCreditIsInit={this.state.posCreditIsInit} creditBuy={this.creditBuy}/>
                                                        )
                                                    })}
                                                </div>
                                                : false
                                        }

                                        {
                                            this.state.pagination?.links?.length > 3
                                                ? <>
                                                    {
                                                        this.state.links?.next
                                                            ? <div className="all_btn container">
                                                                <div className="btn-w d-flex justify-content-center"
                                                                     onClick={() => {
                                                                         this.getWithFilters(this.state.links.next, true)
                                                                     }}>Показать еще
                                                                </div>
                                                            </div>
                                                            : false
                                                    }
                                                    <div className="prod-category-pagination d-flex justify-content-center align-items-center container">
                                                        {
                                                            this.state.pagination.links.map(page => {
                                                                if (page.url) {
                                                                    if (page.label.includes('Previous')) {
                                                                        return <div className='prev' onClick={() => {
                                                                            this.getWithFilters(page.url)
                                                                        }}>
                                                                            <img src="/assets/img/pagination_prev.svg"/>
                                                                        </div>
                                                                    } else if (page.label.includes('Next')) {
                                                                        return <div className='next' onClick={() => {
                                                                            this.getWithFilters(page.url)
                                                                        }}>
                                                                            <img src="/assets/img/pagination_next.svg"/>
                                                                        </div>
                                                                    } else {
                                                                        return <div
                                                                            className={`num ${page.label == this.state.pagination.current_page ? 'active' : ''}`}
                                                                            onClick={() => {
                                                                                this.getWithFilters(page.url)
                                                                            }}>{page.label}</div>
                                                                    }
                                                                } else {
                                                                    return false;
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                </>
                                                : false
                                        }
                                    </div>
                                </div>
                            </section>
                            : <section className="products">
                                <div className="prod d-flex justify-content-between container">
                                    <div className="prod-category flex-grow-1">
                                        <div className="inner-sorter d-flex justify-content-end">
                                            <SkeletonBrick height={20}/>
                                        </div>
                                        <div className="prod-cats">
                                            <SkeletonBrick height={60}/>
                                            <SkeletonBrick height={60}/>
                                            <SkeletonBrick height={60}/>
                                            <SkeletonBrick height={60}/>
                                            <SkeletonBrick height={60}/>
                                        </div>
                                        <div className="prod-category--grid">
                                            <SkeletonBrick height={400}/>
                                            <SkeletonBrick height={400}/>
                                            <SkeletonBrick height={400}/>
                                            <SkeletonBrick height={400}/>
                                            <SkeletonBrick height={400}/>
                                            <SkeletonBrick height={400}/>
                                            <SkeletonBrick height={400}/>
                                            <SkeletonBrick height={400}/>
                                            <SkeletonBrick height={400}/>
                                        </div>
                                        <SkeletonBrick height={40}/>
                                    </div>
                                </div>
                            </section>
                    }
                </>
            )
        }else{
            return <>Произошла ошибка</>
        }
    }
}

const CategoryPageTo = connect(
    state => ({
    }),
    dispatch => ({
    })
)(CategoryPage);

function withRouter(Component) {
    return props => <Component {...props} params={useParams()}/>
}

const ProductsToWrapped = withRouter(CategoryPageTo);
export default ProductsToWrapped;
