export default function setCatalog(state = [],action) {
    if(action.type === 'SET_SERVICE'){
        return action.service;
    }
    return state;
}