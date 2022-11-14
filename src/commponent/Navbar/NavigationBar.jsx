import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {AiOutlineSearch, AiOutlineLogout} from 'react-icons/ai';
import LoginModal from "../Modals/LoginModal";
import RegisterModal from "../Modals/RegisterModal";

const NavigationBar = () => {
    const [search, setSearch]= useState('');
    const [logOpenModal, setLogOpenModal] = useState(false)
    const [regOpenModal, setRegOpenModal] = useState(false)
    const [token, setToken] = useState(false)
    const navigate = useNavigate();

    const handleOnClose = () => setRegOpenModal(false)
    const loginClose = () => setLogOpenModal(false)

    const user = localStorage.getItem('user');
    const userData = JSON.parse(user);

    useEffect(() =>{
        if(userData){
            setToken(true)
        }
    },[token])

    const submit  = () => {
        navigate(`/Search/${search}`)
    }
    const logout = async () => {
        setTimeout(function () {
            window.location.reload(1);
        }, 1500);
        localStorage.clear();
    };

    return (
        <div className='flex items-center justify-between p-4 z-[100] w-full absolute text-white'>
            <Link to='/' className='text-red-600 text-5xl font-bold cursor-pointer ml-3'>MovieList</Link>
            <form onSubmit={submit} className='text-white bg-transparents border border-red-600 rounded-full flex items-center px-2 w-[200px] sm:w-[200px] lg:w-[300px] ' autoComplete="off">
                <input 
                type="text"
                placeholder="What do you want to watch?"
                className='bg-transparent p-2 w-full focus:outline-none text-white' 
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                />
                <AiOutlineSearch color='white' size={20} className='cursor-pointer' />
            </form>
            {(token) ? 
                <div className='flex item-center mr-[10px]'>
                    <p className='text-white font-semibold text-3xl px-3 mr-6 py-2'>Welcome, {userData.displayName || userData.name}</p>
                    {userData.imageUrl || userData.image ? (
                    <img  src={userData.imageUrl || userData.image} style={{width:'50px', height:'50px', borderRadius:'30px'}} alt='/' ></img>
                    ) : (
                    <img
                        src="https://th.bing.com/th/id/R.9d32bec8058bd3595a63a08a8cc12ade?rik=9cCTin36GLU%2f5w&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_87237.png&ehk=hVpH%2bC7rwlA1j2KqxGpMs1sp9l0RgM0jjRJsJsvDoPc%3d&risl=&pid=ImgRaw&r=0"
                        style={{width:'50px', height:'50px', borderRadius:'30px'}} alt='/'/>
                        )}
                    {console.log(`Data : ${userData.image}`)}
                    <button onClick={() => logout()} className='bg-red-600 hover:bg-red-400 px-8 py-2 rounded-full text-white ml-10'><AiOutlineLogout size={25} /></button>
                </div>
                :
                <div>
                    <div>
                        <button onClick={() => setLogOpenModal(true)} className='text-white hover:bg-red-400 px-8 py-2 mr-2 bg-transparent rounded-full border-2 border-red-500'>Login</button>
                        <button onClick={() => setRegOpenModal(true)} className='bg-red-600 hover:bg-red-400 px-8 py-2 rounded-full text-white'>Register</button>
                    </div>
                    <LoginModal open={logOpenModal} close={loginClose} setToken={setToken} />
                    <RegisterModal visible={regOpenModal} close={handleOnClose} setToken={setToken} />
                </div>
                }
        </div>
    )
};

export default NavigationBar;