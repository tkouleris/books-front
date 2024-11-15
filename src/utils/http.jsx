import axios from 'axios'
import {dashboard_info, login_info, register_info, store_book} from '../../config.jsx'

export async function login(credentials){
    const response = await axios.post(
        login_info.url,
        credentials
    ).catch((e) => e.toJSON());

    if(response.status !== 200){
        return {'status':0, 'message': "Wrong Credentials"}
    }

    return {'status':1, 'data': response.data}
}

export async function registerUser(username, email, password){

    const response = await axios.post(
        register_info.url,
        {
            username: username,
            email: email,
            password: password
        }
    ).catch((e) => {
        return {'data':{ 'message':e.response.data.message, 'status': false}};
    });
    return response.data
}

export async function fetchDashboard(token, username){
    let headers = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    const response = await axios.get(dashboard_info.url + username, headers).catch((error)=>console.log(error))
    return {'data': response.data}
}

export async function storeBook(token, title, description, file){
    let headers = {
        headers: {
            "content-type": "multipart/form-data",
            'Authorization': 'Bearer ' + token
        }
    }
    var formdata = new FormData();
    //add three variable to form
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("file", file);
    const response = await axios.post(
        store_book.url,formdata, headers
    ).catch((e) => {
        return {'data':{ 'message':e.response.data.message, 'status': false}};
    });
    return response.data
}