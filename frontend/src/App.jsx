import { useContext, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import CaptainHome from './pages/CaptainHome'
import Start from './pages/Start'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup'
import Captainlogin from './pages/Captainlogin'
import Home from './pages/Home'
import { UserDataContext } from './context/UserContext'
import UserProctectWrapper from './pages/UserProctectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainProctectWrapper from './pages/CaptainProtectWrapper'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
function App() {
  const ans = useContext(UserDataContext)
  console.log(ans);

  return (
    <>
      <Routes>
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/home' element={
          <UserProctectWrapper>
            <Home />
          </UserProctectWrapper>} />
        <Route path='/captain-riding'element={<CaptainRiding/>}/>  
        <Route path='/riding' element={<Riding/>} />  
        <Route path='/User-signup' element={<UserSignup />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/captain-login' element={<Captainlogin />} />
        <Route path='/' element={<Start />} />
        <Route path='/logout' element={
          <UserProctectWrapper>
            <UserLogout />
          </UserProctectWrapper>} />
        <Route path='/captain-home' element={
          <CaptainProctectWrapper>
            <CaptainHome />
          </CaptainProctectWrapper>
        } />
      </Routes>
    </>
  )
}

export default App
