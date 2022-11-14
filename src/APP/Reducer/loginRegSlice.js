import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
    logInWithEmailAndPassword, 
    registerWithEmailAndPassword, 
    signInWithGoogle 
} from "../../firebase";

export const handleLogin = createAsyncThunk(
    'login/handleLogin',
    async(formValues) => {
        try {
            const req = await logInWithEmailAndPassword(formValues.email, formValues.password)
            localStorage.setItem('token', JSON.stringify(req.user.accessToken))
            localStorage.setItem('user', JSON.stringify(req.user))
            setTimeout(() => {
                window.location.reload(1)
            }, 1500)
        }catch(error) {
            console.error(error);
        }
    }
)

export const handleRegister = createAsyncThunk(
    'login/handleRegister',
    async(formValues) => {
        try {
            const req = await registerWithEmailAndPassword(formValues.name, formValues.email, formValues.password)
            localStorage.setItem('token', JSON.stringify(req.accessToken));
            localStorage.setItem('user', JSON.stringify(req))
            setTimeout(() => {
                window.location.reload(1)
            }, 1500)
        }catch(error) {
            console.error(error);
        }
    }
)

export const googleOauth = createAsyncThunk(
    'login/googleOauth',
    async() => {
        try {
            const req = await signInWithGoogle();
            localStorage.setItem('token', JSON.stringify(req.accessToken))
            localStorage.setItem('user', JSON.stringify(req));
            setTimeout(() => {
                window.location.reload(1)
            }, 1500)
        } catch(error) {
            console.error(error);
        }
    }
)

const initialState = {
    loginEP: null,
    status: false,
    statusG: false,
    isLoading: false,
    hasError: false,
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
    },
    extraReducers: {
        [handleLogin.pending]: (state) => {
            state.isLoading = true;
        },
        [handleLogin.fulfilled]: (state, {payload}) => {
            state.loginEP = payload
            state.status = true
        },
        [handleLogin.rejected]: (state) => {
            state.hasError = true;
        },
        [handleRegister.fulfilled]: (state) => {
            state.status = true
        }, 
        [googleOauth.fulfilled]: (state, {payload}) => {
            state.loginEP = payload
            state.statusG = true
        }

    }
})

export default loginSlice.reducer