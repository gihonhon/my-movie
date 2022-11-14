import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'; 
import { useDispatch } from 'react-redux';
import { handleLogin, googleOauth } from "../../APP/Reducer/loginRegSlice";
import { BsEnvelope } from 'react-icons/bs';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import "./Login.css"

const Login = ({ setToken }) => {
    const initValue = {
        email: "",
        password: "",
    };
    const [formValues, setFormValues] = useState(initValue);
    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        try {
            dispatch(handleLogin(formValues))
            setFormValues({email: '', password: ''})
            handleClose();
        } catch(error) {
            console.error(error);
        }
    };

    const handleLoginGoogle = () => {
        try {
            dispatch(googleOauth())
            handleClose();
        }catch(error){
            console.error(error);
        }
    }

    const token = localStorage.getItem('token');
    const gToken = localStorage.getItem('google_user');
    useEffect(() => {
        if(token || gToken) {
            setToken(true);
        } else {
            setToken(false)
        }
    }, [token, setToken, gToken]);

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    return (
        <div>
            <button onClick={handleShow} className="button-border rounded-3xl px-6 py-2">Login</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h1 className='mx-3 text-xl'>Login</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="" onSubmit={handleSubmit}>
                        <div className="relative flex flex-col justify-center content-center my-2 gap-y-5">
                            <div className="grouping-input flex flex-col mx-3">
                                <span className='relative'>
                                    <input 
                                    name='email'
                                    type="email"
                                    placeholder='Email Address'
                                    value={formValues.email}
                                    onChange={handleChange}
                                    className="py-2 px-3 rounded-xl"
                                    />
                                    <BsEnvelope className='absolute icon'/>
                                    <p className='error text-sm text-red-600 mt-1 ml-4'>{formErrors.email}</p>
                                </span>
                            </div>
                            <div className="grouping-input flex flex-col mx-3">
                                {showPassword === false ? (
                                    <span className="relative">
                                        <input
                                        name='password'
                                        type="password"
                                        placeholder='Password'
                                        autoComplete='off'
                                        value={formValues.password}
                                        onChange={handleChange}
                                        className="py-2 px-3 rounded-xl"
                                        />
                                        <BsFillEyeSlashFill className='absolute icon cursor-pointer' onClick={handleClickShowPassword} />
                                    </span>
                                ) : (
                                    <span className="relative">
                                        <input
                                        name='password'
                                        type="text"
                                        placeholder='Password'
                                        autoComplete='off'
                                        value={formValues.password}
                                        onChange={handleChange}
                                        className="py-2 px-3 rounded-xl"
                                        />
                                        <BsFillEyeFill className='absolute icon cursor-pointer' onClick={handleClickShowPassword}/>
                                    </span>
                                )}
                                <p className='error text-sm text-red-600 mt-1 ml-4'>{formErrors.password}</p>
                            </div>
                        </div>
                        <div className='buttons-modal flex align-middle mt-3'>
                            <button className='button-login rounded-3xl px-6 py-2' type='submit'>Login</button>
                            <button className='button-login rounded-3xl px-6 py-2' onClick={handleLoginGoogle} >Login With Google</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Login;
