import React, { useEffect, useState } from 'react'
import {AiOutlineClose, AiOutlineMail, AiOutlineEyeInvisible} from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { signInWithGoogle, auth, logInWithEmailAndPassword } from '../../APP/Reducer/userAuth'; 

const LoginModal = ({open, close, setToken}) => {
    const [email] = useState();
    const [password] = useState();
    const [loginMsg, setLoginMsg] = useState(false);
    const initialValues = {
        email: "", 
        password: ""
    };
    const [formValues, setFormValues] = useState(initialValues);
    const dispatch = useDispatch();

    const handleChange = e => {
        const {name, value} = e.target;
        setFormValues({ ...formValues, [name]: value});
    }
    const token = JSON.parse(localStorage.getItem('token'))
    
    useEffect(() => {
        if(token){
            setToken(true)
        }else{
            setToken(false)
        }
    }, [token, setToken])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formValues)
        dispatch(logInWithEmailAndPassword(formValues));
    };

    const googleLogin = () => {
        dispatch(signInWithGoogle());
        close()
    };

    const handleOnClose = (e) => {
        if(e.target.id === 'container') 
        close()
    }

    const validateEmail = () => {
        if (email === undefined) return true;
        return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };

    const validatePassword = () => {
        if (password === undefined) return true;
        return String(password);
    };

    if(!open) return null
    return (
    <div id='container' onClick={handleOnClose} className='fixed inset-0 bg-black bg-opacity-70 backdropbackdrop-blur-xl flex justify-center items-center text-black'>
        <div className="bg-white p-2 rounded w-[500px]">
            <div className='flex items-center justify-between mb-7 '>
                <p className='font-semibold '>Log In to Your Account</p>
                <button onClick={close}><AiOutlineClose /></button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <div className='flex items-center border border-gray-400 p-2 rounded-full justify-between'>
                        <input required
                        name='email'
                        value={formValues.email}
                        type="email"
                        onChange={handleChange}
                        className="w-full rounded-full outline-none p-1"
                        placeholder='Email Address'
                        />
                        <AiOutlineMail size={20} className='mr-2' />
                    </div>
                    <div className='mb-5'>
                        {!validateEmail() && (<p className='text-red-600'> Please input a valid email! </p>)}
                    </div>
                    <div className='flex items-center border border-gray-400 p-2 rounded-full mb-5 justify-between'>
                        <input
                        name='password'
                        value={formValues.password}
                        type="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        onChange={handleChange}
                        className="w-full rounded-full outline-none p-1"
                        placeholder='Password'
                        />
                        <AiOutlineEyeInvisible size={20} className='mr-2' />
                    </div>
                    <div className='mb-5'>
                        {!validatePassword() && (<p  className='text-red-600'> Please input your password! </p>)}
                    </div>
                    <div>
                        {loginMsg && <p className='text-red-600 mb-5 text-center'>Login failed, please check your email and password are correct!</p>}
                    </div>
                </div>
                <div className="flex items-end justify-between text-center">
                    <button onClick={handleSubmit} className='bg-red-600 hover:bg-red-400 px-8 py-2 rounded-full text-white'>Login</button>
                    <button onClick={googleLogin} className='bg-red-600 hover:bg-red-400 px-8 py-2 rounded-full text-white'>Sign with Google</button>
                </div>
            </form>
        </div>
    </div>
    )
};

export default LoginModal;