import { configureStore } from "@reduxjs/toolkit";
import { popularsRedux, upcomingsRedux, genresRedux } from "../Reducer/movieSlice";
import { detailsRedux, castsRedux, reviewsRedux, videosRedux } from "../Reducer/detailSlice";
import { searchRedux, categoryRedux } from "../Reducer/searchSlice";
import { searchReducer } from "../Reducer/searchReducer";
import loginRedux from "../Reducer/loginRegSlice";
import authlog from "../Reducer/userAuth";


export const store = configureStore({
    reducer:{
        popular: popularsRedux,
        upcoming: upcomingsRedux,
        genre: genresRedux,
        detail: detailsRedux,
        cast: castsRedux,
        review: reviewsRedux,
        video: videosRedux,
        search: searchReducer,
        category: categoryRedux,
        login: loginRedux,
        logauth: authlog,
    }
});