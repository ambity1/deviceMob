import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {CheckBoxes, RangeInput} from "../../../../Components/Catalog/Category/Filters";
import {SkeletonBrick} from "@consta/uikit/Skeleton";

class Filter extends Component {
    constructor(props) {
        super(props);
        this.setOverflowHiddenToBody = this.setOverflowHiddenToBody.bind(this);
    }

    setOverflowHiddenToBody(){
        document.body.style.overflow= this.props.isOpen ? 'hidden' : null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.isOpen != prevProps.isOpen){
            this.setOverflowHiddenToBody();
        }
    }

    render() {
        return (
            <div className={`filter-nav ${this.props.isOpen ? 'active' : false}`}>
                <div className="filter-nav-block d-flex flex-column">
                    <div className="container d-flex align-items-center justify-content-between">
                        <h3>Фильтры</h3>
                        <div className="close" onClick={()=>{this.props.close(false)}}/>
                    </div>
                    <div className="filter container d-flex flex-column">
                        {
                            this.props.filters
                                ? this.props.filters.map(filter=>{
                                    switch (filter.type){
                                        case 'check':{
                                            return(<CheckBoxes filterVal={this.props.selectedFilter?.[`${filter.type}${filter.id}`]} changeFilterVal={(alias, values)=>this.props.changeFilterVal(alias, values)} filter={filter}/>)
                                        }
                                        case 'range':{
                                            // return(<RangeInput filterVal={this.props.selectedFilter?.[`${filter.type}${filter.id}`]} filter={filter}/>)
                                            return(<RangeInput filter={filter}/>)
                                        }
                                    }
                                })
                                : <SkeletonBrick height={500}/>
                        }
                        <div className="control d-flex flex-column align-items-center">
                            <div className="btn filter-submit">Применить</div>
                            <div className="clearAll">Сбросить все</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;