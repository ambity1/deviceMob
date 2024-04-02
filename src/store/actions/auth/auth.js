export function getUserInfo() {
    return (dispatch) => {
        let locStorage = window.localStorage;
        let formData = new FormData();
        formData.append('method', 'getUserInfo');

        let query = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "/php/api");
            xhr.setRequestHeader('Authorization', 'Bearer ' + JSON.parse(locStorage.getItem('access_tokens')).access_token);
            xhr.send(formData);
            xhr.onload = () => resolve(xhr);
            xhr.onerror = () => reject(xhr);
        });

        query.then(
            result =>{
                if(result.status == 401){
                    let errResp = JSON.parse(result.response);
                    if (errResp.error === 'invalid_token' && errResp.error_description === 'The access token provided has expired') {
                        if(refresh_token()){
                            getUserInfo()();
                        }else{
                            dispatch({type: 'SET_USER_INFO', user: false})
                        }
                    } else {
                        dispatch({type: 'SET_USER_INFO', user: false})
                    }
                }else if(result.status == 200){
                    let resResp = JSON.parse(result.response);
                    if (resResp.status == 'ok'){
                        dispatch({type: 'SET_USER_INFO', user: resResp.user});
                    }else{
                        dispatch({type: 'SET_USER_INFO', user: false})
                    }
                }
            },
            error => {
                dispatch({type: 'SET_USER_INFO', user: false})
            }
        )
    }
}

export function refresh_token() {
    let locStorage = window.localStorage;
    let formData = new FormData();
    formData.append('grant_type', 'refresh_token');
    formData.append('client_id', 'iedo');
    formData.append('refresh_token', JSON.parse(locStorage.getItem('access_tokens')).refresh_token);

    fetch("/php/token.php", {
        body: formData,
        method: "POST"
    }).then(resp=>resp.json())
        .then(result=>{
            if(result.hasOwnProperty('error')){
                return 0;
            }else if(result.hasOwnProperty('access_token')){
                let tokens = JSON.parse(locStorage.getItem('access_tokens'));
                tokens.access_token = result.access_token;
                locStorage.setItem('access_tokens', JSON.stringify(tokens));
                return 1;
            }
        })
        .catch((error) => {
            return 0;
        })
}