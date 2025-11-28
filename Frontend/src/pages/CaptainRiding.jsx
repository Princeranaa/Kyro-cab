import { Link, useLocation } from "react-router-dom"
import kyroImg from '../assets/image3.png';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import FinishRide from "../components/FinishRide";


function CaptainRiding() {

    const [finishPanle, setFinishPanle] = useState(false)
    const finishPanleRef = useRef(null)
    const location = useLocation();
    const rideData = location.state?.ride;
    console.log("rideDataaaaaaaa", rideData)


    useGSAP(() => {
        gsap.to(finishPanleRef.current, {
            transform: finishPanle ? "translate(0)" : "translateY(100%)"
        })
    }, [finishPanle])




    return (
        <div className="h-screen">

            <div className="fixed w-screen p-3 top-0 flex justify-between items-center">
                <img className='w-20' src={kyroImg} alt="" />
                <Link to={"/home"} className="h-10 w-10 bg-white flex items-center justify-center rounded-full">
                    <i className="ri-logout-box-r-line"></i>
                </Link>
            </div>

            <div className="h-4/5">
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>

            <div
                onClick={() => { setFinishPanle(true) }}
                className="h-1/5 p-6 flex justify-between items-center bg-yellow-400 relative">
                <h5 onClick={() => { }} className='p-3 text-center w-[95%] absolute top-0' >
                    <i className="text-3xl text-gray-600 ri-arrow-down-wide-line"></i>
                </h5 >
                <h4 className="text-xl font-semibold">4 KM  away</h4>
                <button className=" bg-green-600  p-3 px-8 text-center text-white font-semibold rounded-lg">Complate Ride</button>
            </div>

            <div ref={finishPanleRef} className='fixed w-full z-10 bg-white bottom-0 translate-y-full py-10 px-3 pt-12'>
                <FinishRide
                    ride={rideData}
                    setFinishPanle={setFinishPanle} />
            </div>



        </div>
    )
}

export default CaptainRiding