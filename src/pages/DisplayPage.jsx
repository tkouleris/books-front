import {useEffect} from "react";
import {useParams} from "react-router-dom";

function DisplayPage() {
    let { username } = useParams();
    useEffect(() => {
        document.title = 'Display - ' + username;
    }, []);

    return <div>
        Hello
    </div>
}

export default DisplayPage;