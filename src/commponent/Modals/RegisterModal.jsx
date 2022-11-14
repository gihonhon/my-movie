import React, { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMail, AiOutlineUser, AiOutlineEyeInvisible} from 'react-icons/ai';
import { registerWithEmailAndPassword, auth} from '../../APP/Reducer/userAuth';
import { useDispatch } from 'react-redux';
import { useAuthState } from "react-firebase-hooks/auth"

const RegisterModal = ({visible, close, setToken}) => {
    const [user, setUser] = useState([]);
    const [regInfo, setRegImfo] = useState(false);
    const initValue = {
        name: '',
        email: '',
        password: '',
    };
    const [formValues, setFormValues] = useState(initValue);
    const dispatch = useDispatch();

    const handleChange = e => {
        const {name, value} = e.target;
        setFormValues({ ...formValues, [name]: value});
    }
    const [userss] = useAuthState(auth);
    const token = JSON.parse(localStorage.getItem('token'));
    const users = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        setToken(token);
        setUser(users);
    }, [userss, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formValues)
        dispatch(registerWithEmailAndPassword(formValues));
    };

    const handleOnClose = (e) => {
        if(e.target.id === 'container') 
        close()
    }
    if(!visible) return null

    return (
    <div id='container' onClick={handleOnClose} className='fixed inset-0 bg-black bg-opacity-70 backdropbackdrop-blur-xl flex justify-center items-center text-black'>
        <div className="bg-white p-2 rounded w-[500px]">
            <div className='flex items-center justify-between mb-7 '>
                <p className='font-semibold '>Create Account</p>
                <button onClick={close}><AiOutlineClose /></button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col">      
                    <div className='flex items-center border border-gray-400 p-2 rounded-full mb-2 justify-between'>
                        <input
                            type="text"
                            name='name'
                            value={formValues.name}
                            onChange={handleChange}
                            className="w-full rounded-full outline-none p-1"
                            placeholder='Full Name'
                        />
                        <AiOutlineUser size={20} className='mr-2' />
                    </div>
                    <div className='flex items-center border border-gray-400 p-2 rounded-full mb-2 justify-between'>
                        <input
                            type="email"
                            name='email'
                            value={formValues.email}
                            onChange={handleChange}
                            className="w-full rounded-full outline-none p-1"
                            placeholder='Email Address'
                        />
                        <AiOutlineMail size={20} className='mr-2' />
                    </div>
                
                    <div className='flex items-center border border-gray-400 p-2 rounded-full mb-5 justify-between'>
                        <input
                            type="password"
                            name='password'
                            value={formValues.password}
                            onChange={handleChange}
                            className="w-full rounded-full outline-none p-1"
                            placeholder='Password'
                        />
                        <AiOutlineEyeInvisible size={20} className='mr-2' />
                    </div>
                    <div>
                        {regInfo &&
                            <p className='text-red-600 mb-5 text-center'>Register failed, please try again...</p>
                        }
                    </div>
                </div>
                <div className="flex items-end justify-end text-center">
                    <button button onClick={handleSubmit}  className='bg-red-600 hover:bg-red-400 px-8 py-2 rounded-full text-white'>Register Now</button>
                </div>
            </form>
        </div>
    </div>
    )
};

export default RegisterModal;