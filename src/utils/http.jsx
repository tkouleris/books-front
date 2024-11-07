import axios from 'axios'
import {login_info} from '../../config.jsx'

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