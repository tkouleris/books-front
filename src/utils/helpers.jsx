export function is_logged_in(){
    return window.localStorage.token.length > 0;
}

export function logout(navigate){
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('avatar')
    window.localStorage.removeItem('verified')
    navigate('/login')
    location.reload();
}