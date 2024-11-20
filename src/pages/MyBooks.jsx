import Header from "../components/Header.jsx";
import SideNav from "../components/SideNav.jsx";
import Footer from "../components/Footer.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchBooks} from "../utils/http.jsx";

function MyBooks(){
    const [books, setBooks] = useState([])
    useEffect(() => {
        document.title = 'My Books';
        fetchBooks(window.localStorage.token).then(res =>{
            console.log(res.data.data)
            setBooks(res.data.data)
        })
    }, []);

    const navigate = useNavigate();
    function goToBookForm(){
        navigate('/book');
    }

    function goToEditBook(bookId){
        navigate('/book/' + bookId);
    }

    return <div className="wrapper">
        <Header/>
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">

                            <h1 className="m-0">My Books
                                <button type="button" style={{marginLeft: 10}} onClick={goToBookForm} className="btn btn-success">
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
                                books.map((book, index)=> {
                                    return (
                                        <div className="col-md-3">
                                        <div className="card card-primary">
                                            <div className="card-header">
                                                <h3 className="card-title">{book.title}</h3>
                                            </div>
                                            <div className="card-body">
                                                <img style={{width: '100%', height:400}} src={book.image} />
                                            </div>
                                            {/*<div className="card-footer">*/}
                                            {/*    {book.description}*/}
                                            {/*</div>*/}
                                            <div className="card-footer" style={{textAlign: 'right'}}>
                                                <a className="btn btn-default" onClick={() => goToEditBook(book.id)}
                                                   style={{marginRight: 5}} href="#"><i className="fas fa-edit"></i></a>
                                                <a className="btn btn-danger" href="#"><i className="fa fa-trash"
                                                                                          aria-hidden="true"></i></a>
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
    </div>;
}

export default MyBooks;