import { Link } from "react-router-dom";
import kyroImg from "../assets/image3.png";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

function CaptainHome() {
  /*  useState(true) ==>>>  temporvory purpose give it to show */
  const [ridePopupPanle, setRidePopupPanle] = useState(false);
  const [confirmRidePopupPanle, setConfirmRidePopupPanle] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopupPanleRef = useRef(null);
  const confirmRidePopupPanleRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!captain?._id) return;
    socket.emit("join", { userType: "captain", userId: captain._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log({
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });

          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    //  return () => clearInterval(locationInterval)
    updateLocation();
  }, [captain]);

  socket.on("new-ride", (data) => {
    console.log("new-ride received:", data);
    setRide(data);
    setRidePopupPanle(true);
    console.log("new-ride data:", data);
  });

  async function confirmRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: ride?._id,
          captainId: captain?._id,
        },
        {
          withCredentials: true,
        }
      );

      // If API success
      setRidePopupPanle(false);
      setConfirmRidePopupPanle(true);
    } catch (error) {
      console.error("Error confirming ride:", error);
    }
  }

  useGSAP(() => {
    gsap.to(ridePopupPanleRef.current, {
      transform: ridePopupPanle ? "translate(0)" : "translateY(100%)",
    });
  }, [ridePopupPanle]);

  useGSAP(() => {
    gsap.to(confirmRidePopupPanleRef.current, {
      transform: confirmRidePopupPanle ? "translate(0)" : "translateY(100%)",
    });
  }, [confirmRidePopupPanle]);

  return (
    <div className="h-screen">
      <div className="fixed w-screen p-3 top-0 flex justify-between items-center">
        <img className="w-20" src={kyroImg} alt="" />
        <Link
          to={"/home"}
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      <div
        ref={ridePopupPanleRef}
        className="fixed w-full z-10 bg-white bottom-0 translate-y-full py-10 px-3 pt-12"
      >
        <RidePopup
          ride={ride}
          confirmRide={confirmRide}
          setRidePopupPanle={setRidePopupPanle}
          setConfirmRidePopupPanle={setConfirmRidePopupPanle}
        />
      </div>

      <div
        ref={confirmRidePopupPanleRef}
        className="fixed w-full h-screen z-10 bg-white bottom-0 translate-y-full py-10 px-3 pt-12"
      >
        <ConfirmRidePopup
          setConfirmRidePopupPanle={setConfirmRidePopupPanle}
          setRidePopupPanle={setRidePopupPanle}
        />
      </div>
    </div>
  );
}

export default CaptainHome;
