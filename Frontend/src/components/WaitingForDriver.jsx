function WaitingForDriver({ waitingForDriver, ride, setWaitingForDriver }) {
    return (
        <div>
            <h5 onClick={() => { setWaitingForDriver(false) }} className='p-3 text-center w-[93%] absolute top-0' > <i className="text-3xl text-gray-600 ri-arrow-down-wide-line"></i></h5 >

            <div className="flex items-center justify-between gap-2">
                <img className='h-15' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=924/height=520/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy81YjVlMzVmOC1hMTRlLTQxZmEtOWQ4MC1jMDIyZDIyMWMwMGYuanBn" alt="" />
                <div className="text-right">
                    <h2 className="text-lg font-medium ">firstname</h2>
                    <h4 className="text-xl font-semibold -mt-1 -mb-1 ">{ride?.captain?.vehicle?.plate}</h4>
                    <p className="text-sm text-gray-600 font-semibold">Maruti Suzuki</p>
                     <h1 className='text-lg font-semibold'>  {ride?.otp} </h1>
                </div>
            </div>

            <div className="flex flex-col gap-2 items-center justify-between ">
                <div className="w-full mt-5">
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

                    <div className="flex items-center gap-5 p-2 ">
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">₹ 199.0</h3>
                            <p className="text-sm -mt-1 text-gray-500">Cash</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default WaitingForDriver