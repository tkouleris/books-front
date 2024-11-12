import Header from "../components/Header.jsx";
import SideNav from "../components/SideNav.jsx";
import Footer from "../components/Footer.jsx";
import {useNavigate} from "react-router-dom";

function MyBooks(){
    const navigate = useNavigate();
    function goToBookForm(){
        navigate('/book');
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
                        <div className="col-md-12">

                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Quick Example</h3>
                                </div>

                                <form>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1"
                                                   placeholder="Enter email"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Password</label>
                                            <input type="password" className="form-control" id="exampleInputPassword1"
                                                   placeholder="Password"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputFile">File input</label>
                                            <div className="input-group">
                                                <div className="custom-file">
                                                    <input type="file" className="custom-file-input"
                                                           id="exampleInputFile"/>
                                                    <label className="custom-file-label" htmlFor="exampleInputFile">Choose
                                                        file</label>
                                                </div>
                                                <div className="input-group-append">
                                                    <span className="input-group-text">Upload</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                            <label className="form-check-label" htmlFor="exampleCheck1">Check me
                                                out</label>
                                        </div>
                                    </div>


                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-primary">Submit</button>
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

export default MyBooks;