export function getCatalog() {
    return (dispatch) => {

        fetch('/api/category', {
            method: 'post',
        })
            .then(response => response.json())
            .then(result => {
                dispatch({type: 'SET_CATALOG', catalog: result.data});
            })
            .catch(()=>{
                dispatch({type: 'SET_CATALOG', catalog: false})
            })
    }
}