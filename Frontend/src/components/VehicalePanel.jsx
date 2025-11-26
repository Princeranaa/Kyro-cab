function VehicalePanel({ setVehiclePanleOpen, setConfirmRideVehicle, fare, selectVehicle }) {
    return (
        <div>
            < h5 onClick={() => {
                setVehiclePanleOpen(false)

            }} className='p-3 text-center w-[93%] absolute top-0' > <i className="text-3xl text-gray-600 ri-arrow-down-wide-line"></i></h5 >
            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>

            <div onClick={(() => {
                setConfirmRideVehicle(true)
                selectVehicle("car")
            })} className='w-full p-3 mb-2 border-2 border-black rounded-xl flex items-center justify-between'>
                <img className='h-12 object-cover' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=924/height=520/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy81YjVlMzVmOC1hMTRlLTQxZmEtOWQ4MC1jMDIyZDIyMWMwMGYuanBn" alt="" />
                <div className='w-1/2 ml-2'>
                    <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-line">4</i></span></h4>
                    <p className='font-medium text-sm'>2 mins away</p>
                    <p className='font-normal text-xs text-gray-600'>Affordable compact rides</p>
                </div>
                <h2 className='text-xl font-semibold'>#{fare.car}</h2>
            </div>

            <div onClick={(() => {
                setConfirmRideVehicle(true)
                selectVehicle("moto")
            })} className='w-full p-3 mb-2 border-2 border-black rounded-xl flex items-center justify-between'>
                <img className='h-12 object-cover' src="https://s.alicdn.com/@sc04/kf/Hf73b9dc74afb44d39796a7f17ee678feJ/17-Inch-Hot-Sale-Electric-Motorcycle-3000W-72V-High-Speed-Motor-Electric-Scooter-Bikes-Mountain-Dirt-Bikes.png" alt="" />
                <div className='w-1/2 ml-2'>
                    <h4 className='font-medium text-base'>Moto <span><i className="ri-user-line">1</i></span></h4>
                    <p className='font-medium text-sm'>3 mins away</p>
                    <p className='font-normal text-xs text-gray-600'>Affordable Motorcycle rides</p>
                </div>
                <h2 className='text-xl font-semibold'>#{fare.moto}</h2>
            </div>

            <div onClick={(() => {
                setConfirmRideVehicle(true)
                selectVehicle("auto")
            })} className='w-full p-3 mb-2 border-2 border-black rounded-xl flex items-center justify-between'>
                <img className='h-12 object-cover' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n" alt="" />
                <div className='w-1/2 ml-2'>
                    <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-line">3</i></span></h4>
                    <p className='font-medium text-sm'>2 mins away</p>
                    <p className='font-normal text-xs text-gray-600'>Affordable Auto rides</p>
                </div>
                <h2 className='text-xl font-semibold'>#{fare.auto}</h2>
            </div>
        </div>

    )
}

export default VehicalePanel



