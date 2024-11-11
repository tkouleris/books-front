import {useEffect} from "react";
import {fetchDashboard} from "../utils/http.jsx";

function DashboardPage(){

    useEffect(() => {
        fetchDashboard(window.localStorage.token, window.localStorage.username).then((response)=>{
            console.log(response)
        })
    }, []);



    return <div>Dashboard</div>;
}

export default DashboardPage;