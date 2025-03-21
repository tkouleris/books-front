import Header from "../components/Header.jsx";
import SideNav from "../components/SideNav.jsx";
import Footer from "../components/Footer.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {addToToReadList, deleteBook, deleteFromToReadList, fetchBooks} from "../utils/http.jsx";

function MyBooks() {
    const navigate = useNavigate();

    const [books, setBooks] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [searchTitle, setSearchTitle] = useState()

    useEffect(() => {
        document.title = 'Books';
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

    function pageHandler(event, page) {
        event.preventDefault()
        setCurrentPage(page)
        fetchBooks(window.localStorage.token, page).then(res => {
            setBooks(res.data.data.books)
            setCurrentPage(res.data.data.current_page)
            setTotalPages(res.data.data.total_pages)
        })
    }

    function handleSearch(){
        fetchBooks(window.localStorage.token, 1, searchTitle).then(res => {
            setBooks(res.data.data.books)
            setCurrentPage(res.data.data.current_page)
            setTotalPages(res.data.data.total_pages)
        })
    }

    function addToReadListHandler(bookId){
        addToToReadList(window.localStorage.token, bookId).then(() => {
            fetchBooks(window.localStorage.token, currentPage).then(res => {
                setBooks(res.data.data.books)
                setCurrentPage(res.data.data.current_page)
                setTotalPages(res.data.data.total_pages)
            })
        })
    }

    function removeFromReadListHandler(bookId){
        deleteFromToReadList(window.localStorage.token, bookId).then(() => {
            fetchBooks(window.localStorage.token, currentPage).then(res => {
                setBooks(res.data.data.books)
                setCurrentPage(res.data.data.current_page)
                setTotalPages(res.data.data.total_pages)
            })
        })
    }

    function toReadIcon(book){
        if(book.toread) {
            return <a className="btn btn-default"
                      style={{marginRight: 5, color: "#ff0000"}}
                      onClick={() => removeFromReadListHandler(book.id)}
            >
                <i className="fas fa-heart"></i>
            </a>
        } else {
            return <a className="btn btn-default"
               style={{marginRight: 5, color: "#808080"}}
               onClick={() => addToReadListHandler(book.id)}
            >
                <i className="fas fa-heart"></i>
            </a>
        }
    }

    const listItems = [];

    for (let page = 1; page <= totalPages; page++) {
        if (page === currentPage) {
            listItems.push(<div onClick={(e) => pageHandler(e, page)} style={{paddingLeft: 5, paddingRight: 5}}><u><b><a
                href="" key={page}>{page}</a></b></u></div>);
        } else {
            listItems.push(<div onClick={(e) => pageHandler(e, page)} style={{paddingLeft: 5, paddingRight: 5}}><a
                href="" key={page}>{page}</a></div>);
        }
    }

    return <div className="wrapper">
        <Header/>
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-3">

                            <h1 className="m-0">My Books
                                <button type="button" style={{marginLeft: 10}} onClick={goToBookForm}
                                        className="btn btn-success">
                                    <i className="fas fa-plus-square"></i>
                                </button>
                            </h1>
                        </div>
                        <div className="col-sm-6">
                            <div className="input-group rounded">
                                <input type="search" className="form-control rounded"
                                       onChange={(e) => setSearchTitle(e.target.value)}
                                       onKeyDown={(e) => {
                                    if (e.key === "Enter")
                                        handleSearch();
                                }} placeholder="Search"
                                       aria-label="Search" aria-describedby="search-addon"/>
                                <span className="input-group-text border-0" id="search-addon">
                                    <i className="fas fa-search"></i>
                                </span>
                            </div>
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
                                                {toReadIcon(book)}
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
                        <div onClick={(e) => pageHandler(e, 1)} style={{paddingLeft: 5, paddingRight: 5}}><a
                            href="">Start</a></div>
                        {listItems}
                        <div onClick={(e) => pageHandler(e, totalPages)} style={{paddingLeft: 5, paddingRight: 5}}><a
                            href="">End</a></div>
                    </div>
                </div>

            </section>
        </div>
        <SideNav/>
        <Footer/>
    </div>;
}

export default MyBooks;