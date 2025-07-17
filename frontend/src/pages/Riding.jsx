import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'

function Riding() {
    const location = useLocation()
    const { ride } = location.state || {} // Retrieve ride data
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    try {
        socket.on("ride-ended", () => {
            navigate('/home')
        })

    } catch (err) {
        console.log(err)
    }
    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed  right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className=' text-lg font-bold ri-home-5-line'></i>
            </Link>
            <div className='h-1/2'>
                <LiveTracking />

            </div>

            <div className='h-1/2 p-4'>
                <div className='flex items-center  justify-between w-full'>
                    <img className='h-12 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="car-image" />
                    <div className='text-right'>
                        <h5 className='text-lg font-bold text-left'>{ride?.captain.fullname.firstname}{" "}{ride?.captain.fullname.lastname}</h5>
                        <h4 className='text-2xl font-semibold -mt-1 -mb-1 '>{ride?.captain.vehicle.plate}</h4>
                        <p className='text-sm text-gray-600 '>maruti suzuki wagon R</p>
                    </div>
                </div>
                <div className='flex justify-between gap-2 flex-col items-center'>
                    <div className='w-full mt-5'>
                        <div className='flex items-center gap-5 p-2 border-b-2 border-b-gray-300 '>
                            <i className=' text-lg ri-map-pin-2-fill'></i>
                            <div>
                                <h3 className='text-lg font-medium'>562/11-A</h3>
                                <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-5 p-2 border-b-2 border-b-gray-300 '>
                            <i className=' text-lg ri-currency-line'></i>
                            <div>
                                <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash or Online</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-full mt-5 bg-green-800 text-white font-semibold p-2 rounded-lg'>Make Payment</button>
            </div>
        </div>
    )
}

export default Riding