import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {recover_password_handler} from "../utils/http.jsx";

function RecoverPasswordPage() {
    let {token} = useParams();
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate();


    useEffect(() => {
        document.title = 'Books - Recover Password';
        let bodyElement = document.getElementsByTagName('body')[0];
        bodyElement.className = "hold-transition login-page";

    }, []);

    function goToLogin() {
        navigate("/login");
    }

    function checkPassword(str){
        let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(str);
    }

    function handlePasswordChange() {
        let errorMsg = ''
        if(!checkPassword(password)){
            errorMsg += "- Password must be minimum 8 characters, with at least a symbol, upper and lower case letters and a number\r\n"
        }
        if(password !== confirmPassword){
            errorMsg += "- Passwords do not match\r\n";
        }

        if(errorMsg.length > 0){
            alert(errorMsg)
            return false;
        }
        recover_password_handler(token, password).then((res)=>{
            alert(res.data.message)
            goToLogin()
        })
    }

    return <div className="login-box">
        <div className="login-logo">
            <a href="" onClick={goToLogin}><b><i className="fas fa-book-open "></i> Books</b></a>
        </div>

        <div className="card">
            <div className="card-body login-card-body">
                <p className="login-box-msg">You are only one step a way from your new password, recover your password
                    now.</p>


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


                <p className="mt-3 mb-1">
                    <a href="" onClick={goToLogin}>Login</a>
                </p>
            </div>
        </div>
    </div>
}

export default RecoverPasswordPage;