import React from 'react'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function LookingForDriver(props) {
    const loaderRef = useRef(null);
    useEffect(() => {
        gsap.to(loaderRef.current, {
            width: '100%',
            duration: 1,
            repeat:-1,
            ease: 'power2.out',
        });
    }, []);

    return (
        <div>
            <div className="relative w-full h-2 bg-gray-200 rounded overflow-hidden my-3">
                <div ref={loaderRef} className="h-full bg-black w-0"></div>
            </div>
            <h5 onClick={() => {
                props.setVehicleFound(false)
            }} className=' absolute  top-0 text-center  w-[93%] '><span className='text-3xl text-gray-200'><i className="ri-arrow-down-s-line"></i></span></h5>
            <h3 className='text-2xl font-semibold mb-5  mt-6'>Looking for a ride</h3>
            <div className='flex justify-between gap-2 flex-col items-center'>
                <img className='h-40 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="car-image" />
                <div className='w-full mt-5'>
                    {/* Details */}
                    <div className='flex items-center gap-5 p-2 border-b-2 border-b-gray-300'>
                        <i className=' text-lg ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                        </div>

                    </div>

                    <div className='flex items-center gap-5 p-2 border-b-2 border-b-gray-300 '>
                        <i className=' text-lg ri-map-pin-2-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-2 border-b-2 border-b-gray-300 '>
                        <i className=' text-lg ri-currency-line'></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.fare[ props.vehicleType ]}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash or Online</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver