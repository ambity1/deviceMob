export function getService() {
    return (dispatch) => {

        fetch('/api/repair_category', {
            method: 'post',
        })
            .then(response => response.json())
            .then(result => {
                dispatch({type: 'SET_SERVICE', service: result.data});
            })
            .catch(()=>{
                dispatch({type: 'SET_SERVICE', service: false})
            })
    }
}