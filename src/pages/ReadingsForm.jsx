import Header from "../components/Header.jsx";
import SideNav from "../components/SideNav.jsx";
import Footer from "../components/Footer.jsx";
import {useEffect, useState} from "react";
import {fetchBooks} from "../utils/http.jsx";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function ReadingsForm(){
    const [started, setStarted] = useState(null)
    const [ended, setEnded] = useState(null)
    const [bookId, setBookId] = useState()
    const [readingId, setReadingId] = useState(null)
    const [books, setBooks] = useState([])

    const zeroPad = (num, places) => String(num).padStart(places, '0')

    useEffect(() => {
        document.title = 'My Books';
        fetchBooks(window.localStorage.token).then(res =>{
            setBooks(res.data.data)
            setBookId(res.data.data[0].id)
        })
    }, []);

    function handleSubmit(){
        let data = []
        if(started !== null){
            data['started'] = started.getFullYear() +"-"+zeroPad((started.getMonth() + 1),2)+"-"+zeroPad(started.getDate(),2)
        }
        if(ended !== null){
            data['ended'] = ended.getFullYear() +"-"+zeroPad((ended.getMonth() + 1),2)+"-"+zeroPad(ended.getDate(),2)
        }
        data['bookId'] = bookId
        if(readingId !== null){
            data['reading_id'] = readingId
        }
        console.log(data)
    }

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
                                            <select className="custom-select rounded-0"
                                                    id="slc_book"
                                                    onChange={e => setBookId(e.target.value)}
                                            >
                                                {
                                                    books.map((book, index) => {
                                                        return <option key={book.id} value={book.id}
                                                                       style={{backgroundImage: book.image}}
                                                        >
                                                            {book.title}

                                                        </option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Started:</label>
                                            <div>
                                                <DatePicker
                                                    selected={started}
                                                    onChange={(date) => setStarted(date)}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Ended:</label>
                                            <div>
                                                <DatePicker
                                                    selected={ended}
                                                    onChange={(date) => setEnded(date)}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button type="button" onClick={handleSubmit} className="btn btn-primary">Save</button>
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