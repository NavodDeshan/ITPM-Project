import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {FaUserShield} from 'react-icons/fa';
import {BsFillShieldLockFill} from 'react-icons/bs';
import video from '../../../images/polygon-145031.mp4';
// import elaLogo from '../../../images/logo-hm.png';
import {MdMarkEmailRead} from 'react-icons/md';

function Register() {
    const [user, setUser] = useState({
        name:'', 
        email:'', 
        password: '', 
        studentId:'', 
        specialization:'',
        role:'',
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value, password: name === 'studentId' ? value : user.password,})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/register', {...user})
            axios.post('/Std/save', {
                name: user.name, 
                email: user.email, 
                password: user.password, 
                studentId: user.studentId,
                specialization: user.specialization,
                role: 0})

            localStorage.setItem('firstLogin', true)
            alert('Registered Successfully!');
            
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className='flex justify-center items-center h-screen bg-gray-200'>
            <div className="flex flex-col justify-center items-center bg-white p-10 rounded-lg shadow-md">

       

                <form noValidate onSubmit={registerSubmit} className='flex flex-col space-y-5'>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="name" className='font-semibold text-gray-600'>Name</label>
                        <div className="flex items-center space-x-2">
                            <FaUserShield className='text-gray-500' />
                            <input type="text" name="name" placeholder="Enter Username" value={user.name} onChange={onChangeInput} className='p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400' />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className='font-semibold text-gray-600'>Email</label>
                        <div className="flex items-center space-x-2">
                            <MdMarkEmailRead className='text-gray-500' />
                            <input type="email" id="email" name="email" placeholder="Enter Email" value={user.email} onChange={onChangeInput} className='p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400' />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="studentId" className='font-semibold text-gray-600'>StudentId</label>
                        <div className="flex items-center space-x-2">
                            <FaUserShield className='text-gray-500' />
                            <input type="text" name="studentId" placeholder="Enter studentId" value={user.studentId} onChange={onChangeInput} className='p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400' />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="specialization" className='font-semibold text-gray-600'>Specialization</label>
                        <div className="flex items-center space-x-2">
                            <FaUserShield className='text-gray-500' />
                            <input type="text" name="specialization" placeholder="Enter Specialization" value={user.specialization} onChange={onChangeInput} className='p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400' />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="password" className='font-semibold text-gray-600'>Password</label>
                        <div className="flex items-center space-x-2">
                            <BsFillShieldLockFill className='text-gray-500' />
                            <input type="password" id="password" name="password" placeholder="Enter Password" value={user.studentId} readOnly onChange={onChangeInput} className='p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400' />
                        </div>
                    </div>

                    <button type='submit' className='bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600'>
                        Register
                    </button>
                </form>

                <div className="mt-5">
                    <span className='text-gray-500'>Have an account?</span>
                    <Link to={'/login'} className='text-blue-500 hover:underline cursor-pointer ml-2'>
                        Login
                    </Link>
                </div>

            </div>
        </div>
    )}

    export default Register;