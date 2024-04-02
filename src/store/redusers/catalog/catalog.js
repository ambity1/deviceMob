export default function setCatalog(state = [],action) {
    if(action.type === 'SET_CATALOG'){
        return action.catalog;
    }
    return state;
}