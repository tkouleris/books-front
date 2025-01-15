import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {display_page} from "../utils/http.jsx";
import Display from "../components/Display.jsx";

function DisplayPage() {
    let {username} = useParams();
    const [current_readings, setCurrentReadings] = useState([])
    const [latest_readings, setLatestReadings] = useState([])
    const [user, setUser] = useState()

    useEffect(() => {
        document.title = 'Display - ' + username;
        display_page(username).then(res => {
            console.log(res.data.data)
            setCurrentReadings(res.data.data.current_readings)
            setLatestReadings(res.data.data.latest_readings)
            setUser(res.data.data.user)
        });
    }, []);

    return <div className="content-wrapper" style={{marginLeft: 40}}>
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0">My Readings</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">Starter Page</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3" style={{borderRight: "1px solid black"}}>
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">{username}</h5>
                            </div>
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-6">
                                        <img src={user.avatar} style={{width: 150, height: 150}}/>
                                    </div>
                                </div>

                                <a href="#" className="card-link">{user.email}</a>
                            </div>
                        </div>
                        <h1>Currently Reading</h1>
                        {
                            current_readings.map((reading, index) => {
                                return <Display key={index} reading={reading}/>
                            })
                        }
                    </div>
                    <div className="col-lg-6">
                        <h1>Latest Readings</h1>
                        <div className="row">
                        {
                            latest_readings.map((reading, index) => {
                                return <div key={index} className="col-lg-6"><Display reading={reading}/></div>
                            })
                        }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default DisplayPage;