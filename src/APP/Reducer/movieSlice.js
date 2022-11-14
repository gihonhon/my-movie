import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL, API_TMDB_KEY} from "../../util/API/api";

export const getPopular = createAsyncThunk("populars/getPopular", async () => {
    const res = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
            api_key: API_TMDB_KEY,
        },
    }).then((res) => {
        return res.data.results;
    });
    return res;
});

export const popularSlice = createSlice({
    name: "populars",
    initialState: {
        populars: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getPopular.pending]: (state) => {
            state.loading = true;
        },
        [getPopular.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.populars = payload;
        },
        [getPopular.rejected]: (state) => {
            state.loading = false;
        },
    }
});

export const getUpcoming = createAsyncThunk("upcomings/getUpcoming", async () => {
    const res = await axios.get(`${BASE_URL}/movie/upcoming`, {
        params: {
            api_key: API_TMDB_KEY,
        },
    }).then((res) => {
        return res.data.results;
    });
    return res;
});

export const upcomingSlice = createSlice({
    name: "upcomings",
    initialState: {
        upcomings: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getUpcoming.pending]: (state) => {
            state.loading = true;
        },
        [getUpcoming.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.upcomings = payload;
        },
        [getUpcoming.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const getGenre = createAsyncThunk("genres/getGenre", async () => {
    const res = await axios.get(`${BASE_URL}/genre/movie/list`, {
        params: {
            api_key: API_TMDB_KEY,
        },
    }).then((res) => {
        return res.data.genres;
    });
    return res;
});

export const genreSlice = createSlice({
    name: "genres",
    initialState: {
        genres: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getGenre.pending]: (state) => {
            state.loading = true;
        },
        [getGenre.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.genres = payload;
        },
        [getGenre.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const popularsRedux = popularSlice.reducer;
export const upcomingsRedux = upcomingSlice.reducer;
export const genresRedux = genreSlice.reducer; 