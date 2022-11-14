
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineSearch } from "react-icons/ai";
import { logout } from '../../firebase';
import Register from '../Modals/Register';
import Login from '../Modals/Login';
import { Logo } from '../../asset/index_image';
import "./navbar.css";

const NavbarM = ({nameLogin, image}) => {
    const [query, setQuery] = useState('');
    const [alreadyLogin, setAlreadyLogin] = useState(false)
    const [showProfile, setShowProfile] = useState(false);
    const handleCloseProfile = () => setShowProfile(false);
    const handleShowProfile = () => setShowProfile(true);

    const navigate = useNavigate();

    const handleSubmitSearch = () => {
        navigate(`/search/${query}`)
    }

    const logOut = (e) => {
        e.preventDefault();
        logout();
        setAlreadyLogin(false);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem('google_user')
    }
    
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('google_user')

    useEffect(() => {

        if (user || token) {
            setAlreadyLogin(true);
        }

    }, [user, token])


    return (
        <nav>
            <div className='wrapper flex justify-between items-center container mx-auto'>
                <div className='logos'>
                    <img className='cursor-pointer' src={Logo} alt="" onClick={() => navigate('/')}/>
                </div>
                <form className="" onSubmit={handleSubmitSearch}>
                    <div className='nav-search relative w-80 flex'>
                        <input className='py-2 pl-15 rounded-3xl' type="text" placeholder='What do you want to watch?' onChange={(e) => setQuery(e.target.value)}/>
                        <AiOutlineSearch className='icon absolute'/>
                    </div>
                </form>
                <div className='nav-buttons flex gap-x-2'>
                    {(alreadyLogin) ? (
                        <div className='flex items-center cursor-pointer'>
                            <span className='w-10' onClick={handleShowProfile}>
                                <img className='rounded-full' src={user.photoURL || image} alt=''/>
                            </span>

                            <span onClick={handleShowProfile}>
                                <h1 className='sm:block text-white mr-3 text-lg'>
                                    {user.displayName || user.email}
                                </h1>
                            </span>
                            <Modal show={showProfile} onHide={handleCloseProfile}>
                                <Modal.Header closeButton>
                                    <Modal.Title>
                                        <h1 className='className="mx-3 text-xl"'>Profile</h1>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className='profile-wrapp relative flex flex-col justify-center content-center my-2 gap-y-5'>
                                        <div className='flex flex-col mx-3 items-center'>
                                                <img className='rounded-full w-32' src={user.photoURL || image} alt=""/>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer style={{justifyContent: "start"}}>
                                        <button className='button-full rounded-3xl px-6 py-2' onClick={logOut}>Log Out</button>
                                </Modal.Footer>
                            </Modal>
                        </div>

                        

                    ) : (
                        <>
                            <Login setToken={setAlreadyLogin}/>
                            <Register setToken={setAlreadyLogin}/>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
};

export default NavbarM;

