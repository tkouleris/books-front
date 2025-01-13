import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {display_page} from "../utils/http.jsx";

function DisplayPage() {
    let { username } = useParams();
    useEffect(() => {
        document.title = 'Display - ' + username;
        display_page(username).then(res => console.log(res));
    }, []);

    return <div>
        Hello
    </div>
}

export default DisplayPage;