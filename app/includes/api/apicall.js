// import axios from 'axios';
import axiosAPI from './api';
function getRequest(params, url) {
    let data = {};
    if(params){
        data = { params };
    }
    // console.log(url)
    return axiosAPI.get(url, data).then((response) => {
        // console.log(response)
        if (response.status === 200) {
            return response;
        }
    }).catch(function (error) {
        // signFunctions.catchError(error, setPopUp, thisProps)
    });
}
function postRequest(data, url, props) {
    let params = {};
    if(data){
        params =  data ;
    }

    return axiosAPI.post(url, params, { withCredentials: false }).then((response) => {
        if (response.status % 200 <= 99) {
            return response;
        }
    }).catch(function (error) {
        if (props && props.returnError) {
            return error.response;
        }
        // else {
        //     let arr = [];
        //     console.log(error.response) 
        //     for (const key of Object.keys(error.response.data)) {
        //         arr.push(error.response.data[key][0]);
        //     }
        //     alert(arr);
        // }
        // signFunctions.catchError(error, setPopUp, thisProps)
    });
}
export { getRequest, postRequest }