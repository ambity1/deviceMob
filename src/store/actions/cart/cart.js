import {query} from "../../../async/async";

export function getCart() {
    return (dispatch) => {
        query('/api/cart')
            .then(resp=>resp.json())
            .then(result=>{
                if(result?.status == 'ok'){
                    dispatch({type: 'SET_CART', cart: result.data});
                }else{
                    dispatch({type: 'SET_CART', cart: {summ: 0, old_summ: 0, cart: []}});
                }
            })
            .catch(()=>{
                dispatch({type: 'SET_CART', cart: {summ: 0, old_summ: 0, cart: []}});
            })
    }
}

function sendInfoToCart(prod, direction){
    let fd = new FormData();
    switch (direction){
        case 'add':{
            fetch(`/api/cart/add/${prod}`, {
                method: 'post',
                body: fd
            });
        }break;
        case 'remove':{
            fetch(`/api/cart/remove/${prod}`, {
                method: 'post',
                body: fd
            });
        }break;
        case 'removeSelected':{
            fetch(`/api/cart/removeSelected/${prod}`, {
                method: 'post',
                body: fd
            });
        }break;
        case 'removeAll':{
            fetch(`/api/cart/removeAll`, {
                method: 'post',
                body: fd
            });
        }break;
    }
}

export function changeCart(prod, direction) {
    return (dispatch, getState) => {
        let cartAll = getState()?.cart ? Object.assign({}, getState().cart): {summ: 0, old_summ: 0, cart: []};
        let cart = cartAll?.cart ? [...cartAll.cart] : [];

        let inCart = cart.findIndex(prodInCart=>prodInCart.alias === prod.alias)
        switch (direction){
            case 'add':{
                if(inCart!==-1){
                    cart[inCart].quantity = -(-cart[inCart].quantity)+1;
                }else{
                    let copiedProd = Object.assign({}, prod)
                    copiedProd.quantity = 1;
                    cart.push(copiedProd);
                }
                sendInfoToCart(prod.alias,'add');
            }break;
            case 'remove':{
                if(inCart!==-1){
                    if(-(-cart[inCart].quantity) === 1){
                        cart.splice(inCart, 1);
                    }else{
                        cart[inCart].quantity = -(-cart[inCart].quantity)-1;
                    }
                    sendInfoToCart(prod.alias,'remove');
                }
            }break;
            case 'removeSelected':{
                if(inCart!==-1){
                    cart.splice(inCart, 1);
                    sendInfoToCart(prod.alias,'removeSelected');
                }
            }break;
            case 'removeAll':{
                cart = [];
                sendInfoToCart(false,'removeAll');
            }break;
        }

        let prodsOldTotal = cart.map(item => {
            if(item.old_price){
                return -(-item.quantity) * -(-item.old_price);
            }else{
                return -(-item.quantity) * -(-item.price);
            }
        }).reduce((previousValue, currentValue) => previousValue + currentValue, 0);

        let prodsTotal = cart.map(item => {
            return -(-item.price) * -(-item.quantity);
        }).reduce((previousValue, currentValue) => previousValue + currentValue, 0)

        cartAll.cart = cart;
        cartAll.summ = prodsTotal;
        cartAll.old_summ = prodsOldTotal;

        dispatch({type: 'SET_CART', cart: cartAll})
    }
}