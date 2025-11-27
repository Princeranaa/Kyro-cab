

function RidePopup({ setRidePopupPanle, setConfirmRidePopupPanle , confirmRide,ride}) {
    return (
        <div>
            <h5 onClick={() => { setRidePopupPanle(false) }} className='p-3 text-center w-[93%] absolute top-0' > <i className="text-3xl text-gray-600 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>A Ride for you</h3>

            <div className="flex items-center justify-between p-3 bg-gray-400 rounded-xl mt-4">
                <div className="flex items-center gap-3 ">
                    <img className='h-15 w-15 object-cover rounded-full ' src="https://images.unsplash.com/photo-1597586124394-fbd6ef244026?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <h2 className="text-lg font-medium">{ride?.user?.fullname?.firstname}</h2>
                </div>
                <h5 className="font-semibold text-lg">2.2 KM</h5>
            </div>

            <div className="flex flex-col gap-2 items-center justify-between ">
                <div className="w-full ">
                    <div className="flex items-center gap-5 p-2 border-b-2">
                        <i className="ri-user-location-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-500">{ride?.pickup}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 p-2 border-b-2">
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-500">{ride?.destination}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 p-2">
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">₹ {ride?.fare}</h3>
                            <p className="text-sm -mt-1 text-gray-500">Cash</p>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-5 flex  items-center justify-between">
                    <button onClick={() => { setRidePopupPanle(false) }} className=" bg-yellow-500 mt-1 p-3 px-8 text-center text-zinc-800 font-semibold rounded-lg">Ignore</button>
                    <button onClick={() => { setConfirmRidePopupPanle(true) 
                        confirmRide()
                    }} className=" bg-green-600  p-3 px-8 text-center text-white font-semibold rounded-lg">Accept Ride</button>
                </div>
            </div>

        </div>
    )
}

export default RidePopup