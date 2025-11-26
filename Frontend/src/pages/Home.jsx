import kyroImg from '../assets/image3.png';
import { useContext, useEffect, useRef, useState } from 'react';
import { useGSAP } from "@gsap/react"
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'
import LocationPanel from '../components/LocationPanel';
import VehicalePanel from '../components/VehicalePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import UserContext, { UserDataContext } from '../context/UserContext';
import { SocketContext } from '../context/SocketContext';


function Home() {
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [panleOpen, setPanelOpen] = useState(false)
    const [vehiclePanleOpen, setVehiclePanleOpen] = useState(false);
    const [ConfirmRideVehicle, setConfirmRideVehicle] = useState(false)
    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingForDriver, setWaitingForDriver] = useState(false);
    const [pickupSuggestions, setPickupSuggestions] = useState([])
    const [destinationSuggestions, setDestinationSuggestions] = useState([])
    const [activeField, setActiveField] = useState(null)
    const [creating, setCreating] = useState(false);
    const [vehicleType, setVehicleType] = useState(null)
    const [fare, setFare] = useState({})

    /* ref names */
    const panleRef = useRef(null)
    const panleCloseRef = useRef(null)
    const vehiclePanleRef = useRef(null);
    const confirmRideRef = useRef(null);
    const vehicleFoundRef = useRef(null);
    const waitingForDriverRef = useRef(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("data submited")
    }

    /* sockets */
    const { user } = useContext(UserDataContext)
    const { socket } = useContext(SocketContext)

    useEffect(() => {
        socket.emit("join", { userType: "user", userId: user._id })
    }, [user])





    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { address: e.target.value },
                withCredentials: true,

            })
            setPickupSuggestions(response.data.data)
        } catch {
            // handle error
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { address: e.target.value },
                withCredentials: true,
            })
            setDestinationSuggestions(response.data.data)
        } catch {
            // handle error
        }
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


    useGSAP(() => {
        gsap.to(vehiclePanleRef.current, {
            transform: vehiclePanleOpen ? "transLate(0)" : "translateY(100%)"
        })
    }, [vehiclePanleOpen])

    useGSAP(() => {
        gsap.to(confirmRideRef.current, {
            transform: ConfirmRideVehicle ? "transLate(0)" : "translateY(100%)"
        })
    }, [ConfirmRideVehicle])

    useGSAP(() => {
        gsap.to(vehicleFoundRef.current, {
            transform: vehicleFound ? "translateY(0)" : "translateY(100%)"
        })
    }, [vehicleFound])

    useGSAP(() => {
        gsap.to(waitingForDriverRef.current, {
            transform: waitingForDriver ? "translate(0)" : "translateY(100%)"
        })
    }, [waitingForDriver])


    /* to find the fare of the vehicles */
    const findTrip = async () => {
        setVehiclePanleOpen(true)
        setPanelOpen(false)

        const response = await axios.get(import.meta.env.VITE_BASE_URL + "/rides/get-fare",
            {
                params: { pickup, destination },
                withCredentials: true,
            }
        );
        setFare(response.data.fare)
    }

    /* to create a ride  */
    const createRide = async () => {
        if (creating) return; // prevent multiple clicks
        setCreating(true);
        try {
            const ride = {
                pickup,
                destination,
                vehicleType
            };

            const response = await axios.post(import.meta.env.VITE_BASE_URL + "/rides/create", ride,
                {
                    withCredentials: true,
                }
            )
            console.log(response.data)
        } catch (error) {
            console.log("something went wrong", error)
        } finally {
            setCreating(false);
        }
    }


    return (
        <div className=' h-screen relative overflow-hidden'>
            <img className='w-22 absolute left-5 top-5' src={kyroImg} alt="" />
            <div onClick={() => { setVehiclePanleOpen(false) }} className='h-screen w-screen'>
                {/* img for temporvery */}
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>

            <div className=' flex flex-col justify-end absolute top-0 h-screen w-full '>
                <div className='h-[30%] p-5 bg-white relative'>
                    <h5 ref={panleCloseRef} onClick={() => setPanelOpen(false)} className='absolute top-6 right-6 text-2xl'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-3xl font-semibold'>Find a trip</h4>
                    <form onSubmit={submitHandler} >
                        <div className="line absolute h-16 w-1 bg-zinc-900 top-[38%] rounded-full left-10"></div>
                        <input
                            value={pickup}
                            onChange={handlePickupChange}
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('pickup')
                            }}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' type="text" placeholder='Add a pick-up location' />
                        <input
                            value={destination}
                            onChange={handleDestinationChange}
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('destination')
                            }}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' type="text" placeholder='Enter your destination' />
                    </form>

                    <button
                        onClick={findTrip}
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
                    </button>

                </div>

                <div ref={panleRef} className='h-0 bg-white'>
                    <LocationPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanleOpen={setVehiclePanleOpen}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>

            </div>

            <div ref={vehiclePanleRef} className='fixed w-full z-10 bg-white bottom-0 translate-y-full py-10 px-3 pt-12'>
                <VehicalePanel selectVehicle={setVehicleType} setVehiclePanleOpen={setVehiclePanleOpen} setConfirmRideVehicle={setConfirmRideVehicle} fare={fare} />
            </div>

            <div ref={confirmRideRef} className='fixed w-full z-10 bg-white bottom-0 translate-y-full py-6 px-3 pt-12'>
                <ConfirmRide
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    vehicleType={vehicleType}
                    fare={fare}
                    setConfirmRideVehicle={setConfirmRideVehicle} setVehicleFound={setVehicleFound} />
            </div>

            <div ref={vehicleFoundRef} className='fixed w-full z-10 bg-white bottom-0 translate-y-full py-6 px-3 pt-14'>
                <LookingForDriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    vehicleType={vehicleType}
                    fare={fare}
                    setVehicleFound={setVehicleFound} />
            </div>

            <div ref={waitingForDriverRef} className='fixed w-full z-10 bg-white bottom-0 translate-y-full py-6 px-3 pt-14'>
                <WaitingForDriver waitingForDriver={waitingForDriver} />
            </div>

        </div>
    )
}

export default Home