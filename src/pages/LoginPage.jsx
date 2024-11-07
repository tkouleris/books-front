import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function LoginPage(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        let bodyElement = document.getElementsByTagName('body')[0];
        bodyElement.className = "hold-transition login-page";

    }, []);

    function handleLogin(){
        login({email: email, password: password}).then( (response) =>{
            if(response.status === 1){
                window.localStorage.setItem('username', response.data.username);
                window.localStorage.setItem('token', response.data.token);
                navigate("/dashboard");
                return;
            }

            alert('error')
        })
    }

    return <div className="ogin-box">

        <div className="login-box">
            <div className="login-logo">
                <a href="../../index2.html"><b>Admin</b>LTE</a>
            </div>

            <div className="card">
                <div className="card-body login-card-body">
                    <p className="login-box-msg">Sign in to start your session</p>

                    <form action="../../index3.html" method="post">
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email"/>
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Password"/>
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <div className="icheck-primary">
                                    <input type="checkbox" id="remember"/>
                                    <label htmlFor="remember">
                                        Remember Me
                                    </label>
                                </div>
                            </div>

                            <div className="col-4">
                                <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                            </div>

                        </div>
                    </form>


                    <p className="mb-1">
                        <a href="forgot-password.html">I forgot my password</a>
                    </p>
                    <p className="mb-0">
                        <a href="register.html" className="text-center">Register a new membership</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
}

export default LoginPage;