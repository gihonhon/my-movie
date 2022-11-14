import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL, API_TMDB_KEY} from "../../util/API/api";


const initialState = {
    browse: [],
    loading: false,
};

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


export const getCategory = createAsyncThunk("categorys/getCategory", async (cat) => {
    const res = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
            api_key: API_TMDB_KEY,
            query: `${cat}`,
        },
    }).then((res) => {
        return res.data.results;
    });
    return res;
});

export const searchSlice = createSlice({
    name: "browse",
    initialState,
    reducers: {},
    extraReducers: {
        [getSearch.pending]: (state) => {
            state.loading = true;
        },
        [getSearch.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.browse = payload;
        },
        [getSearch.rejected]: (state) => {
            state.loading = false;
        },
        [getCategory.pending]: (state) => {
            state.loading = true;
        },
        [getCategory.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.browse = payload;
        },
        [getCategory.rejected]: (state) => {
            state.loading = false;
        }
    }
});

export const searchReducer = searchSlice.reducer;