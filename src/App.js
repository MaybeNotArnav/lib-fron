import { Route, Routes,useNavigate} from 'react-router-dom';
import {createContext, useState} from 'react'
import './App.css';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import PrivateRoute from './utils/PrivateRoute';


import jwt_decode from 'jwt-decode'
import {parse, stringify, toJSON, fromJSON} from 'flatted';


export const Auth =createContext()

function App() {
  const {parse, stringify, toJSON, fromJSON} = require('flatted');

  const [user,setUser]= useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')):null)
  
  const [token,setToken]= useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')):null)

  let history = useNavigate()

  const login = async (e )=>{
    e.preventDefault()


    let response = await fetch('http://127.0.0.1:8000/bookshelf/token/',
    {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
    })


    let data = await response.json()
    console.log('data:',data)
    console.log('response:',response)

    if(response.status === 200){
      setToken(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authTokens',JSON.stringify(data))
      history('/')
    }
  }

  let logout = ()=>{
    setToken(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    history('/login')
  }

  const contextData ={
    user:user,
    token:token,
    logout:logout,
    login:login
    
  }
  return (
    <div>
    <Auth.Provider value={contextData}>

    
    <Navbar/>
    <Routes>

    <Route path='/' element={<PrivateRoute><HomePage></HomePage></PrivateRoute>}></Route>
    <Route path='/login' element={<Login></Login>}/>

    </Routes>
    
    </Auth.Provider>
    </div>
  );
}

export default App;
