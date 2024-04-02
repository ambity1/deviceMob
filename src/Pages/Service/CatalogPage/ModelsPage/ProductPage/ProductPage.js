import React, { Component } from 'react';
import { connect } from "react-redux";
import {query} from "../../../../../async/async";
import {useParams} from "react-router-dom";
import Breadcrumbs from "../../../../../Components/Breadcrumbs/Breadcrumbs";
import {SkeletonBrick, SkeletonText} from "@consta/uikit/Skeleton";
import About from "../../../../../Components/Static/About";
import Contacts from "../../../../../Components/Static/Contacts";
import FAQ from "../../../../../Components/Static/FAQ";
import {repairRecordModalOpen} from "../../../../../store/actions/modals/repairRecordModalOpen";

class Model extends Component {
    constructor(props) {
        super(props);
        this.state={error: false, isLoaded: false, model:false, properties:false, isModalOpen: false};
        this.getModel=this.getModel.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
    }

    toggleModal(val){
        this.setState({isModalOpen: val});
    }

    getModel(){
        this.state={error: false, isLoaded: false, model:false, properties:false, isModalOpen: false};
        let pr = new FormData();
        query(`/api/repair_product/${this.props.params.model}`, pr).then(response=>response.json())
            .then(res=>{
                if(res.status == 'ok'){
                    this.setState({error:false, isLoaded: true, model: res?.data, properties: res?.properties});
                }else{
                    this.setState({error:true, isLoaded: true, model: false, properties: false, isModalOpen: false});
                }
            })
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    componentWillMount() {
        this.getModel();
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.model!==prevProps.params.model) {
            this.getModel();
        }
    }

    render() {
        if(!this.state.error) {
            return (
                <>
                    <Breadcrumbs url={window.location.pathname.slice(1)} type='repair_breadcrumbs/product/'/>
                    <div className="container modelPage">
                        {
                            this.state?.model
                            ? <h2>Ремонт {this.state.model.label}</h2>
                            : <SkeletonText rows={1}/>
                        }
                    </div>
                    <section className="selectService">
                        <div className="container">
                                {
                                    this.state.isLoaded
                                    ? this.state?.properties?.length
                                        ? <>
                                            <div className="d-flex justify-content-between">
                                                <h3>Услуга</h3>
                                                <h3>Стоимость</h3>
                                            </div>
                                            <div className="selectService-block d-flex flex-column">
                                                {this.state.properties.map(item => {
                                                    return (
                                                        <div className="selectService-block-item d-flex justify-content-between align-items-start"
                                                            onClick={() => {
                                                                this.props.repairRecordModalOpen({isOpen: true, model: this.state?.model?.label, reason: item.label})
                                                            }}>
                                                            <div className="d-flex flex-column">
                                                                <h4>{item.label}</h4>
                                                                <p>{item.description}</p>
                                                            </div>
                                                            <span>{item.value}</span>
                                                        </div>
                                                    )
                                                })
                                                }
                                            </div>
                                        </>
                                        : <p>Временно данная модель не ремонтируется</p>
                                    : <>
                                        <SkeletonBrick height={80}/>
                                        <SkeletonBrick height={80}/>
                                        <SkeletonBrick height={80}/>
                                        <SkeletonBrick height={80}/>
                                    </>
                                }
                        </div>
                    </section>
                    <FAQ/>
                    <About/>
                    <Contacts/>
                </>
            )
        }else{
            return <>Произошла ошибка</>
        }
    }
}

const ModelTo = connect(
    state => ({
    }),
    dispatch => ({
        repairRecordModalOpen: (val)=>{dispatch(repairRecordModalOpen(val))}
    })
)(Model);

function withRouter(Component) {
    return props => <Component {...props} params={useParams()}/>
}

const ModelToWrapped = withRouter(ModelTo);
export default ModelToWrapped;
