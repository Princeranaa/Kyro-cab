import { useState } from "react"
import { Link } from "react-router-dom"

function ConfirmRidePopup({ setConfirmRidePopupPanle }) {


    const [otp, setOtp] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("hello")
    }




    return (
        <div>
            < h5 onClick={() => { setRidePopupPanle(false) }} className='p-3 text-center w-[93%] absolute top-0' > <i className="text-3xl text-gray-600 ri-arrow-down-wide-line"></i></h5 >
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to start</h3>

            <div className="flex items-center justify-between p-3 bg-gray-400 rounded-xl mt-4">
                <div className="flex items-center gap-3 ">
                    <img className='h-15 w-15 object-cover rounded-full ' src="https://images.unsplash.com/photo-1597586124394-fbd6ef244026?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <h2 className="text-lg font-medium">Prince rana</h2>
                </div>
                <h5 className="font-semibold text-lg">2.2 KM</h5>
            </div>

            <div className="flex flex-col gap-2 items-center justify-between ">
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

                <div className="mt-6 w-full">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* OTP Input */}
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, ""); // only numbers
                                setOtp(value);
                            }}
                            placeholder="Enter OTP"
                            className="
                w-full text-center tracking-[10px]
                bg-gray-100 p-4
                text-3xl font-semibold
                rounded-xl outline-none
                focus:ring-2 focus:ring-green-500 focus:bg-white
            "
                        />

                        {/* Confirm Ride */}
                        <Link
                            to="/captain-riding"
                            className="w-full flex justify-center bg-green-600 p-3 text-lg text-white font-semibold rounded-lg"
                        >
                            Confirm Ride
                        </Link>

                        {/* Cancel */}
                        <button
                            onClick={() => setConfirmRidePopupPanle(false)}
                            type="button"
                            className="w-full bg-gray-300 p-3 text-zinc-800 font-semibold rounded-lg"
                        >
                            Cancel
                        </button>

                    </form>
                </div>

            </div>

        </div>
    )
}

export default ConfirmRidePopup