import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function ForgotPasswordPage() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'My Books - Forgot Password';
        let bodyElement = document.getElementsByTagName('body')[0];
        bodyElement.className = "hold-transition login-page";

    }, []);

    function goToRegistration() {
        navigate("/register");
    }

    function goToLogin() {
        navigate("/login");
    }

    return <div className="login-box">
        <div className="login-logo">
            <a href="" onClick={goToLogin}><b>My Books</b></a>
        </div>

        <div className="card">
            <div className="card-body login-card-body">
                <p className="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>

                <div className="input-group mb-3">
                    <input type="email" className="form-control" placeholder="Email"/>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <span className="fas fa-envelope"></span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary btn-block">Request new password</button>
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