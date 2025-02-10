import axios from 'axios'
import {
    dashboard_info,
    get_book,
    login_info,
    register_info,
    store_book,
    get_books,
    delete_book,
    store_reading,
    all_readings,
    get_reading,
    delete_reading, get_profile, store_profile, display_data, to_read_list
} from '../../config.jsx'
import {remove_from_red_list} from "../../config.example.jsx";


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

export async function storeBook(token, formdata){
    let headers = {
        headers: {
            "content-type": "multipart/form-data",
            'Authorization': 'Bearer ' + token
        }
    }

    const response = await axios.post(
        store_book.url,formdata, headers
    ).catch((e) => {
        return {'data':{ 'message':e.response.data.message, 'status': false}};
    });
    return response.data
}

export async function fetchBook(token, bookId){
    let headers = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let url = get_book.url
    url = url.replace(':id', bookId)
    const response = await axios.get(url, headers).catch((error)=>{
        return {'data':error.response.data}
    })
    return {'data': response.data}
}

export async function fetchBooks(token, page=null, title=null){
    let headers = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    let url = get_books.url
    if(page !== null){
        url = url + "?page=" + page
    }

    if(title !== null){
        url = url + "&title=" + title
    }

    const response = await axios.get(url, headers).catch((error)=>console.log(error))
    return {'data': response.data}
}

export async function deleteBook(token, bookId){
    let headers = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let url = delete_book.url
    url = url.replace(':id', bookId)
    const response = await axios.delete(url, headers).catch((error)=>console.log(error))
    return {'data': response.data}
}

export async function storeReading(token, data){
    let headers = {
        headers: {
            "content-type": "application/json",
            'Authorization': 'Bearer ' + token
        }
    }

    const response = await axios.post(
        store_reading.url,data, headers
    ).catch((e) => {
        return {'data':{ 'message':e.response.data.message, 'status': false}};
    });
    return response.data
}

export async function fetchReadings(token, page=null){
    let headers = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let url = all_readings.url
    if(page !== null){
        url = url + "?page=" + page
    }
    const response = await axios.get(url, headers).catch((error)=>console.log(error))
    return {'data': response.data}
}

export async function fetchReading(token, readId){
    let headers = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let url = get_reading.url
    url = url.replace(':id', readId)
    const response = await axios.get(url, headers).catch((error)=>{
        return {'data':error.response.data}
    })
    return {'data': response.data}
}

export async function deleteReading(token, readId){
    let headers = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let url = delete_reading.url
    url = url.replace(':id', readId)
    const response = await axios.delete(url, headers).catch((error)=>console.log(error))
    return {'data': response.data}
}

export async function fetchProfile(token){
    let headers = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let url = get_profile.url
    const response = await axios.get(url, headers).catch((error)=>{
        return {'data':error.response.data}
    })
    return {'data': response.data}
}

export async function storeProfile(token, data){
    let headers = {
        headers: {
            "content-type": "multipart/form-data",
            'Authorization': 'Bearer ' + token
        }
    }

    const response = await axios.post(
        store_profile.url,data, headers
    ).catch((e) => {
        return {'data':{ 'message':e.response.data.message, 'status': false}};
    });
    return response.data
}

export async function display_page(username){
    let headers = {
        headers: {
        }
    }
    let url = display_data.url
    url = url.replace(':username', username)
    const response = await axios.get(url, headers).catch((error)=>console.log(error))
    return {'data': response.data}
}

export async function fetchToReadList(token){
    let headers = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let url = to_read_list.url
    const response = await axios.get(url, headers).catch((error)=>{
        return {'data':error.response.data}
    })
    return {'data': response.data}
}

export async function deleteFromToReadList(token, readId){

    let headers = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    let url = remove_from_red_list.url
    url = url.replace(':id', readId)
    const response = await axios.delete(url, headers).catch((error)=>console.log(error))
    return {'data': response.data}
}