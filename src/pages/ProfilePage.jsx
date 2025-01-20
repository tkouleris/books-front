import Header from "../components/Header.jsx";
import SideNav from "../components/SideNav.jsx";
import Footer from "../components/Footer.jsx";
import {useEffect, useState} from "react";
import {fetchProfile, storeProfile} from "../utils/http.jsx";

function ProfilePage() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState()
    const [password, setPassword] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [userId, setUserId] = useState(null)
    const [avatarChanged, setAvatarChanged] = useState(false)

    useEffect(() => {
        document.title = 'My Books - Profile';

        fetchProfile(window.localStorage.token).then(res=>{
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

    const handleAvatarChange = (e) => {
        if (e.target.files) {
            setAvatar(e.target.files[0]);
            setAvatarChanged(true)
        }
    };

    function handleSubmit(event){
        event.preventDefault();

        let formdata = new FormData();
        formdata.append("email", email)
        formdata.append("username", username)

        if(password !== null){
            formdata.append("password", password)
        }

        if(avatar !== null){
            formdata.append("file", avatar);
        }

        storeProfile(window.localStorage.token, formdata).then(res =>{
            window.localStorage.avatar = res.data.avatar;
            window.location.reload();
        })
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
                                            <label htmlFor="username">Username</label>
                                            <input type="text" className="form-control" id="username"
                                                   value={username}
                                                   onChange={e => setUsername(e.target.value)}
                                                   placeholder="Enter username"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email address</label>
                                            <input type="email" className="form-control" id="email"
                                                   value={email}
                                                   onChange={e => setEmail(e.target.value)}
                                                   placeholder="Enter email"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control" id="password"
                                                   onChange={e => setPassword(e.target.value)}
                                                   placeholder="Password"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputFile">Avatar</label>
                                            <div className="input-group">
                                                <input id="file" type="file" onChange={handleAvatarChange} />
                                            </div>
                                            {avatarChanged &&
                                                <p><strong>
                                                    Save to upload the image
                                                </strong></p>
                                            }
                                            {!avatarChanged &&
                                                avatar_image
                                            }
                                        </div>
                                    </div>


                                    <div className="card-footer">
                                        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Save
                                        </button>
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