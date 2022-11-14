import React from "react";
import { AiOutlineFacebook as FB, AiOutlineInstagram as IG, AiOutlineYoutube as YT } from "react-icons/ai";
import { BsTwitter as TWT, BsGithub } from "react-icons/bs";

const Footers = () => {
    return (
        <footer className="test justify-center items-center h-80 bg-gray-200 flex flex-col gap-y-4">
            <ul className="flex list-none flex-wrap justify-center gap-6">
                <li className="list-item text-center">
                    <a className="text-2xl text-gray-600 block no-underline py-4 px-2 hover:text-gray-400" href="https://www.facebook.com/GoodMoviesList/">
                        <FB/>
                    </a>
                </li>
                <li className="list-item text-center">
                    <a className="text-2xl text-gray-600 block no-underline py-4 px-2 hover:text-gray-400" href="https://www.instagram.com/themovielist/?hl=id">
                        <IG/>
                    </a>
                </li>
                <li className="list-item text-center">
                    <a className="text-2xl text-gray-600 block no-underline py-4 px-2 hover:text-gray-400" href="https://twitter.com/themoviedb">
                        <TWT/>
                    </a>
                </li>
                <li className="list-item text-center">
                    <a className="text-2xl text-gray-600 block no-underline py-4 px-2 hover:text-gray-400" href="https://www.youtube.com/c/TheChoiceBox">
                        <YT/>
                    </a>
                </li>
            </ul>

            <ul className="flex list-none flex-wrap justify-center gap-6">
                <li><a className="text-lg block py-4 px-2 text-gray-600 no-underline hover:text-gray-500" href="/">Condition of Use</a></li>
                <li><a className="text-lg block py-4 px-2 text-gray-600 no-underline hover:text-gray-500" href="/">Privacy & Policy</a></li>
                <li><a className="text-lg block py-4 px-2 text-gray-600 no-underline hover:text-gray-500" href="/">Press Room</a></li>
            </ul>

            <div className="flex flex-wrap justify-center text-[1.05rem] gap-2 items-center">
                <a className="text-gray-700 hover:text-gray-500" href="https://github.com/gihonhon">
                    <BsGithub/>
                </a>
                <span>&copy;2022 Created by Honhon</span>
            </div>
            {/* <p>Movie App ©2022 Created by Muhammad Nizar Fazari</p> */}
        </footer>
    );
};

export default Footers;