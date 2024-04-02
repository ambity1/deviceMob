import React, { Component } from 'react';
import {Routes ,Route} from "react-router-dom";

import {connect} from "react-redux";
import {getUserInfo} from "../store/actions/auth/auth";

import MainPage from "../pages/MainPage";

import CatalogPage from "../pages/Catalog/CatalogPage";
import CategoryPage from "../Pages/Catalog/CategoryPage/CategoryPage";
import ProductPage from "../Pages/Catalog/ProductPage/ProductPage";

import ServicePage from "../Pages/Service/ServicePage";
import ServiceCategoryPage from "../Pages/Service/CatalogPage/CatalogPage";
import ModelsPage from "../Pages/Service/CatalogPage/ModelsPage/ModelsPage.js";
import ModelPage from "../Pages/Service/CatalogPage/ModelsPage/ProductPage/ProductPage";

import Cart from "../Pages/Cart/Cart";
import Order from "../Pages/Cart/Order/Order";
import OrderSuccess from "../Pages/Cart/Order/OrderSuccess/OrderSuccess";
import Typed from "../Pages/Typed/Typed";
import Contacts from "../Components/Static/Contacts";
import Search from "../Pages/Search/Search";

class Main extends Component {
    componentWillMount() {
        if(window.localStorage.getItem('access_tokens')){
            !this.props.user ? this.props.getUserInfo() : false;
        }
    }

    render() {
        return (
            <Routes>
                <Route path="/">
                    <Route index element={<MainPage/>}/>
                    <Route path="service" element={<ServicePage/>}/>
                    <Route path="service/:category" element={<ServiceCategoryPage/>}/>
                    <Route path="service/:category/:models" element={<ModelsPage/>}/>
                    <Route path="service/:category/:models/:model" element={<ModelPage/>}/>
                    <Route path="catalog" element={<CatalogPage/>}/>
                    <Route path='catalog/*' element={<CategoryPage/>}/>
                    <Route path='product/:alias' element={<ProductPage/>}/>
                    <Route path="cart" element={<Cart/>}/>
                    <Route path="cart/order" element={<Order/>}/>
                    <Route path="cart/order/success" element={<OrderSuccess/>}/>
                    <Route path="contacts" element={<Contacts scrollTop={true}/>}/>
                    <Route path="search" element={<Search/>}/>
                    <Route path="*" element={<Typed/>}/>
                </Route>
            </Routes>
        );
    }
}

const MainConst = connect(
    state => ({
        user: state.user
    }),
    dispatch => ({
        getUserInfo: () => dispatch(getUserInfo()),
    })
)(Main);

export default MainConst;