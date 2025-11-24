import kyroImg from '../assets/image3.png';
import { Link, UNSAFE_WithComponentProps, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import toast from 'react-hot-toast';


function UserLogin() {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { user, setUser } = useContext(UserDataContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const userData = {
            email: formData.email,
            password: formData.password
        }
        const response = await axios.post(import.meta.env.VITE_BASE_URL + "/users/login", userData, {withCredentials:true});
        const data = response.data;
        console.log("userData====>>:", data);
        setUser(data.user);

        toast.success("Login successfully");
        setFormData({
            email: "",
            password: "",
        });
        navigate("/home")

    }

    return (
        <div className='p-8 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src={kyroImg} alt="" />
                <form action="" onSubmit={handleSubmit}>
                    <h3 className='text-lg font-semibold mb-2'>What's your email</h3>
                    <input className='bg-[#eeeeee] px-4 py-2 w-full border rounded text-lg placeholder:text-base' required type="email" name="email" placeholder='emai@example.com' value={formData.email} onChange={handleChange} />
                    <h3 className='text-lg  mb-2 font-semibold'>Enter Password</h3>
                    <input className='bg-[#eeeeee]  border px-4  py-2  mb-7 w-full rounded  text-lg placeholder:text-base' required type="password" name="password" placeholder='password' value={formData.password} onChange={handleChange} />
                    <button type="submit" className='bg-[#111] text-white mb-4 font-semibold rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
                </form>
                <div className='flex gap-2 items-center justify-center'>
                    <p className='text-center'>New here?</p> <Link to={"/signup"} className='text-blue-600'>Create new account</Link>
                </div>
            </div>

            <div>
                <Link to={"/captain-login"} className='bg-[#10b461] flex items-center justify-center text-white mb-8 font-semibold rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
            </div>
        </div>
    )
}

export default UserLogin
