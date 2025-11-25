import {Link} from "react-router-dom"

function Riding() {
    return (
        <div className="h-screen">
            <Link to={"/home"} className="fixed h-10 w-5 right-2 top-2 bg-white flex items-center justify-center rounded-full">
                <i className="text-lg font-medium ri-home-3-line"></i>
            </Link>
            <div className="h-1/2">
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className="h-1/2 p-4">
                <div className="flex items-center justify-between gap-2">
                    <img className='h-15' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=924/height=520/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy81YjVlMzVmOC1hMTRlLTQxZmEtOWQ4MC1jMDIyZDIyMWMwMGYuanBn" alt="" />
                    <div className="text-right">
                        <h2 className="text-lg font-medium ">Prince</h2>
                        <h4 className="text-xl font-semibold -mt-1 -mb-1 ">GJ35 AB 1234</h4>
                        <p className="text-sm text-gray-600 font-semibold">Maruti Suzuki</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 items-center justify-between ">
                    <div className="w-full mt-5">


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
                <button className="w-full bg-green-600 mt-5 p-2 text-center text-white font-semibold rounded-lg">Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding