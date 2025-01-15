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

    {/*return <div className="wrapper">*/
    }
    {/*    <div className="content-wrapper" style={{marginLeft: 50}}>*/
    }
    {/*        <div className="content-header">*/
    }
    {/*            <div className="container-fluid">*/
    }
    {/*                <div className="row mb-1">*/
    }
    {/*                    <div className="col-sm-6">*/
    }
    {/*                        <h1 className="m-0">My Latest Reads</h1>*/
    }
    {/*                        <div className="row">*/
    }
    {/*                            <div className="col-sm-2">*/
    }
    {/*                                <img src={user.avatar} style={{width: 150, height: 150}}/>*/
    }
    {/*                            </div>*/
    }
    {/*                            <div className="col-sm-2">*/
    }
    {/*                                <b>Username: </b>{user.username}*/
    }
    {/*                            </div>*/
    }
    {/*                        </div>*/
    }
    {/*                    </div>*/
    }
    {/*                </div>*/
    }
    {/*            </div>*/
    }
    {/*        </div>*/
    }
    {/*        <section className="content">*/
    }
    {/*            <div className="container-fluid">*/
    }
    {/*                <div className="row">*/
    }
    {/*                    <div className="col-sm-12"><h3>Currently Reading</h3></div>*/
    }
    {/*                </div>*/
    }
    {/*                <div className="row">*/
    }

    {/*                    {*/
    }
    {/*                        current_readings.map((reading, index) => {*/
    }
    {/*                            return (*/
    }
    {/*                                <Display key={index} reading={reading}/>*/
    }
    {/*                            )*/
    }
    {/*                        })*/
    }

    {/*                    }*/
    }
    {/*                </div>*/
    }
    {/*            </div>*/
    }
    {/*        </section>*/
    }
    {/*        <div className="row" style={{borderBottom: "1px solid black", padding: "10px"}}>*/
    }

    {/*        </div>*/
    }
    {/*        <section className="content mt-3">*/
    }
    {/*            <div className="container-fluid">*/
    }

    {/*                <div className="row">*/
    }
    {/*                    <div className="col-sm-12">*/
    }
    {/*                        <h3>Latest Reads</h3>*/
    }
    {/*                    </div>*/
    }
    {/*                    {*/
    }
    {/*                        latest_readings.map((reading, index) => {*/
    }
    {/*                            return (*/
    }
    {/*                                <Display key={index} reading={reading}/>*/
    }
    {/*                            )*/
    }
    {/*                        })*/
    }

    {/*                    }*/
    }
    {/*                </div>*/
    }
    {/*            </div>*/
    }
    {/*        </section>*/
    }
    {/*    </div>*/
    }
    {/*</div>*/
    }
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
                    <div className="col-lg-3">
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
                        {
                            latest_readings.map((reading, index) => {
                                return <div className="col-lg-6"><Display key={index} reading={reading}/></div>
                            })
                        }

                        <div className="card card-primary card-outline">
                            <div className="card-header">
                                <h5 className="m-0">Featured</h5>
                            </div>
                            <div className="card-body">
                                <h6 className="card-title">Special title treatment</h6>

                                <p className="card-text">With supporting text below as a natural lead-in to additional
                                    content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default DisplayPage;