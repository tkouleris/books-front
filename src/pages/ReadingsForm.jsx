import Header from "../components/Header.jsx";
import SideNav from "../components/SideNav.jsx";
import Footer from "../components/Footer.jsx";

function ReadingsForm(){
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
                                    {/*<div className="card-body">*/}
                                    {/*    <div className="form-group">*/}
                                    {/*        <label htmlFor="exampleInputEmail1">Title</label>*/}
                                    {/*        <input type="text" className="form-control" value={title}*/}
                                    {/*               onChange={(e) => setTitle(e.target.value)} id="book_title"*/}
                                    {/*               placeholder="book title"/>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="form-group">*/}
                                    {/*        <label htmlFor="exampleFormControlTextarea1">Description</label>*/}
                                    {/*        <textarea className="form-control" value={description}*/}
                                    {/*                  onChange={(e) => setDescription(e.target.value)}*/}
                                    {/*                  id="exampleFormControlTextarea1"*/}
                                    {/*                  rows="3"></textarea>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="form-group">*/}
                                    {/*        <label htmlFor="exampleInputFile">Book Cover</label>*/}
                                    {/*        <div className="input-group">*/}
                                    {/*            <input id="file" type="file" onChange={handleFileChange}/>*/}
                                    {/*        </div>*/}
                                    {/*        {book_image}*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}


                                    {/*<div className="card-footer">*/}
                                    {/*    <button type="button" className="btn btn-primary" onClick={handleStoreBook}>Save</button>*/}
                                    {/*</div>*/}
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