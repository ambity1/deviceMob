import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Category extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Link to={`/service/${this.props.data.alias}`} className='service_center-grid-el'>
                <h3>{this.props.data.label}</h3>
                <img src={`/${this.props.data.photo}`}/>
            </Link>
        );
    }
}

export default Category;