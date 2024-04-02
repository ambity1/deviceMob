import React, {Component} from 'react';
import {connect} from "react-redux";

import Category from "./Category/Category";
import {SkeletonBrick} from "@consta/uikit/Skeleton";

class Service extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const HeaderTag = this.props?.headerTag ?? 'h1';
        return (
            <section className="service_center">
                {
                    this.props?.withHeader
                        ? <div className="container"><HeaderTag className='text-center'>Сервис-центр</HeaderTag></div>
                        : false
                }
                <div className="d-flex flex-column container">
                    {
                        this.props?.service?.length
                        ? this.props.service.map(item=>{return <Category data={item}/>})
                        : <><SkeletonBrick height={400}/><SkeletonBrick height={400}/><SkeletonBrick height={400}/></>
                    }
                </div>
            </section>
        );
    }
}

const ServiceConst = connect(
    state => ({
        service: state.service,
    }),
    dispatch => ({
    })
)(Service);

export default ServiceConst;