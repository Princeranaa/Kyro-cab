import React from 'react'
import kyroImg from '../assets/image3.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import { UserDataContext } from '../context/UserContext';
import { useContext } from 'react';
import toast from 'react-hot-toast';


function UserSignup() {
    const navigate = useNavigate()

    const { user, setUser } = useContext(UserDataContext);

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    //  Handle Input Change (Two-way binding)
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    //  Handle Submit (For Now: just console.log)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            fullname: {
                firstname: formData.firstname,
                lastname: formData.lastname,
            },
            email: formData.email,
            password: formData.password,
        };

        try {
            const response = await axios.post(
                import.meta.env.VITE_BASE_URL + "/users/register",
                newUser,
                { withCredentials: true }
            );

            const data = response.data;
            console.log("data====>", data)

            // SUCCESS — store user globally
            setUser(data.user);

            toast.success("Account created successfully!");
            navigate("/home");

            // Reset frontend form ONLY after success
            setFormData({
                firstname: "",
                lastname: "",
                email: "",
                password: "",
            });

        } catch (error) {
            if (error.response?.data?.errors) {
                toast.error(error.response.data.errors[0]);
            } else {
                toast.error("Something went wrong");
            }
        }
    };



    return (
        <div className="min-h-screen flex flex-col justify-between p-6 bg-gray-50">

            <div>
                <img className="w-20 mb-10" src={kyroImg} alt="logo" />

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Name */}
                    <div>
                        <h3 className="text-lg font-medium mb-2">What's your name</h3>
                        <div className="flex gap-3">
                            <input
                                className="bg-gray-200 px-4 py-3 w-1/2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-black"
                                required
                                type="text"
                                name="firstname"
                                placeholder="First name"
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                            <input
                                className="bg-gray-200 px-4 py-3 w-1/2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-black"
                                required
                                type="text"
                                name="lastname"
                                placeholder="Last name"
                                value={formData.lastname}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <h3 className="text-lg font-medium mb-2">What's your email</h3>
                        <input
                            className="bg-gray-200 px-4 py-3 w-full border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-black"
                            required
                            type="email"
                            name="email"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                        <input
                            className="bg-gray-200 px-4 py-3 w-full border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-black"
                            required
                            type="password"
                            name="password"
                            placeholder="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="bg-black text-white py-3 rounded-lg text-lg w-full transition font-medium"
                    >
                        Create account
                    </button>

                    {/* Link */}
                    <div className="flex items-center justify-center gap-2">
                        <p className="text-gray-700">Already have an account?</p>
                        <Link className="text-blue-600 font-medium" to="/login">
                            Login here
                        </Link>
                    </div>
                </form>
            </div>

            {/* Footer */}
            <div>
                <p className="leading-tight lg:text-[2vw] text-center">
                    This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service apply</span>.
                </p>
            </div>
        </div>
    );
}

export default UserSignup
