import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function UserVerificationPage() {
    let { token } = useParams();
    // const [msg, setMsg] = useState('')

    // useEffect(() => {
    //
    // }, []);


    return <div className="content-wrapper" style={{marginLeft: 40}}>
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0">Verification Page</h1>
                    </div>
                    <div className="col-sm-6">

                    </div>
                </div>
            </div>
        </div>

        <div className="content">
            <div className="container-fluid">
                <div className="row">

                </div>
            </div>
        </div>
    </div>
}