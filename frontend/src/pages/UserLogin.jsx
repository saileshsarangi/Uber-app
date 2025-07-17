import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserdata] = useState({});
  const navigate = useNavigate();
  const { user, setUser } =  useContext(UserDataContext)
  
  const submitHandler = async(e) => {
    e.preventDefault();
    const userData = {
      email : email,
      password:password
    }
    setUserdata({ email: email, password: password });
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)
    if(response.status===200)
    {
      const data = response.data
      console.log(response.data)
      setUser(data.user)
      console.log(data.token)
      localStorage.setItem('token',data.token)
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/home')
    }
    setEmail('');
    setPassword('');
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between  '>
      <img className='w-16 mb-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' />
      <div className=" p-6 rounded-xl ">
        <form onSubmit={(e) => {
          submitHandler(e);
        }}>
          <h3 className='text-xl mb-2 mt-4 font-medium'>what is your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className='bg-[#eeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />
          <h3 className='text-xl mb-2 font-medium'>Enter password</h3>
          <input
            required
            type='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className='bg-[#eeee] rounded px-4 py-2 mb-4 border w-full text-lg placeholder:text-base'
            placeholder='password' />
          <button
            className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base' >login</button>
          <p className='font-semibold text-center'>New here?<Link to='/User-signup' className=' text-blue-700 underline'>create new account</Link></p>
        </form>
      </div>
      <div>
        <Link
          to='/captain-login'
          className='bg-[#948979] flex items-center justify-center text-white font-semibold mb-10 rounded px-4 py-2   w-full text-lg placeholder:text-base'
        >Sign in as captain</Link>
      </div>
    </div>
  )
}

export default UserLogin