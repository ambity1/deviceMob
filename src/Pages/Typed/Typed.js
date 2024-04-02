import React, { Component } from 'react';
import {query} from "../../async/async";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import {Link, useParams} from "react-router-dom";
import {Loader} from "@consta/uikit/Loader";

class Typed extends Component {
    constructor(props) {
        super(props);
        this.state = {error: false, isLoaded:true, content: false, seo: false};
        this.getTitleFromUrl=this.getTitleFromUrl.bind(this);
        this.createMarkup=this.createMarkup.bind(this);
    }

    getTitleFromUrl(){
        let fd = new FormData();
        query(`/api/page/${window.location.pathname.slice(1)}`, fd).then(response=>response.json())
            .then(result=>{
                if(result.status=='ok'){
                    this.setState({error: false, isLoaded: true, content: result.data.html})
                }else{
                    document.title = 'Страница не найдена';
                    this.setState({error: true, isLoaded: true, content: false})
                }
            })
            .catch(()=>{
                document.title = 'Страница не найдена';
                this.setState({error: true, isLoaded: true, content: false})
            })
    }

    createMarkup() {
        return {__html: this.state.content};
    };

    componentWillMount() {
        window.scrollTo(0, 0)
        this.getTitleFromUrl();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.params['*']!==prevProps.params['*']) {
            this.getTitleFromUrl();
            window.scrollTo(0, 0)
        }
    }

    render() {
        return (
            <>
                <Breadcrumbs url={window.location.pathname.slice(1)} type='breadcrumbs/page/'/>
                {
                    this.state.isLoaded
                        ? this.state.error
                        ? <div className='container'>
                            <div className="page404 d-flex align-items-center justify-content-center">
                                <div className="d-flex flex-column align-items-center">
                                    <h1>Ошибка</h1>
                                    <p>К сожалению, эта страница не найдена</p>
                                    <div><Link to='/' className='btn'>Вернуться на главную</Link></div>
                                </div>
                            </div>
                        </div>
                        : <div className='typed'><div className='container' dangerouslySetInnerHTML={this.createMarkup()} /></div>
                        : <div className='container'>
                            <Loader/>
                        </div>
                }
            </>
        );
    }
}

function withRouter(Component) {
    return props => <Component {...props} params={useParams()}/>
}

const TypedWrapped = withRouter(Typed);
export default TypedWrapped;