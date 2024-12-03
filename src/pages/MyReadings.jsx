import Header from "../components/Header.jsx";
import SideNav from "../components/SideNav.jsx";
import Footer from "../components/Footer.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteReading, fetchReadings} from "../utils/http.jsx";

function MyReadings(){
    const navigate = useNavigate();
    const [readings, setReadings] = useState([])

    useEffect(() => {
        document.title = 'My Readings';
        fetchReadings(window.localStorage.token).then(res =>{setReadings(res.data.data)})
    }, []);

    function deleteHandler(id) {
        if (confirm('Are you sure you want to delete this reading?')) {
            deleteReading(window.localStorage.token, id).then(res => {
                if (res.data.success) {
                    fetchReadings(window.localStorage.token).then(res =>{setReadings(res.data.data)})
                }
            })
        }
    }

    function goToEditReading(readId) {
        navigate('/reading-form/' + readId);
    }

    function goToReadingsForm(){
        navigate('/reading-form');
    }

    return <div className="wrapper">
        <Header/>
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">
                                My Readings
                                <button type="button" style={{marginLeft: 10}} onClick={goToReadingsForm}
                                        className="btn btn-success">
                                    <i className="fas fa-plus-square"></i>
                                </button>

                            </h1>
                        </div>

                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">

                        {
                            readings.map((reading, index) => {
                                let ended = 'currently reading'
                                if(reading.ended !== ' - '){
                                    ended = reading.ended
                                }
                                return (
                                    <div key={index} className="col-md-3">
                                        <div className="card card-primary">
                                            <div className="card-header">
                                                <h3 className="card-title">{reading.book.title}</h3>
                                            </div>
                                            <div className="card-body">
                                                <img alt={reading.book.title} style={{width: '100%', height: 400}} src={reading.book.image}/>
                                            </div>
                                            <div className="card-footer" style={{textAlign: 'right'}}>
                                                <div className="row">
                                                    <div className="col-sm-12" style={{textAlign: 'left',}}>
                                                        <b>started:</b> {reading.started}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-8" style={{textAlign: 'left',paddingTop: 10}}>
                                                        <b>ended:</b> {ended}
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <a className="btn btn-default"
                                                           style={{marginRight: 5}} href=""
                                                           onClick={() => goToEditReading(reading.id)}><i
                                                            className="fas fa-edit"></i>
                                                        </a>
                                                        <a className="btn btn-danger" href=""
                                                           onClick={() => deleteHandler(reading.id)}>
                                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                                        </a>
                                                    </div>
                                                </div>
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
        <SideNav/>
        <Footer/>
    </div>
        ;
}

export default MyReadings