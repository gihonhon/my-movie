import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import Modals from "../Modals/Modals";
import "./navbar.css";
import { Logo } from "../../asset/index_image";

const Navbars = () => {
    const navigate = useNavigate();
    const [log, setShowLog] = useState(false);
    const [reg, setShowReg] = useState(false);
    const [datas, setDatas] = useState([]);
    const loginHandleClose = () => setShowLog(false);
    const loginHandleShow = () => setShowLog(true);
    const registerHandleClose = () => setShowReg(false);
    const registerHandleShow = () => setShowReg(true);

    const getDataGoogle = () => {
        const data = JSON.parse(localStorage.getItem("profile"));
        setDatas(data);
    };

    const getDataMe = async () => {
        try {
            let config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` },
        };
        const data = await axios.get("https://notflixtv.herokuapp.com/api/v1/users/me", config);
        setDatas(data.data.data);
        } catch (error) {}
    };

    const searchButton = async (e) => {
        e.preventDefault();
        let data = e.target[0].value;
        navigate(`/search/${data}`);
    };

    return (
        <nav>
        <div className="wrapper flex justify-between items-center container mx-auto px-6 pr-6">
            <div className="logos">
                <img className="cursor-pointer" src={Logo} alt="" onClick={() => navigate("/")}/>
            </div>
            <form className="" onSubmit={(e) => searchButton(e)}>
                <div className="nav-search relative w-80 flex ">
                    <input className="py-2 pl-5  rounded-3xl " type="text" placeholder="What do you want to watch?" name="search" />
                    <AiOutlineSearch className="icon absolute" />
                </div>
            </form>
            <div className="nav-buttons flex gap-x-2">
                {localStorage.getItem("token") ? (
                    <Dropdown>
                        {localStorage.getItem("profile") ? (
                        <Dropdown.Toggle id="dropdown-basic">
                            <div className="flex items-center">
                                <span>
                                    <h1 className="hidden sm:block text-white mr-3 text-lg">
                                        {datas.givenName} {datas.familyName}
                                    </h1>
                                </span>
                                <span className="w-10">
                                    <span className="w-10">
                                        {datas.imageUrl ? 
                                            <img className="rounded-full" src={datas.imageUrl} alt="" /> : 
                                            <img className="rounded-full" src={`https://ui-avatars.com/api/?name=${datas.imageUrl}`} alt="" />
                                        }
                                    </span>
                                </span>
                            </div>
                        </Dropdown.Toggle>
                        ) : (
                            <Dropdown.Toggle id="dropdown-basic">
                                <div className="flex items-center">
                                    <span className="w-10 ">
                                        {datas.image ? 
                                            <img className="rounded-full" src={datas.image} alt="" /> : 
                                            <img className="rounded-full" src={`https://ui-avatars.com/api/?name=${datas.image}`} alt="" />
                                        }
                                    </span>
                                    <span>
                                        <h1 className="hidden sm:block text-white ml-3 text-lg">
                                            {datas.first_name} {datas.last_name}
                                        </h1>
                                    </span>
                                </div>
                            </Dropdown.Toggle>
                        )}
                        <Dropdown.Menu className="mt-2">
                            <Dropdown.Item href="#/action-1">Edit Profile</Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    localStorage.clear();
                                    window.location.reload();
                                }}>Log Out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    ) : (
                    <>
                        <button className="button-border rounded-3xl px-6 py-2" onClick={loginHandleShow}>
                            Login
                        </button>
                        <button className="button-full rounded-3xl px-6 py-2" onClick={registerHandleShow}>
                            Register
                        </button>
                    </>
                    )}
                    <Modals loginHandleClose={loginHandleClose} log={log} getDataMe={getDataMe} getDataGoogle={getDataGoogle} />
                    <Modals registerHandleClose={registerHandleClose} reg={reg} getDataMe={getDataMe} />
            </div>
        </div>
    </nav>
    );

};

export default Navbars;