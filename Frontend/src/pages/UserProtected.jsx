import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserProtected({ children }) {
    const { user, setUser } = useContext(UserDataContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                // already have user
                if (user && user.email) {
                    setLoading(false);
                    return;
                }

                // verify using cookie
                const res = await axios.get(
                    import.meta.env.VITE_BASE_URL + "/users/profile",
                    { withCredentials: true }
                );

                setUser(res.data.user);
                setLoading(false);

            } catch (err) {
                setLoading(false);
                navigate("/login");
            }
        };

        verifyUser();
    }, [setUser, navigate]);

    // while loading API, show loader
    if (loading) {
        return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
    }

    // **IMPORTANT**: after loading, if no user, let useEffect redirect. Don't return null.
    if (!user) {
        return <div className="w-full h-screen flex items-center justify-center">Redirecting...</div>;
    }

    return <>{children}</>;
}



export default UserProtected;
