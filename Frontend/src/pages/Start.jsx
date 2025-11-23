import React from 'react'
import kyroImg from '../assets/image3.png';
import { Link } from 'react-router-dom';

function Start() {
    return (
        <div className='bg-cover bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]'>
            <div className=' h-screen  w-full flex flex-col justify-between pt-10 '>
                <img className='w-30 ml-8' src={kyroImg} alt="" />
                <div className='bg-white pb-7 py-5 py-4 px-4'>
                    <h2 className='text-3xl font-bold '>Get started with Kyro-cab</h2>
                    <Link to={'/login'} className='bg-black flex justify-center items-center text-white text-2xl font-medium rounded mt-5 w-full py-3'>Contiue</Link>
                </div>
            </div>
        </div>
    )
}

export default Start
