import React, { useRef, useState,useContext,useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import WaitingForDriver from '../components/WaitingForDriver'
import LookingForDriver from '../components/LookingForDriver'
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import LiveTracking from '../components/LiveTracking';
function Home() {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setpanelOpen] = useState(false)
  const panelRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const panelCloseRef = useRef(null)
  const { user } = useContext(UserDataContext)
  console.log(user)
  const navigate = useNavigate();
  const [distance, setDistance] = useState(0);
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [vehiclePanelOPen, setVehiclePanelOpen] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false)
  const [activefield, setActivefield] = useState(null);
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [Ride,setRide]=useState(null);
  const { socket } = useContext(SocketContext)
  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id })
  }, [user])

  socket.on('ride-confirmed', ride => {
    setVehicleFound(false)
    setWaitingForDriverPanel(true)
    setRide(ride)

    console.log("data is caught",ride);
  })

  socket.on('ride-started', ride => {
    console.log("ride")
    setWaitingForDriverPanel(false)
    navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
  })


  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    console.log(localStorage.getItem('token'));
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggesations`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response)
      setPickupSuggestions(response.data)
    } catch (err) {
      console.log(err);
    }
  }


  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    console.log(localStorage.getItem('token'));
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggesations`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response)
      setDestinationSuggestions(response.data)
    } catch (err) {
      console.log(err);
    }
  }



  // const submitHandler = (e) => {
  //   e.preventDefault();

  // }


  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        opacity: 1
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    }
    else {
      gsap.to(panelRef.current, {
        height: '0%',
        opacity: 0
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  useGSAP(function () {
    if (vehiclePanelOPen) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanelOPen])

  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  useGSAP(function () {
    if (waitingForDriverPanel) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriverPanel])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])

  const findtrip = async () => {
    setpanelOpen(false)
    setVehiclePanelOpen(true);
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setFare(response.data.fare);
    setDistance(response.data.km);
  }

  const createRide = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,
        { pickup, destination, vehicleType },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      console.log(response.data);
    }
    catch (err) {
      console.log(err)
    }

  }
  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div className='h-screen w-screen absolute top-0 left-0 -z-10'>
        <LiveTracking/>
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full ' >
        <div className='h-[30%] p-5 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => {
            setpanelOpen(false)
          }} className='absolute opacity-0 top-3 right-2 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <div className="line absolute h-16 w-1 top-[35%] bg-gray-500 left-10"></div>
          <input
            onClick={() => {
              setpanelOpen(true);
              setActivefield('pickup');
            }}
            value={pickup}
            onChange={handlePickupChange}
            className='bg-[#eeee] px-12 py-2 text-base rounded-lg w-full mt-5'
            type='text'
            placeholder='add a pickup location'
          />
          <input
            onClick={() => {
              setpanelOpen(true);
              setActivefield('destination')
            }}
            value={destination}
            onChange={
              handleDestinationChange
            }
            className='bg-[#eeee] px-12 py-2 text-base rounded-lg w-full mt-3'
            type='text'
            placeholder='enter destination'
          />
          <div className='flex flex-row justify-center items-center space-x-4 m-4'>
            <button
              onClick={() => {
                findtrip();
              }}
              className='bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-lg shadow-md'>
              Find Trip
            </button>
            <button
              onClick={() => {
                setpanelOpen(false)
              }}
              className='bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md'>
              Go Back
            </button>
          </div>

        </div>
        <div ref={panelRef} className='h-[70%] bg-white p-5 opacity-0'>
          <LocationSearchPanel
            suggestions={activefield === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setpanelOpen={setpanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activefield={activefield}
            setVehiclePanelOpen={setVehiclePanelOpen} />

        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed  w-full z-10 bottom-0 p-3 bg-white py-10 px-3 translate-y-full pt-12'>
        <VehiclePanel
          setVehicleType={setVehicleType}
          setVehiclePanelOpen={setVehiclePanelOpen}
          setConfirmRidePanel={setConfirmRidePanel}
          fare={fare}
        />
      </div>

      <div ref={confirmRidePanelRef} className='fixed  w-full z-10 bottom-0 p-3 bg-white py-6 px-3 translate-y-full pt-12'>
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          pickup={pickup}
          destination={destination}
          fare={fare}
          createRide={createRide}
          vehicleType={vehicleType}
          distance={distance}
          setWaitingForDriverPanel={setWaitingForDriverPanel}
        />
      </div>
      <div ref={vehicleFoundRef} className='fixed  w-full z-10 bottom-0 p-3 bg-white py-6 px-3 translate-y-full pt-12'>
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare}
        />
      </div>
      <div ref={waitingForDriverRef} className='fixed  w-full z-10 bottom-0 p-3 bg-white py-6 px-3  pt-12 h-2/5'>
        <WaitingForDriver
         Ride={Ride}
         setVehicleFound={setVehicleFound}
         setWaitingForDriverPanel={setWaitingForDriverPanel}
          waitingForDriverPanel={waitingForDriverPanel}
         />
      </div>
    </div>
  )
}

export default Home