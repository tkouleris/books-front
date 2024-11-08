import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {validateEmail, validatePassword} from "../utils/validators.jsx";
import {registerUser} from "../utils/http.jsx";

export default function RegistrationPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function goToLogin() {
        navigate("/login");
    }

    function handleRegistration() {
        if (!validateEmail(email)) {
            alert('Email address is not valid');
            return;
        }

        if (!validatePassword(password)) {
            alert('Password must be at least 6 characters, having one number and one special character');
            return;
        }

        if (username.length === 0) {
            alert('Username cannot be empty');
            return;
        }

        registerUser(username, email, password).then((response) => {
            console.log(response)
            if (!response.success) {
                alert(response.message)
            }

            if (response.success) {
                alert('Registration Completed');
                navigate("/login");
            }
        })

    }

    return (
        <body className={"register-page bg-body-secondary"}>
        <div className={"register-box"}>
            <div className={"register-logo"}><a href="../index2.html"><b>Admin</b>LTE</a></div>
            <div className={"card"}>
                <div className={"card-body register-card-body"}>
                    <p className={"register-box-msg"}>Register a new membership</p>

                    <div className="input-group mb-3"><input type="text" className="form-control"
                                                             onChange={(e) => setUsername(e.target.value)}
                                                             value={username} placeholder="Username"/>
                        <div className="input-group-text"><span className="bi bi-person"></span></div>
                    </div>
                    <div className="input-group mb-3"><input type="email" className="form-control"
                                                             onChange={(e) => setEmail(e.target.value)} value={email}
                                                             placeholder="Email"/>
                        <div className="input-group-text"><span className="bi bi-envelope"></span></div>
                    </div>
                    <div className="input-group mb-3"><input type="password" className="form-control"
                                                             onChange={(e) => setPassword(e.target.value)}
                                                             placeholder="Password"/>
                        <div className="input-group-text"><span className="bi bi-lock-fill"></span></div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            {/*<div className="form-check"> <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /> <label className="form-check-label" for="flexCheckDefault" >*/}
                            {/*    I agree to the <a href="#">terms</a> </label> </div>*/}
                        </div>
                        <div className="col-4">
                            <div className="d-grid gap-2">
                                <button type="submit" onClick={handleRegistration}
                                        className="btn btn-primary">Register
                                </button>
                            </div>
                        </div>
                    </div>


                    <p className="mb-0"><a onClick={goToLogin} href="" className="text-center">
                        I already have a membership
                    </a></p>
                </div>
            </div>
        </div>
        </body>
    );
}