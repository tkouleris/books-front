import Header from "../components/Header.jsx";
import SideNav from "../components/SideNav.jsx";
import Footer from "../components/Footer.jsx";
import {useEffect, useState} from "react";
import {deleteReading, fetchBook, storeBook} from "../utils/http.jsx";
import {useNavigate, useParams} from "react-router-dom";

function BookForm() {
    const navigate = useNavigate();

    let { id } = useParams();

    useEffect(() => {
        if(id !== undefined){
            fetchBook(window.localStorage.token, id).then(res=>{
                if(!res.data.success){
                    navigate('/404')
                }
                console.log(res.data);
                setDescription(res.data.data.book.description)
                setTitle(res.data.data.book.title)
                setBookId(res.data.data.book.id)
                setImageUrl(res.data.data.book.image)
                setBookReadings(res.data.data.readings)
                document.title = 'My Books - ' + res.data.data.book.title;
            })
        }
    }, []);

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [bookId, setBookId] = useState(null)
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null)
    const [book_readings, setBookReadings] = useState([])
    const [coverChanged, setCoverChanged] = useState(false)

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setCoverChanged(true)
        }
    };

    function handleStoreBook(){
        let formdata = new FormData();
        formdata.append("title", title);
        formdata.append("description", description);
        console.log(file)
        if(file !== null){
            formdata.append("file", file);
        }
        if(bookId !== null){
            formdata.append("book_id", bookId);
        }
        storeBook(window.localStorage.token, formdata).then(r => {
            navigate('/book/' + r.data.id)
            window.location.reload()
        });
    }

    function deleteHandler(id) {
        if (confirm('Are you sure you want to delete this reading?')) {
            deleteReading(window.localStorage.token, id).then(res => {
                if (res.data.success) {
                    fetchBook(window.localStorage.token, bookId).then(res=>{
                        setDescription(res.data.data.book.description)
                        setTitle(res.data.data.book.title)
                        setBookId(res.data.data.book.id)
                        setImageUrl(res.data.data.book.image)
                        setBookReadings(res.data.data.readings)
                        document.title = 'My Books - ' + res.data.data.book.title;
                    })
                }
            })
        }
    }

    let book_image = <p>Image Not Found</p>
    if(imageUrl !== null) {
        book_image = <img style={{width: 300, height: '100%'}} src={imageUrl}/>
    }

    function reading_sessions(){
        let html = ""
        if(book_readings.length > 0) {
            html = <div className="row" style={{paddingBottom: 40}}>
                <div className="col-md-12" style={{backgroundColor: "white", paddingLeft: 20}}>
                    <h3>Reading Sessions</h3>
                    <table style={{width: "30%"}}>
                        <tr>
                            <th style={{textAlign: "center"}}>AA</th>
                            <th style={{textAlign: "center"}}>Started</th>
                            <th style={{textAlign: "center"}}>Ended</th>
                            <th style={{textAlign: "center"}}>Action</th>
                        </tr>
                        {
                            book_readings.map((read, index) => {
                                return (
                                    <tr key={index} >
                                        <td style={{paddingTop: 20, paddingBottom: 20,textAlign: "center"}}>{index + 1}</td>
                                        <td style={{textAlign: "center"}}> {read.started}</td>
                                        <td style={{textAlign: "center"}}> {read.ended}</td>
                                        <td style={{textAlign: "center"}}>
                                            <button type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => deleteHandler(read.id)}
                                            >Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </table>
                </div>
            </div>
        }
        return html;
    }

    return <div className="wrapper">
        <Header/>
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Book</h1>
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
                                            <label htmlFor="exampleInputEmail1">Title</label>
                                            <input type="text" className="form-control" value={title}
                                                   onChange={(e) => setTitle(e.target.value)} id="book_title"
                                                   placeholder="book title"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlTextarea1">Description</label>
                                            <textarea className="form-control" value={description}
                                                      onChange={(e) => setDescription(e.target.value)}
                                                      id="exampleFormControlTextarea1"
                                                      rows="3"></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputFile">Book Cover</label>
                                            <div className="input-group">
                                                <input id="file" type="file" onChange={handleFileChange}/>
                                            </div>
                                            {/*{book_image}*/}
                                            {coverChanged &&
                                                <p><strong>
                                                    Save to upload the cover
                                                </strong></p>
                                            }
                                            {!coverChanged &&
                                                book_image
                                            }
                                        </div>
                                    </div>


                                    <div className="card-footer">
                                        <button type="button" className="btn btn-primary"
                                                onClick={handleStoreBook}>Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    { reading_sessions() }

                </div>

            </section>
        </div>
        <SideNav/>
        <Footer/>
    </div>;
}

export default BookForm;