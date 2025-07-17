import React from 'react'

function CaptainDetail(props) {
    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-4'>
                    <img className='rounded-full h-10 w-10 object-cover' src="https://img.freepik.com/free-photo/young-female-being-uber-driver_23-2149184235.jpg" alt="profilepic" />
                    <h4 className='text-lg font-semibold'>{props.fullname}</h4>
                </div>
                <div >
                    <h4 className='font-semibold text-xl'>$1234</h4>
                    <p className='text-sm font-medium text-gray-800'>Earned</p>
                </div>
            </div>
            <div className='flex p-3 bg-gray-200 rounded-xl justify-center gap-5 items-start mt-5'>
                <div className='  text-center'>
                    <i className='text-2xl font-thin ri-timer-2-line'></i>
                    <h5>10.2</h5>
                    <p>Hours online</p>

                </div>
                <div className=' text-center'>
                    <i className=' text-2xl font-semibold ri-speed-up-fill'></i>
                    <h5>213</h5>
                    <p>ride number</p>
                </div>
                <div className='text-center'>
                    <i className='text-2xl font-semibold ri-booklet-line'></i>
                    <h5>10.2</h5>
                    <p>Hours online</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetail;