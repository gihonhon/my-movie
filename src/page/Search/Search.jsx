import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Loader from "../../commponent/Loader/Loader";
import Slider from "../../commponent/Slider/Slider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSearch, getCategory } from "../../APP/Reducer/searchReducer";
import { getGenre } from "../../APP/Reducer/movieSlice";
import { AiFillStar } from "react-icons/ai";
import { API_TMDB_KEY, BASE_URL, IMG_URL } from "../../util/API/api";
import { BsFileEarmarkText } from "react-icons/bs";
import { background1, NoCast } from "../../asset/index_image";

const Search = () => {

    const [loaded, setLoaded] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { nama, cat } = useParams();
    const location = useLocation();

    const genres = useSelector((state) => state.genre.genres);
    const movies = useSelector((state) => state.search.browse);

    useEffect(() => {
        if (nama) {
            dispatch(getSearch(nama));
        } else {
            dispatch(getCategory(cat));
        }
        dispatch(getGenre());
    }, [dispatch,nama, cat]);

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
                            <div className="text-start mx-10">
                                {cat ? (
                                    <h1 className="text-white xl:text-6xl sm:text-5xl text-3xl font-semibold leading-tight mb-5 capitalize">Genre "{location.state}"</h1>
                                ) : (
                                    <h1 className="text-white xl:text-6xl sm:text-5xl text-3xl font-semibold leading-tight mb-5 capitalize">All Movies "{nama}"</h1>
                                )}
                            </div>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <section className="my-20 mx-10" style={{ minHeight: "40vh" }}>
                <div className="container">
                    {cat ? (
                        <>
                        <h1 className="xl:text-4xl sm:text-3xl text-2xl font-semibold leading-tight xl:mb-14 mb-8">Browse by Category "{location.state}"</h1>
                        <Slider genres={genres} />
                        </>
                    ) : (
                        <h1 className="xl:text-4xl sm:text-3xl text-2xl font-semibold leading-tight xl:mb-14 mb-8">Search Result "{nama}"</h1>
                    )}

                    {movies.length > 0 ? (
                        <div className="wrapper-search grid grid-cols-4 gap-5">
                            {movies.map((movie) => {
                                return (
                                    <div className="movie-card relative overflow-hidden" key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
                                        {movie.poster_path !== null ? 
                                            <img className="rounded-xl" src={`${IMG_URL}/${movie.poster_path}`} onLoad={onImageLoaded} alt="" /> : 
                                            <img className="rounded-xl" src={NoCast} alt=""/>
                                        }

                                        {!loaded && <Loader />}
                                        <div className="movie-description absolute">
                                            <h4 className="font-bold text-2xl text-white mb-3">{movie.original_title}</h4>
                                            <p className="text-lg text-white mb-3 flex items-center ">
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

export default Search;