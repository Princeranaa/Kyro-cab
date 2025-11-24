import { useContext, useEffect } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';

function UserLogout() {
    const { setUser } = useContext(UserDataContext);
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                // Call backend logout endpoint
                await axios.post(
                    import.meta.env.VITE_BASE_URL + "/users/logout",
                    {},
                    { withCredentials: true }
                );

                // Clear user from context
                setUser({});

                // Optional: show a success message
                toast.success("Logged out successfully!");

                // Redirect to login page
                navigate("/login", { replace: true });
            } catch (err) {
                console.error("Logout failed:", err);
                toast.error("Logout failed. Try again.");
            }
        };

        logout();
    }, [setUser, navigate]);

    // Optional: show a simple message while logging out
    return <div>Logging out...</div>;
}

export default UserLogout;
