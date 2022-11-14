import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel, Modal } from "react-bootstrap";
import { AiOutlinePlayCircle, AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { getDetail, getCast, getReview, getVideo } from "../../APP/Reducer/detailSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../commponent/Loader/Loader";
import Slider from "../../commponent/Slider/Slider";
import { API_TMDB_KEY, BASE_URL, IMG_URL } from "../../util/API/api";
import "./styles.css";
import { NoImg } from "../../asset/index_image";


const Details = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const detail = useSelector((state) => state.detail.details);
    const cast = useSelector((state) => state.cast.casts);
    const review = useSelector((state) => state.review.reviews);
    const videos = useSelector((state) => state.video.videos);

    // const [movie, setMovie] = useState([]);
    // const [review, setReview] = useState([]);
    // const [cast, setCast] = useState([]);
    // const [videos, setVideos] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loaded, setLoaded] = useState(false);
    const onImageLoaded = () => {
        setLoaded(true);
    };

    useEffect(() => {
        dispatch(getDetail(id));
        dispatch(getCast(id));
        dispatch(getReview(id));
        dispatch(getVideo(id));
    }, [id]);

    // const getData = async () => {
    //     const dataMovies = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_TMDB_KEY}`);
    //     const dataVideo = await axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_TMDB_KEY}`);
    //     const dataReviews = await axios.get(`${BASE_URL}/movie/${id}/reviews?api_key=${API_TMDB_KEY}`);
    //     const dataCasts = await axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_TMDB_KEY}`);
    //     setMovie(dataMovies.data);
    //     setVideos(dataVideo.data.results[0].key);
    //     setReview(dataReviews.data);
    //     setCast(dataCasts.data.cast);
    // };

    return (
        <div>
            <header>
                <Carousel fade controls={false} indicators={false}>
                    <Carousel.Item>
                        <div className="images relative">
                            {detail.backdrop_path !== null ? 
                                <img className="d-block w-100 absolute" src={`${IMG_URL}${detail.backdrop_path}`} alt="First slide" onLoad={onImageLoaded} /> :
                                <img className="d-block w-100 absolute" src={NoImg} alt=""/>
                            }
                            
                            {!loaded && <Loader />}
                        </div>
                        <Carousel.Caption>
                            <div className="container ">
                                <div className="header text-start ml-8">
                                    <h1 className="font-medium text-7xl text-white mb-8">{detail.original_title}</h1>
                                    <p className="text-white mb-8">{detail.overview}</p>
                                    <p className="rating flex items-center mb-8 font-bold">
                                        <AiFillStar className="mr-2" style={{ color: "#fcd34d" }} /> {Math.min(detail.vote_average).toFixed(1)} / 10
                                    </p>
                                    <button className="button-full rounded-3xl px-6 py-2 font-semibold flex items-center" onClick={handleShow}>
                                        <AiOutlinePlayCircle className="mr-2 text-xl" /> WATCH TRAILER
                                    </button>
                                    <Modal show={show} onHide={handleClose} centered>
                                        <div className="trailer">
                                            <iframe
                                            width="560"
                                            height="315"
                                            src={`https://www.youtube.com/embed/${videos}`}
                                            title="YouTube video player"
                                            frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            ></iframe>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </header>
            <section className="mt-20 mb-20 mx-10">
                <div className="container">
                    <div className="casting">
                        <h2 className="text-4xl font-semibold mb-4">Actors</h2>
                        <Slider casts={cast} />
                    </div>
                    <div className="review mt-20">
                        <h2 className="text-4xl font-semibold mb-4">What People Says</h2>
                        <Slider reviews={review.results} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Details;