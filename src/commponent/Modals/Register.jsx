import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { handleRegister } from "../../APP/Reducer/loginRegSlice";
import { BsPerson, BsEnvelope } from 'react-icons/bs';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import "./Register.css"

const Register = ({ setToken }) => {
    const initialValues = { name:"",  email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        try {
            dispatch(handleRegister(formValues))
            setFormValues({name: "",  email: "", password: "", password_confirmation: ""})
            handleClose();
        }catch(error) {
            console.error(error)
        }
    }

    const token = localStorage.getItem('token')
    useEffect(() => {
        if(token) {
            setToken(true);
        } else {
            setToken(false);
        }
    }, [token, setToken]);

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
            <button onClick={handleShow} className='button-full rounded-3xl px-6 py-2'>Register</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h1 className="mx-3 text-xl">Create Account</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="" onSubmit={handleSubmit}>
                        <div className='wrapping relative flex flex-col gap-y-5 justify-center content-center my-2'>
                            <div className='grouping-input flex flex-col mx-3'>
                                <span className='relative'>
                                    <input
                                    name='name'
                                    type="text"
                                    placeholder='Your Name'
                                    onChange={handleChange}
                                    value={formValues.name}
                                    className="py-2 px-3 rounded-xl"
                                    />
                                    <BsPerson className='absolute icon' />
                                </span>
                                <p className='error text-sm text-red-600 mt-1 ml-4'>{formErrors.name}</p>
                            </div>

                            <div className='grouping-input flex flex-col mx-3'>
                                <span className='relative'>
                                    <input
                                    name='email'
                                    type="email"
                                    placeholder='Email Address'
                                    onChange={handleChange}
                                    value={formValues.email}
                                    className="py-2 px-3 rounded-xl"
                                    />
                                    <BsEnvelope className='absolute icon' />
                                </span>
                                <p className='error text-sm text-red-600 mt-1 ml-4'>{formErrors.email}</p>
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
                            <div className='buttons-modal flex align-middle mt-3'>
                                <button className='button-login rounded-3xl px-6 py-2' type='submit'>Register</button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Register;