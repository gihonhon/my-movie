import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL, API_TMDB_KEY} from "../../util/API/api";

export const getDetail = createAsyncThunk("details/getDetail", async (id) => {
    const res = await axios.get(`${BASE_URL}/movie/${id}`, {
        params: {
            api_key: API_TMDB_KEY,
        },
    }).then((res) => {
        return res.data;
    });
    return res;
});

export const detailSlice = createSlice({
    name: "details",
    initialState: {
        details: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getDetail.pending]: (state) => {
            state.loading = true;
        },
        [getDetail.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.details = payload;
        },
        [getDetail.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const getCast = createAsyncThunk("casts/getCast", async (id) => {
    const res = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
        params: {
            api_key: API_TMDB_KEY,
        },
    }).then((res) => {
        return res.data.cast;
    });
    return res;
});

export const castSlice = createSlice({
    name: "casts",
    initialState: {
        casts: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getCast.pending]: (state) => {
            state.loading = true;
        },
        [getCast.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.casts = payload;
        },
        [getCast.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const getReview = createAsyncThunk("reviews/getReview", async (id) => {
    const res = await axios.get(`${BASE_URL}/movie/${id}/reviews`, {
        params: {
            api_key: API_TMDB_KEY,
        },
    }).then((res) => {
        return res.data;
    });
    return res;
});

export const reviewSlice = createSlice({
    name: "reviews",
    initialState: {
        reviews: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getReview.pending]: (state) => {
            state.loading = true;
        },
        [getReview.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.reviews = payload;
        },
        [getReview.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const getVideo = createAsyncThunk("videos/getVideo", async (id) => {
    const res = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
        params: {
            api_key: API_TMDB_KEY,
        },
    }).then((res) => {
        return res.data.results[0].key;
    });
    return res;
});

export const videoSlice = createSlice({
    name: "videos",
    initialState: {
        videos: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getVideo.pending]: (state) => {
            state.loading = true;
        },
        [getVideo.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.videos = payload;
        },
        [getVideo.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const detailsRedux = detailSlice.reducer;
export const castsRedux = castSlice.reducer;
export const reviewsRedux = reviewSlice.reducer;
export const videosRedux = videoSlice.reducer;