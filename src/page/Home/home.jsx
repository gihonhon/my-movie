import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel, Container, Modal } from "react-bootstrap";
import Slider from "../../commponent/Slider/Slider";
import { AiOutlinePlayCircle, AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPopular, getUpcoming, getGenre } from "../../APP/Reducer/movieSlice";
import { imgSlide1, imgSlide2, imgSlide3 } from "../../asset/index_image";
import { API_TMDB_KEY, BASE_URL } from "../../util/API/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./home.css";

const Home = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genre.genres);
    const popular = useSelector((state) => state.popular.populars);
    const upComing = useSelector((state) => state.upcoming.upcomings);

    const[show, setShow] = useState(false);
    const[show2, setShow2] = useState(false);
    const[show3, setShow3] = useState(false);
    const showModal = () => setShow(true);
    const showModal2 = () => setShow2(true);
    const showModal3 = () => setShow3(true);
    const closeModal =  () => setShow(false);
    const closeModal2 =  () => setShow2(false);
    const closeModal3 =  () => setShow3(false);

    useEffect(() => {
        dispatch(getPopular());
        dispatch(getUpcoming());
        dispatch(getGenre());
    }, [dispatch]);

    return (
        <div>
            <header>
                <Carousel controls={false}>
                    <Carousel.Item>
                        <div className="images relative">
                            <img className="d-block w-100" src={imgSlide1} alt="" />
                        </div>
                        <Carousel.Caption>
                            <Container>
                                <div className="header text-start ml-8">
                                    <h1 className="font-medium text-6xl text-white mb-8 mr-8 max-w-[80%]">Doctor Strange in the Multiverse of Madness</h1>
                                    <p className="text-white mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do .</p>
                                    <button onClick={showModal} className="button-full rounded-3xl px-6 py-2 flex items-center font-semibold">
                                        <AiOutlinePlayCircle className="mr-2 text-xl icon-trailer"/> WATCH TRAILER
                                    </button>
                                    <Modal show={show} onHide={closeModal} centered>
                                        <div>
                                            <iframe
                                            width="560"
                                            height="315"
                                            src="https://www.youtube.com/embed/aWzlQ2N6qqg"
                                            title="Marvel Studios' Doctor Strange in the Multiverse of Madness | Official Trailer"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            >
                                            </iframe>
                                        </div>
                                    </Modal>
                                </div>
                            </Container>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div className="images relative">
                            <img className="d-block w-100" src={imgSlide2} alt="" />
                        </div>
                        <Carousel.Caption>
                            <Container>
                                <div className="header text-start ml-8">
                                    <h1 className="font-medium text-6xl text-white mb-8 mr-8 max-w-[80%]">Moon Knight</h1>
                                    <p className="text-white mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do .</p>
                                    <button onClick={showModal2} className="button-full rounded-3xl px-6 py-2 flex items-center font-semibold">
                                        <AiOutlinePlayCircle className="mr-2 text-xl icon-trailer"/> WATCH TRAILER
                                    </button>
                                    <Modal show={show2} onHide={closeModal2} centered>
                                        <div>
                                            <iframe
                                            width="560"
                                            height="315"
                                            src="https://www.youtube.com/embed/x7Krla_UxRg"
                                            title="Marvel Studios Moon Knight | Official Trailer | Disney+"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            >
                                            </iframe>
                                        </div>
                                    </Modal>
                                </div>
                            </Container>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div className="images relative">
                            <img className="d-block w-100" src={imgSlide3} alt="" />
                        </div>
                        <Carousel.Caption>
                            <Container>
                                <div className="header text-start ml-8">
                                    <h1 className="font-medium text-6xl text-white mb-8 mr-8 max-w-[80%]">Jurassic World Dominion</h1>
                                    <p className="text-white mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do .</p>
                                    <button onClick={showModal3} className="button-full rounded-3xl px-6 py-2 flex items-center font-semibold">
                                        <AiOutlinePlayCircle className="mr-2 text-xl icon-trailer"/> WATCH TRAILER
                                    </button>
                                    <Modal show={show3} onHide={closeModal3} centered>
                                        <div>
                                            <iframe
                                            width="560"
                                            height="315"
                                            src="https://www.youtube.com/embed/fb5ELWi-ekk"
                                            title="Jurassic World Dominion - Official Trailer"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            >
                                            </iframe>
                                        </div>
                                    </Modal>
                                </div>
                            </Container>
                        </Carousel.Caption>
                    </Carousel.Item>

                </Carousel>
            </header>
            <section className="section-movie my-20 mx-10">
                <div className="container">
                    <div className="title-contents flex xl:items-center xl:flex-row flex-col justify-between xl:mb-14 mb-10">
                        <h2 className="text-4xl popular font-semibold ">Popular Movie</h2>
                        <p className="xl:text-lg text-base flex items-center cursor-pointer text-gray-700 hover:text-gray-500" onClick={() => navigate("/all-movies")}>
                            See All Movie <AiOutlineArrowRight className="ml-4" />
                        </p>
                    </div>
                    <Slider movies={popular} />
                    <div className="title-contents flex xl:items-center xl:flex-row flex-col justify-between xl:mb-14 mb-10 mt-20">
                        <h2 className="text-4xl font-semibold ">Browse by Category</h2>
                        <p className="xl:text-lg text-base flex items-center cursor-pointer text-gray-700 hover:text-gray-500" onClick={() => navigate("/all-movies")}>
                            See All Movie <AiOutlineArrowRight className="ml-4" />
                        </p>
                    </div>
                    <Slider genres={genres} />
                    <Slider movies={upComing} />
                </div>
            </section>
        </div>
    );
};


export default Home;