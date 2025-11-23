import React, { useState } from 'react'
import kyroImg from '../assets/image3.png';
import { Link } from 'react-router-dom';


function CaptainSignup() {

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
        const handleSubmit = (e) => {
            e.preventDefault();
    
            console.log({
                fullname: {
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                },
                email: formData.email,
                password: formData.password,
            });
    
            // Reset Form (optional)
            setFormData({ firstname: "", lastname: "", email: "", password: "" });
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
    )
}

export default CaptainSignup
