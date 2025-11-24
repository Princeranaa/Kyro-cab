import kyroImg from '../assets/image3.png';
import { useRef, useState } from 'react';
import { useGSAP } from "@gsap/react"
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationPanel from '../components/LocationPanel';


function Home() {
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [panleOpen, setPanelOpen] = useState(false)
    const panleRef = useRef(null)
    const panleCloseRef = useRef(null)


    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("data submited")
    }


    useGSAP(() => {
        gsap.to(panleRef.current, {
            height: panleOpen ? "70%" : "0%",
            padding: panleOpen ? "20px" : "0px",
        })
        gsap.to(panleCloseRef.current, {
            opacity: panleOpen ? "100%" : "0%",
        })
    }, [panleOpen])



    return (
        <div className=' h-screen relative'>
            <img className='w-22 absolute left-5 top-5' src={kyroImg} alt="" />
            <div className='h-screen w-screen'>
                {/* img for temporvery */}
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>

            <div className='bg-white flex flex-col justify-end absolute top-0 h-screen w-full '>
                <div className='h-[30%] p-5 bg-white relative'>
                    <h5 ref={panleCloseRef} onClick={() => setPanelOpen(false)} className='absolute top-6 right-6 text-2xl'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-3xl font-semibold'>Find a trip</h4>
                    <form onSubmit={submitHandler} >
                        <div className="line absolute h-16 w-1 bg-zinc-900 top-[38%] rounded-full left-10"></div>
                        <input
                            value={pickup}
                            onChange={(e) => setPickup(e.target.value)}
                            onClick={() => setPanelOpen(true)}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' type="text" placeholder='Add a pick-up location' />
                        <input
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            onClick={() => setPanelOpen(true)}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' type="text" placeholder='Enter your destination' />
                    </form>
                </div>

                <div ref={panleRef} className='h-0 bg-white'>
                    <LocationPanel />
                </div>

            </div>

        </div>
    )
}

export default Home