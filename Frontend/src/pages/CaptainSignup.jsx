import React, { useState } from 'react'
import kyroImg from '../assets/image3.png';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import toast from 'react-hot-toast';


function CaptainSignup() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullname: {
            firstname: "",
            lastname: "",
        },
        email: "",
        password: "",
        vehicle: {
            color: "",
            plate: "",
        },
        capacity: "",
        vehicleType: "",
    });

    const { captain, setCaptain } = useContext(CaptainDataContext);

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

        const captianData = {
            fullname: {
                firstname: formData.firstname,
                lastname: formData.lastname,
            },
            email: formData.email,
            password: formData.password,
            vehicle: {
                color: formData.color,
                plate: formData.plate,
            },
            capacity: formData.capacity,
            vehicleType: formData.vehicleType,
        };
        console.log("captianData====>", captianData)

        /* call the API */
        const response = await axios.post(import.meta.env.VITE_BASE_URL + "/captains/register", captianData, { withCredentials: true });
        const data = response.data;
        toast.success("Account created Succesfully")
        setCaptain(data.captain);
        navigate('/captain-home')

        // Reset Form (optional)
        setFormData({ firstname: "", lastname: "", email: "", password: "", color: "", plate: "", capacity: "", vehicleType: "" });
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

                    {/* Vehicle Information */}
                    <div>
                        <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
                        <div className="flex gap-4 mb-4">
                            <input
                                className="bg-gray-200 px-4 py-3 w-1/2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-black"
                                required
                                type="text"
                                name="color"
                                placeholder="Vehicle Color"
                                value={formData.color}
                                onChange={handleChange}
                            />
                            <input
                                className="bg-gray-200 px-4 py-3 w-1/2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-black"
                                required
                                type="text"
                                name="plate"
                                placeholder="Vehicle Plate"
                                value={formData.plate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex gap-4">
                            <input
                                className="bg-gray-200 px-4 py-3 w-1/2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-black"
                                required
                                type="number"
                                name="capacity"
                                placeholder="Capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                            />
                            <select
                                className="bg-gray-200 px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-black"
                                required
                                name="vehicleType"
                                value={formData.vehicleType}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select Vehicle Type</option>
                                <option value="car">Car</option>
                                <option value="auto">Auto</option>
                                <option value="bike">Bike</option>
                            </select>
                        </div>
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
    )
}

export default CaptainSignup
