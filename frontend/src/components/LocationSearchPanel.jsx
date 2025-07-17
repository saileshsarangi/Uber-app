import React from 'react'

function LocationSearchPanel({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activefield }) {
    const handleClick = (suggestion) => {
        if (activefield === 'pickup') {
            setPickup(suggestion)
        } else if (activefield === 'destination') {
            setDestination(suggestion)
        }
        // setVehiclePanel(true)
        // setPanelOpen(false)
    }

    //console.log(props)

    return (
        <div>
            {
                suggestions.map((ele, idx) => {
                    return (
                        <>
                            <div key={idx} onClick={()=>{
                                handleClick(ele)
                            }} className='flex items-center gap-4 border-2 active:border-black border-gray-200 rounded-xl p-3 justify-start my-6 '>
                                <h2 className='bg-[#eee] h-6 flex items-center justify-center w-10 rounded-full'><i className='ri-map-pin-fill text-xl'></i></h2>
                                <h4 className='font-medium'>{ele}</h4>
                            </div>
                        </>
                    )
                })
            }
        </div>
    )



}

export default LocationSearchPanel