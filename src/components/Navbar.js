import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Auth } from "../App";

export default function Navbar(){
    const {user,logout} = useContext(Auth)
    return(
        <div>
            <Link to ='/'>Home</Link>
            {!user ? (<Link to ='/login'>Login</Link>):<p onClick={logout}>Logout</p>}

            {user && <p>Hello {user.username}</p>}
        </div>
    )
}