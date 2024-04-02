import React, {Component, createRef} from 'react';
import {connect} from "react-redux";

import Category from "./Category/Category";
import {Link} from "react-router-dom";

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {countCategories: 100}
        this.catalogGrid = createRef();
        this.calculateCountCategories = this.calculateCountCategories.bind(this);
    }

    calculateCountCategories() {
        let rows = window.getComputedStyle(this.catalogGrid.current).getPropertyValue("grid-template-rows").split(" ").length;
        // let cols = window.getComputedStyle(this.catalogGrid.current).getPropertyValue("grid-template-columns").split(" ").length;
        if (rows === 4) {
            this.setState({countCategories: (2 * rows)});
        }
    }

    componentDidMount() {
        if (!this.props.showAll) {
            window.addEventListener('resize', () => {
                this.calculateCountCategories();
            })
            window.addEventListener('load', () => {
                this.calculateCountCategories();
            })
        }
    }

    componentWillUnmount() {
        if (!this.props.showAll) {
            window.removeEventListener('resize', () => {
                this.calculateCountCategories();
            })
            window.removeEventListener('load', () => {
                this.calculateCountCategories();
            })
        }
    }

    render() {
        const HeaderTag = this.props?.headerTag ?? 'h1';
        return (
            <section className="cat">
                {
                    this.props?.withHeader
                        ? <div className="container"><HeaderTag>Каталог</HeaderTag></div>
                        : false
                }
                <div className="catalog container" ref={this.catalogGrid}>
                    {
                        this.props?.catalog?.length
                            ? this.props.catalog.slice(0, this.state.countCategories).map(item => {
                                return <Category data={item} closeSublist={this.props?.closeSublist ?? false}/>
                            })
                            : false
                    }
                </div>
                {
                    this.props?.showAll
                        ? false
                        : <div className="container">
                            <Link to="/catalog" className="btn-w d-flex justify-content-center">
                                Все категории
                            </Link>
                        </div>
                }
            </section>
        );
    }
}

const CatalogConst = connect(
    state => ({
        catalog: state.catalog,
    }),
    dispatch => ({
    })
)(Catalog);

export default CatalogConst;