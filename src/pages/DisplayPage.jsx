import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {display_page} from "../utils/http.jsx";

function DisplayPage() {
    let { username } = useParams();
    const [current_readings, setCurrentReadings] = useState([])
    const [latest_readings, setLatestReadings] = useState([])
    
    useEffect(() => {
        document.title = 'Display - ' + username;
        display_page(username).then(res => {
            console.log(res.data.data)
            setCurrentReadings(res.data.data.current_readings)
            setLatestReadings(res.data.data.latest_readings)
        });
    }, []);

    return <div className="wrapper">
        <div className="content-wrapper" style={{marginLeft: 40}}>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-1">
                        <div className="col-sm-6">
                            <h1 className="m-0">{username}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">

                    <div className="row" style={{border: '1px solid black',}}>
                        <div className="col-sm-12">
                            <h3>Currently Reading</h3>
                        </div>
                        {
                            current_readings.map((reading, index) => {
                                return (
                                    <div key={index} className="col-md-3">
                                        <div className="card card-primary">
                                            <div className="card-header">
                                                <h3 className="card-title">{reading.book.title}</h3>
                                            </div>
                                            <div className="card-body">
                                                <img alt={reading.book.title} style={{width: '100%', height: 400}}
                                                     src={reading.book.image}/>
                                            </div>
                                            <div className="card-footer" style={{textAlign: 'right'}}>
                                                {reading.book.description}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })

                        }
                    </div>
                </div>
            </section>

            <section className="content mt-3">
                <div className="container-fluid">

                    <div className="row" style={{border: '1px solid black',}}>
                        <div className="col-sm-12">
                            <h3>Latest Reads</h3>
                        </div>
                        {
                            latest_readings.map((reading, index) => {
                                return (
                                    <div key={index} className="col-md-3">
                                        <div className="card card-primary">
                                            <div className="card-header">
                                                <h3 className="card-title">{reading.book.title}</h3>
                                            </div>
                                            <div className="card-body">
                                                <img alt={reading.book.title} style={{width: '100%', height: 400}}
                                                     src={reading.book.image}/>
                                            </div>
                                            <div className="card-footer" style={{textAlign: 'right'}}>
                                                {reading.book.description}
                                            </div>
                                        </div>
                                    </div>
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