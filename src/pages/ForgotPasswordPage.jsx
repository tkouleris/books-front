import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {send_forgot_password_request} from "../utils/http.jsx";

function ForgotPasswordPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')

    useEffect(() => {
        document.title = 'Books - Forgot Password';
        let bodyElement = document.getElementsByTagName('body')[0];
        bodyElement.className = "hold-transition login-page";

    }, []);

    function goToRegistration() {
        navigate("/register");
    }

    function goToLogin() {
        navigate("/login");
    }

    function handleForgotPasswordRequest(){
        send_forgot_password_request(email).then( ()=>{
            alert('Check your email');
        })
    }

    return <div className="login-box">
        <div className="login-logo">
            <a href="" onClick={goToLogin}><b><i className="fas fa-book-open "></i> Books</b></a>
        </div>

        <div className="card">
            <div className="card-body login-card-body">
                <p className="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>

                <div className="input-group mb-3">
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Email"/>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <span className="fas fa-envelope"></span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <button type="submit" onClick={handleForgotPasswordRequest} className="btn btn-primary btn-block">Request new password</button>
                    </div>

                </div>

                <p className="mt-3 mb-1">
                    <a href="" onClick={goToLogin} className="text-center">Login</a>
                </p>
                <p className="mb-0">
                    <a href="" onClick={goToRegistration} className="text-center">Register</a>
                </p>
            </div>

        </div>
    </div>
}

export default ForgotPasswordPage