import React, { useContext, useState } from "react";
import {Auth} from '../App.js';

export default function Login()
{
    // let auth = useContext(Auth)
    const {login} = useContext(Auth)
    console.log(login)
    return(
        <div>
            <form onSubmit={login}>
            <input type='text' placeholder="Username" name="username"></input>
            <input type='password' placeholder="Password" name="password"></input>
            <input type='submit'></input>
            </form>
        </div>
    )
}