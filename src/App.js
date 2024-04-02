import React, { Component } from 'react';
import { connect } from "react-redux";

import Main from "./main/main";
import Header from "./Bars/Header/Header"

import { getCatalog } from "./store/actions/catalog/catalog";
import { getService } from "./store/actions/service/service";
import Footer from "./Bars/Footer";
import RecordForRepair from "./Components/Modals/ServiceModals/RecordForRepair";
import AskQuestion from "./Components/Modals/AskQuestion";
import {getCart} from "./store/actions/cart/cart";
import BottomMenu from "./Bars/BottomMenu";
import ContactsBtn from "./Components/Static/ContactsBtn";

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getCatalog();
        this.props.getService();
        this.props.getCart();
    }
    render() {
        return (
            <>
                <Header/>
                <main>
                    <Main/>
                </main>
                <Footer/>
                <BottomMenu/>
                <RecordForRepair/>
                <AskQuestion/>
                <ContactsBtn/>
            </>
        );
    }
}

const AppTo = connect(
    state => ({
        // user: state.user,
    }),
    dispatch => ({
        getCatalog: () => dispatch(getCatalog()),
        getService: () => dispatch(getService()),
        getCart: () => dispatch(getCart()),
    })
)(App);
export default AppTo;