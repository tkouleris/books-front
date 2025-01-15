import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {display_page} from "../utils/http.jsx";
import Display from "../components/Display.jsx";

function DisplayPage() {
    let { username } = useParams();
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

    return <div className="wrapper">
        <div className="content-wrapper" style={{marginLeft: 40}}>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-1">
                        <div className="col-sm-6">
                            <h1 className="m-0">My Latest Reads</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div  style={{marginBottom: 20, border: '1px solid black', width: 460}}>
                        <div className="row">
                            <div className="col-4">
                                <img src={user.avatar} style={{width: 150, height: 150}}/>
                            </div>
                            <div className="col-1" style={{textAlign: "left"}}>
                                <div><b>Username: </b>{user.username}</div>
                                <div><b>Email: </b>{user.email}</div>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <h3>Currently Reading</h3>
                        </div>

                        {
                            current_readings.map((reading, index) => {
                                return (
                                    <Display key={index} reading={reading}/>
                                )
                            })

                        }
                    </div>
                </div>
            </section>

            <section className="content mt-3">
                <div className="container-fluid">

                <div className="row">
                        <div className="col-sm-12">
                            <h3>Latest Reads</h3>
                        </div>
                        {
                            latest_readings.map((reading, index) => {
                                return (
                                    <Display key={index} reading={reading}/>
                                )
                            })

                        }
                    </div>
                </div>
            </section>
        </div>
    </div>
}

export default DisplayPage;