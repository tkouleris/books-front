import Header from "../components/Header.jsx";
import SideNav from "../components/SideNav.jsx";
import Footer from "../components/Footer.jsx";

function MyReadings(){
    return <div className="wrapper">
        <Header/>
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">My Readings</h1>
                        </div>

                    </div>
                </div>
            </div>
            <section className="content">
                My Readings
            </section>
        </div>
        <SideNav/>
        <Footer/>
    </div>;
}

export default MyReadings