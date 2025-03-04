import {logout} from "../utils/helpers.jsx";
import {useNavigate} from "react-router-dom";

function Header() {
    const navigate = useNavigate();



    let verificationRequest = ''
    if(window.localStorage.verified){
        verificationRequest = <div style={{width: '100%', textAlign: 'center', backgroundColor: 'red', color: "white"}}>
            <h4>Please verify you account <a>here</a></h4>
        </div>
    }

    return <div>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i
                        className="fas fa-bars"></i></a>
                </li>

            </ul>

            {verificationRequest}

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() => logout(navigate)}
                       role="button">
                        <i className="fas fa-sign-out-alt"></i>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
}

export default Header;