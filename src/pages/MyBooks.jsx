import Header from "../components/Header.jsx";
import SideNav from "../components/SideNav.jsx";
import Footer from "../components/Footer.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteBook, fetchBooks} from "../utils/http.jsx";

function MyBooks() {
    const navigate = useNavigate();

    const [books, setBooks] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        document.title = 'My Books';
        fetchBooks(window.localStorage.token, 1).then(res => {
            setBooks(res.data.data.books)
            setCurrentPage(res.data.data.current_page)
            setTotalPages(res.data.data.total_pages)
        })
    }, []);


    function goToBookForm() {
        navigate('/book');
    }

    function deleteHandler(id) {
        if (confirm('Are you sure you want to delete this book?')) {
            deleteBook(window.localStorage.token, id).then(res => {
                if (res.data.success) {
                    fetchBooks(window.localStorage.token).then(res => {
                        setBooks(res.data.data)
                    })
                }
            })
        }
    }

    function goToEditBook(bookId) {
        navigate('/book/' + bookId);
    }

    function paginationHtml(){
        let html = []
        for(let page=1; page <= totalPages; page++){
            console.log(page)
            html.push("<b>" + page + "</b>");
        }
        return html
    }

    return <div className="wrapper">
        <Header/>
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">

                            <h1 className="m-0">My Books
                                <button type="button" style={{marginLeft: 10}} onClick={goToBookForm}
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
                            books.map((book, index) => {
                                return (
                                    <div key={index} className="col-md-3">
                                        <div className="card card-primary">
                                            <div className="card-header">
                                                <h3 className="card-title">{book.title}</h3>
                                            </div>
                                            <div className="card-body">
                                                <img alt={book.title} style={{width: '100%', height: 400}}
                                                     src={book.image}/>
                                            </div>
                                            <div className="card-footer" style={{textAlign: 'right'}}>
                                                <a className="btn btn-default" onClick={() => goToEditBook(book.id)}
                                                   style={{marginRight: 5}}><i className="fas fa-edit"></i></a>
                                                <a className="btn btn-danger"
                                                   onClick={() => deleteHandler(book.id)}>
                                                    <i className="fa fa-trash" aria-hidden="true"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })

                        }

                    </div>
                    <div className="row">
                        {paginationHtml()}
                    </div>
                </div>

            </section>
        </div>
        <SideNav/>
        <Footer/>
    </div>;
}

export default MyBooks;