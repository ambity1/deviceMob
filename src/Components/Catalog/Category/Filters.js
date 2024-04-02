import React, {createRef} from "react";
import {TextField} from "@consta/uikit/TextField";
import {Slider} from "@consta/uikit/Slider";

export function RangeInput(props) {

    return (
        <div className="filter-availability d-flex flex-column" style={{rowGap: 25}}>
            {
                props.filter?.label
                    ? <h5>{props.filter.label}</h5>
                    : false
            }
            <div className='d-flex align-items-center justify-content-between' style={{columnGap: 20}}>
                <TextField
                    onChange={({value})=>{props.setFilters('price', [value,props.values[1]], true, false)}}
                    value={props.values?.[0] ?? props.filter.min}
                    type="number"
                    placeholder="От"
                    incrementButtons={false}
                />
                <TextField
                    onChange={({value})=>{props.setFilters('price', [props.values[0], value], true, false)}}
                    value={props.values?.[1] ?? props.filter.max}
                    type="number"
                    placeholder="До"
                    incrementButtons={false}
                />
            </div>
            <div style={{padding:'0 10px'}}>
                <Slider range={true} size='l' min={Number(props.filter.min)} max={Number(props.filter.max)} value={props?.values?.length ? props.values : [Number(props.filter.min),Number(props.filter.max)]} onChange={({value})=>props.setFilters('price', value, true, false)} withTooltip={true}/>
            </div>
        </div>
    );
}

export function CheckBoxes(props) {
    let container = createRef();

    function getValues(){
        let arr = [];
        [...container.current.querySelectorAll('[type="checkbox"]:checked')].forEach(checkbox=>{
            arr.push(checkbox.getAttribute('checkvalue'));
        })
        return arr;
    }

    return (
        <div className="filter-availability">
            <h5>{props.filter.label}</h5>
            <div className="filter-availability--radio" ref={container}>
                {
                    props.filter.values.map(item => {
                        return (
                            <div className="form-check d-flex align-items-center">
                                <input className="form-check-input" type="checkbox"  onChange={()=>{props.setFilters(`check`, getValues(), true, `${props.filter.type}${props.filter.id}`)}} checked={props.values?.[`${props.filter.type}${props.filter.id}`]?.length && props.values?.[`${props.filter.type}${props.filter.id}`].includes(String(item.id)) ? 'checked':false} checkvalue={item.id} id={`${props.filter.type}${item.id}`}/>
                                <label className="form-check-label" htmlFor={`${props.filter.type}${item.id}`}>{item.label}</label>
                            </div>
                        )
                    })
                }
            </div>
            <div className="d-flex justify-content-end reset" onClick={()=>{props.setFilters(`check`, false, false, `${props.filter.type}${props.filter.id}`)}}>Сбросить</div>
        </div>
    );
}