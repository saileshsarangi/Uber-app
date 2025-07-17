import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CaptainSignup() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)


  const submitHandler = async(e) => {
    e.preventDefault();
    console.log(email, password, firstName, lastName)
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')

  }


  return (
    <div className='p-7 h-screen flex flex-col justify-between  '>
      <img className='w-16 mb-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' />
      <div className=" p-6 rounded-xl ">
        <form onSubmit={(e) => {
          submitHandler(e);
        }}>
          <h3 className='text-xl mb-2 mt-4 font-medium  w-full'>what is our Captain's name </h3>
          <div className='flex gap-2 mb-4 '>
            <input
              required
              placeholder='firstname'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
              className='bg-[#eeee] rounded px-4 py-2   w-1/2 h-10 text-base placeholder:text-sm'
            />
            <input
              required
              placeholder='lastname'
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
              className='bg-[#eeee] rounded px-4 py-2  w-1/2 h-10 text-base placeholder:text-sm'
            />
          </div>
          <h3 className='text-xl mb-2 mt-4 font-medium'>what is your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#eeee] rounded px-4 py-2  w-full text-base placeholder:text-sm'
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
            className='bg-[#eeee] rounded px-4 py-2 mb-5  w-full text-base placeholder:text-sm'
            placeholder='password' />

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Create Captain Account</button>
          <p className='font-semibold text-center'>Already having account?<Link to='/captain-login' className=' text-blue-700 underline'>go to login</Link></p>
        </form>
      </div>
      <div>
        <p className='text-[2pxl] justify-center leading-5'>
          We collect your location, contact, and trip details to enhance service experience.
          Your data is stored securely and used only for operational and safety purposes.
          We do not sell your personal information to third parties.
        </p>
      </div>
    </div>
  )
}

export default CaptainSignup