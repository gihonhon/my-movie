import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL, API_TMDB_KEY} from "../../util/API/api";


export const getSearch = createAsyncThunk("searchs/getSearch", async (nama) => {
    const res = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
            api_key: API_TMDB_KEY,
            query: `${nama}`,
        },
    }).then((res) => {
        return res.data.results;
    });
    return res;
});

export const searchSlice = createSlice({
    name: "searchs",
    initialState: {
        search: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getSearch.pending]: (state) => {
            state.loading = true;
        },
        [getSearch.pending]: (state, { payload }) => {
            state.loading = false;
            state.search = payload;
        },
        [getSearch.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const getCategory = createAsyncThunk("categorys/getCategory", async (cat) => {
    const res = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
            api_key: API_TMDB_KEY,
            with_genres: `${cat}`,
        },
    }).then((res) => {
        return res.data.results;
    });
    return res;
});

export const categorySlice = createSlice({
    name: "categorys",
    initialState: {
        categorys: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getCategory.pending]: (state) => {
            state.loading = true;
        },
        [getCategory.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.categorys = payload;
        },
        [getCategory.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const searchRedux = searchSlice.reducer;
export const categoryRedux = categorySlice.reducer;