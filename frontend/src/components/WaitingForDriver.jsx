import React from 'react'

function WaitingForDriver(props) {
    return (
        <div>
            <h5 onClick={() => {
                props.setWaitingForDriverPanel(false);
            }} className=' absolute  top-0 text-center  w-[93%] '><span className='text-3xl text-gray-200'><i className="ri-arrow-down-s-line"></i></span></h5>
            <div className='flex items-center  justify-between w-full'>
                <img className='h-12 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="car-image" />
                <div className='text-right'>
                    <h5 className='text-lg font-bold'>{props.Ride?.captain.fullname.firstname}{" "}{props.Ride?.captain.fullname.lastname}</h5>
                    <h4 className='text-2xl font-semibold -mt-1 -mb-1 '>{props.Ride?.captain.vehicle.plate}</h4>
                    <p className='text-sm text-gray-600'>OTP--{props.Ride?.otp}</p>
                </div>
            </div>
            <div className='flex justify-between gap-2 flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-2 border-b-2 border-b-gray-300'>
                        <i className=' text-lg ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.Ride?.pickup}</p>
                        </div>

                    </div>

                    <div className='flex items-center gap-5 p-2 border-b-2 border-b-gray-300 '>
                        <i className=' text-lg ri-map-pin-2-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.Ride?.destination}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-2 border-b-2 border-b-gray-300 '>
                        <i className=' text-lg ri-currency-line'></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.Ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash or Online</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WaitingForDriver