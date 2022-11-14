import React from "react";
import { MutatingDots } from "react-loader-spinner";

const Loader = () => {
    return (
        <div className="image-overlay h-full w-full absolute flex top-px justify-center items-center rounded-xl bg-gray-300">
            <MutatingDots height="100" width="100" color="#a0a0a0" secondaryColor="#a0a0a0" radius='12.5' ariaLabel="mutating-dots-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
        </div>
    )
};

export default Loader;