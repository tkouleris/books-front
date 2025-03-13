import {useEffect, useState} from "react";
import {dashboard_data} from "../utils/http.jsx";
import Header from "../components/Header.jsx";
import SideNav from "../components/SideNav.jsx";
import Footer from "../components/Footer.jsx";
import '../../public/dist/js/pages/dashboard.js'
import $ from 'jquery';

function DashboardPage(){

    const [totalBooks, setTotalBooks] = useState(0)
    const [totalCurrentlyReading, setTotalCurrentlyReading] = useState(0)
    const [totalToRead, setTotalToRead] = useState(0)
    const [readPercentage, setReadPercentage] = useState()
    const [chartData, setChartData] = useState({
        'labels': [],
        'data':[],
    })

    var salesChartCanvas = $('#revenue-chart-canvas')

    var salesChartData = {
        labels: chartData.labels,
        datasets: [
            {
                backgroundColor: 'rgba(60,141,188,0.9)',
                borderColor: 'rgba(60,141,188,0.8)',
                pointRadius: false,
                pointColor: '#3b8bba',
                pointStrokeColor: 'rgba(60,141,188,1)',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(60,141,188,1)',
                data: chartData.data
            },
        ]
    }

    var salesChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                gridLines: {
                    display: false
                }
            }]
        }
    }

    // This will get the first returned node in the jQuery collection.
    // eslint-disable-next-line no-unused-vars
    var salesChart = new Chart(salesChartCanvas, { // lgtm[js/unused-local-variable]
        type: 'bar',
        data: salesChartData,
        options: salesChartOptions
    })

    useEffect(() => {
        let bodyElement = document.getElementsByTagName('body')[0];
        bodyElement.className = "hold-transition sidebar-mini layout-fixed";
        document.title = 'Books - Dashboard';

        dashboard_data(window.localStorage.token).then((response)=>{
            setTotalBooks(response.data.data.total_books)
            setTotalCurrentlyReading(response.data.data.total_currently_reading)
            setTotalToRead(response.data.data.total_to_read_books)
            setReadPercentage(response.data.data.read_percentage)
            setChartData(response.data.data.char_data)
        })
    }, []);

    return <div className="wrapper">
        <Header/>
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Dashboard</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-info">
                                <div className="inner">
                                    <h3>{totalBooks}</h3>
                                    <p>Total Books</p>
                                </div>
                                <div className="icon">
                                    <i className="ion-ios-book-outline"/>
                                </div>
                                <div style={{height: 30}}></div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-success">
                                <div className="inner">
                                    <h3>
                                        {totalCurrentlyReading}
                                    </h3>
                                    <p>Currently Reading</p>
                                </div>
                                <div className="icon">
                                    <i className="ion-ios-bookmarks-outline"/>
                                </div>
                                <div style={{height: 30}}></div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-warning">
                                <div className="inner">
                                    <h3>{totalToRead}</h3>
                                    <p>Books In Reading List</p>
                                </div>
                                <div className="icon">
                                    <i className="ion-ios-list-outline"/>
                                </div>
                                <div style={{height: 30}}></div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-danger">
                                <div className="inner">
                                    <h3>{readPercentage}%</h3>
                                    <p>Read Percentage</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-pie-graph"/>
                                </div>
                                <div style={{height: 30}}></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <section className="col-lg-12 connectedSortable">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <i className="fas fa-chart-pie mr-1"/>
                                        Books Per Year
                                    </h3>

                                </div>
                                <div className="card-body">
                                    <div className="tab-content p-0">
                                        <div
                                            className="chart tab-pane active"
                                            id="revenue-chart"
                                            style={{position: "relative", height: 300}}
                                        >
                                            <canvas
                                                id="revenue-chart-canvas"
                                                height={300}
                                                style={{height: 300}}
                                            />
                                        </div>
                                        <div
                                            className="chart tab-pane"
                                            id="sales-chart"
                                            style={{position: "relative", height: 300}}
                                        >
                                            <canvas
                                                id="sales-chart-canvas"
                                                height={300}
                                                style={{height: 300}}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </section>

                    </div>
                </div>
            </section>
        </div>
        <SideNav/>
        <Footer/>
    </div>;
}

export default DashboardPage;