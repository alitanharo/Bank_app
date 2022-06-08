import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MainContext } from "../context/Provider";
import HttpService from "../util/HttpService";
import { useNavigate } from 'react-router'
const Header = () => {

    const { profile, handleGetProfile } = useContext(MainContext)
    const navigate = useNavigate()
    const handleLogOut = async () => {
        try {
            await HttpService.get("/api/logout")
            handleGetProfile()
            navigate("/", { replace: true })
        } catch (ex) { }
    }




    return (
        <header className="box">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="flex-grow-1">
                        <NavLink to={"/"} className="text-decoration-none navbar-brand" >XSS BANK</NavLink>
                    </div>
                    <div className="d-flex" id="navbarNavAltMarkup">
                        <div className="">
                            <NavLink to={"/"} className='mx-3' style={{ textDecoration: "none" }}>Home</NavLink>
                            {!profile ?
                                <>
                                    <NavLink to={"/signUp"} className='mx-3' style={{ textDecoration: "none" }}>Sign Up</NavLink>
                                    <NavLink to={"/login"} className='mx-3' style={{ textDecoration: "none" }}>Login</NavLink>

                                </> :

                                <NavLink to={"/profile"} className='mx-3' style={{ textDecoration: "none" }}>Profile</NavLink>
                            }
                        </div>
                        {profile &&
                            <p className='mx-3 ' style={{ textDecoration: "none", cursor: "pointer" }} onClick={handleLogOut}>Log Out</p>
                        }
                    </div>
                </div>
            </nav>
        </header >
    );
}

export default Header;