function LookingForDriver({ setVehicleFound }) {
    return (
        <div>
            < h5 onClick={() => { setVehicleFound(false) }} className='p-3 text-center w-[93%] absolute top-0' > <i className="text-3xl text-gray-600 ri-arrow-down-wide-line"></i></h5 >
            <h3 className='text-2xl font-semibold mb-5'>Looking for Driver</h3>

            <div className="flex flex-col gap-2 items-center justify-between ">
                <img className='h-20' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=924/height=520/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy81YjVlMzVmOC1hMTRlLTQxZmEtOWQ4MC1jMDIyZDIyMWMwMGYuanBn" alt="" />
                <div className="w-full ">
                    <div className="flex items-center gap-5 p-2 border-b-2">
                        <i className="ri-user-location-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-500">Kankirya talav ahmedabad</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 p-2 border-b-2">
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-500">Kankirya talav ahmedabad</p>
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

export default LookingForDriver