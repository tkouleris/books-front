import {useParams} from "react-router-dom";

export default function UserVerificationPage() {
    let { token } = useParams();

    return <div>
        User Verification Page {token}
    </div>
}