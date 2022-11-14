import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Loader from "../../commponent/Loader/Loader";
import { API_TMDB_KEY, BASE_URL, IMG_URL } from "../../util/API/api";
import { BsFileEarmarkText } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";
import { background1 } from "../../asset/index_image";

const Movies = () => {
    const [loaded, setLoaded] = useState(false);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovie();
    }, []);

    const getMovie = async () => {
        const dataMovies = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_TMDB_KEY}`);
        setMovies(dataMovies.data.results);
    };

    const onImageLoaded = () => {
        setLoaded(true);
    };
    
    return (
        <div>
            <Carousel fade controls={false} indicators={false}>
                <Carousel.Item>
                    <div className="images relative" style={{ height: "60vh" }}>
                        <img className="d-block w-100 absolute" src={background1} alt="First slide" />
                    </div>
                    <Carousel.Caption>
                        <div className="container">
                            <div className="text-start ml-10">
                                <h1 className="text-white xl:text-6xl sm:text-5xl text-3xl font-semibold leading-tight mb-5 capitalize">All Movies</h1>
                            </div>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <section className="mx-10 my-20" style={{ minHeight: "40vh" }}>
                <h1 className="xl:text-4xl sm:text-3xl text-2xl font-semibold ml-4 leading-tight xl:mb-14 mb-8">Result All Movies</h1>
                <div className="container">
                        {movies.length > 0 ? (
                            <div className="wrapper-search grid grid-cols-4 gap-5">
                                {movies.map((movie) => {
                                    return (
                                        <div className="movie-card relative overflow-hidden">
                                            <img className="rounded-xl" src={`${IMG_URL}/${movie.poster_path}`} onLoad={onImageLoaded} alt="" />
                                            {!loaded && <Loader />}
                                            <div className="movie-description absolute">
                                                <h4 className="font-bold text-lg text-white mb-3">{movie.original_title}</h4>
                                                <p className="text-sm text-white mb-3 flex items-center">
                                                    <AiFillStar className="mr-2" style={{ color: "#fcd34d" }} /> {Math.min(movie.vote_average).toFixed(1)} / 10
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            ) : (
                                <div className="notification flex flex-col items-center">
                                    <BsFileEarmarkText className="text-7xl text-gray-400" />
                                    <h1 className="text-base pt-4 tracking-wide text-gray-400">There isn't any data</h1>
                                </div>
                            )}
                    </div>
            </section>
        </div>
    );
};

export default Movies;