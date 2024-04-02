export function refresh_token(callThisAfter = false) {
    return (dispatch) => {
        let locStorage = window.localStorage;
        let formData = new FormData();
        formData.append('grant_type', 'refresh_token');
        formData.append('client_id', 'iedo');
        formData.append('refresh_token', JSON.parse(locStorage.getItem('access_tokens')).refresh_token);

        // let query = new Promise((resolve, reject) => {
        //     const xhr = new XMLHttpRequest();
        //     xhr.open("POST", "/php/token.php");
        //     xhr.send(formData);
        //     xhr.onload = () => resolve(xhr);
        //     xhr.onerror = () => reject(xhr);
        // });
        //
        // query.then(
        //     result =>{
        //         if(result.status == 400){
        //             let errResp = JSON.parse(result.response);
        //             if (errResp.error === 'invalid_grant' && errResp.error_description === 'Invalid refresh token') {
        //                 dispatch({type: 'SET_USER_INFO', user: false})
        //             } else {
        //                 if(callThisAfter) callThisAfter();
        //             }
        //         }else if(result.status == 200){
        //             if(result.hasOwnProperty('error')){
        //                 dispatch({type: 'SET_USER_INFO', user: false})
        //             }else if(result.hasOwnProperty('access_token')){
        //                 let tokens = JSON.parse(locStorage.getItem('access_tokens'));
        //                 tokens.access_token = result.access_token;
        //                 locStorage.setItem('access_tokens', JSON.stringify(tokens));
        //             }
        //         }
        //     },
        //     error => {
        //         locStorage.clear();
        //         dispatch({type: 'SET_USER_INFO', user: false})
        //     }
        // )
        console.log('a')
        fetch("/php/token.php", {
            body: formData,
            method: "POST"
        }).then(resp=>resp.json())
            .then(result=>{
                if(result.hasOwnProperty('error')){
                    dispatch({type: 'SET_USER_INFO', user: false})
                    // window.location.href='/auth';
                }else if(result.hasOwnProperty('access_token')){
                    let tokens = JSON.parse(locStorage.getItem('access_tokens'));
                    tokens.access_token = result.access_token;
                    locStorage.setItem('access_tokens', JSON.stringify(tokens));
                    if(callThisAfter) callThisAfter();
                }
            })
            .catch((error) => {
                dispatch({type: 'SET_USER_INFO', user: false})
            })
    }
}