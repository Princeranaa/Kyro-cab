import { useContext } from "react"
import { CaptainDataContext } from "../context/CaptainContext"



function CaptainDetails() {


    const { captain } = useContext(CaptainDataContext)

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-4">
                    <img className='h-10 w-10 object-cover rounded-full' src="https://plus.unsplash.com/premium_photo-1681821679118-bb069eeb2d98?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZHJpdmVyfGVufDB8fDB8fHww" alt="" />
                    <h4 className="text-lg font-medium capitalize">{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
                </div>
                <div>
                    <h4 className="text-xl font-semibold">₹199.20</h4>
                    <p className="text-sm text-gray-600">Earned</p>
                </div>
            </div>

            <div className="flex justify-center items-start gap-4 p-3 mt-6 bg-gray-200 mt-4 rounded-xl ">
                <div className="text-center">
                    <i className="text-3xl mb-2  font-thin ri-timer-line"></i>
                    <h5 className="text-lg font-medium">10.2</h5>
                    <p className="text-sm text-gray-600 ">Hours Online</p>
                </div>

                <div className="text-center">
                    <i className="text-3xl mb-2  font-thin ri-speed-up-line"></i>
                    <h5 className="text-lg font-medium">10.2</h5>
                    <p className="text-sm text-gray-600 ">Hours Online</p>
                </div>

                <div className="text-center">
                    <i className="text-3xl mb-2  font-thin ri-booklet-line"></i>
                    <h5 className="text-lg font-medium">10.2</h5>
                    <p className="text-sm text-gray-600 ">Hours Online</p>
                </div>

            </div>
        </div>
    )
}

export default CaptainDetails