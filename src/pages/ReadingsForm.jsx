import Header from "../components/Header.jsx";
import SideNav from "../components/SideNav.jsx";
import Footer from "../components/Footer.jsx";
import {useEffect, useState} from "react";
import {fetchBooks} from "../utils/http.jsx";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function ReadingsForm(){
    const [started, setStarted] = useState()
    const [ended, setEnded] = useState()
    const [bookId, setBookId] = useState()
    const [readingId, setReadingId] = useState()
    const [books, setBooks] = useState([])

    useEffect(() => {
        document.title = 'My Books';
        fetchBooks(window.localStorage.token).then(res =>{
            setBooks(res.data.data)
        })
    }, []);

    return <div className="wrapper">
        <Header/>
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Reading</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title"></h3>
                                </div>

                                <form>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="exampleSelectRounded0">Book </label>
                                            <select className="custom-select rounded-0" id="exampleSelectRounded0">
                                                {
                                                    books.map((book, index) => {
                                                        return <option key={book.id} value={book.id}
                                                                       style={{backgroundImage: book.image}}>
                                                            {book.title}

                                                        </option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Started:</label>
                                            <div>
                                                <DatePicker selected={started} onChange={(date) => setStarted(date)}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Ended:</label>
                                            <div>
                                                <DatePicker selected={ended} onChange={(date) => setEnded(date)}/>
                                            </div>
                                        </div>
                                        {/*<div className="form-group">*/}
                                        {/*    <label>Started:</label>*/}
                                        {/*    <div className="input-group date" id="reservationdate"*/}
                                        {/*         data-target-input="nearest">*/}
                                        {/*        <input type="text" className="form-control datetimepicker-input"*/}
                                        {/*               data-target="#reservationdate"/>*/}
                                        {/*        <div className="input-group-append" data-target="#reservationdate"*/}
                                        {/*             data-toggle="datetimepicker">*/}
                                        {/*            <div className="input-group-text"><i className="fa fa-calendar"></i>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div className="form-group">*/}
                                        {/*    <label>Ended:</label>*/}
                                        {/*    <div className="input-group date" id="reservationdate"*/}
                                        {/*         data-target-input="nearest">*/}
                                        {/*        <input type="text" className="form-control datetimepicker-input"*/}
                                        {/*               data-target="#reservationdate"/>*/}
                                        {/*        <div className="input-group-append" data-target="#reservationdate"*/}
                                        {/*             data-toggle="datetimepicker">*/}
                                        {/*            <div className="input-group-text"><i className="fa fa-calendar"></i>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                    </div>


                                    <div className="card-footer">
                                        <button type="button" className="btn btn-primary">Save</button>
                                    </div>
                                </form>
                            </div>


                        </div>


                    </div>

                </div>

            </section>
        </div>
        <SideNav/>
        <Footer/>
    </div>;
}

export default ReadingsForm;