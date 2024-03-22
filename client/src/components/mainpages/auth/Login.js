import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {FaUserShield} from 'react-icons/fa';
import {BsFillShieldLockFill} from 'react-icons/bs';
import video from '../../../images/polygon-145031.mp4';
// import elaLogo from '../../../images/logo-hm.png';

function Login() {
    const [user, setUser] = useState({
        email:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const loginSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/login', {...user})

            localStorage.setItem('firstLogin', true)
            
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className='flex justify-center items-center h-screen bg-gray-200'>
            <div className="flex flex-col justify-center items-center bg-white p-10 rounded-lg shadow-md">

                <div className="mb-10">
                    <h2 className='text-3xl font-bold mb-2 text-black'>Project Module Management System</h2>
                </div>

                <form noValidate onSubmit={loginSubmit} className='flex flex-col space-y-5'>
                    <span className='text-center text-xl text-gray-500'>Login</span>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className='font-semibold text-gray-600'>Email:</label>
                        <div className="flex items-center space-x-2">
                            <FaUserShield className='text-gray-500' />
                            <input type="text" id="email" name="email" placeholder="Enter Email" value={user.email} onChange={onChangeInput} className='p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400' />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="password" className='font-semibold text-gray-600'>Password:</label>
                        <div className="flex items-center space-x-2">
                            <BsFillShieldLockFill className='text-gray-500' />
                            <input type="password" id="password" name="password" placeholder="Enter Password" value={user.password} onChange={onChangeInput} className='p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400' />
                        </div>
                    </div>

                    <button type='submit' className='bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600'>
                        Login
                    </button>

                    <span className='text-center text-blue-500 hover:underline cursor-pointer'>
                        Forgot your password? <a href="/">Click Here</a>
                    </span>

                </form>

                <div className="mt-5">
                    <span className='text-gray-500'>Don't have an account?</span>
                    <Link to={'/register'} className='text-blue-500 hover:underline cursor-pointer ml-2'>
                        Sign Up
                    </Link>
                </div>

            </div>
        </div>

    )
}
    export default Login;