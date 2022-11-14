import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./APP/Store/store";
import Navbars from './commponent/Navbar/Navbars';
import Footers from './commponent/Footer/Footers';
import './index.css';
import Home from './page/Home/home';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Details from './page/Detail/Details';
import Search from './page/Search/Search';
import Movies from './page/Movies/Movies';
import NavbarM from './commponent/Navbar/NavbarM';
import NavigationBar from './commponent/Navbar/NavigationBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/movie/:id' element={<Details />}/>
        <Route path='/search/:nama' element={<Search />}/>
        <Route path='/category/:cat' element={<Search />}/>
        <Route path='/all-movies' element={<Movies />}/>
      </Routes>
      <Footers/>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
