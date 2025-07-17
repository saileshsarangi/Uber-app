import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
function UserLogout() {

    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
       headers:{
        Authorization: `Bearer ${token}`
       }

    }).then((response)=>{
        navigate('/user-login')
    })
  return (
    <div>UserLogout</div>
  )
}

export default UserLogout