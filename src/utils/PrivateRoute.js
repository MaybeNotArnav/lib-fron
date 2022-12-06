import React, { useContext } from "react"
import {Route, Navigate} from 'react-router-dom'
import {Auth} from '../App.js' 

const PrivateRoute = ({children}) => { 
    let {user} = useContext(Auth)
    console.log('Worjs')
    return !user ? <Navigate to='/login'></Navigate> :children
}

export default PrivateRoute