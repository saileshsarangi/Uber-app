import React from 'react'
import { Link } from 'react-router-dom';
function Start() {
  return (
    <div>
       <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1572013343866-dfdb9b416810?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGF4aXxlbnwwfHwwfHx8MA%3D%3D)] h-screen pt-8  flex justify-between flex-col w-full bg-red-400">
          <img className='w-16 ml-8' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'/>
          <div className="bg-white pb-7 py-5 px-4">
            <h2 className="text-2xl font-bold">get started with uber</h2>
            <Link to= '/user-login' className='flex items-center justify-center  w-full bg-black text-white py-3 rounded-2xl mt-5 text-center'>continue</Link>
          </div>
       </div>

    </div>
  )
}

export default Start