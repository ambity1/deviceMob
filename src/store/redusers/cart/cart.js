export default function setCart(state = {summ: 0, old_summ: 0, cart: []},action) {
    if(action.type === 'SET_CART'){
        return action.cart;
    }
    return state;
}