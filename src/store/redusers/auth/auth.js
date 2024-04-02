export default function setUserInfo(state = false,action) {
    if(action.type === 'SET_USER_INFO'){
        return action.user;
    }
    return state;
}