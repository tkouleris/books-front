import Header from "../components/Header.jsx";
import SideNav from "../components/SideNav.jsx";
import Footer from "../components/Footer.jsx";
import {useEffect, useState} from "react";
import {fetchBook, storeBook} from "../utils/http.jsx";
import {useNavigate, useParams} from "react-router-dom";

function BookForm() {
    const navigate = useNavigate();

    let { id } = useParams();

    useEffect(() => {
        if(id !== undefined){
            fetchBook(window.localStorage.token, id).then(res=>{
                console.log(res.data.data)
                setDescription(res.data.data.description)
                setTitle(res.data.data.title)
                setBook_id(res.data.data.id)
                setImageUrl(res.data.data.image)
            })
        }
    }, []);

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [book_id, setBook_id] = useState(null)
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null)

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    function handleStoreBook(){
        let formdata = new FormData();
        formdata.append("title", title);
        formdata.append("description", description);
        if(file !== null){
            formdata.append("file", file);
        }
        storeBook(window.localStorage.token, formdata).then(r => {
            navigate('/book/' + r.data.id)
        });
    }

    let book_image = <p>Image Not Found</p>
    if(imageUrl !== null) {
        book_image = <img style={{width: 300, height: '100%'}} src={imageUrl}/>
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
                                            {book_image}
                                        </div>
                                    </div>


                                    <div className="card-footer">
                                    <button type="button" className="btn btn-primary" onClick={handleStoreBook}>Save</button>
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

export default BookForm;