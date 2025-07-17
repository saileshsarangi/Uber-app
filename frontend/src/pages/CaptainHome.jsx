import React, { useRef, useState, useContext, useEffect } from 'react'
import { CaptainDataContext } from '../context/CaptainContext';
import gsap from 'gsap'
import axios from 'axios';
import { useGSAP } from "@gsap/react";
import { Link } from 'react-router-dom'
import CaptainDetail from '../components/CaptainDetail'
import RidePopup from '../components/RidePopup'
import ConfirmRidePopup from '../components/ConfirmRidePopup';
import { SocketContext } from '../context/SocketContext';
function CaptainHome() {
  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);
  console.log(captain)
  const ridePopupPanelRef = useRef(null);
  const ConfirmRidePopupRef = useRef(null);
  const [ride, setRide] = useState(null)
  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const [ConfirmRidePopupPanel, setConfirmRidePopup] = useState(false);

  useEffect(() => {
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('Sending location...', position.coords);
            socket.emit('update-location-captain', {
              userId: captain._id,
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            });
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.log('Geolocation not supported by this browser.');
      }
    };
    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()
    // Call it once

  }, []);
  const handleNewRide = (data) => {
    console.log("hiii working");
    console.log("New ride received:", data);
    setRidePopupPanel(true);
    // You can store ride data to state like:
     setRide(data);
  };
  socket.on('new-ride', handleNewRide);
  async function confirmRide() {
       const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

            rideId: ride._id,
            captainId: captain._id,


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response);

        setRidePopupPanel(false)
        setConfirmRidePopup(true)
  }     



  useGSAP(() => {
    if (ConfirmRidePopupPanel) {
      gsap.to(ConfirmRidePopupRef.current, {
        transform: 'translateY(0)'
      });
    }
    else {
      gsap.to(ConfirmRidePopupRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [ConfirmRidePopupPanel])

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })

    }
  }, [ridePopupPanel])

  return (
    <div>
      <div className='h-screen'>
        <div className='fixed p-6 top-0 items-center justify-between w-screen'>
          <img className=' w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
          <Link to='/captain-login' className='fixed  right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className=' text-lg font-bold ri-logout-box-r-line'></i>
          </Link>
        </div>
        <div className='h-3/5 '>
          <img className="h-full w-full object-top " src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" />
        </div>
        <div className='h-2/5 p-6'>
          <CaptainDetail setRidePopupPanel={setRidePopupPanel} fullname={(captain?.fullname?.firstname ?? '') + " " + (captain?.fullname?.lastname ?? '')}/>
        </div>
        <div ref={ridePopupPanelRef} className='fixed  w-full z-10 bottom-0 p-3 bg-white py-10 px-3 h-3/5 pt-12'>
          <RidePopup
          ride={ride} 
          setRidePopupPanel={setRidePopupPanel} 
          setConfirmRidePopup={setConfirmRidePopup}
          confirmRide={confirmRide}
          />
        </div>
        <div ref={ConfirmRidePopupRef} className='fixed  w-full z-10 bottom-0 p-3 bg-white py-10 px-3  pt-12 h-screen'>
          <ConfirmRidePopup
          ride={ride} 
          setRidePopupPanel={setRidePopupPanel} 
          setConfirmRidePopup={setConfirmRidePopup} />
        </div>

      </div>
    </div>
  )
}

export default CaptainHome