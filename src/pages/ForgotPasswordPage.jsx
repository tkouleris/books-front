import {useEffect} from "react";

function ForgotPasswordPage() {
    useEffect(() => {
        document.title = 'My Books - Forgot Password';
        let bodyElement = document.getElementsByTagName('body')[0];
        bodyElement.className = "hold-transition login-page";

    }, []);

    return <div className="login-box">
        <div className="login-logo">
            <a href="../../index2.html"><b>Admin</b>LTE</a>
        </div>

        <div className="card">
            <div className="card-body login-card-body">
                <p className="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>

                <form action="recover-password.html" method="post">
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
                </form>

                <p className="mt-3 mb-1">
                    <a href="login.html">Login</a>
                </p>
                <p className="mb-0">
                    <a href="register.html" className="text-center">Register a new membership</a>
                </p>
            </div>

        </div>
    </div>
}

export default ForgotPasswordPage