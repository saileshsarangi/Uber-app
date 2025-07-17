import React from 'react'

function VehiclePanel(props) {



    return (
        <div>
            <h5 onClick={() => {
                props.setVehiclePanelOpen(false)
            }} className=' absolute  top-0 text-center  w-[93%] '><span className='text-3xl text-gray-200'><i className="ri-arrow-down-s-line"></i></span></h5>
            <h3 className='text-2xl font-semibold mb-5 mt-6'>choose a Vehicle</h3>

            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.setVehicleType('car')
            }} className='flex border-2 active:border-black border-white    rounded-xl w-full p-3 items-center justify-between mb-2'>
                <img className='h-15' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="car-image" />
                <div className=' w-1/2'>
                    <h4 className='font-medium text-base'>uberGo<span><i className='ri-user-3-fill'></i>4</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-medium text-xs text-gray-600'>Affordable,compact  rides</p>
                </div>
                <h2 className='text-2xl font-semibold'>₹{props.fare.car}</h2>
            </div>

            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.setVehicleType('moto')
            }} className='flex border-2 active:border-black border-white    rounded-xl w-full p-3 items-center justify-between mb-2'>
                <img className='h-15' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png" alt="car-image" />
                <div className=' w-1/2'>
                    <h4 className='font-medium text-base'>Moto<span><i className='ri-user-3-fill'></i>1</span></h4>
                    <h5 className='font-medium text-sm'>3 mins away</h5>
                    <p className='font-medium text-xs text-gray-600'>Affordable,Motorcycle rides</p>
                </div>
                <h2 className='text-2xl font-semibold'>₹{props.fare.moto}</h2>
            </div>

            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.setVehicleType('auto')
            }} className='flex border-2 active:border-black border-white    rounded-xl w-full p-3 items-center justify-between mb-2'>
                <img className='h-15' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="car-image" />
                <div className=' w-1/2'>
                    <h4 className='font-medium text-base'>Auto<span><i className='ri-user-3-fill'></i>3</span></h4>
                    <h5 className='font-medium text-sm'>4 mins away</h5>
                    <p className='font-medium text-xs text-gray-600'>Affordable,Auto rides</p>
                </div>
                <h2 className='text-2xl font-semibold'>₹{props.fare.auto}</h2>
            </div>

        </div>
    )
}

export default VehiclePanel