import Header from "../components/Header.jsx";
import SideNav from "../components/SideNav.jsx";
import Footer from "../components/Footer.jsx";
import {useEffect, useState} from "react";
import {fetchProfile} from "../utils/http.jsx";

function ProfilePage() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState()
    const [avatar, setAvatar] = useState(null)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        document.title = 'My Books - Profile';

        fetchProfile(window.localStorage.token).then(res=>{
            console.log(res)
            setEmail(res.data.data.email)
            setUsername(res.data.data.username)
            setAvatar(res.data.data.avatar)
            setUserId(res.data.data.id)
        })
    }, []);

    let avatar_image = <p>Image Not Found</p>
    if(avatar !== null) {
        avatar_image = <img style={{width: 300, height: '100%'}} src={avatar}/>
    }

    return <div className="wrapper">
        <Header/>
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Profile</h1>
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
                                    <h3 className="card-title">{username}</h3>
                                </div>

                                <form>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1"
                                                   value={email}
                                                   placeholder="Enter email"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Password</label>
                                            <input type="password" className="form-control" id="exampleInputPassword1"
                                                   placeholder="Password"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputFile">Avatar</label>
                                            <div className="input-group">
                                                <input id="file" type="file" />
                                            </div>
                                            {avatar_image}
                                        </div>
                                    </div>


                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-primary">Save</button>
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

export default ProfilePage;