import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

function CaptainProtected({ children }) {
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyCaptain = async () => {
            try {
                if (captain && captain.email) {
                    setLoading(false);
                    return;
                }

                const res = await axios.get(
                    import.meta.env.VITE_BASE_URL + "/captains/Profile",
                    { withCredentials: true }
                );

                setCaptain(res.data.captain);
                setLoading(false);

            } catch (err) {
                setLoading(false);
                navigate("/captain-login");
            }
        };

        verifyCaptain();
    }, [setCaptain, navigate]);

    if (loading) {
        return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!captain) {
        return <div className="w-full h-screen flex items-center justify-center">Redirecting...</div>;
    }

    return <>{children}</>;
}



export default CaptainProtected;
