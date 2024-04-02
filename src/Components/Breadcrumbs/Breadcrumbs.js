import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {query} from "../../async/async";
import {SkeletonText} from "@consta/uikit/Skeleton";

class Breadcrumbs extends Component {
    constructor(props) {
        super(props);
        this.state ={error: false, isLoaded: false, breadcrumbs: false};
        this.getBreadcrumbs = this.getBreadcrumbs.bind(this);
    }

    componentWillMount() {
        this.getBreadcrumbs();
    }

    componentDidUpdate(prevProps) {
        if (this.props.url!==prevProps.url) {
            this.getBreadcrumbs();
        }
    }

    getBreadcrumbs(){
        let pr = new FormData();
        let path = '/api/';
        if(this.props?.type){
            path+=this.props.type;
        }

        if(this.props?.url){
            let url = this.props.url.split('/');
            path+=url[url.length-1];
        }

        query(path, pr).then(response=>response.json())
            .then(res=>{
                if(res.status == 'ok'){
                    this.setState({error:false, isLoaded: true, breadcrumbs: res.data, seo: res?.seo});
                }else{
                    this.setState({error:true, isLoaded: true, breadcrumbs: false, seo: false});
                }
            })
    }

    render() {
        if(this.state.seo){
            if(this.state.seo?.title){
                document.title = this.state.seo.title;
            }else{
                document.title = "DEVICE";
            }
            if(this.state.seo?.description){
                document.querySelector('meta[name="description"]').setAttribute("content", this.state.seo.description);
            }
            if(this.state.seo?.keywords){
                document.querySelector('meta[name="keywords"]').setAttribute("content", this.state.seo.keywords);
            }
            if(this.state.seo?.op_title){
                document.querySelector('meta[property="og:title"]').setAttribute('content', this.state.seo?.op_title);
            }
            if(this.state.seo?.op_description){
                document.querySelector('meta[property="og:description"]').setAttribute('content', this.state.seo?.op_description);
            }
            if(this.state.seo?.op_keywords){
                document.querySelector('meta[property="og:keywords"]').setAttribute('content', this.state.seo?.op_keywords);
            }
            document.querySelector('meta[property="og:url"]').setAttribute('content', document.location.href);
            if(this.state.seo?.op_image){
                document.querySelector('meta[property="og:image"]').setAttribute('content', `${document.location.origin}/${this.state.seo?.op_image}`);
            }
        }

        if(!this.state.error) {
            if (this.state.isLoaded) {
                return (
                    <div className='container'>
                        <div className="breadcrumbs d-flex align-items-center">
                            <Link to="/">Главная</Link>
                            {
                                this.state.breadcrumbs?.length
                                    ? this.state.breadcrumbs.map((item, index) => {
                                        if (index === this.state.breadcrumbs.length - 1) {
                                            return <>
                                                <div className="breadcrumbs_delimietr"><img src="/media/i/breadcrumbs.svg"/>
                                                </div>
                                                {item.label}
                                            </>
                                        } else {
                                            return <>
                                                <div className="breadcrumbs_delimietr"><img src="/media/i/breadcrumbs.svg"/></div>
                                                <Link to={item.url}>{item.label}</Link>
                                            </>
                                        }
                                    })
                                    : false
                            }
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className='container'>
                        <SkeletonText rows={1}/>
                    </div>
                )
            }
        }else{
            return (
                <></>
            );
        }
    }
}

export default Breadcrumbs;