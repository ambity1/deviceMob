import React, {useEffect, useState} from 'react';
import {query} from "../../async/async";
import {Link, useLocation} from "react-router-dom";
import {CheckBoxes, RangeInput} from "../../Components/catalog/Category/Filters";
import {SkeletonBrick} from "@consta/uikit/Skeleton";
import {Select} from "@consta/uikit/Select";
import Product from "../Catalog/CategoryPage/Product/Product";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";

export default function Search(props) {
    const [error, setError] = useState(false);

    const [isFilterBarOpen, setIsFilterBarOpen] = useState(false);

    const [posCreditIsInit, setPosCreditIsInit] = useState(false);

    const [currCat, setCurrCat] = useState(false);

    const [products, setProducts] = useState(false);
    const [isLoadedProds, setIsLoadedProds] = useState(false);

    const [isLoadedCats, setIsLoadedCats] = useState(false);

    const [sortValue, setSortValue] = useState({label: 'По популярности', id: 3});

    const [checkFilters, setCheckFilters] = useState({});
    const [priceFilter, setPriceFilter] = useState(false);
    const [filters, setFilters] = useState('loading');

    const [pagination, setPagination] = useState(false);
    const [links, setLinks] = useState(false);

    const locationParams = useLocation();

    const setToFilters = (filterType, value, dir, alias) => {
        if(dir){
            switch (filterType) {
                case 'check': {
                    let newCheckFilters = Object.assign({}, checkFilters);
                    newCheckFilters[alias] = [...value];
                    setCheckFilters(newCheckFilters);
                }break;
                case 'price': {
                    let newPriceFilter = [...value];
                    setPriceFilter(newPriceFilter);
                }break;
            }
        }else{
            switch (filterType) {
                case 'check': {
                    let newCheckFilters = Object.assign({}, checkFilters);
                    delete(newCheckFilters[alias]);
                    setCheckFilters(newCheckFilters);
                }break;
                case 'price': {
                    setPriceFilter(false);
                }break;
            }
        }
    }

    const setFilterBarOpen = (val) => {
        document.body.style.overflow = val ? 'hidden' : null;
        setIsFilterBarOpen(val);
    }

    const getFilters = () => {
        setError(false);
        setFilters('loading');
        let pr = new FormData();
        pr.append('word', locationParams.state.word);
        query('/api/search/filters', pr).then(response=>response.json())
            .then(res=>{
                if(res.status === 'ok'){
                    setError(false);
                    setFilters(res.data);
                }else{
                    setError(true);
                    setFilters(false);
                }
            })
    }

    const getWithFilters = (toUrl = '', loadMore = false) => {
        if(loadMore){
            setError(false);
            setPagination(false);
            setLinks(false);
        }else{
            window.scrollTo(0, 0);
            setError(false);
            setIsLoadedProds(false);
            setProducts(false);
            setPagination(false);
            setLinks(false);
        }
        let pr = new FormData();
        if(checkFilters){
            let filters = [];
            for (const [key, value] of Object.entries(checkFilters)) {
                if(value?.length){
                    filters.push(value);
                }
            }
            if(filters.length){
                pr.append('filter', JSON.stringify(filters));
            }
        }
        if(sortValue){
            switch (sortValue.id) {
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
        if(priceFilter?.length){
            pr.append('price', JSON.stringify(priceFilter));
        }
        pr.append('page_size', 21);
        pr.append('word', locationParams.state.word);
        query(toUrl ? toUrl : '/api/search/products', pr).then(response=>response.json())
            .then(res=>{
                if(res?.data){
                    if(loadMore){
                        setError(false);
                        setProducts([...products, ...res.data]);
                        setPagination(res?.meta);
                        setLinks(res?.links);
                    }else{
                        console.log()
                        window.scrollTo(0, 0);
                        setError(false);
                        setIsLoadedProds(true);
                        setProducts(res.data);
                        setPagination(res?.meta);
                        setLinks(res?.links);
                    }
                }else{
                    setError(true);
                    setIsLoadedProds(true);
                    setProducts(false);
                    setPagination(false);
                    setLinks(false);
                }
            })
    }

    const getChildCategories = () => {
        setError(false);
        setIsLoadedCats(false);
        setCurrCat(false);
        let pc = new FormData();
        pc.append('word', locationParams.state.word)
        query('/api/search/categories', pc).then(response=>response.json())
            .then(res=>{
                if(res?.data){
                    setError(false);
                    setIsLoadedCats(true);
                    setCurrCat(res.data);
                }else{
                    setError(true);
                    setIsLoadedCats(true);
                    setCurrCat(false);
                }
            })
    }

    const load = (url) => {
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

    const creditBuy = (product) => {
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

    useEffect(()=>{
        document.title = 'Каталог | DEVICE';

        if(window?.poscreditServices){
            setPosCreditIsInit(true);
        }else{
            load('//api.b2pos.ru/shop/v2/connect.js')
                .then(() => {
                    setPosCreditIsInit(true);
                })
                .catch((err) => {
                    setPosCreditIsInit(false);
                })
        }
    }, [])

    useEffect(()=>{
        window.scrollTo(0, 0);
        getChildCategories();
        getFilters();
    }, [locationParams.state.word])

    useEffect(()=>{
        getWithFilters();
    }, [sortValue, locationParams.state.word]);

    if(!error) {
        return (
            <>
                <div className={`filter-nav ${isFilterBarOpen ? 'active' : false}`}>
                    <div className="filter-nav-block d-flex flex-column">
                        <div className="container d-flex align-items-center justify-content-between">
                            <h3>Фильтры</h3>
                            <div className="close" onClick={() => {
                                setFilterBarOpen(false)
                            }}/>
                        </div>
                        {
                            filters !== 'loading'
                                ? filters?.length
                                ? <div className="filter container d-flex flex-column">
                                    {
                                        filters.map(filter => {
                                            switch (filter.type) {
                                                case 'check': {
                                                    return (<CheckBoxes filter={filter} setFilters={setToFilters}
                                                                        values={checkFilters}/>)
                                                }
                                                case 'range': {
                                                    return (<RangeInput filter={filter} setFilters={setToFilters}
                                                                        values={priceFilter}/>)
                                                }
                                            }
                                        })
                                    }
                                    <div className="control d-flex flex-column align-items-center">
                                        <div className="btn filter-submit" onClick={() => {
                                            getWithFilters()
                                        }}>Применить
                                        </div>
                                        <div className="clearAll" onClick={() => {
                                            setCheckFilters({});
                                            setPriceFilter(false)
                                        }}>Сбросить все
                                        </div>
                                    </div>
                                </div>
                                : false
                                :
                                <div className="filter container d-flex flex-column"><SkeletonBrick height={500}/></div>
                        }
                    </div>
                </div>
                <div className="category-head">
                    <div className="container">
                        <div className="category d-flex justify-content-between align-items-center">
                            <h2 className="category-name--search text-start">Результаты поиска по запросу «{locationParams.state.word}»</h2>
                        </div>
                    </div>
                </div>
                {
                    isLoadedProds
                        ? <section className="products">
                            <div className="prod d-flex justify-content-between">
                                <div className="prod-category flex-grow-1 w-100">
                                    <div className="inner-sorter d-flex justify-content-between container">
                                        <div>
                                            <div className="filter_btn d-flex align-items-center" onClick={() => {
                                                setFilterBarOpen(true)
                                            }}>
                                                <img src="/media/i/filter.svg"/>
                                                <p>Фильтр</p>
                                            </div>
                                        </div>
                                        <div className='flex-grow-1 d-flex align-items-center' style={{maxWidth: 200}}>
                                            <Select view='clear'
                                                    size='s'
                                                    value={sortValue}
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
                                        isLoadedCats
                                            ? currCat?.length
                                            ? <div className="prod-cats d-flex align-items-center">
                                                {currCat.map(category => {
                                                    return (
                                                        <Link to={`/catalog/${category.alias}`}>
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
                                            </div>
                                    }
                                    {
                                        products?.length
                                            ? <div className="prod-category--grid container">
                                                {products.map(product => {
                                                    return (
                                                        <Product product={product} posCreditIsInit={posCreditIsInit}
                                                                 creditBuy={creditBuy}/>
                                                    )
                                                })}
                                            </div>
                                            : false
                                    }
                                    {
                                        pagination?.links?.length > 3
                                            ? <>
                                                {
                                                    links?.next
                                                        ? <div className="all_btn">
                                                            <div className="btn-w d-flex justify-content-center"
                                                                 onClick={() => {
                                                                     getWithFilters(links.next, true)
                                                                 }}>Показать еще
                                                            </div>
                                                        </div>
                                                        : false
                                                }
                                                <div
                                                    className="prod-category-pagination d-flex justify-content-center align-items-center">
                                                    {
                                                        pagination.links.map(page => {
                                                            if (page.url) {
                                                                if (page.label.includes('Previous')) {
                                                                    return <div className='prev' onClick={() => {
                                                                        getWithFilters(page.url)
                                                                    }}>
                                                                        <img src="/assets/img/pagination_prev.svg"/>
                                                                    </div>
                                                                } else if (page.label.includes('Next')) {
                                                                    return <div className='next' onClick={() => {
                                                                        getWithFilters(page.url)
                                                                    }}>
                                                                        <img src="/assets/img/pagination_next.svg"/>
                                                                    </div>
                                                                } else {
                                                                    return <div
                                                                        className={`num ${page.label == pagination.current_page ? 'active' : ''}`}
                                                                        onClick={() => {
                                                                            getWithFilters(page.url)
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