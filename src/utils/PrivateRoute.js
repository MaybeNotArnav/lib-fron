import React, { useContext } from "react"
import {Route, Navigate} from 'react-router-dom'
import {Auth} from '../App.js' 

const PrivateRoute = ({children}) => { 
    const isAuthenticated = useContext(Auth)
    console.log('Worjs')
    return !isAuthenticated ? <Navigate to='/login'></Navigate> :children
}

export default PrivateRoute