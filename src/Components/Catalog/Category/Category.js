import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Category extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Link to={`/catalog/${this.props.data.alias}`}>
                <div className="catalog_category" onClick={()=>{this.props?.closeSublist ? this.props.closeSublist() : false}}>
                    <div className="d-flex flex-column align-items-center">
                        <h2 className="text-center">{this.props.data.label}</h2>
                        <img src={`/${this.props.data.photo}`} alt=""/>
                    </div>
                </div>
            </Link>
        );
    }
}

export default Category;