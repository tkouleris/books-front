import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

function RecoverPasswordPage() {
    let {token} = useParams();
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate();


    useEffect(() => {
        document.title = 'My Books - Recover Password';
        let bodyElement = document.getElementsByTagName('body')[0];
        bodyElement.className = "hold-transition login-page";

    }, []);

    function goToLogin() {
        navigate("/login");
    }

    function handlePasswordChange() {

    }

    return <div className="login-box">
        <div className="login-logo">
            <a href="" onClick={goToLogin}><b>My Books</b></a>
        </div>

        <div className="card">
            <div className="card-body login-card-body">
                <p className="login-box-msg">You are only one step a way from your new password, recover your password
                    now.</p>

                <form action="login.html" method="post">
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)}
                               placeholder="Password"/>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control"
                               onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password"/>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <button type="submit" onClick={handlePasswordChange}
                                    className="btn btn-primary btn-block">Change password
                            </button>
                        </div>

                    </div>
                </form>

                <p className="mt-3 mb-1">
                    <a href="login.html">Login</a>
                </p>
            </div>
        </div>
    </div>
}

export default RecoverPasswordPage;